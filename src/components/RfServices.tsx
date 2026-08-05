import React, { useState } from 'react';
import { RF_SERVICES } from '../data/telecomData';
import { 
  Radio, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  BarChart2, 
  Wifi, 
  Layers, 
  Activity, 
  Zap, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface RfServicesProps {
  openQuoteModalWithService?: (serviceName: string) => void;
}

export const RfServices: React.FC<RfServicesProps> = ({ openQuoteModalWithService }) => {
  const [selectedTech, setSelectedTech] = useState<string>('all');

  const allTechs = ['all', '5G NR', '4G LTE', 'CBRS', 'Private LTE', 'FWA', 'Microwave'];

  const filteredServices = selectedTech === 'all' 
    ? RF_SERVICES 
    : RF_SERVICES.filter(s => s.technologies.some(t => t.toLowerCase().includes(selectedTech.toLowerCase())));

  return (
    <section className="py-14 bg-slate-50 text-slate-900 border-b border-slate-200/90" id="rf-services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3 shadow-xs">
              <Radio className="w-3.5 h-3.5 text-blue-600" />
              <span>End-to-End Radio Network Engineering Services</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              RF Planning & <span className="text-blue-700">Optimization</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-1 font-medium">
              Comprehensive RF engineering solutions covering 2G, 3G, 4G LTE, 5G NR, CBRS, Private LTE, and FWA outdoor network design.
            </p>
          </div>

          {/* Technology Filter Pills */}
          <div className="flex flex-wrap gap-1.5 max-w-md">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                  selectedTech === tech
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {tech === 'all' ? 'All Technologies' : tech}
              </button>
            ))}
          </div>
        </div>

        {/* Telecom Towers & RF Engineering Banner Showcase */}
        <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md grid lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative min-h-[260px] lg:min-h-[320px] overflow-hidden group">
            <img 
              src="/images/telecom_tower_5g.jpg" 
              alt="5G Macro Telecom Cell Tower Infrastructure" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6 text-white">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-blue-600 text-[11px] font-mono font-bold uppercase tracking-wider">
                  Macro & Outdoor Micro Cells
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  High-Precision 3D Tower Antenna Modeling
                </h3>
                <p className="text-xs text-slate-200 max-w-xl">
                  Calibrated electrical tilt, azimuth beamforming patterns, and 3D ray-tracing propagation for 5G NR macro sites and outdoor micro-cell nodes.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 bg-gradient-to-br from-slate-50 to-blue-50/50 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-blue-700 tracking-wider mb-2">
                Cellular Tower Engineering
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Macro Sites, Monopoles & Rooftop Antennas
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                We model high-density macro towers, monopole arrays, and outdoor street-pole antennas with sub-meter clutter clearance checks and 3D Fresnel diffraction modeling.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-200/90 text-xs">
              <div className="flex items-center justify-between text-slate-700 font-semibold">
                <span>Macro Cell Towers (30m - 90m)</span>
                <span className="font-mono text-blue-700 font-bold">2G / 3G / 4G / 5G</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 font-semibold">
                <span>Dense Urban Micro-Cells & Rooftops</span>
                <span className="font-mono text-blue-700 font-bold">CBRS & mmWave</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 font-semibold">
                <span>3D Antenna Pattern Calibration</span>
                <span className="font-mono text-blue-700 font-bold">3D Ray-Tracing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies Supported Quick Banner */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-mono">
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 font-bold text-slate-800">2G GSM</div>
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 font-bold text-slate-800">3G UMTS</div>
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 font-bold text-slate-800">4G LTE</div>
          <div className="p-2 rounded-xl bg-blue-100 border border-blue-300 font-extrabold text-blue-800">5G NR</div>
          <div className="p-2 rounded-xl bg-amber-100 border border-amber-300 font-extrabold text-amber-900">CBRS Band</div>
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 font-bold text-slate-800">Private LTE</div>
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 font-bold text-slate-800">FWA Broadband</div>
          <div className="p-2 rounded-xl bg-indigo-100 border border-indigo-300 font-bold text-indigo-900">Microwave Link</div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 px-2.5 py-1 rounded bg-blue-50 border border-blue-200">
                    {service.category}
                  </span>
                  <Activity className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>

                {service.imageUrl && (
                  <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 shadow-xs my-2 group-hover:shadow-sm transition-all">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[10px] font-mono font-bold text-white bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20">
                        Geo-Spatial RF Model Preview
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {service.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {service.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-mono font-semibold text-slate-700 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Deliverables List */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Key Service Deliverables</div>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                    {service.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    if (openQuoteModalWithService) {
                      openQuoteModalWithService(service.title);
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>Request Proposal for {service.title.split('&')[0]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
