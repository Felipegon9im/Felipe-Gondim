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
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="React logo">
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                                <ellipse transform="rotate(30 12 12)" cx="12" cy="12" rx="8" ry="3"/>
                                <ellipse transform="rotate(90 12 12)" cx="12" cy="12" rx="8" ry="3"/>
                                <ellipse transform="rotate(150 12 12)" cx="12" cy="12" rx="8" ry="3"/>
                                <circle cx="12" cy="12" r="1.5"/>
                            </svg>
                        </TechIcon>
                        
                        <TechIcon title="TypeScript">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="TypeScript logo">
                                <path d="M21.004 2.996H3v18h18V2.996zM13.5 17.5h-1.5v-7h-3v-1.5h7.5V12h-3v5.5z"/>
                            </svg>
                        </TechIcon>

                        <TechIcon title="Node.js">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Node.js logo">
                                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.36 14.81L15.3 12.2a.1.1 0 0 0-.15 0l-1.4 2.42a.1.1 0 0 1-.09.05h-3.4a.1.1 0 0 1-.09-.05L8.75 12.2a.1.1 0 0 0-.15 0l-3.06 4.61a.1.1 0 0 1-.08.05H4.2a.1.1 0 0 1-.08-.16l5.22-8.54a.1.1 0 0 1 .08-.05h1.23a.1.1 0 0 1 .09.05l2.45 4.24 3.75-6.5a.1.1 0 0 1 .09-.05h1.26a.1.1 0 0 1 .08.05l4.3 7.45a.1.1 0 0 1-.08.16h-1.2z"/>
                            </svg>
                        </TechIcon>

                        <TechIcon title="Python">
                           <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Python logo">
                                <path d="M22 10.76v2.48c0 4.79-3.87 8.66-8.66 8.66H12v-3.46h1.34c2.86 0 5.19-2.33 5.19-5.19v-2.49c0-2.86-2.33-5.19-5.19-5.19H12V2h1.34C18.13 2 22 5.97 22 10.76zM12 11.47H8.53V10h3.47c.83 0 1.5-.67 1.5-1.5S12.83 7 12 7H8.53V2H2v8.76C2 15.55 5.87 22 10.66 22H12v-8.66h-1.34c-1.04 0-1.89-.85-1.89-1.89v-.01c0-1.03.85-1.87 1.89-1.87H12v1.9z"/>
                            </svg>
                        </TechIcon>

                        <TechIcon title="Tailwind CSS">
                           <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Tailwind CSS logo">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4.5-8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                            </svg>
                        </TechIcon>

                        <TechIcon title="Google Gemini">
                           <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Google Gemini logo">
                                <path d="M12 2L9.5 8.5 2 10l6.5 5.5L6 22l6-4 6 4-2.5-6.5L22 10l-7.5-1.5L12 2zM12 5.47l1.32 4.08 4.29.85-3.1 2.8.73 4.2-3.24-2.1-3.24 2.1.73-4.2-3.1-2.8 4.29-.85L12 5.47z"/>
                            </svg>
                        </TechIcon>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;