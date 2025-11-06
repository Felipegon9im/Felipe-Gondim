
import React from 'react';

const Hero: React.FC = () => {
    return (
        <section 
            id="inicio" 
            className="relative bg-cover bg-center bg-fixed"
            style={{backgroundImage: `linear-gradient(rgba(20, 30, 40, 0.7), rgba(20, 30, 40, 0.7)), url('https://raw.githubusercontent.com/Felipegon9im/Data-Img/main/Gemini_Generated_Image_bnho6pbnho6pbnho.png')`}}
        >
            <div className="container mx-auto px-6 py-28 md:py-40 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl">
                    Felipe Gondim
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mt-2 drop-shadow-lg">
                    Soluções em TI
                </h2>
                <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-3xl mx-auto font-medium drop-shadow-md">
                    Transformando ideias em soluções de software sob medida. Alinhado com as principais tecnologias de inteligência artificial, entrego um rascunho do seu projeto em até 24 horas após o contato.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <a href="#servicos" className="bg-secondary text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Conheça os Serviços
                    </a>
                    <a href="#contato" className="bg-primary text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Fazer um Orçamento
                    </a>
                    <a href="#contato" className="bg-white text-secondary border border-secondary px-8 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Entre em Contato
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;