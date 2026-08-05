import { 
  MapProductInfo, 
  MapResolutionInfo, 
  ClutterClassInfo, 
  RfServiceInfo, 
  SoftwareToolInfo, 
  IndustryInfo, 
  RegionCoverageInfo, 
  CaseStudyInfo, 
  FaqInfo, 
  BlogPostInfo 
} from '../types/telecom';

export const MAP_RESOLUTION_MATRIX: MapResolutionInfo[] = [
  { product: 'DTM (Digital Terrain Model)', high: '1–2 m', medium: '5–10 m', low: '20–30 m' },
  { product: 'Clutter Maps (Land Use)', high: '1–5 m', medium: '10–20 m', low: '30–100 m' },
  { product: '3D Building Data (LOD1–3)', high: 'LOD2 / LOD3', medium: 'LOD1', low: 'Basic Footprints' },
];

export const CLUTTER_CLASSES: ClutterClassInfo[] = [
  { id: 'dense-urban', code: 1, name: 'Dense Urban', color: '#dc2626', description: 'High-rise commercial districts & financial centers with dense tall structures.', typicalLossDb: 22.5 },
  { id: 'urban', code: 2, name: 'Urban', color: '#ea580c', description: 'Medium-density residential & commercial buildings (3–8 stories).', typicalLossDb: 16.0 },
  { id: 'suburban', code: 3, name: 'Suburban', color: '#f59e0b', description: 'Low-density residential areas, single-family homes with scattered trees.', typicalLossDb: 10.5 },
  { id: 'industrial', code: 4, name: 'Industrial', color: '#64748b', description: 'Warehouses, factories, logistics parks, and heavy steel infrastructure.', typicalLossDb: 14.0 },
  { id: 'residential', code: 5, name: 'Residential', color: '#fbbf24', description: 'Planned residential housing communities with gardens and local streets.', typicalLossDb: 9.0 },
  { id: 'forest', code: 6, name: 'Forest / Woodland', color: '#15803d', description: 'Dense tree canopy, evergreen/deciduous forests with canopy attenuation.', typicalLossDb: 18.0 },
  { id: 'agricultural', code: 7, name: 'Agricultural Land', color: '#84cc16', description: 'Cultivated fields, farmlands, crops, and rural vegetation.', typicalLossDb: 4.5 },
  { id: 'water', code: 8, name: 'Water Bodies', color: '#0284c7', description: 'Lakes, rivers, reservoirs, harbors, and open water surfaces.', typicalLossDb: 0.5 },
  { id: 'open-area', code: 9, name: 'Open Area / Rural', color: '#a3e635', description: 'Flat terrain, sparse grass, clear line-of-sight rural zones.', typicalLossDb: 1.5 },
  { id: 'grassland', code: 10, name: 'Grassland / Savannah', color: '#10b981', description: 'Open grassland, scrubland, and low-standing wild growth.', typicalLossDb: 3.0 },
  { id: 'desert', code: 11, name: 'Desert / Arid', color: '#d97706', description: 'Sand dunes, arid terrain, rock formations, minimal foliage.', typicalLossDb: 1.0 },
  { id: 'wetlands', code: 12, name: 'Wetlands / Marshes', color: '#0d9488', description: 'Marshland, swamps, coastal mangroves with high ground moisture.', typicalLossDb: 5.0 },
  { id: 'airport', code: 13, name: 'Airport / Transport Hubs', color: '#8b5cf6', description: 'Runways, taxiways, terminals, and surrounding clear zones.', typicalLossDb: 2.0 },
  { id: 'railway-roads', code: 14, name: 'Railway & Major Roads', color: '#475569', description: 'Highways, arterial roads, rail corridors, and transport infrastructure.', typicalLossDb: 3.5 },
];

