
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';

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
            <div className="fixed bottom-6 right-6 z-40 flex items-center gap-4">
                <Chatbot />
                <WhatsAppButton />
            </div>
        </>
    );
};

export default App;
