import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Download, 
  Globe, 
  Layers, 
  Radio, 
  FileText,
  ChevronRight,
  ChevronLeft,
  Building2
} from 'lucide-react';
import { GLOBAL_REGIONS, MAP_PRODUCTS, SOFTWARE_COMPATIBILITY } from '../data/telecomData';

interface QuotePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
  prefilledCountry?: string;
}

export const QuotePortalModal: React.FC<QuotePortalModalProps> = ({ 
  isOpen, 
  onClose, 
  prefilledProduct, 
  prefilledCountry 
}) => {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form selections
  const [selectedMapProducts, setSelectedMapProducts] = useState<string[]>(
    prefilledProduct ? [prefilledProduct] : ['DTM (Digital Terrain Model)', 'Clutter Land Use Maps']
  );
  const [targetCountry, setTargetCountry] = useState<string>(prefilledCountry || 'United States');
  const [areaSqKm, setAreaSqKm] = useState<number>(1500);
  const [resolution, setResolution] = useState<string>('1 Meter (High Precision)');
  const [softwareFormat, setSoftwareFormat] = useState<string>('Forsk Atoll');
  const [deliveryTimeframe, setDeliveryTimeframe] = useState<string>('Standard (5–7 Days)');

  // Contact info
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const toggleProduct = (prodName: string) => {
    if (selectedMapProducts.includes(prodName)) {
      setSelectedMapProducts(selectedMapProducts.filter(p => p !== prodName));
    } else {
      setSelectedMapProducts([...selectedMapProducts, prodName]);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company,
        product: selectedMapProducts.join(', ') || 'General Inquiry',
        country: targetCountry,
        message: `Area: ${areaSqKm} sq km | Resolution: ${resolution} | Software: ${softwareFormat} | Timeframe: ${deliveryTimeframe} | Notes: ${notes}`,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setSubmitted(true);
    } else {
      alert('Failed to send quote request: ' + (result.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Network error. Please try again later.');
  }
};

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Modal Title & Step Bar */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Telecom GIS & RF Quote Configurator</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                Configure Custom RF & Map Quote
              </h2>

              {/* Progress Steps */}
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                <div className={`p-2 rounded-xl text-center border font-bold ${step === 1 ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>
                  1. Products & Region
                </div>
                <div className={`p-2 rounded-xl text-center border font-bold ${step === 2 ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>
                  2. Specs & Format
                </div>
                <div className={`p-2 rounded-xl text-center border font-bold ${step === 3 ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>
                  3. Contact & Submit
                </div>
              </div>
            </div>

            {/* Step 1: Products & Region */}
            {step === 1 && (
              <div className="space-y-4 text-xs animate-fadeIn">
                <div>
                  <label className="font-bold text-slate-200 block mb-2 font-mono uppercase text-[11px]">
                    Select GIS Data Products & Services Required:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'DTM (Digital Terrain Model)',
                      'Clutter Land Use Maps',
                      '3D Building Data (LOD1-3)',
                      'RF Coverage Prediction & Optimization',
                      'Aster & Aster mmWave Model Design',
                      '5G mmWave & C-Band Planning',
                      'Private LTE / CBRS Link Budget'
                    ].map((prod) => {
                      const isSel = selectedMapProducts.includes(prod);
                      return (
                        <button
                          type="button"
                          key={prod}
                          onClick={() => toggleProduct(prod)}
                          className={`p-2.5 rounded-xl text-left border flex items-center justify-between transition ${
                            isSel ? 'bg-cyan-950/80 text-cyan-200 border-cyan-600 font-bold' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="truncate pr-2">{prod}</span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSel ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-700'}`}>
                            {isSel && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="font-bold text-slate-200 block mb-1 font-mono uppercase text-[11px]">Target Country / Territory:</label>
                    <select
                      value={targetCountry}
                      onChange={(e) => setTargetCountry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Worldwide / Custom Region">🌍 Worldwide / Custom Location (Global Coverage)</option>
                      {GLOBAL_REGIONS.map(r => (
                        <option key={r.id} value={r.country}>{r.country} ({r.continent})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-200 block mb-1 font-mono uppercase text-[11px]">Project Area (Square Kilometers):</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={areaSqKm}
                        onChange={(e) => setAreaSqKm(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono font-bold"
                      />
                      <span className="text-slate-400 font-mono">sq km</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                  >
                    <span>Next: Specifications & Formats</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Specs & Format */}
            {step === 2 && (
              <div className="space-y-4 text-xs animate-fadeIn">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-200 block mb-1 font-mono uppercase text-[11px]">Required Spatial Resolution:</label>
                    <select
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option>1 Meter (High Precision)</option>
                      <option>2 Meter (Urban High-Res)</option>
                      <option>5 Meter (Standard Regional)</option>
                      <option>10 Meter (Country-wide)</option>
                      <option>30 Meter (Global Macro)</option>
                      <option>3D LOD2 / LOD3 Roof Models</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-200 block mb-1 font-mono uppercase text-[11px]">Target RF / GIS Software Format:</label>
                    <select
                      value={softwareFormat}
                      onChange={(e) => setSoftwareFormat(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      {SOFTWARE_COMPATIBILITY.map(s => (
                        <option key={s.id} value={s.name}>{s.name} ({s.formatsSupported.slice(0, 2).join(', ')})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-200 block mb-1 font-mono uppercase text-[11px]">Target Delivery Timeframe:</label>
                  <div className="grid grid-cols-3 gap-2 font-mono">
                    {['Urgent (24–48 Hrs)', 'Standard (5–7 Days)', 'Flexible / Subscription'].map((tf) => (
                      <button
                        type="button"
                        key={tf}
                        onClick={() => setDeliveryTimeframe(tf)}
                        className={`p-2.5 rounded-xl text-center border font-bold text-[11px] transition ${
                          deliveryTimeframe === tf ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pre-Summary Spec Sheet Box */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 font-mono">
                  <div className="text-[10px] text-cyan-400 uppercase font-bold">Configured Specification Summary</div>
                  <div className="text-slate-300">
                    Target: <b>{targetCountry}</b> ({areaSqKm} sq km) • Res: <b>{resolution}</b> • Format: <b>{softwareFormat}</b>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Products: {selectedMapProducts.join(', ')}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                  >
                    <span>Next: Contact Information</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Submit */}
            {step === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4 text-xs animate-fadeIn">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-200 font-mono text-[11px]">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-200 font-mono text-[11px]">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@operator.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-200 font-mono text-[11px]">Company / Organization Name</label>
                  <input
                    type="text"
                    placeholder="Telecom MNO / Vendor / System Integrator"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-200 font-mono text-[11px]">Additional Notes / Coordinate Bounding Box</label>
                  <textarea
                    rows={3}
                    placeholder="Provide latitude/longitude boundaries or specific clutter requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Submit & Request Quote Spec Sheet</span>
                  </button>
                </div>
              </form>
            )}

          </>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Quote Request Received!</h3>
            <p className="text-slate-300 text-xs max-w-md mx-auto">
              Your custom GIS & RF Planning quote configuration for <strong className="text-cyan-400">{targetCountry}</strong> has been logged. Our spatial data team will send the formal proposal to <strong className="text-cyan-400">{email}</strong> within 4 business hours.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left text-xs font-mono space-y-1">
              <div className="text-cyan-400 font-bold text-[10px] uppercase">Generated Request Summary</div>
              <div>Country: <b>{targetCountry}</b> ({areaSqKm} sq km)</div>
              <div>Products: <b>{selectedMapProducts.join(', ')}</b></div>
              <div>Resolution: <b>{resolution}</b></div>
              <div>Software Target: <b>{softwareFormat}</b></div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Done / Close Portal
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
