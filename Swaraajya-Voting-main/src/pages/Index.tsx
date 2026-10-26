
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import FoundersSection from '@/components/home/FoundersSection';
import Footer from '@/components/home/Footer';
import BlockchainIntegrationSection from '@/components/home/BlockchainIntegrationSection';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update the document title
  useEffect(() => {
    document.title = "E-Swarajya - Blockchain Voting Platform";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-orange-50 traditional-bg">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <BlockchainIntegrationSection />
        <FeaturesSection />
        <CTASection />
        <FoundersSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
