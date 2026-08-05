import React, { useState } from 'react';
import { VTelLogo } from './VTelLogo';
import { 
  Radio, 
  Map, 
  Cpu, 
  Layers, 
  Globe, 
  Briefcase, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  PhoneCall, 
  Menu, 
  X, 
  Calculator,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { PageTab } from '../types/telecom';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  openQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Globe className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'rf-services', label: 'RF Planning', icon: <Radio className="w-4 h-4" /> },
    { id: 'digital-maps', label: 'Digital Maps', icon: <Layers className="w-4 h-4" /> },
    { id: 'coverage-map', label: 'Global GIS Map', icon: <Map className="w-4 h-4" />, badge: 'Interactive' },
    { id: 'rf-simulator', label: 'RF Simulator', icon: <Calculator className="w-4 h-4" />, badge: '5G Tool' },
    { id: 'industries', label: 'Industries', icon: <Cpu className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Case Studies', icon: <FileText className="w-4 h-4" /> },
    { id: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      {/* Top Banner Bar */}
      <div className="bg-slate-100 text-xs py-1.5 px-4 sm:px-6 hidden md:block border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-700">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-blue-700 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Global GIS Coverage: Worldwide 5m to 50m DTM & Clutter Maps
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">Email: <a href="mailto:info@vtelsolution.com" className="text-blue-700 hover:underline font-bold">info@vtelsolution.com</a></span>
          </div>
          <div className="flex items-center space-x-4 text-slate-500">
            <span>Software Ready: Atoll, Planet, Asset, Pathloss, ArcGIS, MapInfo</span>
            <span>•</span>
            <a href="https://www.vtelsolution.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900 font-bold transition-colors">www.vtelsolution.com</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group text-left focus:outline-none cursor-pointer"
            id="brand-logo-btn"
          >
            <VTelLogo variant="light" size="md" />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navItems.slice(0, 9).map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`relative px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-cyan-700 bg-cyan-50 border border-cyan-200 shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-200 font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden md:inline-flex items-center text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 border border-slate-200 transition"
              id="contact-nav-btn"
            >
              Contact Us
            </button>
            <button
              onClick={openQuoteModal}
              id="request-quote-nav-btn"
              className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 hover:shadow-cyan-600/30 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '6s' }} />
              <span>Get RF Quote</span>
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={openQuoteModal}
              className="sm:hidden text-xs font-bold px-3 py-1.5 rounded-lg bg-cyan-600 text-white"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn max-h-[85vh] overflow-y-auto shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left ${
                  activeTab === item.id 
                    ? 'bg-cyan-50 text-cyan-800 border border-cyan-200' 
                    : 'text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={openQuoteModal}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-600 text-white text-sm font-bold shadow-md shadow-cyan-600/20"
            >
              <Sparkles className="w-4 h-4" />
              Request Custom RF / GIS Quote
            </button>
            <div className="text-center pt-2 text-xs text-slate-500 font-mono">
              Direct Contact: <a href="mailto:info@vtelsolution.com" className="text-cyan-600 font-bold">info@vtelsolution.com</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
