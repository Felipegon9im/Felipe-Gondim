import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const BotAvatar: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8.5 10.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"/></svg>
    </div>
);


const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const hasAutoOpened = useRef(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isLoading]);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1 && !hasAutoOpened.current) {
                setIsOpen(true);
                setIsFullScreen(true);
                hasAutoOpened.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if ((isOpen || isFullScreen) && messages.length === 0) {
            const initialBotMessage = {
                sender: 'bot' as const,
                text: "Olá! Sou o assistente do Felipe. <br/><br/>**Se preferir um contato direto, basta clicar no botão do WhatsApp abaixo e enviar sua mensagem.**<br/><br/>Para continuarmos, vou coletar alguns detalhes e o Felipe retornará com um **rascunho gratuito do seu projeto**. Vamos lá: qual é o seu **ramo de atuação** ou tipo de negócio?"
            };
            setMessages([initialBotMessage]);
            
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const systemInstruction = `Você é um consultor de projetos virtual para Felipe Gondim, um desenvolvedor de TI sênior. Sua missão é conduzir um briefing de projeto detalhado de forma amigável e profissional.
                
A CONVERSA JÁ COMEÇOU. A primeira pergunta sobre o 'ramo de atuação' do cliente já foi feita. A primeira mensagem do usuário será a resposta para ela.

Continue a conversa a partir desse ponto, seguindo ESTRITAMENTE este roteiro, fazendo UMA PERGUNTA POR VEZ:

1.  **Necessidade/Desafio:** Após o ramo, pergunte: "Ótimo. E qual é o **principal desafio ou necessidade** que você gostaria de resolver com uma solução de TI? (Ex: 'Preciso de um site para vender meus produtos', 'Quero automatizar o envio de relatórios', etc.)"
2.  **Tipo de Solução:** Após a necessidade, pergunte: "Entendido. Que tipo de **solução** você tem em mente para isso? [SUGGESTIONS: Website, Aplicativo, Automação, Outro]"
3.  **Funcionalidades Chave:** Após a resposta, pergunte: "Ótimo. Quais são as **funcionalidades essenciais** que não podem faltar?"
4.  **Público-Alvo:** Após a resposta, pergunte: "Certo. E quem é o **público-alvo** principal deste projeto?"
5.  **Orçamento:** Após a resposta, pergunte: "Para alinharmos a proposta, qual a faixa de **orçamento** que você tem em mente? [SUGGESTIONS: Até R$2.000, R$2.000 a R$5.000, R$5.000 a R$10.000, Acima de R$10.000, Prefiro não informar]"
6.  **Prazos:** Após a resposta, pergunte: "Ok. Existe algum **prazo** ou data importante que devemos considerar?"
7.  **Nome:** Após a resposta, pergunte: "Para finalizar, qual o seu **nome**?"
8.  **Contato:** Após receber o nome, agradeça e pergunte: "Obrigado, [Nome do Cliente]! E qual o seu melhor **contato** (e-mail ou WhatsApp) para o envio da proposta?"
9.  **Finalização e Coleta de Dados:** Assim que tiver coletado TODAS as informações (ramo, necessidade, solução, funcionalidades, público, orçamento, prazo, nome, contato), finalize a conversa com a frase EXATA: "[END_CONVERSATION]".
    Logo após a frase, SEM QUALQUER TEXTO ADICIONAL, inclua os dados coletados em um único objeto JSON formatado, seguindo este modelo:
    {"name": "NOME", "contact": "CONTATO", "industry": "RAMO DE ATUAÇÃO INICIAL DO USUÁRIO", "objective": "DESAFIO/NECESSIDADE", "solutionType": "TIPO DE SOLUÇÃO", "keyFeatures": "FUNCIONALIDADES", "targetAudience": "PÚBLICO", "budget": "ORÇAMENTO", "deadline": "PRAZO"}

REGRAS IMPORTANTES:
- QUANDO sua pergunta incluir sugestões, SEMPRE inclua o marcador [SUGGESTIONS: Opção 1, Opção 2, ...] no final da sua resposta.
- Lembre-se que a primeira resposta do usuário é sobre o RAMO DE ATUAÇÃO. Você precisa armazenar essa informação para o JSON final.
- NÃO faça mais de uma pergunta por vez.
- Se o usuário não souber responder algo (ex: orçamento), aceite a resposta (ex: "Ainda não sei") e passe para a próxima pergunta.
- NÃO adicione saudações antes do objeto JSON final.`;
                
                const newChat = ai.chats.create({ model: 'gemini-2.5-flash', config: { systemInstruction } });
                setChat(newChat);

            } catch (error) {
                console.error("Gemini AI initialization failed:", error);
                setMessages(prev => [...prev, { sender: 'bot', text: "Desculpe, meu sistema parece estar offline. Por favor, tente o contato direto." }]);
            }
        }
    }, [isOpen, isFullScreen]);

    const sendLeadInfo = async (data: object) => {
        const formspreeEndpoint = 'https://formspree.io/f/xldoqaey';
        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("Lead enviado com sucesso para o Formspree.");
                return { success: true };
            } else {
                const errorText = await response.text();
                console.error("Falha ao enviar lead para o Formspree.", { status: response.status, body: errorText });
                return { success: false };
            }
        } catch (error) {
            console.error("Ocorreu um erro de rede ao tentar enviar o lead:", error);
            return { success: false };
        }
    };
    
    const sendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading || !chat) return;

        const userMessage: Message = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setSuggestions([]);
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: messageText });
            let botResponseText = response.text;
            
            const suggestionRegex = /\[SUGGESTIONS:\s*([^\]]+)\]/;
            const suggestionMatch = botResponseText.match(suggestionRegex);

            if (suggestionMatch && suggestionMatch[1]) {
                const suggestionList = suggestionMatch[1].split(',').map(s => s.trim());
                setSuggestions(suggestionList);
                botResponseText = botResponseText.replace(suggestionRegex, '').trim();
            }

            if (botResponseText.includes("[END_CONVERSATION]")) {
                const endMarker = '[END_CONVERSATION]';
                const jsonPart = botResponseText.substring(botResponseText.indexOf(endMarker) + endMarker.length);
                
                botResponseText = "Excelente! Suas informações foram compiladas. O Felipe analisará este briefing e retornará com um rascunho do projeto para otimizarmos o contato. Lembre-se, esta avaliação inicial é totalmente gratuita. Muito obrigado!";
                
                try {
                    const cleanedJson = jsonPart.replace(/```json/g, '').replace(/```/g, '').trim();

                    if (cleanedJson) {
                        const leadData = JSON.parse(cleanedJson);
                        const firstUserMessageText = messages[1]?.sender === 'user' ? messages[1].text : 'Não especificado';
                        const finalData = {
                            ...leadData,
                            industry: leadData.industry || firstUserMessageText
                        };
                        await sendLeadInfo(finalData);
                    } else {
                        throw new Error("Não foi possível extrair o objeto JSON da resposta do modelo.");
                    }
                } catch(parseError) {
                    console.error("Falha ao processar dados do lead da resposta do Gemini:", parseError);
                    botResponseText = "Consegui as informações que precisava! O Felipe entrará em contato em breve com um esboço da proposta. Muito obrigado!";
                }
            }

            const botMessage: Message = { sender: 'bot', text: botResponseText };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            const errorMessage: Message = { sender: 'bot', text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(userInput);
    };
    
    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion);
    };

    const closeChat = () => {
        setIsOpen(false);
        setIsFullScreen(false);
    };

    return (
        <>
            {isFullScreen && <div className="fixed inset-0 bg-dark-gray/60 backdrop-blur-sm z-50" />}

            <div className={`transition-all duration-500 ease-in-out
                ${isFullScreen
                    ? 'fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 bg-transparent'
                    : `fixed bottom-24 right-6 w-80 sm:w-96 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`
                }`
            }>
                <div className={`bg-white rounded-2xl shadow-2xl flex flex-col transform border border-gray-200/50
                    ${isFullScreen
                        ? 'w-full h-full md:w-full md:max-w-2xl md:h-[90vh] md:max-h-[800px]'
                        : 'w-full h-auto'
                    }`
                }>
                    <div className="bg-gradient-to-r from-blue-700 to-primary text-white p-4 rounded-t-2xl flex justify-between items-center flex-shrink-0 shadow-md">
                        <div className="flex items-center">
                            <BotAvatar />
                            <h3 className="font-bold text-lg">Assistente de Projetos</h3>
                        </div>
                        <button onClick={closeChat} aria-label="Fechar chat" className="p-1 rounded-full hover:bg-white/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className={`flex-1 p-4 overflow-y-auto bg-gray-50 ${!isFullScreen && 'h-80'}`}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3 animate-fade-in`}>
                                <div className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-gradient-to-r from-emerald-500 to-secondary text-white rounded-br-none' : 'bg-white text-dark-gray rounded-bl-none border border-gray-200'}`}>
                                   <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                                </div>
                            </div>
                        ))}
                        {messages.length === 1 && (
                            <div className="flex justify-center my-4 animate-fade-in">
                                <a 
                                    href="https://api.whatsapp.com/send?phone=5548988628030" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 448 512" fill="currentColor">
                                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.8-26.7l-7-4.1-72.5 19 19.3-70.6-4.5-7.4c-18.2-29.7-28.1-64.4-28.1-100.2 0-108.7 88.4-197.1 197.1-197.1 53.3 0 104.1 20.9 141.4 58.2 37.2 37.2 58.2 88.1 58.2 141.4-.1 108.7-88.5 197.1-197.1 197.1zm105.7-166.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                    </svg>
                                    <span>Falar no WhatsApp</span>
                                </a>
                            </div>
                        )}
                        {isLoading && (
                            <div className="flex justify-start mb-3">
                                 <div className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl shadow-sm bg-white text-dark-gray rounded-bl-none border border-gray-200">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t bg-white rounded-b-2xl flex-shrink-0">
                        {suggestions.length > 0 && (
                            <div className="p-3 pt-4 flex flex-wrap gap-2 justify-center border-b border-gray-200">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        disabled={isLoading}
                                        className="px-4 py-2 bg-blue-100 text-primary font-medium rounded-full text-sm hover:bg-blue-200 disabled:bg-gray-200 disabled:text-gray-500 transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}
                        <form onSubmit={handleFormSubmit} className="p-3">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Responda aqui..."
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                    disabled={isLoading}
                                />
                                <button type="submit" className="ml-3 bg-gradient-to-r from-emerald-500 to-secondary text-white p-3 rounded-full hover:from-emerald-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 transition-all transform hover:scale-110 active:scale-100" disabled={isLoading || !userInput.trim()}>
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-gradient-to-br from-blue-600 to-primary text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${isFullScreen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                aria-label="Abrir chat com assistente virtual"
            >
                {isOpen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                )}
            </button>
        </>
    );
};

export default Chatbot;