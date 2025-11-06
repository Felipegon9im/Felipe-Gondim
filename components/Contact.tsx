

import React, { useState } from 'react';

// Fix: Changed JSX.Element to React.ReactElement to resolve namespace issue.
const ContactInfoItem: React.FC<{ icon: React.ReactElement; title: string; children: React.ReactNode; href?: string }> = ({ icon, title, children, href }) => {
    const content = (
        <div className="flex items-center p-4 bg-light-gray rounded-lg mb-4 transition-colors duration-300 hover:bg-gray-200">
            {icon}
            <div className="ml-4">
                <span className="font-bold text-dark-gray">{title}</span>
                <span className="block text-gray-600">{children}</span>
            </div>
        </div>
    );

    return href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : <div>{content}</div>;
};

const Contact: React.FC = () => {
    const [formMessage, setFormMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setIsSuccess(true);
        setFormMessage('Obrigado! Sua mensagem foi enviada com sucesso. (Simulação)');
        
        const form = e.target as HTMLFormElement;
        form.reset();

        setTimeout(() => {
            setFormMessage('');
        }, 5000);
    };

    return (
        <section id="contato" className="bg-white">
            <div className="container mx-auto px-6 py-20 md:py-28">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <span className="text-primary font-semibold uppercase tracking-wider">Vamos conversar</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mt-2 mb-6">
                            Entre em Contato
                        </h2>
                        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                            Estou pronto para entender seu desafio e propor a melhor solução. Envie uma mensagem pelo formulário ao lado ou utilize um dos canais abaixo.
                        </p>
                        
                        <ContactInfoItem 
                            href="https://api.whatsapp.com/send?phone=5548988628030" 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-5.964 4.842-10.806 10.806-10.806 2.969 0 5.761 1.159 7.822 3.22l-.009-.008c2.06 2.062 3.22 4.854 3.22 7.822-.003 5.965-4.842 10.807-10.807 10.807-2.098 0-4.14-.548-5.947-1.588L.057 24zM6.51 5.445c.223-.225.524-.319.823-.272.298.048.581.242.75 0l.13-.13c.168-.168.423-.23.673-.133.25.097.433.313.513.579l.13 1.042c.08.643-.173 1.284-.633 1.743l-.46.46c-.23.23-.33.562-.27.873.06.31.25.584.5.768l.24.19c1.07 1.06 2.45 1.73 3.91 1.94l.19.03c.31.06.62-.04.87-.27l.46-.46c.46-.46 1.1-.71 1.74-.63l1.04.13c.27.08.48.26.58.51.1.25.03.51-.13.67l-.13.13c-.17.17-.12.45.05.75.05.09.1.18.15.26l.4.63c.23.36.23.81 0 1.17l-.5.75c-.23.36-.6.61-1.02.71-.42.1-.85.05-1.22-.13l-.12-.06c-1.53-.76-2.91-1.78-4.1-3.05l-.18-.18c-1.27-1.2-2.28-2.65-3.05-4.18l-.06-.12c-.18-.37-.23-.8-.13-1.22.1-.42.35-.79.71-1.02l.75-.5c.36-.23.81-.23 1.17 0l.63.4c.08.05.17.1.26.15z"/></svg>}
                            title="WhatsApp"
                        >
                            (48) 98862-8030
                        </ContactInfoItem>

                        <ContactInfoItem
                            href="mailto:felipe@gondimti.com.br"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75" /></svg>}
                            title="Email"
                        >
                            felipe@gondimti.com.br
                        </ContactInfoItem>

                        <ContactInfoItem
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>}
                            title="Localização"
                        >
                            Florianópolis - Ratones, SC (Atendimento remoto para todo Brasil)
                        </ContactInfoItem>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-light-gray p-8 rounded-lg shadow-lg">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Seu Nome</label>
                            <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Nome Completo" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Seu Email</label>
                            <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="email@exemplo.com" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Mensagem</label>
                            <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Descreva seu projeto ou problema..." required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-secondary text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                            Enviar Mensagem
                        </button>
                        {formMessage && (
                            <p className={`text-sm mt-4 text-center ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                                {formMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;