export const MAP_PRODUCTS: MapProductInfo[] = [
  {
    id: 'dtm',
    name: 'DTM (Digital Terrain Model)',
    shortName: 'DTM Data',
    tagline: 'Bare-earth bare elevation models for macro-cell & microwave planning',
    description: 'VTel Solutions provides high-precision Digital Terrain Models (DTM) representing bare earth elevation without vegetation or man-made structures. Essential for foundational line-of-sight calculations, diffraction modeling, Aster Propagation Model calibration, and macro-coverage prediction.',
    resolutions: ['1 Meter', '2 Meter', '5 Meter', '10 Meter', '20 Meter', '30 Meter'],
    formats: ['GeoTIFF', 'ASCII Grid (.asc)', 'MapInfo (.tab)', 'Planet ASCII', 'Atoll Grid'],
    applications: [
      'RF Coverage Prediction & Propagation',
      'Aster & Aster mmWave Model Calibration',
      'Line-of-Sight (LOS) Analysis',
      'Microwave Link Planning & Fresnel Clearance',
      'Macro-Cell Radio Site Selection'
    ],
    features: [
      'Bare-earth elevation filtering algorithms',
      'Seamless hydrological smoothing',
      'Sub-meter vertical accuracy in high-res tiers',
      'Global Datum WGS84 and local projection systems'
    ]
  },
  {
    id: 'clutter',
    name: 'Clutter Maps (Land Use / Land Cover)',
    shortName: 'Clutter Maps',
    tagline: 'Telecom clutter land cover data for precise signal attenuation',
    description: 'Custom-classified Land Use/Land Cover datasets tailored specifically for wireless telecommunications. Our clutter classes accurately model signal absorption, scattering, and diffraction caused by foliage, urban density, and open terrain.',
    resolutions: ['High Resolution (1–5m)', 'Medium Resolution (10–20m)', 'Low Resolution (30–100m)'],
    formats: ['MapInfo (.tab/.map)', 'Atoll Clutter File', 'Planet Clutter Matrix', 'GeoTIFF'],
    applications: [
      'RF Signal Attenuation Calculation',
      'Aster & Aster mmWave Model Fine-Tuning',
      'Radio Propagation Loss Calibration',
      'City vs Rural Traffic Distribution Modeling',
      'Network Expansion Site Priority Scoring'
    ],
    features: [
      'Standard clutter classes tailored for RF engineering',
      'Average clutter height attribute layers',
      'Compatible with Aster, Aster mmWave, COST-231 Hata, and 3GPP models'
    ]
  },
  {
    id: '3d-buildings',
    name: '3D Building Data (LOD1 / LOD2 / LOD3)',
    shortName: '3D Buildings',
    tagline: 'Vector 3D building footprints, heights & complex roof shapes',
    description: 'High-accuracy 3D vector building models with detailed height attributes, roof structures, and vector footprints. Designed for 5G NR micro-cell, Aster mmWave propagation modeling, and urban digital twin simulations.',
    resolutions: ['LOD1 (Mass Models)', 'LOD2 (Roof Structures)', 'LOD3 (Detailed Architectural Models)'],
    formats: ['Esri Shapefile (.shp)', 'AutoCAD DXF/DWG', 'CityGML', 'Atoll 3D Vector (.bld)', 'Planet 3D Footprints'],
    applications: [
      '5G NR Micro-Cell & Street Pole Planning',
      'Aster mmWave 28GHz/39GHz Propagation Simulation',
      'Smart Cities & Urban Digital Twins',
      'Macro-to-Street Pole Coverage Studies',
      'Critical Incident Public Safety Radio Coverage'
    ],
    features: [
      'Extracted building footprints with precise height attributes',
      'Roof geometry modeling (flat, pitched, complex gables)',
      'Sub-meter horizontal accuracy'
    ]
  }
];

