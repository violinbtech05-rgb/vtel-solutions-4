import React, { useState, useEffect, useRef } from 'react';
import { 
  GLOBAL_REGIONS, 
  CLUTTER_CLASSES, 
  MAP_PRODUCTS 
} from '../data/telecomData';
import { 
  RegionCoverageInfo 
} from '../types/telecom';
import { 
  Layers, 
  MapPin, 
  Globe, 
  Radio, 
  Download, 
  Sparkles, 
  Search, 
  Check, 
  Info, 
  FileCheck,
  Signal,
  Wifi,
  Zap,
  Activity,
  Gauge,
  BarChart2,
  Server,
  ChevronRight
} from 'lucide-react';
import L from 'leaflet';

interface InteractiveMapExplorerProps {
  onSelectCountryForQuote: (countryName: string) => void;
}

export const InteractiveMapExplorer: React.FC<InteractiveMapExplorerProps> = ({ onSelectCountryForQuote }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const [selectedRegion, setSelectedRegion] = useState<RegionCoverageInfo>(GLOBAL_REGIONS[0]);
  const [hoveredRegion, setHoveredRegion] = useState<RegionCoverageInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Layer Toggles
  const [showCellTowers, setShowCellTowers] = useState(true);
  const [showClutterLegend, setShowClutterLegend] = useState(true);
  const [showAllRegionPins, setShowAllRegionPins] = useState(true);
  const [showRfIntensityLegend, setShowRfIntensityLegend] = useState(true);

  const filteredRegions = GLOBAL_REGIONS.filter(r => 
    r.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.continent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.countryCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.featuredProject && r.featuredProject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Active region displayed on HUD (hovered region or selected region)
  const activeRegion = hoveredRegion || selectedRegion;

  // Helper to build custom HTML for map tooltips
  const buildRfStatsTooltipHtml = (region: RegionCoverageInfo, isSelected: boolean) => {
    const rsrpColor = region.avgRsrpDbM >= -80 ? '#16a34a' : region.avgRsrpDbM >= -88 ? '#d97706' : '#dc2626';

    return `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; padding: 6px; min-width: 250px; color: #0f172a; pointer-events: none;">
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-family: monospace; font-weight: 800; font-size: 10px; background: ${isSelected ? '#0284c7' : '#334155'}; color: #ffffff; padding: 2px 6px; border-radius: 4px;">
              ${region.countryCode}
            </span>
            <span style="font-weight: 800; font-size: 13px; color: #0f172a;">${region.country}</span>
          </div>
          <span style="font-size: 10px; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 12px; border: 1px solid #cbd5e1;">
            ${region.continent}
          </span>
        </div>

        <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #0284c7; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
          <span style="display: inline-block; width: 6px; height: 6px; background: #0284c7; border-radius: 50%;"></span>
          Summarized RF Coverage Stats
        </div>

        <!-- Coverage Bars -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px; border-radius: 8px;">
            <div style="font-size: 9px; color: #64748b; font-weight: 700;">5G NR Coverage</div>
            <div style="font-size: 13px; font-weight: 900; color: #0284c7; font-family: monospace;">${region.coverage5gPct}%</div>
            <div style="height: 4px; background: #e2e8f0; border-radius: 2px; margin-top: 3px; overflow: hidden;">
              <div style="width: ${region.coverage5gPct}%; height: 100%; background: #0284c7; border-radius: 2px;"></div>
            </div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px; border-radius: 8px;">
            <div style="font-size: 9px; color: #64748b; font-weight: 700;">4G LTE Coverage</div>
            <div style="font-size: 13px; font-weight: 900; color: #16a34a; font-family: monospace;">${region.coverage4gPct}%</div>
            <div style="height: 4px; background: #e2e8f0; border-radius: 2px; margin-top: 3px; overflow: hidden;">
              <div style="width: ${region.coverage4gPct}%; height: 100%; background: #16a34a; border-radius: 2px;"></div>
            </div>
          </div>
        </div>

        <!-- Signal & Speed -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px; border-radius: 8px;">
            <div style="font-size: 9px; color: #64748b; font-weight: 700;">Avg RSRP Signal</div>
            <div style="font-size: 12px; font-weight: 800; color: ${rsrpColor}; font-family: monospace;">${region.avgRsrpDbM} dBm</div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px; border-radius: 8px;">
            <div style="font-size: 9px; color: #64748b; font-weight: 700;">Avg Download</div>
            <div style="font-size: 12px; font-weight: 800; color: #0f172a; font-family: monospace;">${region.avgDownloadMbps} Mbps</div>
          </div>
        </div>

        <!-- Mapped Sites & GIS DTM -->
        <div style="background: #f1f5f9; border: 1px solid #e2e8f0; padding: 6px; border-radius: 8px; font-size: 10px; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
            <span style="color: #64748b;">Cell Nodes Mapped:</span>
            <b style="color: #0f172a; font-family: monospace;">${region.cellSitesCount.toLocaleString()}</b>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">GIS DTM Resolution:</span>
            <b style="color: #0284c7; font-family: monospace;">${region.dtmMaxRes}</b>
          </div>
        </div>

        <!-- Dominant Band -->
        <div style="font-size: 9px; background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 6px; font-weight: 700; border: 1px solid #bae6fd;">
          Spectrum: <b>${region.dominantTech}</b>
        </div>
      </div>
    `;
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if ((mapContainerRef.current as any)._leaflet_id) {
      (mapContainerRef.current as any)._leaflet_id = null;
    }

    if (!leafletMapRef.current) {
      const initialLat = (selectedRegion && Number.isFinite(selectedRegion.lat)) ? selectedRegion.lat : 37.0902;
      const initialLng = (selectedRegion && Number.isFinite(selectedRegion.lng)) ? selectedRegion.lng : -95.7129;

      try {
        const map = L.map(mapContainerRef.current, {
          center: [initialLat, initialLng],
          zoom: 5,
          zoomControl: false,
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Add base tile layer
        const darkTileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
        L.tileLayer(darkTileUrl, {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }).addTo(map);

        // Layer group for markers
        const markersGroup = L.layerGroup().addTo(map);
        markersGroupRef.current = markersGroup;

        leafletMapRef.current = map;
      } catch (err) {
        console.warn('Leaflet map initialization warning:', err);
      }
    }

    return () => {
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.stop();
          leafletMapRef.current.remove();
        } catch (e) {
          // Ignore cleanup errors on unmount
        }
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Update map tiles, markers, and tooltips when selectedRegion or layer toggles change
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    const targetLat = (selectedRegion && Number.isFinite(selectedRegion.lat)) ? selectedRegion.lat : 37.0902;
    const targetLng = (selectedRegion && Number.isFinite(selectedRegion.lng)) ? selectedRegion.lng : -95.7129;

    try {
      map.stop();
      map.flyTo([targetLat, targetLng], 6, {
        duration: 1.2
      });
    } catch (e) {
      try {
        map.setView([targetLat, targetLng], 6);
      } catch (err) {
        // Ignore view transition fallback error
      }
    }

    // Clear old markers
    if (markersGroupRef.current) {
      try {
        markersGroupRef.current.clearLayers();
      } catch (e) {
        // Ignore clear layers error
      }

      // 1. Render Region Pins for ALL global regions with dynamic RF tooltips
      if (showAllRegionPins) {
        GLOBAL_REGIONS.forEach((reg) => {
          if (!Number.isFinite(reg.lat) || !Number.isFinite(reg.lng)) return;

          const isSelected = reg.id === selectedRegion.id;
          const markerSize = isSelected ? 38 : 28;

          const regionPinHtml = `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: ${markerSize}px; height: ${markerSize}px; background: ${isSelected ? '#0284c7' : '#0f172a'}; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 4px 14px rgba(2, 132, 199, ${isSelected ? '0.7' : '0.3'}); cursor: pointer; transition: all 0.2s;">
              <span style="font-family: monospace; font-weight: 800; font-size: ${isSelected ? '11px' : '9px'}; color: #ffffff; text-align: center;">
                ${reg.countryCode}
              </span>
              ${isSelected ? '<span style="position: absolute; inset: -4px; border: 2px solid #0284c7; border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.75;"></span>' : ''}
            </div>
          `;

          const regionIcon = L.divIcon({
            html: regionPinHtml,
            className: `custom-region-pin-${reg.id}`,
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize / 2],
          });

          const regionMarker = L.marker([reg.lat, reg.lng], { icon: regionIcon });

          // Dynamic tooltip displaying summarized RF coverage stats
          const tooltipContent = buildRfStatsTooltipHtml(reg, isSelected);
          regionMarker.bindTooltip(tooltipContent, {
            direction: 'top',
            offset: [0, -10],
            opacity: 1,
            className: 'custom-leaflet-rf-tooltip'
          });

          regionMarker.on('click', () => {
            setSelectedRegion(reg);
          });

          regionMarker.on('mouseover', () => {
            setHoveredRegion(reg);
          });

          regionMarker.on('mouseout', () => {
            setHoveredRegion(null);
          });

          markersGroupRef.current?.addLayer(regionMarker);
        });
      }

      // 2. Add regional cell tower & RF coverage nodes for selectedRegion
      if (showCellTowers && selectedRegion) {
        const points = [
          { name: `${selectedRegion.country} Primary RF Node #1`, latOffset: 0, lngOffset: 0, tech: selectedRegion.dominantTech, rsrp: selectedRegion.avgRsrpDbM, speed: selectedRegion.avgDownloadMbps },
          { name: `${selectedRegion.country} Macro Tower #2`, latOffset: 0.15, lngOffset: -0.2, tech: '4G LTE + CBRS', rsrp: selectedRegion.avgRsrpDbM - 4, speed: Math.round(selectedRegion.avgDownloadMbps * 0.7) },
          { name: `${selectedRegion.country} Micro Cell #3`, latOffset: -0.12, lngOffset: 0.18, tech: '5G mmWave 28GHz', rsrp: selectedRegion.avgRsrpDbM + 6, speed: Math.round(selectedRegion.avgDownloadMbps * 1.4) },
          { name: `${selectedRegion.country} Microwave Link #4`, latOffset: 0.22, lngOffset: 0.25, tech: '18GHz High-Cap Backhaul', rsrp: selectedRegion.avgRsrpDbM - 2, speed: 1000 },
        ];

        points.forEach((pt, i) => {
          const lat = targetLat + pt.latOffset;
          const lng = targetLng + pt.lngOffset;

          if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

          try {
            // Custom SVG cell icon marker
            const customHtml = `
              <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: #0284c7; border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 2px 10px rgba(2, 132, 199, 0.5); cursor: pointer;">
                <span style="width: 8px; height: 8px; background: #ffffff; border-radius: 50%; display: block;"></span>
              </div>
            `;

            const customIcon = L.divIcon({
              html: customHtml,
              className: 'custom-tower-marker',
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            });

            const marker = L.marker([lat, lng], { icon: customIcon });

            const popupContent = `
              <div style="font-family: ui-sans-serif, system-ui, sans-serif; color: #0f172a; padding: 2px;">
                <div style="font-weight: 800; font-size: 13px; margin-bottom: 4px; color: #0284c7;">${pt.name}</div>
                <div style="font-size: 11px; color: #475569; margin-bottom: 8px;">Technology: <b style="color: #16a34a;">${pt.tech}</b></div>
                <div style="font-size: 11px; background: #f8fafc; padding: 6px; border-radius: 6px; margin-bottom: 8px; border: 1px solid #e2e8f0;">
                  <div>Measured RSRP: <b>${pt.rsrp} dBm</b></div>
                  <div>Throughput Cap: <b>${pt.speed} Mbps</b></div>
                  <div>DTM Precision: <b>${selectedRegion.dtmMaxRes}</b></div>
                  <div>3D Buildings: <b>${selectedRegion.buildings3DLod}</b></div>
                </div>
              </div>
            `;

            marker.bindPopup(popupContent);

            // Dynamic tooltip on hover over individual cell tower node
            marker.bindTooltip(`<b>${pt.name}</b><br/>${pt.tech} | ${pt.rsrp} dBm`, {
              direction: 'top',
              offset: [0, -8]
            });

            markersGroupRef.current?.addLayer(marker);

            // Add coverage heat ring around node
            const circle = L.circle([lat, lng], {
              color: i === 2 ? '#6366f1' : '#0284c7',
              fillColor: i === 2 ? '#818cf8' : '#38bdf8',
              fillOpacity: 0.15,
              radius: i === 2 ? 8000 : 18000
            });
            markersGroupRef.current?.addLayer(circle);
          } catch (err) {
            console.warn('Error adding marker/circle layer:', err);
          }
        });
      }
    }
  }, [selectedRegion, showCellTowers, showAllRegionPins]);

  return (
    <section className="py-12 bg-slate-50 text-slate-800 border-b border-slate-200" id="global-map-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-900 text-xs font-bold mb-3">
              <Globe className="w-3.5 h-3.5 text-cyan-700" />
              <span>Interactive GIS Coverage Map Explorer</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Worldwide <span className="text-cyan-600">GIS Dataset</span> & RF Coverage
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mt-1 font-medium">
              Hover over any country on the map or select from the list to view live, dynamic <strong>RF Coverage Statistics tooltips</strong> including 5G/4G coverage %, signal strength (RSRP), and GIS map details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectCountryForQuote(selectedRegion.country)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Request Data for {selectedRegion.country}</span>
            </button>
          </div>
        </div>

        {/* Map Explorer Interface Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Left Column: Region Selector & Product Inspector */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Region Search Dropdown */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Select Country / Territory</span>
                <span className="text-cyan-700 font-bold">14 Core Regions</span>
              </label>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search country (e.g., USA, UAE, India)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>

              {/* Scrollable Region Cards with Hover Tooltip Preview */}
              <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                {filteredRegions.map((region) => {
                  const isSelected = selectedRegion.id === region.id;
                  return (
                    <div 
                      key={region.id}
                      className="relative group"
                      onMouseEnter={() => setHoveredRegion(region)}
                      onMouseLeave={() => setHoveredRegion(null)}
                    >
                      <button
                        onClick={() => setSelectedRegion(region)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? 'bg-cyan-50 border border-cyan-300 text-cyan-900 font-bold shadow-xs' 
                            : 'bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono px-1.5 py-0.5 rounded bg-slate-200 text-[10px] text-slate-800 font-bold">
                            {region.countryCode}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900">{region.country}</div>
                            <div className="text-[10px] text-slate-500">
                              5G: <strong className="text-cyan-700">{region.coverage5gPct}%</strong> • RSRP: <strong className="text-emerald-700">{region.avgRsrpDbM} dBm</strong>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {region.coverage5gPct}%
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-cyan-600 ml-1" />}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Region RF Coverage & GIS Spec Sheet */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-black text-slate-900">{activeRegion.country} RF & GIS Summary</h3>
                  <p className="text-xs text-slate-500">{activeRegion.continent} • {activeRegion.countryCode}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-100 text-cyan-900 border border-cyan-200">
                  {activeRegion.qualityScore}
                </span>
              </div>

              {/* Summarized RF Stats Highlights */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-extrabold text-cyan-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Signal className="w-3.5 h-3.5 text-cyan-600" />
                  <span>RF Coverage Metrics</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-medium">5G NR Coverage</div>
                    <div className="font-black text-cyan-700 text-sm mt-0.5 font-mono">{activeRegion.coverage5gPct}%</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-cyan-600 h-full rounded-full" style={{ width: `${activeRegion.coverage5gPct}%` }} />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-medium">4G LTE Coverage</div>
                    <div className="font-black text-emerald-700 text-sm mt-0.5 font-mono">{activeRegion.coverage4gPct}%</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${activeRegion.coverage4gPct}%` }} />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-medium">Avg RSRP Signal</div>
                    <div className="font-black text-amber-700 text-sm mt-0.5 font-mono">{activeRegion.avgRsrpDbM} dBm</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Sub-6GHz Calibrated</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-medium">Avg Download</div>
                    <div className="font-black text-slate-900 text-sm mt-0.5 font-mono">{activeRegion.avgDownloadMbps} Mbps</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">Peak Capacity</div>
                  </div>
                </div>
              </div>

              {/* Mapped GIS Specs */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-mono">Mapped Cell Sites</div>
                  <div className="font-extrabold text-slate-900 mt-0.5 font-mono">{activeRegion.cellSitesCount.toLocaleString()}</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-mono">DTM Elevation</div>
                  <div className="font-extrabold text-cyan-700 mt-0.5 font-mono">{activeRegion.dtmMaxRes}</div>
                </div>
              </div>

              {activeRegion.featuredProject && (
                <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-xs">
                  <div className="text-[10px] font-mono text-cyan-900 uppercase font-bold">Featured Regional Deployment</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{activeRegion.featuredProject}</div>
                </div>
              )}

              <button
                onClick={() => onSelectCountryForQuote(activeRegion.country)}
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Request Sample & Quote for {activeRegion.country}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Leaflet Map View & Layer Controls */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            
            {/* Map Canvas Card */}
            <div className="relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm h-[540px] flex flex-col">
              
              {/* Map Controls Header Bar */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-20">
                
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Layers className="w-4 h-4 text-cyan-600" />
                  <span>Map Viewer: <strong className="text-slate-900">{activeRegion.country}</strong></span>
                </div>

                {/* Layer Toggle Badges */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setShowAllRegionPins(!showAllRegionPins)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition flex items-center gap-1.5 font-bold cursor-pointer ${
                      showAllRegionPins ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <Globe className="w-3 h-3 text-indigo-600" />
                    <span>Global Region Tooltips</span>
                  </button>

                  <button
                    onClick={() => setShowCellTowers(!showCellTowers)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition flex items-center gap-1.5 font-bold cursor-pointer ${
                      showCellTowers ? 'bg-cyan-100 text-cyan-800 border border-cyan-300' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <Radio className="w-3 h-3 text-cyan-600" />
                    <span>Cell Site Nodes</span>
                  </button>

                  <button
                    onClick={() => setShowRfIntensityLegend(!showRfIntensityLegend)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition flex items-center gap-1.5 font-bold cursor-pointer ${
                      showRfIntensityLegend ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <Signal className="w-3 h-3 text-emerald-600" />
                    <span>RF Intensity Legend</span>
                  </button>

                  <button
                    onClick={() => setShowClutterLegend(!showClutterLegend)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition font-bold cursor-pointer ${
                      showClutterLegend ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    Clutter Legend
                  </button>
                </div>

              </div>

              {/* Actual Leaflet Map Element */}
              <div ref={mapContainerRef} className="w-full h-full relative z-10" />

              {/* Live Regional RF Coverage Floating HUD Overlay (Top-Left of Map) */}
              <div className="absolute top-14 left-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 p-2.5 rounded-xl shadow-lg w-56 space-y-1.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono px-1 py-0.2 rounded bg-cyan-600 text-white text-[9px] font-black">
                      {activeRegion.countryCode}
                    </span>
                    <div>
                      <div className="font-extrabold text-slate-900 text-[11px] leading-tight">{activeRegion.country}</div>
                      <div className="text-[8.5px] text-slate-500 font-mono">Live RF Coverage Stats</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-0.5 text-[8px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live
                  </span>
                </div>

                {/* Meter Bars */}
                <div className="space-y-1 text-[9.5px]">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>5G NR Coverage</span>
                      <span className="font-mono text-cyan-700 font-bold">{activeRegion.coverage5gPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-0.5 border border-slate-200">
                      <div className="bg-cyan-600 h-full rounded-full" style={{ width: `${activeRegion.coverage5gPct}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>4G LTE Coverage</span>
                      <span className="font-mono text-emerald-700 font-bold">{activeRegion.coverage4gPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-0.5 border border-slate-200">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${activeRegion.coverage4gPct}%` }} />
                    </div>
                  </div>
                </div>

                {/* Key Quick Stats Pills */}
                <div className="grid grid-cols-2 gap-1 text-[8.5px] pt-0.5">
                  <div className="p-1 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">Avg RSRP:</span>
                    <span className="font-mono font-bold text-amber-700">{activeRegion.avgRsrpDbM} dBm</span>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">Avg Speed:</span>
                    <span className="font-mono font-bold text-slate-900">{activeRegion.avgDownloadMbps} Mbps</span>
                  </div>
                </div>

                <div className="text-[8.5px] text-slate-600 bg-slate-100 p-1 rounded font-mono flex items-center justify-between">
                  <span>Sites: <strong>{activeRegion.cellSitesCount.toLocaleString()}</strong></span>
                  <span className="text-cyan-700 font-bold">DTM {activeRegion.dtmMaxRes}</span>
                </div>
              </div>

              {/* Floating RF Coverage Intensity Legend Overlay (Bottom-Right of Map) */}
              {showRfIntensityLegend && (
                <div className="absolute bottom-4 right-4 z-20 w-56 bg-white/95 backdrop-blur-md border border-slate-200/90 p-2.5 rounded-xl shadow-lg space-y-1.5 text-slate-800">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                    <div className="flex items-center gap-1">
                      <Signal className="w-3 h-3 text-cyan-600" />
                      <span className="text-[9.5px] font-mono font-black text-slate-900 uppercase tracking-wider">
                        RF Signal Intensity
                      </span>
                    </div>
                    <button 
                      onClick={() => setShowRfIntensityLegend(false)}
                      className="text-slate-400 hover:text-slate-600 text-[10px] font-bold cursor-pointer px-1"
                      title="Hide Legend"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Continuous RSRP Spectrum Gradient Bar */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-center text-[8.5px] font-bold text-slate-700">
                      <span>RSRP Power Scale</span>
                      <span className="font-mono text-cyan-700">dBm</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 via-amber-500 to-red-500 border border-slate-200 shadow-inner" />
                    <div className="flex justify-between text-[8px] font-mono font-semibold text-slate-500">
                      <span className="text-emerald-700 font-bold">≥-80</span>
                      <span className="text-sky-700">-85</span>
                      <span className="text-amber-700">-95</span>
                      <span className="text-red-700">&lt;-105</span>
                    </div>
                  </div>

                  {/* Legend Category Items */}
                  <div className="space-y-1 pt-0.5 text-[8.5px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 border border-emerald-600 shrink-0"></span>
                        <span className="font-extrabold text-slate-900">Exc (≥-80)</span>
                      </div>
                      <span className="font-mono text-emerald-700 font-bold text-[8px]">5G SA/mmWave</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-sky-500 border border-sky-600 shrink-0"></span>
                        <span className="font-extrabold text-slate-900">Good (-80..-88)</span>
                      </div>
                      <span className="font-mono text-sky-700 font-bold text-[8px]">5G C-Band</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500 border border-amber-600 shrink-0"></span>
                        <span className="font-extrabold text-slate-900">Fair (-88..-95)</span>
                      </div>
                      <span className="font-mono text-amber-700 font-bold text-[8px]">4G LTE/CBRS</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 border border-red-600 shrink-0"></span>
                        <span className="font-extrabold text-slate-900">Weak (&lt;-95)</span>
                      </div>
                      <span className="font-mono text-red-700 font-bold text-[8px]">Cell Edge</span>
                    </div>
                  </div>

                  {/* Coverage Heat Ring Key */}
                  <div className="pt-1 border-t border-slate-200 grid grid-cols-2 gap-1 text-[8px] font-medium text-slate-600">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full border border-cyan-500 bg-sky-200/50 shrink-0"></span>
                      <span>18km Macro</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full border border-indigo-500 bg-indigo-200/50 shrink-0"></span>
                      <span>8km Micro</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Clutter Legend Overlay */}
              {showClutterLegend && (
                <div className="absolute bottom-4 left-4 z-20 w-48 bg-white/95 backdrop-blur-md border border-slate-200 p-2 rounded-xl shadow-lg max-h-32 overflow-y-auto">
                  <div className="text-[8.5px] font-mono font-bold text-slate-600 uppercase pb-0.5 mb-1 border-b border-slate-200">
                    Clutter Land Cover
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px]">
                    {CLUTTER_CLASSES.slice(0, 10).map((c) => (
                      <div key={c.id} className="flex items-center gap-1 text-slate-800 font-medium truncate">
                        <span className="w-2 h-2 rounded-full shrink-0 border border-slate-300" style={{ backgroundColor: c.color }} />
                        <span className="truncate">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Formats Supported Bar */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 shadow-xs font-medium">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Compatible GIS Formats: <strong>GeoTIFF, MapInfo .tab, Atoll Grid, Planet ASCII, Shapefile</strong></span>
              </span>
              <span className="text-cyan-700 font-mono text-[11px] font-bold">Datum: WGS84 / Universal Transverse Mercator</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
