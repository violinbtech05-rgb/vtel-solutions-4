import React from 'react';
import { CASE_STUDIES } from '../data/telecomData';
import { 
  FileText, 
  MapPin, 
  Radio, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2 
} from 'lucide-react';

interface CaseStudiesSectionProps {
  openQuoteModal: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ openQuoteModal }) => {
  return (
    <section className="py-14 bg-slate-50 text-slate-900 border-b border-slate-200/90" id="portfolio-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Proven Engineering Impact</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Case Studies & <span className="text-blue-700">Project Highlights</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Explore how VTel Solutions helped global mobile operators, WISPs, and power utilities optimize wireless network design and deployment.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div 
              key={cs.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-500 transition-all duration-300 space-y-6 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-blue-700 font-bold px-2.5 py-1 rounded bg-blue-50 border border-blue-200">
                    {cs.clientType}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{cs.region}</span>
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {cs.title}
                </h3>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-blue-900 font-mono font-bold flex items-center gap-2">
                  <Radio className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{cs.technology}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 uppercase font-mono text-[10px]">Challenge:</span>
                    <p className="text-slate-600 leading-relaxed mt-0.5 font-medium">{cs.challenge}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 uppercase font-mono text-[10px]">Solution:</span>
                    <p className="text-slate-700 leading-relaxed mt-0.5 font-medium">{cs.solution}</p>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                  {cs.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-sm font-black text-blue-700 font-mono">{m.value}</div>
                      <div className="text-[9px] text-slate-500 font-medium leading-snug mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

              </div>

              <button
                onClick={openQuoteModal}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>Request Similar Case Study Specs</span>
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
