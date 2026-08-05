import React, { useState } from 'react';
import { PageTab } from './types/telecom';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveMapExplorer } from './components/InteractiveMapExplorer';
import { RfSimulator } from './components/RfSimulator';
import { DigitalMapProducts } from './components/DigitalMapProducts';
import { RfServices } from './components/RfServices';
import { SoftwareCompatibility } from './components/SoftwareCompatibility';
import { IndustriesSection } from './components/IndustriesSection';
import { ProjectWorkflow } from './components/ProjectWorkflow';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { AboutUsSection } from './components/AboutUsSection';
import { QuotePortalModal } from './components/QuotePortalModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [prefilledProduct, setPrefilledProduct] = useState<string>('');
  const [prefilledCountry, setPrefilledCountry] = useState<string>('');

  const openQuoteModal = () => {
    setPrefilledProduct('');
    setPrefilledCountry('');
    setQuoteModalOpen(true);
  };

  const openQuoteModalWithProduct = (prodName: string) => {
    setPrefilledProduct(prodName);
    setPrefilledCountry('');
    setQuoteModalOpen(true);
  };

  const openQuoteModalWithCountry = (countryName: string) => {
    setPrefilledProduct('');
    setPrefilledCountry(countryName);
    setQuoteModalOpen(true);
  };

  const openQuoteModalWithSpec = (freq: string, dist: string, rsrp: string) => {
    setPrefilledProduct(`5G RF Link Design (${freq}, ${dist}, RSRP ${rsrp})`);
    setPrefilledCountry('');
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Sticky Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openQuoteModal={openQuoteModal} 
      />

      {/* Main Page View Routing */}
      <main className="flex-1">
        
        {activeTab === 'home' && (
          <>
            <HeroSection 
              setActiveTab={setActiveTab} 
              openQuoteModal={openQuoteModal} 
            />
            <InteractiveMapExplorer 
              onSelectCountryForQuote={openQuoteModalWithCountry} 
            />
            <RfSimulator 
              openQuoteModalWithSpec={openQuoteModalWithSpec} 
            />
            <DigitalMapProducts 
              openQuoteModalWithProduct={openQuoteModalWithProduct} 
            />
            <RfServices 
              openQuoteModalWithService={openQuoteModalWithProduct} 
            />
            <SoftwareCompatibility />
            <IndustriesSection 
              openQuoteModalWithIndustry={openQuoteModalWithProduct} 
            />
            <ProjectWorkflow 
              openQuoteModal={openQuoteModal} 
            />
            <CaseStudiesSection 
              openQuoteModal={openQuoteModal} 
            />
            <FaqSection 
              openQuoteModal={openQuoteModal} 
            />
            <BlogSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'about' && (
          <AboutUsSection openQuoteModal={openQuoteModal} />
        )}

        {activeTab === 'rf-services' && (
          <RfServices openQuoteModalWithService={openQuoteModalWithProduct} />
        )}

        {activeTab === 'digital-maps' && (
          <>
            <DigitalMapProducts openQuoteModalWithProduct={openQuoteModalWithProduct} />
            <SoftwareCompatibility />
          </>
        )}

        {activeTab === 'coverage-map' && (
          <InteractiveMapExplorer onSelectCountryForQuote={openQuoteModalWithCountry} />
        )}

        {activeTab === 'rf-simulator' && (
          <RfSimulator openQuoteModalWithSpec={openQuoteModalWithSpec} />
        )}

        {activeTab === 'industries' && (
          <IndustriesSection openQuoteModalWithIndustry={openQuoteModalWithProduct} />
        )}

        {activeTab === 'portfolio' && (
          <CaseStudiesSection openQuoteModal={openQuoteModal} />
        )}

        {activeTab === 'faqs' && (
          <FaqSection openQuoteModal={openQuoteModal} />
        )}

        {activeTab === 'blog' && (
          <BlogSection />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}

      </main>

      {/* Quote Request Portal Modal */}
      <QuotePortalModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)}
        prefilledProduct={prefilledProduct}
        prefilledCountry={prefilledCountry}
      />

      {/* Site Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        openQuoteModal={openQuoteModal} 
      />

    </div>
  );
}