export const RF_SERVICES: RfServiceInfo[] = [
  {
    id: 'coverage-prediction',
    category: 'Network Planning & Design',
    title: 'RF Coverage Prediction & Network Design',
    description: 'End-to-end radio network simulation utilizing state-of-the-art propagation models, accurate terrain, and high-resolution clutter maps to map signal strength (RSRP/RSSI), coverage boundaries, and best server areas.',
    imageUrl: '/images/rf_coverage_prediction.jpg',
    technologies: ['2G GSM', '3G UMTS', '4G LTE', '5G NR', 'CBRS', 'Private LTE', 'FWA'],
    deliverables: [
      'RSRP & RSRQ Coverage Heatmaps',
      'Best Server & Cell Overlap Maps',
      'Dominance & Interference Boundaries',
      'Downlink & Uplink Data Rate Prediction Maps'
    ]
  },
  {
    id: 'capacity-link-budget',
    category: 'Engineering Analysis',
    title: 'Capacity Planning & Link Budget Analysis',
    description: 'Detailed link budget calculations considering transmit power, antenna gain, feeder loss, body loss, clutter attenuation, and fading margins to establish reliable coverage radius for various frequency bands.',
    imageUrl: '/images/capacity_link_budget.jpg',
    technologies: ['Sub-1GHz', 'Mid-Band 2.5–3.8GHz', 'CBRS 3.5GHz', 'mmWave 24–39GHz', 'FWA'],
    deliverables: [
      'Maximum Allowable Path Loss (MAPL) Reports',
      'Uplink/Downlink Balanced Budget Charts',
      'Throughput & Capacity Limit Dimensioning',
      'MIMO Gain & Modulation Margin Metrics'
    ]
  },
  {
    id: 'site-evaluation-neighbor',
    category: 'Optimization & Configuration',
    title: 'Site Candidate Evaluation & Parameter Optimization',
    description: 'Evaluation of candidate cell sites, antenna tilt/azimuth optimization, PCI/RSI planning, neighbor list creation, and frequency reuse planning to eliminate pilot pollution and optimize handovers.',
    imageUrl: '/images/site_candidate_evaluation.jpg',
    technologies: ['4G LTE', '5G NR NSA/SA', 'CBRS', 'Private Networks'],
    deliverables: [
      'Site Candidate Ranking Matrix',
      'PCI / Frequency Allocation Matrices',
      'Automatic Neighbor Relation (ANR) Tables',
      'Physical Antenna Tilt & Azimuth Recommendations'
    ]
  },
  {
    id: 'drive-test-analysis',
    category: 'Field Validation & Audit',
    title: 'Drive Test Analysis & Network Benchmarking',
    description: 'Comprehensive processing of drive test log files, post-processing signal audits, cross-validation against simulation models, and root-cause analysis for dropped calls or coverage holes.',
    imageUrl: '/images/drive_test_analysis.jpg',
    technologies: ['2G', '3G', '4G', '5G NR', 'Private LTE'],
    deliverables: [
      'Drive Test Geo-Spatial Route Maps',
      'Model Calibration Factor Adjustments',
      'KPI Benchmarking & Quality Summary',
      'Targeted Site Optimization Action Plan'
    ]
  },
  {
    id: 'carrier-mimo-optimization',
    category: 'Advanced 5G Engineering',
    title: 'Carrier Aggregation & Massive MIMO Optimization',
    description: 'Advanced radio planning for multi-band carrier aggregation (CA) configurations and Massive MIMO beamforming pattern optimization to maximize cell-edge throughput in dense urban deployments.',
    imageUrl: '/images/carrier_mimo_optimization.jpg',
    technologies: ['5G NR Sub-6GHz', '5G mmWave', '4G LTE-Advanced Pro'],
    deliverables: [
      'Multi-Band Carrier Combining Maps',
      'Massive MIMO 3D Beam Steering Scenarios',
      'Cell-Edge Throughput Elevation Blueprints'
    ]
  }
];

export const SOFTWARE_COMPATIBILITY: SoftwareToolInfo[] = [
  { id: 'atoll', name: 'Forsk Atoll', category: 'RF Planning', logoText: 'ATOLL', formatsSupported: ['.map', '.tab', '.asc', '.bld', 'GeoTIFF'], description: 'Industry-standard wireless network planning and optimization software.' },
  { id: 'planet', name: 'Infovista Planet', category: 'RF Planning', logoText: 'PLANET', formatsSupported: ['.grid', '.clutter', '.bld', 'Planet ASCII'], description: 'Advanced radio propagation and network design tool.' },
  { id: 'arcgis', name: 'Esri ArcGIS', category: 'GIS Engine', logoText: 'ArcGIS', formatsSupported: ['File Geodatabase', 'Shapefile', 'GeoTIFF', 'CityGML'], description: 'Comprehensive enterprise GIS and spatial mapping platform.' },
  { id: 'mapinfo', name: 'Precisely MapInfo', category: 'GIS Engine', logoText: 'MAPINFO', formatsSupported: ['.tab', '.map', '.dat', '.id'], description: 'Desktop mapping and geographic analysis application.' },
  { id: 'googleearth', name: 'Google Earth Pro', category: 'GIS Engine', logoText: 'GE-PRO', formatsSupported: ['.kml', '.kmz', 'GeoTIFF', 'SuperOverlay'], description: '3D geospatial globe viewer for visual route audit.' },
  { id: 'pathloss', name: 'Pathloss 5/6', category: 'Microwave & Backhaul', logoText: 'PATHLOSS', formatsSupported: ['.ter', '.bil', 'ASCII DTM', 'GeoTIFF'], description: 'Comprehensive microwave link design and propagation tool.' },
  { id: 'qgis', name: 'QGIS / OpenGIS', category: 'GIS Engine', logoText: 'QGIS', formatsSupported: ['.shp', '.geojson', '.tif', '.gpkg'], description: 'Open source geographic information system platform.' }
];

