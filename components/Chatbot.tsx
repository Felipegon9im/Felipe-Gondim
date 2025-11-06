import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const hasAutoOpened = useRef(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        const handleScroll = () => {
            // Check if user is near the bottom and the chat hasn't auto-opened yet
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !hasAutoOpened.current) {
                setIsOpen(true);
                hasAutoOpened.current = true; // Ensure it only opens once automatically
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Initialize chat and send welcome message
            const initialBotMessage = {
                sender: 'bot' as const,
                text: "Olá! Sou o assistente virtual do Felipe. Para agilizar seu atendimento, preciso de apenas 3 informações. Vamos lá?"
            };
            setMessages([initialBotMessage]);
            
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

                const systemInstruction = `Você é um assistente virtual para Felipe Gondim, um desenvolvedor de TI. Seu objetivo é ser amigável, eficiente e qualificar leads com perguntas curtas e diretas.
                
                Siga este roteiro EXATAMENTE:
                1. Após a mensagem inicial, pergunte o nome do cliente.
                2. Ao receber o nome, agradeça e peça o melhor contato (e-mail ou telefone).
                3. Ao receber o contato, peça uma breve descrição do projeto ou da necessidade.
                4. Assim que tiver coletado TODAS as três informações (nome, contato, projeto), finalize a conversa com a frase EXATA: "[END_CONVERSATION]".
                5. Logo após a frase, inclua os dados coletados em um objeto JSON formatado: {"name": "NOME_DO_CLIENTE", "contact": "CONTATO_DO_CLIENTE", "project": "DESCRIÇÃO_DO_PROJETO"}.
                
                Seja breve e faça uma pergunta por vez. Não desvie do roteiro.`;
                
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                      systemInstruction,
                    },
                  });
                setChat(newChat);

            } catch (error) {
                console.error("Gemini AI initialization failed:", error);
                setMessages(prev => [...prev, { sender: 'bot', text: "Desculpe, meu sistema parece estar offline. Por favor, tente o contato direto." }]);
            }
        }
    }, [isOpen]);

    const sendLeadInfo = async (data: object) => {
        const formspreeEndpoint = 'https://formspree.io/f/xldoqaey';

        if (formspreeEndpoint.includes('COLE_SUA_URL_AQUI')) {
            console.error("ERRO: O endpoint do Formspree ainda não foi configurado. Siga as instruções no código do arquivo components/Chatbot.tsx.");
            return { success: false };
        }

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Lead enviado com sucesso para o Formspree.");
                return { success: true };
            } else {
                const errorText = await response.text();
                console.error("Falha ao enviar lead para o Formspree. Status:", response.status);
                console.error("Resposta do servidor:", errorText);
                return { success: false };
            }
        } catch (error) {
            console.error("Ocorreu um erro de rede ao tentar enviar o lead:", error);
            return { success: false };
        }
    };


    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !chat) return;

        const userMessage: Message = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userInput });
            let botResponseText = response.text;
            
            if (botResponseText.includes("[END_CONVERSATION]")) {
                const parts = botResponseText.split('[END_CONVERSATION]');
                botResponseText = "Perfeito! Suas informações foram enviadas para análise. O Felipe entrará em contato com você em breve. Muito obrigado!";
                
                try {
                    const responsePart = parts[1];
                    // Regex to find the JSON object, robustly handling potential markdown fences (like ```json).
                    const jsonMatch = responsePart.match(/{[\s\S]*}/);

                    if (jsonMatch) {
                        const jsonDataString = jsonMatch[0];
                        const leadData = JSON.parse(jsonDataString);
                        await sendLeadInfo(leadData);
                    } else {
                        // If no JSON object is found, throw an error to be caught below.
                        throw new Error("Could not extract JSON object from the model's response.");
                    }
                } catch(parseError) {
                    console.error("Failed to parse lead data from Gemini response:", parseError);
                     if (parts[1]) {
                        console.error("Problematic response part:", parts[1]);
                    }
                    botResponseText = "Consegui as informações que precisava! O Felipe entrará em contato em breve. Muito obrigado!";
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

    return (
        <div>
            {/* Chat Window */}
            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl flex flex-col`}>
                {/* Header */}
                <div className="bg-primary text-white p-4 rounded-t-xl flex justify-between items-center">
                    <h3 className="font-bold text-lg">Assistente Virtual</h3>
                    <button onClick={() => setIsOpen(false)} aria-label="Fechar chat">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto h-80 bg-light-gray">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-secondary text-white rounded-br-none' : 'bg-gray-200 text-dark-gray rounded-bl-none'}`}>
                               <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start mb-3">
                             <div className="max-w-xs md:max-w-md px-4 py-3 rounded-2xl bg-gray-200 text-dark-gray rounded-bl-none">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-75"></div>
                                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-150"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t bg-white rounded-b-xl">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={isLoading}
                        />
                        <button type="submit" className="ml-3 bg-secondary text-white p-3 rounded-full hover:bg-green-700 disabled:bg-gray-400 transition-colors" disabled={isLoading || !userInput.trim()}>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    </div>
                </form>
            </div>

            {/* Chat Bubble Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-110"
                aria-label="Abrir chat com assistente virtual"
            >
                {isOpen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                )}
            </button>
        </div>
    );
};

export default Chatbot;