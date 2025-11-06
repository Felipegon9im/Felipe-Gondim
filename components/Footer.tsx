import React from 'react';

// Reusable TechIcon component with a styled tooltip on hover
const TechIcon: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="relative group flex justify-center">
        <div className="text-gray-400 hover:text-white transition-colors duration-300">
            {children}
        </div>
        <div className="absolute bottom-full mb-2 w-max px-3 py-1.5 bg-gray-900 bg-opacity-90 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {title}
        </div>
    </div>
);


const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark-gray text-white">
            <div className="container mx-auto px-6 py-10">
                <div className="text-center md:flex md:justify-between md:items-center">
                    <div className="text-lg font-bold">
                        Felipe Gondim | Soluções em TI
                    </div>
                    <div className="text-gray-400 mt-4 md:mt-0">
                        © {currentYear} Todos os direitos reservados.
                    </div>
                    <div className="flex justify-center space-x-6 mt-4 md:mt-0">
                        <a href="https://www.linkedin.com/in/felipegondim/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-700 text-center">
                    <h3 className="text-gray-300 mb-6 font-semibold tracking-wider uppercase text-sm">Principais Tecnologias</h3>
                    <div className="flex justify-center items-center flex-wrap gap-x-8 gap-y-6">
                        
                        <TechIcon title="React">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="React logo"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><ellipse cx="12" cy="12" rx="4.243" ry="1.732" transform="rotate(-60 12 12)"/><ellipse cx="12" cy="12" rx="1.732" ry="4.243" transform="rotate(-30 12 12)"/><circle cx="12" cy="12" r="1.5"/></svg>
                        </TechIcon>
                        
                        <TechIcon title="TypeScript">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="TypeScript logo"><path d="M21 3H3v18h18V3zM12 17h-1.5v-5H9v-1.5h4.5V17zm3-4.5h-1.5V11H12v-1.5h3V11h-1.5v1.5z"/></svg>
                        </TechIcon>

                        <TechIcon title="Node.js">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Node.js logo"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-11h-1v5h1v-5zm3 0h-1v5h1v-5z"/></svg>
                        </TechIcon>

                        <TechIcon title="Python">
                           <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Python logo"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 15v-1c0-1.1.9-2 2-2h1.5v-1.5H13c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h3v1.5h-3c-.28 0-.5.22-.5.5s.22.5.5.5h1.5v1.5H13c-1.1 0-2 .9-2 2v1h-1zm-1-5c0 .83-.67 1.5-1.5 1.5H7v-1.5h1.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H7V7h1.5c.83 0 1.5.67 1.5 1.5v1.5z"/></svg>
                        </TechIcon>

                        <TechIcon title="Tailwind CSS">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Tailwind CSS logo"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3.5-9.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm7 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        </TechIcon>

                        <TechIcon title="Google Gemini">
                           <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Google Gemini logo"><path d="M12 2l2.5 6.5L22 10l-6.5 5.5L18 22l-6-4-6 4 2.5-6.5L2 10l7.5-1.5L12 2z"/></svg>
                        </TechIcon>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