export const INDUSTRIES: IndustryInfo[] = [
  { id: 'mno', title: 'Mobile Network Operators (MNOs)', iconName: 'Radio', description: 'Empowering national cellular carriers with 2G through 5G NR network rollout planning, site selection, and nationwide digital terrain data.', useCases: ['5G NR Green-field Rollout', '4G LTE Capacity Expansion', 'Spectrum Re-farming Strategy'] },
  { id: 'infraco', title: 'Telecom Infrastructure & TowerCos', iconName: 'TowerControl', description: 'Providing high-resolution 3D building models and DTM data for site co-location, line-of-sight analysis, and tower height optimization.', useCases: ['Tower Co-location Audits', 'Microwave Backhaul Line-of-Sight', 'Structural Footprint Verification'] },
  { id: 'government', title: 'Government & Municipalities', iconName: 'Building2', description: 'Accurate GIS terrain and 3D city models for urban planning, smart city digital twins, broadband initiative mapping, and zoning compliance.', useCases: ['Digital Twin Urban Planning', 'National Broadband Coverage Audits', 'Zoning & Permitting Studies'] },
  { id: 'wisp', title: 'Wireless Internet Service Providers (WISPs)', iconName: 'Wifi', description: 'Affordable, high-precision terrain and clutter maps for Fixed Wireless Access (FWA) coverage predictions and customer line-of-sight checks.', useCases: ['FWA Customer Qualification Tooling', '6GHz & CBRS Base Station Placement', 'Tree Canopy Attenuation Checks'] },
  { id: 'smartcities', title: 'Smart City Projects', iconName: 'Cpu', description: '3D Building datasets (LOD2/LOD3) to model smart streetlight radio propagation, municipal Wi-Fi networks, and autonomous vehicle connectivity.', useCases: ['Municipal Wireless Networks', 'Street-Level Micro Cell Rollout', 'Connected Mobility Corridors'] },
  { id: 'utilities', title: 'Utility & Energy Companies', iconName: 'Zap', description: 'Private LTE and CBRS RF planning maps for smart grid power substations, smart metering (AMI), and remote pipeline telemetry.', useCases: ['Smart Grid Substation Private LTE', 'AMI Water/Gas Meter Mesh Radio', 'Power Line Corridor Inspection'] },
  { id: 'railways', title: 'Railway Communications', iconName: 'Train', description: 'GIS mapping along rail corridors for GSM-R, FRMCS (Future Railway Mobile Communication System), and high-speed train connectivity.', useCases: ['FRMCS 5G Trackside Radio Coverage', 'Tunnel & Cutting Line-of-Sight', 'Train-to-Ground Link Budgets'] },
  { id: 'oilgas', title: 'Oil & Gas Pipelines', iconName: 'Flame', description: 'Terrain elevation and microwave link budget planning across remote desert, offshore, and mountainous pipeline routes.', useCases: ['Remote Pipeline Microwave Links', 'Offshore Rig Radio Coverage', 'Refinery Private Wireless'] },
  { id: 'publicsafety', title: 'Public Safety & FirstNet', iconName: 'ShieldAlert', description: 'High-reliability RF coverage mapping for mission-critical emergency services, police, fire, and FirstNet radio networks.', useCases: ['FirstNet Band 14 Coverage Audits', 'Disaster Relief Deployments', 'Suburban & Rural Tactical FirstNet Coverage'] },
  { id: 'defense', title: 'Defense Communications', iconName: 'Radar', description: 'Tactical GIS mapping, high-precision DSM models, and line-of-sight clearance maps for defense radio communications.', useCases: ['Tactical Battlefield Radio Modeling', 'Radar Line-of-Sight Analysis', 'Satellite Ground Station Placement'] }
];

export const WORKFLOW_STEPS = [
  { step: '01', title: 'Requirement Analysis', description: 'Detailed consultation to determine spatial resolution, target boundaries, software compatibility, and RF parameters.' },
  { step: '02', title: 'Data Collection & Sourcing', description: 'Acquisition of fresh satellite imagery, stereo-pair imagery, LIDAR telemetry, or radar datasets.' },
  { step: '03', title: 'Digital Map Preparation', description: 'Stereo processing, hydrological enforcement, building height extraction, and clutter Land Use categorization.' },
  { step: '04', title: 'Quality Assurance & Audit', description: 'Strict vertical/horizontal accuracy checks against ground control points (GCP) and spatial topology rules.' },
  { step: '05', title: 'RF Planning & Simulation', description: 'Calibrating radio propagation models, executing coverage predictions, and analyzing link budget margins.' },
  { step: '06', title: 'Customer Review & Preview', description: 'Providing sample dataset previews and interactive map views for engineer validation and sign-off.' },
  { step: '07', title: 'Final Delivery', description: 'Delivering final datasets in native software formats (Atoll, Planet, GeoTIFF, etc.) via secure high-speed cloud download.' },
  { step: '08', title: 'Technical Support', description: 'Ongoing technical assistance for RF software import, model calibration, and dataset integration.' },
];

