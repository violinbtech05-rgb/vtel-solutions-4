import React, { useState } from 'react';
import { 
  MAP_PRODUCTS, 
  MAP_RESOLUTION_MATRIX, 
  CLUTTER_CLASSES 
} from '../data/telecomData';
import { 
  Layers, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  FileText, 
  Table, 
  Box, 
  Image, 
  Building2, 
  Trees, 
  Radio, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface DigitalMapProductsProps {
  openQuoteModalWithProduct?: (productName: string) => void;
}

export const DigitalMapProducts: React.FC<DigitalMapProductsProps> = ({ openQuoteModalWithProduct }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('dtm');
  const [activeImageModal, setActiveImageModal] = useState<{ title: string; subtitle: string; imageSrc: string; specs: string[] } | null>(null);

  const activeProduct = MAP_PRODUCTS.find(p => p.id === selectedProductId) || MAP_PRODUCTS[0];

  const sampleMapGallery = [
    {
      id: 'clutter-sample',
      title: 'Wide-Area Land Use Clutter Map',
      subtitle: 'High-precision wide-area land cover classification with building footprints & classification zones for 5G RF engineering',
      imageSrc: '/images/clutter_map_sample.jpg',
      badge: 'Wide-Area Clutter LULC',
      specs: [
        'Coverage: Wide-area urban, suburban, & regional terrain classification',
        'Resolution: 1m, 2m, 5m spatial resolution dataset',
        'Format: Planet, Atoll, GeoTIFF, MapInfo Tab',
        'Classes: Dense High-Rise Urban, Commercial, Residential, Dense Forest, Water Bodies, Airports, Highways'
      ]
    },
    {
      id: '3d-building-sample',
      title: '3D Real Buildings & RSRP Coverage Plot',
      subtitle: 'Wide-area real building heights with 5G RSRP signal strength heatmap plot overlay & ray tracing simulation',
      imageSrc: '/images/building_lod_3d.jpg',
      badge: '3D Buildings & RSRP Plot',
      specs: [
        'Coverage Plot: 5G NR RSRP Signal Power Heatmap (dBm) across streets & rooftops',
        'Building Detail: Real 3D building heights, roof pitch, eaves & structures (LOD2 / LOD3)',
        'Accuracy: Vertical accuracy ±0.5 meter for mmWave & C-band small cells',
        'Format: CityGML, Shapefile, DXF, Planet 3D, Atoll / Planet coverage grids'
      ]
    },
    {
      id: 'dtm-sample',
      title: 'DTM Elevation Topography',
      subtitle: 'Bare-Earth DTM elevation data for macro-cell coverage & microwave link line-of-sight planning',
      imageSrc: '/images/terrain_elevation_dtm.jpg',
      badge: '1m – 30m DTM Elevation',
      specs: [
        'Elevation Accuracy: ±0.3m to ±1.0m bare-earth topographic grid',
        'Format: ArcGRID, GeoTIFF, ASCII Grid, Atoll Elevation',
        'Ideal For: Microwave Link Line-of-Sight & Aster Model calibration'
      ]
    }
  ];

  return (
    <section className="py-12 bg-slate-100 text-slate-800 border-b border-slate-200" id="digital-maps-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-900 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-cyan-700" />
            <span>High-Accuracy Telecom GIS Data Products</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Digital Map Products & <span className="text-cyan-600">Sample Datasets</span>
          </h2>
          <p className="text-slate-600 text-base font-medium">
            VTel Solutions supplies telecom-ready 2D and 3D geospatial datasets engineered specifically for high-frequency RF propagation and line-of-sight modeling.
          </p>
        </div>

        {/* SAMPLE CLUTTER MAPS & DATASETS GALLERY SHOWCASE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Image className="w-5 h-5 text-cyan-600" />
              <span>Sample GIS Clutter Maps & 3D Building Datasets</span>
            </h3>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-100 text-cyan-800 font-bold border border-cyan-200">
              Click Image to Enlarge
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {sampleMapGallery.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveImageModal(item)}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden h-64 sm:h-72 bg-slate-100">
                    <img 
                      src={item.imageSrc} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.opacity = '0.3';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded-md border border-slate-700 font-bold">
                      {item.badge}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-bold text-slate-900 text-base group-hover:text-cyan-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs text-cyan-700 font-bold">
                  <span>View High-Res Sample</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Navigation Cards Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 pt-4">
          {MAP_PRODUCTS.map((prod) => {
            const isActive = selectedProductId === prod.id;
            return (
              <button
                key={prod.id}
                onClick={() => setSelectedProductId(prod.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive 
                    ? 'bg-cyan-50 border-cyan-500 shadow-md text-slate-900' 
                    : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-extrabold text-cyan-700 uppercase tracking-wider mb-1">
                    {prod.shortName}
                  </div>
                  <div className="font-bold text-sm leading-snug">{prod.name.split('(')[0]}</div>
                </div>
                <div className="mt-3 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>{prod.resolutions[0]}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-cyan-600' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Product Detail Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-8 shadow-sm">
          
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Overview Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                  {activeProduct.shortName} Spec Sheet
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {activeProduct.name}
                </h3>
                <p className="text-cyan-700 font-bold text-sm mt-1">{activeProduct.tagline}</p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">{activeProduct.description}</p>
              </div>

              {/* Available Resolutions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">Available Spatial Resolutions</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.resolutions.map((res) => (
                    <span key={res} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-cyan-800 font-bold">
                      {res}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compatible Formats */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">Supported GIS & Telecom Formats</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.formats.map((fmt) => (
                    <span key={fmt} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-semibold">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Applications */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">Target Telecom Applications</h4>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {activeProduct.applications.map((app) => (
                    <div key={app} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => {
                    if (openQuoteModalWithProduct) {
                      openQuoteModalWithProduct(activeProduct.name);
                    }
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-600/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Request Quote for {activeProduct.shortName}</span>
                </button>
              </div>

            </div>

            {/* Right Interactive Visual Card / Clutter Guide */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Box className="w-4 h-4 text-cyan-600" />
                  <span>Layer Specification Profile</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">Verified Precision</span>
              </div>

              {activeProduct.id === 'clutter' ? (
                <div className="space-y-3">
                  <div className="text-xs text-slate-800 font-semibold flex items-center justify-between">
                    <span>Supported Clutter Classes</span>
                    <span className="text-cyan-700 text-[10px] font-mono font-bold">Signal Attenuation dB</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                    {CLUTTER_CLASSES.map((clutter) => (
                      <div key={clutter.id} className="p-2 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: clutter.color }} />
                          <span className="font-bold text-slate-800">{clutter.name}</span>
                        </div>
                        <span className="font-mono text-amber-700 text-[11px] font-bold">
                          +{clutter.typicalLossDb} dB
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeProduct.id === '3d-buildings' ? (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                    <div className="font-bold text-indigo-700 flex items-center justify-between">
                      <span>LOD1 Mass Models</span>
                      <span className="font-mono text-[10px] text-slate-500">Coarse Block</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">Flat rooftop building footprints with extruded height values.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 space-y-1">
                    <div className="font-bold text-cyan-900 flex items-center justify-between">
                      <span>LOD2 Detailed Roof Structures</span>
                      <span className="font-mono text-[10px] text-cyan-800 font-extrabold">Recommended for 5G</span>
                    </div>
                    <p className="text-slate-700 text-[11px]">Gable, hip, and complex roof pitch models with sub-meter vertical accuracy.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                    <div className="font-bold text-purple-700 flex items-center justify-between">
                      <span>LOD3 Architectural Models</span>
                      <span className="font-mono text-[10px] text-slate-500">Digital Twins</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">Detailed facade structures, balconies, and urban millimeter wave simulations.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-xs">
                    <div className="text-xs font-bold text-cyan-700 uppercase font-mono">Elevation Accuracy Tiers</div>
                    <ul className="space-y-1.5 text-slate-700 text-[11px]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>High Res Tiers (1–2m): Vertical Accuracy ±0.3m</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Medium Res Tiers (5–10m): Vertical Accuracy ±1.0m</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Low Res Tiers (20–30m): Vertical Accuracy ±3.0m</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-xs font-bold text-amber-700 uppercase font-mono">Datum & Projections</div>
                    <p className="text-slate-600 text-[11px] mt-1">
                      Supported datum: WGS84, NAD83, ETRS89, UTM Zones, and state plane projections.
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Resolution Matrix Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Table className="w-5 h-5 text-cyan-600" />
                <span>Map Resolutions Comparison Matrix</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Standard spatial resolutions across High, Medium, and Low product tiers
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 font-bold border border-cyan-200">
              Telecom GIS Standards
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Product</th>
                  <th className="py-3.5 px-4 font-bold text-cyan-700">High Resolution</th>
                  <th className="py-3.5 px-4 font-bold text-blue-700">Medium Resolution</th>
                  <th className="py-3.5 px-4 font-bold text-indigo-700">Low Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MAP_RESOLUTION_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="py-4 px-4 font-bold text-slate-900">{row.product}</td>
                    <td className="py-4 px-4 font-mono font-semibold text-cyan-800 bg-cyan-50/50">{row.high}</td>
                    <td className="py-4 px-4 font-mono text-slate-700">{row.medium}</td>
                    <td className="py-4 px-4 font-mono text-slate-600">{row.low}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* SAMPLE IMAGE LIGHTBOX MODAL */}
      {activeImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden border border-slate-200 shadow-2xl my-auto space-y-0">
            <div className="relative h-[480px] sm:h-[580px] bg-slate-950">
              <img 
                src={activeImageModal.imageSrc} 
                alt={activeImageModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-2"
              />
              <button 
                onClick={() => setActiveImageModal(null)}
                className="absolute top-4 right-4 bg-slate-900/90 hover:bg-slate-900 text-white px-3 py-1.5 rounded-full font-bold text-xs border border-slate-700 shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>✕</span> Close High-Res View
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{activeImageModal.title}</h3>
                <p className="text-xs text-slate-600">{activeImageModal.subtitle}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-700">Dataset Specifications & Specs:</h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  {activeImageModal.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setActiveImageModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    const title = activeImageModal.title;
                    setActiveImageModal(null);
                    if (openQuoteModalWithProduct) {
                      openQuoteModalWithProduct(title);
                    }
                  }}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Request Quote for this Dataset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
