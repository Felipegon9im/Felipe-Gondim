import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
    quote: string;
    name: string;
    company: string;
    avatar: string;
}

const testimonialsData: Testimonial[] = [
    {
        quote: "O Felipe transformou nossa operação com um sistema de automação incrível. O retorno sobre o investimento foi visível em poucas semanas. Profissionalismo e agilidade definem o trabalho dele.",
        name: "João Silva",
        company: "CEO, InovaTech",
        avatar: "https://raw.githubusercontent.com/Felipegon9im/Data-Img/main/testimonial-1.png"
    },
    {
        quote: "Precisávamos de um website que realmente representasse nossa marca e fosse rápido. O resultado final superou todas as expectativas. Recomendo fortemente!",
        name: "Maria Oliveira",
        company: "Diretora de Marketing, Criativa Design",
        avatar: "https://raw.githubusercontent.com/Felipegon9im/Data-Img/main/testimonial-2.png"
    },
    {
        quote: "A consultoria de soluções foi um divisor de águas. Felipe nos ajudou a escolher a tecnologia certa e desenhou uma arquitetura robusta que economizou tempo e dinheiro.",
        name: "Carlos Pereira",
        company: "Gerente de TI, LogiMax",
        avatar: "https://raw.githubusercontent.com/Felipegon9im/Data-Img/main/testimonial-3.png"
    },
    {
        quote: "O aplicativo desenvolvido conectou perfeitamente nossa equipe de campo com o escritório. A comunicação melhorou 100% e a produtividade aumentou significativamente.",
        name: "Ana Costa",
        company: "Coordenadora de Operações, AgroForte",
        avatar: "https://raw.githubusercontent.com/Felipegon9im/Data-Img/main/testimonial-4.png"
    }
];

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    // Fix: Changed NodeJS.Timeout to number, as window.setTimeout returns a number in the browser.
    const timeoutRef = useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setActiveIndex((prevIndex) =>
                prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
            ),
            5000 // Change slide every 5 seconds
        );

        return () => {
            resetTimeout();
        };
    }, [activeIndex]);

    const handleDotClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section id="depoimentos" className="bg-white">
            <div className="container mx-auto px-6 py-20 md:py-28 text-center">
                <span className="text-primary font-semibold uppercase tracking-wider">Depoimentos</span>
                <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mt-2 mb-16">
                    O que meus clientes dizem
                </h2>

                <div className="relative max-w-3xl mx-auto min-h-[320px] md:min-h-[280px]">
                    {testimonialsData.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mb-6 shadow-lg object-cover" />
                                <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-6 relative px-8">
                                    <span className="absolute left-0 top-0 -translate-y-2 text-8xl text-light-gray font-serif opacity-50">“</span>
                                    {testimonial.quote}
                                    <span className="absolute right-0 bottom-0 translate-y-8 text-8xl text-light-gray font-serif opacity-50">”</span>
                                </blockquote>
                                <div className="font-bold text-dark-gray mt-4">{testimonial.name}</div>
                                <div className="text-gray-500">{testimonial.company}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center space-x-3 mt-8">
                    {testimonialsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Ir para depoimento ${index + 1}`}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;