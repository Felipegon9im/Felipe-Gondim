

import React from 'react';

interface Service {
    // Fix: Changed JSX.Element to React.ReactElement to resolve namespace issue.
    icon: React.ReactElement;
    title: string;
    description: string;
}

const servicesData: Service[] = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-secondary"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
        title: "Sistemas Sob Medida",
        description: "Desenvolvimento de plataformas, dashboards e ferramentas internas exclusivas para as necessidades do seu negócio."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-secondary"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.125C2.25 2.25 1.125 10.5 1.125 10.5v1.125c0 8.25 9.375 9.375 9.375 9.375s9.375-1.125 9.375-9.375V10.5C22.875 10.5 21.75 2.25 13.5 1.125v2.625c1.02.224 1.99.54 2.9.932m-3.375 0c.91-.392 1.88-.708 2.9-.932m-3.375 0c-1.02.224-1.99.54-2.9.932m-3.375 0c-.91-.392-1.88-.708-2.9-.932" /></svg>,
        title: "Websites e Aplicações Web",
        description: "Desenvolvimento de sites institucionais, landing pages e sistemas web complexos, focados em performance e design."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-secondary"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
        title: "Aplicativos Mobile e Desktop",
        description: "Criação de aplicativos nativos ou híbridos (iOS e Android) e software para desktop, levando sua solução até o cliente."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-secondary"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" /></svg>,
        title: "Automação de Processos (RPA)",
        description: "Automatize tarefas repetitivas. Crio robôs (bots) que imitam a ação humana para economizar tempo e reduzir erros."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-secondary"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>,
        title: "Integração de Sistemas (APIs)",
        description: "Conecto suas ferramentas existentes (CRMs, ERPs, planilhas) para que conversem entre si, criando um fluxo de dados unificado."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 text-secondary"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a.375.375 0 0 1 .265-.112c.878-.08 1.768-.19 2.653-.335A5.228 5.228 0 0 0 18 15.75V12.75A5.25 5.25 0 0 0 12.75 7.5h-7.5A5.25 5.25 0 0 0 0 12.75Z" /></svg>,
        title: "Consultoria de Soluções",
        description: "Não sabe qual tecnologia usar? Eu analiso seu desafio e desenho a arquitetura da solução ideal para o seu problema."
    }
];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        {service.icon}
        <h3 className="text-xl font-bold text-dark-gray mt-5 mb-3">{service.title}</h3>
        <p className="text-gray-600 leading-relaxed">{service.description}</p>
    </div>
);


const Services: React.FC = () => {
    return (
        <section id="servicos" className="bg-light-gray">
            <div className="container mx-auto px-6 py-20 md:py-28 text-center">
                <span className="text-primary font-semibold uppercase tracking-wider">O que eu faço</span>
                <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mt-2 mb-16">
                    Meus Serviços de TI
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;