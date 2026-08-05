import React, { useState } from 'react';
import { SOFTWARE_COMPATIBILITY } from '../data/telecomData';
import { 
  Cpu, 
  CheckCircle2, 
  FileCheck, 
  Layers, 
  Download, 
  Search 
} from 'lucide-react';

export const SoftwareCompatibility: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['all', 'RF Planning', 'GIS Engine', 'Microwave & Backhaul'];

  const filteredTools = SOFTWARE_COMPATIBILITY.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.formatsSupported.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-14 bg-slate-50 text-slate-900 border-b border-slate-200/90" id="software-compatibility-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3 shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Commercial Telecom & GIS Software Ecosystem</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Software <span className="text-blue-700">Compatibility Matrix</span>
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mt-1 font-medium">
              Our digital map products are formatted natively for seamless import into leading RF planning software and GIS platforms without file conversion loss.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {cat === 'all' ? 'All Software' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Software Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                    {tool.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Verified
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 font-extrabold font-mono text-[11px] text-blue-700 flex items-center justify-center shadow-inner shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                    {tool.logoText}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">{tool.name}</h3>
                    <p className="text-[11px] text-slate-500 leading-snug font-medium mt-0.5">{tool.description}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Supported Native File Formats</div>
                <div className="flex flex-wrap gap-1">
                  {tool.formatsSupported.map((fmt) => (
                    <span key={fmt} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-700 border border-slate-200 font-semibold">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