export const GLOBAL_REGIONS: RegionCoverageInfo[] = [
  { id: 'usa', country: 'United States', countryCode: 'US', continent: 'North America', lat: 37.0902, lng: -95.7129, dtmMaxRes: '1 Meter', dsmMaxRes: '1 Meter', clutterMaxRes: '1–5 Meter', buildings3DLod: 'LOD2 / LOD3', orthophotoRes: '30 cm', sampleAvailable: true, featuredProject: 'Nationwide 5G NR CBRS Map Package', coverage5gPct: 94.2, coverage4gPct: 99.8, avgRsrpDbM: -82, cellSitesCount: 142500, avgDownloadMbps: 385, dominantTech: '5G C-Band & CBRS 3.5GHz', qualityScore: '98/100 (Grade A+)' },
  { id: 'uk', country: 'United Kingdom', countryCode: 'GB', continent: 'Europe', lat: 55.3781, lng: -3.4360, dtmMaxRes: '1 Meter', dsmMaxRes: '1 Meter', clutterMaxRes: '1 Meter', buildings3DLod: 'LOD2 / LOD3', orthophotoRes: '30 cm', sampleAvailable: true, featuredProject: 'London 3D LOD3 mmWave Vector Mesh', coverage5gPct: 91.5, coverage4gPct: 99.5, avgRsrpDbM: -80, cellSitesCount: 48200, avgDownloadMbps: 340, dominantTech: '5G Sub-6GHz & 28GHz mmWave', qualityScore: '96/100 (Grade A+)' },
  { id: 'germany', country: 'Germany', countryCode: 'DE', continent: 'Europe', lat: 51.1657, lng: 10.4515, dtmMaxRes: '2 Meter', dsmMaxRes: '2 Meter', clutterMaxRes: '5 Meter', buildings3DLod: 'LOD2', orthophotoRes: '50 cm', sampleAvailable: true, featuredProject: 'Industrial Campus Private 5G Model', coverage5gPct: 89.8, coverage4gPct: 99.1, avgRsrpDbM: -84, cellSitesCount: 76100, avgDownloadMbps: 310, dominantTech: '5G 3.6GHz Private Networks', qualityScore: '94/100 (Grade A)' },
  { id: 'uae', country: 'United Arab Emirates', countryCode: 'AE', continent: 'Middle East', lat: 23.4241, lng: 53.8478, dtmMaxRes: '1 Meter', dsmMaxRes: '1 Meter', clutterMaxRes: '1 Meter', buildings3DLod: 'LOD3', orthophotoRes: '30 cm', sampleAvailable: true, featuredProject: 'Dubai & Abu Dhabi 3D Digital Twin', coverage5gPct: 98.7, coverage4gPct: 100.0, avgRsrpDbM: -75, cellSitesCount: 19800, avgDownloadMbps: 540, dominantTech: '5G mmWave & SA 3.5GHz', qualityScore: '99/100 (Grade A+)' },
  { id: 'saudi', country: 'Saudi Arabia', countryCode: 'SA', continent: 'Middle East', lat: 23.8859, lng: 45.0792, dtmMaxRes: '2 Meter', dsmMaxRes: '2 Meter', clutterMaxRes: '5 Meter', buildings3DLod: 'LOD2', orthophotoRes: '50 cm', sampleAvailable: true, featuredProject: 'Riyadh & Red Sea Project GIS', coverage5gPct: 92.4, coverage4gPct: 98.9, avgRsrpDbM: -81, cellSitesCount: 38400, avgDownloadMbps: 410, dominantTech: '5G NR C-Band & FWA', qualityScore: '95/100 (Grade A)' },
  { id: 'india', country: 'India', countryCode: 'IN', continent: 'Asia-Pacific', lat: 20.5937, lng: 78.9629, dtmMaxRes: '2 Meter', dsmMaxRes: '2 Meter', clutterMaxRes: '5 Meter', buildings3DLod: 'LOD2', orthophotoRes: '50 cm', sampleAvailable: true, featuredProject: 'Metro Circle 5G Dense Urban Mapping', coverage5gPct: 86.5, coverage4gPct: 98.2, avgRsrpDbM: -86, cellSitesCount: 320000, avgDownloadMbps: 290, dominantTech: '5G SA 3.3GHz & 700MHz', qualityScore: '92/100 (Grade A)' },
  { id: 'singapore', country: 'Singapore', countryCode: 'SG', continent: 'Asia-Pacific', lat: 1.3521, lng: 103.8198, dtmMaxRes: '1 Meter', dsmMaxRes: '1 Meter', clutterMaxRes: '1 Meter', buildings3DLod: 'LOD3', orthophotoRes: '30 cm', sampleAvailable: true, featuredProject: 'Island-wide LOD3 3D Smart City Grid', coverage5gPct: 99.4, coverage4gPct: 100.0, avgRsrpDbM: -72, cellSitesCount: 8900, avgDownloadMbps: 620, dominantTech: '5G Standalone & mmWave', qualityScore: '100/100 (Grade A+)' },
  { id: 'brazil', country: 'Brazil', countryCode: 'BR', continent: 'South America', lat: -14.2350, lng: -51.9253, dtmMaxRes: '5 Meter', dsmMaxRes: '5 Meter', clutterMaxRes: '10 Meter', buildings3DLod: 'LOD1', orthophotoRes: '1 Meter', sampleAvailable: true, featuredProject: 'São Paulo & Rio 5G Network Maps', coverage5gPct: 78.2, coverage4gPct: 96.8, avgRsrpDbM: -88, cellSitesCount: 94000, avgDownloadMbps: 240, dominantTech: '5G 3.5GHz Sub-6GHz', qualityScore: '88/100 (Grade B+)' },
  { id: 'australia', country: 'Australia', countryCode: 'AU', continent: 'Asia-Pacific', lat: -25.2744, lng: 133.7751, dtmMaxRes: '2 Meter', dsmMaxRes: '2 Meter', clutterMaxRes: '5 Meter', buildings3DLod: 'LOD2', orthophotoRes: '50 cm', sampleAvailable: true, featuredProject: 'Capital Cities FWA & Mining Corridor', coverage5gPct: 88.9, coverage4gPct: 99.2, avgRsrpDbM: -83, cellSitesCount: 31500, avgDownloadMbps: 360, dominantTech: '5G FWA & 26GHz mmWave', qualityScore: '95/100 (Grade A)' },
  { id: 'southafrica', country: 'South Africa', countryCode: 'ZA', continent: 'Africa', lat: -30.5595, lng: 22.9375, dtmMaxRes: '5 Meter', dsmMaxRes: '5 Meter', clutterMaxRes: '10 Meter', buildings3DLod: 'LOD1', orthophotoRes: '1 Meter', sampleAvailable: true, featuredProject: 'Johannesburg & Cape Town Metro GIS', coverage5gPct: 71.4, coverage4gPct: 94.5, avgRsrpDbM: -89, cellSitesCount: 28900, avgDownloadMbps: 195, dominantTech: '4G LTE-A & 5G 3.5GHz', qualityScore: '85/100 (Grade B)' },
  { id: 'kenya', country: 'Kenya', countryCode: 'KE', continent: 'Africa', lat: -1.2921, lng: 36.8219, dtmMaxRes: '5 Meter', dsmMaxRes: '5 Meter', clutterMaxRes: '10 Meter', buildings3DLod: 'LOD1', orthophotoRes: '1 Meter', sampleAvailable: true, featuredProject: 'Nairobi 4G/5G Network Expansion', coverage5gPct: 62.8, coverage4gPct: 91.2, avgRsrpDbM: -91, cellSitesCount: 14200, avgDownloadMbps: 165, dominantTech: '4G LTE & 5G Sub-6', qualityScore: '82/100 (Grade B)' },
  { id: 'japan', country: 'Japan', countryCode: 'JP', continent: 'Asia-Pacific', lat: 36.2048, lng: 138.2529, dtmMaxRes: '1 Meter', dsmMaxRes: '1 Meter', clutterMaxRes: '1 Meter', buildings3DLod: 'LOD3', orthophotoRes: '30 cm', sampleAvailable: true, featuredProject: 'Tokyo 28GHz mmWave Propagation Dataset', coverage5gPct: 97.5, coverage4gPct: 99.9, avgRsrpDbM: -76, cellSitesCount: 185000, avgDownloadMbps: 480, dominantTech: '5G Sub-6, 28GHz & Private 5G', qualityScore: '99/100 (Grade A+)' },
  { id: 'qatar', country: 'Qatar', countryCode: 'QA', continent: 'Middle East', lat: 25.3548, lng: 51.1839, dtmMaxRes: '1 Meter', dsmMaxRes: '1 Meter', clutterMaxRes: '1 Meter', buildings3DLod: 'LOD3', orthophotoRes: '30 cm', sampleAvailable: true, featuredProject: 'Doha Smart City & Stadium RF Model', coverage5gPct: 99.1, coverage4gPct: 100.0, avgRsrpDbM: -74, cellSitesCount: 6400, avgDownloadMbps: 580, dominantTech: '5G SA 3.5GHz & mmWave', qualityScore: '100/100 (Grade A+)' },
  { id: 'mexico', country: 'Mexico', countryCode: 'MX', continent: 'North America', lat: 23.6345, lng: -102.5528, dtmMaxRes: '5 Meter', dsmMaxRes: '5 Meter', clutterMaxRes: '10 Meter', buildings3DLod: 'LOD1', orthophotoRes: '1 Meter', sampleAvailable: true, featuredProject: 'Mexico City Dense Urban RF Plan', coverage5gPct: 74.6, coverage4gPct: 95.2, avgRsrpDbM: -87, cellSitesCount: 41000, avgDownloadMbps: 210, dominantTech: '4G LTE & 5G 3.5GHz', qualityScore: '86/100 (Grade B+)' },
];

