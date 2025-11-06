
import React from 'react';

const About: React.FC = () => {
    return (
        <section id="sobre" className="bg-white">
            <div className="container mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center">
                <div className="transform transition-transform duration-500 hover:scale-105">
                    <img 
                        src="https://raw.githubusercontent.com/Felipegon9im/Data-Img/main/Gemini_Generated_Image_bnho6pbnho6pbnho.png" 
                        alt="Felipe Gondim - Soluções em TI" 
                        className="rounded-full shadow-2xl w-full max-w-sm mx-auto aspect-square object-cover"
                    />
                </div>
                
                <div className="mt-8 md:mt-0">
                    <span className="text-primary font-semibold uppercase tracking-wider">Sobre Mim</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mt-2 mb-6">
                        Apaixonado por resolver problemas com tecnologia
                    </h2>
                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        Olá! Sou Felipe Gondim, especialista em Tecnologia da Informação com mais de 5 anos de experiência ajudando empresas a crescer e otimizar processos através de software.
                    </p>
                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        Minha missão é ir além do "software de prateleira". Busco entender a fundo o seu negócio para desenhar e construir soluções sob medida — sejam sistemas web, aplicativos ou automações — que realmente gerem valor e aumentem a produtividade.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Se você precisa de um website, um sistema interno complexo, um app ou uma integração entre ferramentas, estou aqui para ser seu parceiro estratégico no desenvolvimento.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;