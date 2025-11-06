
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const App: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <About />
                <Services />
                <Contact />
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    );
};

export default App;