export const CASE_STUDIES: CaseStudyInfo[] = [
  {
    id: 'case-5g-london',
    title: '5G mmWave 28GHz Ray-Tracing & Aster mmWave Model Data for Metropolitan Operator',
    clientType: 'Tier-1 European Mobile Network Operator',
    region: 'London, United Kingdom',
    technology: '5G NR mmWave (28 GHz) & C-Band',
    challenge: 'High signal blockage in dense urban corridors caused severe propagation uncertainty for 28GHz mmWave small cells.',
    solution: 'VTel Solutions delivered sub-meter 1m DTM and LOD3 vector building dataset calibrated for Aster mmWave Propagation Model covering 450 sq km of central London, integrated directly into Forsk Atoll.',
    metrics: [
      { label: 'Spatial Accuracy', value: '±0.3m Vertical' },
      { label: 'Small Cell Savings', value: '28% Capex Reduced' },
      { label: 'Delivery Time', value: '12 Business Days' }
    ]
  },
  {
    id: 'case-cbrs-utility',
    title: 'Nationwide Private LTE & CBRS Grid Mapping for Smart Energy Grid',
    clientType: 'Major Electric Utility Provider',
    region: 'Midwest & Texas, USA',
    technology: 'CBRS 3.5GHz Private LTE',
    challenge: 'Substation-to-meter communications required exact line-of-sight analysis across 12,000 sq miles of mixed terrain and tree canopy.',
    solution: 'Provided a unified 5m DTM and high-resolution multi-class Clutter map calibrated for Aster Propagation Model with custom foliage loss tables.',
    metrics: [
      { label: 'Area Covered', value: '31,000 sq km' },
      { label: 'Substation Links', value: '1,450 Verified' },
      { label: 'Model Accuracy', value: '98.2% Field Match' }
    ]
  },
  {
    id: 'case-fwa-wisp',
    title: 'Fixed Wireless Access (FWA) Qualification Data for Regional WISP',
    clientType: 'Wireless Internet Service Provider',
    region: 'Queensland & NSW, Australia',
    technology: '6GHz & 28GHz Fixed Wireless Access',
    challenge: 'High customer churn due to unverified terrain and foliage blockage on install attempts.',
    solution: 'Created automated high-res DTM and multi-class clutter clearance maps allowing instant customer qualification before dispatching field technicians.',
    metrics: [
      { label: 'Install Failures', value: 'Dropped from 34% to 3%' },
      { label: 'Time-to-Quote', value: '< 2 Minutes' },
      { label: 'ROI Benchmark', value: '4.2x in Year 1' }
    ]
  }
];

