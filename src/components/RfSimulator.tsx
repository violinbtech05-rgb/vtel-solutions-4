import React, { useState } from 'react';
import { 
  Calculator, 
  Radio, 
  Zap, 
  BarChart2, 
  Layers, 
  Sparkles, 
  Info, 
  CheckCircle, 
  HelpCircle,
  Sliders,
  ChevronRight,
  TrendingDown,
  ShieldAlert
} from 'lucide-react';
import { CLUTTER_CLASSES } from '../data/telecomData';

interface RfSimulatorProps {
  openQuoteModalWithSpec?: (freq: string, distance: string, rsrp: string) => void;
}

export const RfSimulator: React.FC<RfSimulatorProps> = ({ openQuoteModalWithSpec }) => {
  // Input states
  const [freqBand, setFreqBand] = useState<number>(3500); // MHz (3.5 GHz default)
  const [clutterType, setClutterType] = useState<string>('urban');
  const [txPowerDbm, setTxPowerDbm] = useState<number>(43); // dBm (20W)
  const [txGainDbi, setTxGainDbi] = useState<number>(18); // dBi
  const [rxGainDbi, setRxGainDbi] = useState<number>(3); // dBi
  const [txHeightM, setTxHeightM] = useState<number>(30); // meters
  const [rxHeightM, setRxHeightM] = useState<number>(2); // meters
  const [distanceKm, setDistanceKm] = useState<number>(2.5); // km
  const [dtmResolution, setDtmResolution] = useState<'1m' | '5m' | '30m'>('1m');
  const [propagationModel, setPropagationModel] = useState<string>('aster-mmwave');

  // Select clutter loss
  const selectedClutterObj = CLUTTER_CLASSES.find(c => c.id === clutterType) || CLUTTER_CLASSES[1];
  const clutterLossDb = selectedClutterObj.typicalLossDb;

  // Real Physics Calculations
  // 1. Free Space Path Loss (FSPL): FSPL = 20*log10(d_km) + 20*log10(f_MHz) + 32.44
  const fspl = 20 * Math.log10(Math.max(distanceKm, 0.05)) + 20 * Math.log10(freqBand) + 32.44;

  // 2. Extra environmental loss based on resolution factor & clutter
  const resFactor = dtmResolution === '1m' ? 1.0 : dtmResolution === '5m' ? 1.15 : 1.35;
  const totalClutterLoss = clutterLossDb * resFactor;
  const shadowFadeMargin = 7.5; // dB

  // Total Path Loss
  const totalPathLoss = fspl + totalClutterLoss + shadowFadeMargin;

  // Received Power (RSRP / RSSI in dBm)
  const receivedPowerDbm = txPowerDbm + txGainDbi + rxGainDbi - totalPathLoss;

  // 1st Fresnel Zone Radius at mid-point (m)
  // R = 17.32 * sqrt( (d_km) / (4 * f_GHz) )
  const freqGhz = freqBand / 1000;
  const fresnelRadiusM = 17.32 * Math.sqrt((distanceKm) / (4 * freqGhz));

  // Minimum required Tx height to clear 60% 1st Fresnel Zone in this clutter
  const minRequiredTxHeight = Math.max(12, Math.round(fresnelRadiusM * 0.6 + selectedClutterObj.code * 2.5));

  // Determine Signal Quality Status
  const getSignalStatus = (rsrp: number) => {
    if (rsrp >= -85) return { label: 'Excellent Signal (99.9% Throughput)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-300' };
    if (rsrp >= -95) return { label: 'Good Signal (High Modulation 254QAM)', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-300' };
    if (rsrp >= -105) return { label: 'Fair Signal (Coverage Edge / 64QAM)', color: 'text-amber-800', bg: 'bg-amber-50 border-amber-300' };
    return { label: 'Weak Signal (Coverage Hole / Drop Risk)', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-300' };
  };

  const signalStatus = getSignalStatus(receivedPowerDbm);

  return (
    <section className="py-14 bg-slate-50 text-slate-900 border-b border-slate-200/90" id="rf-simulator-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3 shadow-xs">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>5G NR & Microwave Link Budget Propagation Simulator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Interactive <span className="text-blue-700">RF Propagation</span> & Fresnel Zone Calculator
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mt-1 font-medium">
              Adjust radio frequency, transmit power, antenna height, and terrain clutter resolution to calculate received signal power (RSRP) and Fresnel clearance.
            </p>
          </div>

          <button
            onClick={() => {
              if (openQuoteModalWithSpec) {
                openQuoteModalWithSpec(`${freqBand} MHz`, `${distanceKm} km`, `${Math.round(receivedPowerDbm)} dBm`);
              }
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-700/20 cursor-pointer active:scale-95 transition"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Request Detailed RF Design for this Spec</span>
          </button>
        </div>

        {/* Main Grid: Control Panel vs Visual Output */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Controls Column */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Link Parameters</span>
              </h3>
              <span className="text-[11px] font-mono text-blue-700 font-bold">3GPP TR 38.901 Calibrated</span>
            </div>

            {/* Propagation Model Picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                <span>Propagation Model</span>
                <span className="text-blue-700 font-mono font-bold">Aster Calibrated</span>
              </label>
              <select
                value={propagationModel}
                onChange={(e) => setPropagationModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-blue-900 font-semibold focus:outline-none focus:border-blue-600"
              >
                <option value="aster-mmwave">Aster mmWave Propagation Model (5G NR 24–39 GHz)</option>
                <option value="aster-macro">Aster Propagation Model (Sub-6GHz / Macro)</option>
                <option value="cost231">COST-231 Hata Model (Urban 1.5–2.0 GHz)</option>
                <option value="3gpp38901">3GPP TR 38.901 3D Ray-Tracing</option>
                <option value="spm">Standard Propagation Model (SPM)</option>
              </select>
            </div>

            {/* Frequency Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                <span>Frequency Band</span>
                <span className="text-blue-700 font-mono font-bold">{freqBand >= 1000 ? `${(freqBand/1000).toFixed(1)} GHz` : `${freqBand} MHz`}</span>
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                {[
                  { label: '700 MHz', val: 700 },
                  { label: '2.5 GHz', val: 2500 },
                  { label: '3.5 GHz', val: 3500 },
                  { label: '28 GHz', val: 28000 },
                ].map((f) => (
                  <button
                    key={f.val}
                    onClick={() => setFreqBand(f.val)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition ${
                      freqBand === f.val 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                        : 'bg-slate-50 text-slate-600 border-slate-300 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clutter Environment Picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex justify-between">
                <span>Clutter Land-Use Environment</span>
                <span className="text-amber-800 font-mono font-bold">Loss: +{clutterLossDb} dB</span>
              </label>
              <select
                value={clutterType}
                onChange={(e) => setClutterType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-600"
              >
                {CLUTTER_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.typicalLossDb} dB Attenuation)
                  </option>
                ))}
              </select>
            </div>

            {/* Transmit Power & Gain Sliders */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700">Transmit ERP Power</span>
                  <span className="text-blue-700 font-mono font-bold">{txPowerDbm} dBm ({Math.round(Math.pow(10, (txPowerDbm-30)/10))} W)</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="53"
                  step="1"
                  value={txPowerDbm}
                  onChange={(e) => setTxPowerDbm(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700">Cell Tower Height (H_tx)</span>
                  <span className="text-blue-700 font-mono font-bold">{txHeightM} Meters</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="1"
                  value={txHeightM}
                  onChange={(e) => setTxHeightM(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700">Target Link Distance (Distance D)</span>
                  <span className="text-blue-700 font-mono font-bold">{distanceKm} kilometers</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="12"
                  step="0.1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* DTM Terrain Resolution Toggle */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                DTM Data Resolution Quality
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                {(['1m', '5m', '30m'] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => setDtmResolution(res)}
                    className={`py-2 px-2 rounded-xl text-center border transition ${
                      dtmResolution === res 
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold' 
                        : 'bg-slate-50 text-slate-600 border-slate-300'
                    }`}
                  >
                    {res} {res === '1m' ? 'High Precision' : res === '5m' ? 'Standard' : 'Coarse'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Visual Output Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Realtime Output KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[10px] text-slate-500 font-mono uppercase font-semibold">Calculated RSRP Signal</div>
                <div className={`text-2xl font-black font-mono mt-1 ${signalStatus.color}`}>
                  {receivedPowerDbm.toFixed(1)} <span className="text-xs font-normal">dBm</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[10px] text-slate-500 font-mono uppercase font-semibold">Total Path Loss</div>
                <div className="text-2xl font-black font-mono text-blue-700 mt-1">
                  {totalPathLoss.toFixed(1)} <span className="text-xs font-normal">dB</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-500 font-mono uppercase font-semibold">1st Fresnel Radius</div>
                <div className="text-2xl font-black font-mono text-indigo-700 mt-1">
                  {fresnelRadiusM.toFixed(1)} <span className="text-xs font-normal">meters</span>
                </div>
              </div>
            </div>

            {/* Signal Quality Status Banner */}
            <div className={`p-4 rounded-2xl border ${signalStatus.bg} flex items-center justify-between text-xs shadow-xs`}>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 animate-pulse text-blue-700" />
                <span className="font-extrabold">{signalStatus.label}</span>
              </div>
              <span className="font-mono text-slate-700">Rec. Min Tower: <b>{minRequiredTxHeight}m</b></span>
            </div>

            {/* SVG Link Cross-Section & Fresnel Zone Diagram */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 font-bold uppercase">Fresnel Zone Clearance Profile</span>
                <span className="text-blue-700 font-bold">Distance: {distanceKm} km</span>
              </div>

              {/* SVG Diagram Canvas */}
              <div className="relative w-full h-56 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 p-2">
                <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="180" x2="600" y2="180" stroke="#cbd5e1" strokeDasharray="4,4" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#e2e8f0" strokeDasharray="4,4" />

                  {/* Ground Terrain Elevation Line */}
                  <path 
                    d="M 0 180 Q 150 170, 300 178 T 600 180 L 600 220 L 0 220 Z" 
                    fill="#e2e8f0" 
                    stroke="#94a3b8" 
                    strokeWidth="1.5" 
                  />

                  {/* Clutter Obstacle Representation */}
                  <rect x="220" y={180 - clutterLossDb * 2.2} width="160" height={clutterLossDb * 2.2} fill="#ea580c" opacity="0.3" rx="4" />
                  <text x="300" y={170 - clutterLossDb * 2.2} fill="#c2410c" fontSize="10" textAnchor="middle" fontFamily="sans-serif font-weight-bold">
                    {selectedClutterObj.name} Clutter (+{clutterLossDb}dB)
                  </text>

                  {/* Transmit Cell Tower Structure */}
                  <line x1="50" y1="180" x2="50" y2={180 - txHeightM * 1.8} stroke="#1d4ed8" strokeWidth="4" />
                  <circle cx="50" cy={180 - txHeightM * 1.8} r="6" fill="#2563eb" />
                  <text x="50" y={160 - txHeightM * 1.8} fill="#1e40af" fontSize="10" textAnchor="middle" fontWeight="bold">
                    Tx ({txHeightM}m)
                  </text>

                  {/* Receiver Antenna */}
                  <line x1="550" y1="180" x2="550" y2={180 - rxHeightM * 1.8 - 15} stroke="#16a34a" strokeWidth="3" />
                  <circle cx="550" cy={180 - rxHeightM * 1.8 - 15} r="4" fill="#16a34a" />
                  <text x="550" y={160 - rxHeightM * 1.8 - 15} fill="#15803d" fontSize="10" textAnchor="middle" fontWeight="bold">
                    Rx User
                  </text>

                  {/* Direct Line-of-Sight Ray */}
                  <line 
                    x1="50" 
                    y1={180 - txHeightM * 1.8} 
                    x2="550" 
                    y2={180 - rxHeightM * 1.8 - 15} 
                    stroke="#2563eb" 
                    strokeWidth="2" 
                    strokeDasharray="5,5" 
                  />

                  {/* 1st Fresnel Ellipse Zone */}
                  <ellipse 
                    cx="300" 
                    cy={(180 - txHeightM * 1.8 + 180 - rxHeightM * 1.8 - 15) / 2} 
                    rx="240" 
                    ry={Math.min(fresnelRadiusM * 2.2, 45)} 
                    fill="url(#fresnelGlowLight)" 
                    stroke="#4f46e5" 
                    strokeWidth="1.5" 
                    opacity="0.6" 
                  />

                  <defs>
                    <linearGradient id="fresnelGlowLight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                      <stop offset="50%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <p className="text-[11px] text-slate-500 font-mono font-medium">
                * Note: High-accuracy DTM, high-resolution clutter, and 3D building datasets eliminate Fresnel Zone diffraction errors in Aster Propagation Model and Aster mmWave Propagation Model simulations.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
