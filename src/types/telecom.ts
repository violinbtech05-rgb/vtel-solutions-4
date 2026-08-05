export type PageTab = 
  | 'home'
  | 'about'
  | 'rf-services'
  | 'digital-maps'
  | 'coverage-map'
  | 'rf-simulator'
  | 'industries'
  | 'portfolio'
  | 'faqs'
  | 'blog'
  | 'contact'
  | 'quote';

export interface MapResolutionInfo {
  product: string;
  high: string;
  medium: string;
  low: string;
}

export interface ClutterClassInfo {
  id: string;
  code: number;
  name: string;
  color: string;
  description: string;
  typicalLossDb: number;
}

export interface MapProductInfo {
  id: 'dtm' | 'clutter' | '3d-buildings';
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  resolutions: string[];
  formats: string[];
  applications: string[];
  features?: string[];
  specs?: Record<string, string>;
}

export interface RfServiceInfo {
  id: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  deliverables: string[];
  imageUrl?: string;
}

export interface SoftwareToolInfo {
  id: string;
  name: string;
  category: 'RF Planning' | 'GIS Engine' | 'Microwave & Backhaul';
  logoText: string;
  formatsSupported: string[];
  description: string;
  logoUrl?: string;
  brandColor?: string;
}

export interface IndustryInfo {
  id: string;
  title: string;
  iconName: string;
  description: string;
  useCases: string[];
}

export interface RegionCoverageInfo {
  id: string;
  country: string;
  countryCode: string;
  continent: string;
  lat: number;
  lng: number;
  dtmMaxRes: string;
  dsmMaxRes: string;
  clutterMaxRes: string;
  buildings3DLod: string;
  orthophotoRes: string;
  sampleAvailable: boolean;
  featuredProject?: string;
  // RF Coverage Statistics
  coverage5gPct: number;
  coverage4gPct: number;
  avgRsrpDbM: number;
  cellSitesCount: number;
  avgDownloadMbps: number;
  dominantTech: string;
  qualityScore: string;
}

export interface QuoteFormData {
  serviceType: 'digital-maps' | 'rf-planning' | 'combined' | 'custom';
  selectedMapProducts: string[];
  selectedRfServices: string[];
  targetCountry: string;
  projectAreaSqKm: number;
  requiredResolution: string;
  softwareFormat: string;
  deliverableTimeframe: 'urgent' | 'standard' | 'flexible';
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface CaseStudyInfo {
  id: string;
  title: string;
  clientType: string;
  region: string;
  technology: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
}

export interface FaqInfo {
  id: string;
  category: 'Digital Maps' | 'RF Services' | 'Formats & Delivery' | 'Pricing & Licensing';
  question: string;
  answer: string;
}

export interface BlogPostInfo {
  id: string;
  title: string;
  category: '5G NR' | 'GIS Data' | 'CBRS & Private LTE' | '3D Modeling';
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string[];
}