export const FAQS: FaqInfo[] = [
  {
    id: 'faq-1',
    category: 'Digital Maps',
    question: 'What datasets does VTel Solutions provide for radio network planning?',
    answer: 'VTel Solutions provides high-accuracy Digital Terrain Models (DTM), Multi-Class Clutter Land-Use maps, and LOD1-LOD3 3D Building models. Our DTM datasets provide bare-earth elevation for line-of-sight and diffraction calculations, while clutter land cover and 3D buildings enable high-precision propagation modeling with Aster and Aster mmWave models.'
  },
  {
    id: 'faq-2',
    category: 'Formats & Delivery',
    question: 'Which RF planning software packages are compatible with your mapping datasets?',
    answer: 'Our datasets are natively formatted for leading commercial RF planning tools including Forsk Atoll, Infovista Planet, TEOCO Asset, Pathloss, CelPlanner, as well as GIS platforms like Esri ArcGIS, Global Mapper, MapInfo, and Google Earth Pro.'
  },
  {
    id: 'faq-3',
    category: 'Digital Maps',
    question: 'How are clutter land use classes categorized in your Land Use maps?',
    answer: 'VTel Solutions provides comprehensive telecom clutter land cover classes including Dense Urban, Urban, Suburban, Industrial, Residential, Forest, Agricultural, Water Bodies, Open Area, Grassland, Desert, Wetlands, Airport, and Railways/Roads. We can also customize clutter classes upon request.'
  },
  {
    id: 'faq-4',
    category: 'RF Services',
    question: 'Do you offer custom radio propagation model calibration including Aster models?',
    answer: 'Yes! Our senior RF engineering team performs drive test log post-processing and statistical propagation model calibration for Aster Propagation Model, Aster mmWave Propagation Model, Okumura-Hata, COST-231, SPM, and 3GPP 38.901 models tailored to your target climate, foliage density, and clutter profile.'
  },
  {
    id: 'faq-5',
    category: 'Pricing & Licensing',
    question: 'How are map datasets licensed and priced?',
    answer: 'Pricing depends on the total square area (sq km), selected resolution (1m, 2m, 5m, 10m, 30m), and data product types (DTM, Clutter Land Use, 3D Buildings). We offer perpetual enterprise licenses as well as project-based subscriptions with volume discounts.'
  },
  {
    id: 'faq-6',
    category: 'Formats & Delivery',
    question: 'How quickly can datasets be prepared and delivered?',
    answer: 'Pre-processed archived regional maps can be delivered within 24 to 48 hours. Fresh custom high-resolution datasets (1m DTM or LOD2 3D Buildings) typically require 5 to 10 business days depending on the project square mileage.'
  }
];

