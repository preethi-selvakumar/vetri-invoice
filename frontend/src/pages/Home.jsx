import React from 'react';
import HeroSection from '../components/HeroSection';
import GenerateInvoiceCta from '../components/GenerateInvoiceCta';
import Features from '../components/Features';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <GenerateInvoiceCta />
            <Features />
        </div>
    );
};

export default Home;