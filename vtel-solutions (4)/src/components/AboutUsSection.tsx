import React from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Globe, 
  Radio, 
  Award, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';

interface AboutUsSectionProps {
  openQuoteModal: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ openQuoteModal }) => {
  const whyChooseUsList = [
    { title: 'Experienced RF Planning Engineers', desc: 'Decades of combined radio engineering experience across 2G through 5G NR and private CBRS spectrum.' },
    { title: 'High-Quality Digital Mapping Data', desc: 'Sub-meter 1m DTM/DSM and multi-class clutter data with hydrological and elevation accuracy guarantees.' },
    { title: 'Customized Solutions', desc: 'Tailored area bounding boxes, software format exports, and custom clutter loss calibration.' },
    { title: 'Fast Project Delivery', desc: 'Archived datasets delivered in 24–48 hours; custom high-res mapping in 5–10 business days.' },
    { title: 'Competitive Pricing', desc: 'Cost-effective enterprise and project-based geospatial licenses with volume discounts.' },
    { title: 'Worldwide Coverage', desc: 'Pre-processed geospatial datasets spanning North America, Europe, Middle East, Asia-Pacific, Africa, and South America.' },
    { title: 'Professional Technical Support', desc: 'Direct 24/7 engineer assistance for software import, model calibration, and CRS coordinate transforms.' }
  ];

  return (
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-slate-800" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>About VTel Solutions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Engineering Precision in <span className="text-cyan-400">Telecom & GIS</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            VTel Solutions is dedicated to supporting telecommunications companies with advanced RF planning and GIS mapping services. We combine engineering expertise with high-quality geospatial datasets to provide accurate and efficient network planning solutions.
          </p>
        </div>

        {/* Mission Card */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Our Mission</h3>
              <p className="text-xs text-cyan-400 font-mono">Empowering Global Wireless Connectivity</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            Our mission is to help customers build optimized wireless networks by providing reliable mapping products, RF engineering services, and technical consulting. Whether you require high-resolution mapping data or complete radio network design, VTel Solutions delivers reliable, cost-effective, and customized solutions.
          </p>
        </div>

        {/* Why Choose Us Section directly matching user prompt bullet points */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-white">Why Choose VTel Solutions?</h3>
            <p className="text-slate-400 text-xs mt-1">Key pillars driving our telecommunications GIS leadership</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsList.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 hover:border-cyan-500/50 transition">
                <div className="flex items-center gap-2.5 text-cyan-400 font-extrabold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-900 border border-cyan-800/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white">Need custom RF planning or geospatial mapping datasets?</h3>
            <p className="text-xs text-slate-300">Contact VTel Solutions engineering team for sample evaluations and quote specs.</p>
          </div>
          <button
            onClick={openQuoteModal}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Request RF Proposal</span>
          </button>
        </div>

      </div>
    </section>
  );
};
