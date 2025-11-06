
import React, { useState } from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void; className?: string }> = ({ href, children, onClick, className }) => (
    <a href={href} onClick={onClick} className={`transition-colors ${className}`}>
        {children}
    </a>
);

const Header: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    }

    const navLinks = [
        { href: '#inicio', label: 'Início' },
        { href: '#sobre', label: 'Sobre' },
        { href: '#servicos', label: 'Serviços' },
        { href: '#contato', label: 'Contato' },
    ];

    return (
        <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#inicio" className="text-2xl font-bold text-primary">
                    Felipe Gondim <span className="font-light">| TI</span>
                </a>
                
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map(link => (
                       <NavLink key={link.href} href={link.href} className="text-gray-600 hover:text-primary">{link.label}</NavLink>
                    ))}
                    <a href="#contato" className="bg-secondary text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-transform duration-300 hover:scale-105">
                        Fale Conosco
                    </a>
                </div>

                <button id="mobile-menu-button" className="md:hidden text-dark-gray" onClick={toggleMobileMenu} aria-label="Abrir menu">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div 
                className={`transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white shadow-lg`}
                id="mobile-menu"
            >
                {navLinks.map(link => (
                    <NavLink key={link.href} href={link.href} onClick={closeMobileMenu} className="block px-6 py-3 text-gray-700 hover:bg-light-gray">{link.label}</NavLink>
                ))}
                <NavLink href="#contato" onClick={closeMobileMenu} className="block px-6 py-4 bg-secondary text-white text-center font-medium">
                    Fale Conosco
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
