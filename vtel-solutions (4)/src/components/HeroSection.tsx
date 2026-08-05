import React from 'react';
import { 
  Radio, 
  MapPin, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Globe2, 
  Calculator, 
  Sparkles, 
  Download, 
  Database,
  BarChart3,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { PageTab } from '../types/telecom';

interface HeroSectionProps {
  setActiveTab: (tab: PageTab) => void;
  openQuoteModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, openQuoteModal }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Cityscape Panorama Image - Fully Vivid and Prominently Visible */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/images/city_hero_bg.jpg" 
          alt="Mapping your world in 3D - High-rise coastal city panorama with ocean and skyscrapers" 
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
          className="w-full h-full object-cover object-center opacity-95 scale-100 transition-transform duration-1000"
        />
        {/* Soft atmospheric dark gradient overlays ensuring vivid image visibility + 100% text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/85" />
        <div className="absolute inset-0 bg-tech-grid opacity-10" />
      </div>

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-400/50 text-cyan-200 text-xs font-bold shadow-lg backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Next-Gen Telecom GIS & 3D Vector Datasets</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-mono font-bold">2G to 5G NR</span>
            </div>

            {/* Main Headline matching reference tagline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
              Mapping <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-200">your world in 3D</span>
            </h1>

            {/* Sub-description */}
            <p className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-2xl font-medium drop-shadow-sm">
              VTel Solutions delivers high-quality 3D digital map datasets, high-resolution clutter land-use maps, DTM elevation models, and RF engineering solutions for mobile network operators worldwide.
            </p>

            {/* Spec Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
              <div className="flex items-center gap-2 text-slate-100 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 shadow-md font-semibold hover:border-cyan-400/60 transition">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>5m–50m DTM Elevation Data</span>
              </div>
              <div className="flex items-center gap-2 text-slate-100 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 shadow-md font-semibold hover:border-cyan-400/60 transition">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Clutter Land-Use Maps</span>
              </div>
              <div className="flex items-center gap-2 text-slate-100 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 shadow-md font-semibold hover:border-cyan-400/60 transition">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>LOD1–LOD3 3D Buildings</span>
              </div>
              <div className="flex items-center gap-2 text-slate-100 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 shadow-md font-semibold hover:border-cyan-400/60 transition">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>5G NR & mmWave Ready</span>
              </div>
              <div className="flex items-center gap-2 text-slate-100 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 shadow-md font-semibold hover:border-cyan-400/60 transition">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>CBRS & Private LTE</span>
              </div>
              <div className="flex items-center gap-2 text-slate-100 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 shadow-md font-semibold hover:border-cyan-400/60 transition">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Atoll & Planet Native</span>
              </div>
            </div>

            {/* Action Buttons matching reference style */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={openQuoteModal}
                id="hero-request-quote-btn"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-blue-900/90 hover:bg-blue-800 text-white text-sm sm:text-base font-bold shadow-xl shadow-blue-950/60 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95 border border-sky-400/40 backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>How do you want to map your world ?</span>
                <ChevronRight className="w-4 h-4 text-cyan-200" />
              </button>

              <button
                onClick={() => setActiveTab('coverage-map')}
                id="hero-explore-map-btn"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-100 border border-slate-700 text-sm font-semibold transition cursor-pointer shadow-md backdrop-blur-md"
              >
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span>Global GIS Map Explorer</span>
              </button>

              <button
                onClick={() => setActiveTab('rf-simulator')}
                id="hero-rf-simulator-btn"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-100 border border-slate-700 text-sm font-semibold transition cursor-pointer shadow-md backdrop-blur-md"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>5G RF Link Simulator</span>
              </button>
            </div>

            {/* Quick Contact Line */}
            <div className="pt-1 text-xs text-slate-200 flex items-center gap-4 font-medium drop-shadow-sm">
              <span>Support & Sales: <a href="mailto:info@vtelsolution.com" className="text-cyan-300 font-bold hover:underline">info@vtelsolution.com</a></span>
              <span>•</span>
              <span>Web: <a href="https://www.vtelsolution.com" target="_blank" rel="noreferrer" className="text-cyan-300 font-bold hover:underline">www.vtelsolution.com</a></span>
            </div>

          </div>

          {/* Right Column Visual Card Preview Widget */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 p-5 shadow-2xl text-white">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">Clutter & GIS Datasets</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Sample High-Resolution Telecommunication Maps</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-bold">
                  Sample Data
                </span>
              </div>

              {/* Sample Map Image Display */}
              <div className="py-3 space-y-3">
                <div 
                  onClick={() => setActiveTab('digital-maps')}
                  className="relative rounded-xl overflow-hidden border border-slate-700 shadow-md cursor-pointer group"
                >
                  <img 
                    src="/images/building_lod_3d.jpg" 
                    alt="3D Real Buildings & 5G RSRP Coverage Plot"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-4 text-white">
                    <div className="flex justify-between items-end w-full">
                      <div>
                        <div className="text-sm font-bold font-mono">3D Real Buildings & RSRP Plot</div>
                        <div className="text-xs text-cyan-300">Wide Area 5G Signal Heatmap Analysis</div>
                      </div>
                      <span className="text-xs bg-cyan-600 hover:bg-cyan-500 px-2.5 py-1 rounded-md font-mono font-bold text-white shadow">View Maps</span>
                    </div>
                  </div>
                </div>

                {/* Layer Stack Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div 
                    onClick={() => setActiveTab('digital-maps')}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-700 hover:border-cyan-400 cursor-pointer transition"
                  >
                    <div className="text-[11px] font-bold text-slate-200">DTM Bare-Earth</div>
                    <p className="text-[10px] text-slate-400">5m – 50m Terrain Elevations</p>
                  </div>
                  <div 
                    onClick={() => setActiveTab('digital-maps')}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-700 hover:border-cyan-400 cursor-pointer transition"
                  >
                    <div className="text-[11px] font-bold text-slate-200">LOD2/LOD3 3D Roofs</div>
                    <p className="text-[10px] text-slate-400">Vector Buildings for mmWave</p>
                  </div>
                </div>
              </div>

              {/* Quick Sample Download Banner */}
              <div className="pt-1">
                <button
                  onClick={() => setActiveTab('digital-maps')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect Sample Maps & Software Formats</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Key Stats Bar */}
        <div className="mt-10 lg:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md">
          <div className="space-y-1 text-center sm:text-left sm:border-r border-slate-200 sm:pr-4">
            <div className="text-2xl lg:text-3xl font-black text-slate-900 font-mono">
              150+
            </div>
            <p className="text-xs text-slate-600 font-semibold">Countries & Global Regions Covered</p>
          </div>

          <div className="space-y-1 text-center sm:text-left sm:border-r border-slate-200 sm:pr-4">
            <div className="text-2xl lg:text-3xl font-black text-blue-600 font-mono">
              5m – 50m
            </div>
            <p className="text-xs text-slate-600 font-semibold">DTM, DSM & Clutter Resolutions</p>
          </div>

          <div className="space-y-1 text-center sm:text-left sm:border-r border-slate-200 sm:pr-4">
            <div className="text-2xl lg:text-3xl font-black text-slate-900 font-mono">
              1,000+
            </div>
            <p className="text-xs text-slate-600 font-semibold">Completed RF & GIS Projects</p>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="text-2xl lg:text-3xl font-black text-emerald-600 font-mono">
              99.8%
            </div>
            <p className="text-xs text-slate-600 font-semibold">Spatial Accuracy & Model Match</p>
          </div>
        </div>

      </div>
    </section>
  );
};
