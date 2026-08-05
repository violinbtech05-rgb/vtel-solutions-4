import React from 'react';
import { VTelLogo } from './VTelLogo';
import { 
  Radio, 
  Globe, 
  Mail, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import { PageTab } from '../types/telecom';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  openQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openQuoteModal }) => {
  return (
    <footer className="bg-slate-100 text-slate-700 border-t border-slate-200/90 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <VTelLogo variant="light" size="lg" />

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm font-medium">
              Leading provider of Telecom RF Planning, Digital Mapping, and GIS Solutions for mobile network operators, telecom vendors, system integrators, and consulting companies worldwide.
            </p>

            <div className="space-y-1 font-mono text-xs">
              <div className="text-slate-800 font-semibold">Email: <a href="mailto:info@vtelsolution.com" className="text-blue-700 hover:underline">info@vtelsolution.com</a></div>
              <div className="text-slate-800 font-semibold">Website: <a href="https://www.vtelsolution.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">www.vtelsolution.com</a></div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold text-slate-900 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-blue-700 transition cursor-pointer">Home Page</button></li>
              <li><button onClick={() => setActiveTab('about')} className="hover:text-blue-700 transition cursor-pointer">About VTel</button></li>
              <li><button onClick={() => setActiveTab('rf-services')} className="hover:text-blue-700 transition cursor-pointer">RF Planning Services</button></li>
              <li><button onClick={() => setActiveTab('digital-maps')} className="hover:text-blue-700 transition cursor-pointer">Digital Maps & Resolutions</button></li>
              <li><button onClick={() => setActiveTab('coverage-map')} className="hover:text-blue-700 transition cursor-pointer">Global GIS Coverage Map</button></li>
              <li><button onClick={() => setActiveTab('rf-simulator')} className="hover:text-blue-700 transition cursor-pointer">5G RF Propagation Simulator</button></li>
            </ul>
          </div>

          {/* Digital Map Products */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold text-slate-900 uppercase tracking-wider">Geospatial Datasets</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li><button onClick={() => setActiveTab('digital-maps')} className="hover:text-blue-700 transition cursor-pointer">Digital Terrain Models (DTM)</button></li>
              <li><button onClick={() => setActiveTab('digital-maps')} className="hover:text-blue-700 transition cursor-pointer">Clutter Land Use Maps</button></li>
              <li><button onClick={() => setActiveTab('digital-maps')} className="hover:text-blue-700 transition cursor-pointer">3D Building Data (LOD1-3)</button></li>
              <li><button onClick={() => setActiveTab('digital-maps')} className="hover:text-blue-700 transition cursor-pointer">Resolution Matrix Specs</button></li>
            </ul>
          </div>

          {/* Software Compatibility */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold text-slate-900 uppercase tracking-wider">Software Formats</h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li>Forsk Atoll (.map, .tab, .bld)</li>
              <li>Infovista Planet (.grid, .clutter)</li>
              <li>TEOCO Asset</li>
              <li>Esri ArcGIS (.shp, .gdb)</li>
              <li>Pathloss & MapInfo</li>
              <li>GeoTIFF & ASCII Raster</li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} VTel Solutions. All rights reserved. Telecom RF Engineering & GIS Mapping.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={openQuoteModal} className="text-blue-700 font-bold hover:underline cursor-pointer">
              Get RF & GIS Quote
            </button>
            <span>•</span>
            <a href="mailto:info@vtelsolution.com" className="hover:text-slate-900 font-semibold">
              info@vtelsolution.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