export const BLOG_POSTS: BlogPostInfo[] = [
  {
    id: 'blog-1',
    title: 'Optimizing 5G NR C-Band & mmWave Propagation with Aster & Aster mmWave Models',
    category: '5G NR',
    date: 'August 2, 2026',
    readTime: '6 min read',
    author: 'VTel Senior RF Engineering Team',
    excerpt: 'How Aster Propagation Model and Aster mmWave Propagation Model paired with LOD2 3D building models eliminate expensive field trial guesswork in 28GHz and 39GHz network rollouts.',
    content: [
      'As mobile network operators accelerate 5G NR deployments in mid-band (3.5 GHz C-band) and mmWave spectrum (24 GHz to 39 GHz), traditional 2D macro-cell planning models are no longer sufficient.',
      'Millimeter-wave signals experience sharp attenuation from building walls, foliage, and atmospheric absorption. A single brick wall can introduce 25–35 dB of attenuation, while dense canopy can completely block 28GHz line-of-sight.',
      'By utilizing the Aster Propagation Model and Aster mmWave Propagation Model alongside vector LOD2/LOD3 3D building models and multi-class clutter datasets, RF planning engineers can execute precise 3D Ray-Tracing simulations in Forsk Atoll or Infovista Planet. This accurately predicts diffracted rays around corners and multipath reflections, reducing small-cell over-provisioning by up to 30%.'
    ]
  },
  {
    id: 'blog-2',
    title: 'Understanding CBRS & Private LTE Link Budgets: Foliage Attenuation & Clutter Loss',
    category: 'CBRS & Private LTE',
    date: 'July 18, 2026',
    readTime: '8 min read',
    author: 'VTel GIS Solutions Specialist',
    excerpt: 'Key considerations for designing private wireless networks in 3.5 GHz CBRS spectrum across industrial plants, ports, and smart grid utilities.',
    content: [
      'Private 4G LTE and 5G networks operating in the 3.5 GHz Citizens Broadband Radio Service (CBRS) band are revolutionizing industrial automation, logistics ports, and utility smart grids.',
      'However, 3.5 GHz radio signals suffer higher path loss compared to legacy 700/800 MHz bands. Proper planning requires factoring in structural clutter losses from heavy steel cranes, metal storage containers, and dense vegetation.',
      'In this article, we break down the clutter loss spectrum and demonstrate how high-resolution clutter maps calibrated with empirical drive test measurements ensure reliable 99.999% uptime for mission-critical industrial telemetry.'
    ]
  },
  {
    id: 'blog-3',
    title: 'The Evolution of Digital Twins: LOD1, LOD2, and LOD3 3D Building Models in Telecommunications',
    category: '3D Modeling',
    date: 'June 25, 2026',
    readTime: '5 min read',
    author: 'VTel Spatial Data Engineering Lead',
    excerpt: 'Comparing Level of Detail (LOD) standards in GIS mapping and choosing the right 3D building dataset for smart city and telecom planning.',
    content: [
      'Level of Detail (LOD) defines the visual and geometric complexity of 3D spatial features. In telecom GIS mapping, selecting the appropriate LOD balance is crucial for balancing computation speed and simulation fidelity.',
      'LOD1 represents extruded building mass blocks with flat roofs. LOD2 adds realistic roof pitch geometries (gables, hips, stepped roofs). LOD3 incorporates detailed architectural features, balconies, and exterior structures.',
      'For general 3.5 GHz C-band urban coverage, LOD1 or LOD2 provides the optimal balance of ray-tracing speed and height precision. For micro-cell mmWave antenna placement on lamp posts or building facades with the Aster mmWave model, LOD2 or LOD3 is strongly recommended.'
    ]
  }
];
