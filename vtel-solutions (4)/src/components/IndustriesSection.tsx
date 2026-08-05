import React from 'react';
import { INDUSTRIES } from '../data/telecomData';
import { 
  Building2, 
  Radio, 
  TowerControl, 
  Wifi, 
  Cpu, 
  Zap, 
  Train, 
  Flame, 
  ShieldAlert, 
  Radar, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Radio: <Radio className="w-5 h-5 text-blue-600" />,
  TowerControl: <TowerControl className="w-5 h-5 text-blue-600" />,
  Building2: <Building2 className="w-5 h-5 text-blue-600" />,
  Wifi: <Wifi className="w-5 h-5 text-blue-600" />,
  Cpu: <Cpu className="w-5 h-5 text-blue-600" />,
  Zap: <Zap className="w-5 h-5 text-blue-600" />,
  Train: <Train className="w-5 h-5 text-blue-600" />,
  Flame: <Flame className="w-5 h-5 text-blue-600" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-blue-600" />,
  Radar: <Radar className="w-5 h-5 text-blue-600" />,
};

interface IndustriesSectionProps {
  openQuoteModalWithIndustry?: (industryName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ openQuoteModalWithIndustry }) => {
  return (
    <section className="py-14 bg-slate-50 text-slate-900 border-b border-slate-200/90" id="industries-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Target Market Sectors & Vertical Applications</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Industries We <span className="text-blue-700">Serve</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Providing tailored RF engineering models and high-resolution geospatial data across telecommunications, government, utilities, and transport sectors.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => (
            <div 
              key={ind.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-500 transition-all duration-300 space-y-4 flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 group-hover:bg-blue-100 transition-colors">
                    {iconMap[ind.iconName] || <Radio className="w-5 h-5 text-blue-600" />}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {ind.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {ind.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Primary GIS & RF Use Cases</div>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                    {ind.useCases.map((uc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    if (openQuoteModalWithIndustry) {
                      openQuoteModalWithIndustry(ind.title);
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>Request Sector Solutions Sheet</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
