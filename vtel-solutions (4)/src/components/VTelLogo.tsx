import React from 'react';

interface VTelLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'color';
  showSubtitle?: boolean;
}

export const VTelLogo: React.FC<VTelLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'light',
  showSubtitle = true 
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const subSizes = {
    sm: 'text-[8.5px]',
    md: 'text-[9.5px]',
    lg: 'text-[10.5px]'
  };

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center space-x-3 group text-left ${className}`}>
      {/* Graphic Emblem Badge - Light Color Theme */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} rounded-2xl bg-gradient-to-br from-white via-sky-50 to-blue-100 text-blue-600 shadow-md shadow-blue-500/15 group-hover:shadow-blue-500/30 group-hover:scale-105 transition-all duration-300 border border-sky-300/80 shrink-0 overflow-hidden`}>
        {/* Soft Ambient Light Glow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.3)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Dynamic Stylized V + Antenna + Satellite Orbit Vector Emblem in Vibrant Light Colors */}
        <svg className="w-3/4 h-3/4 relative z-10 drop-shadow-xs" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Orbital Ring / GIS Grid Arc */}
          <ellipse cx="20" cy="22" rx="15" ry="6" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" strokeOpacity="0.75" transform="rotate(-15 20 22)" />
          <ellipse cx="20" cy="22" rx="15" ry="6" stroke="#2563eb" strokeWidth="1.2" strokeOpacity="0.35" transform="rotate(25 20 22)" />

          {/* Stylized 'V' Telecommunication Lattice Tower with Vibrant Gradient */}
          <path d="M10 11L18.5 31C19.2 32.5 20.8 32.5 21.5 31L30 11" stroke="url(#vtel-light-grad)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Tower Center Mast */}
          <path d="M20 32V14" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M16 20H24" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M17.5 25H22.5" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" />

          {/* Antenna Summit Transmitter Node */}
          <circle cx="20" cy="12" r="2.8" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.4" />

          {/* High-Frequency Radio Signal Arcs */}
          <path d="M13 8.5C15.2 6.2 24.8 6.2 27 8.5" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 5C13 1 27 1 31 5" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="vtel-light-grad" x1="10" y1="11" x2="30" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284c7" />
              <stop offset="0.5" stopColor="#2563eb" />
              <stop offset="1" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Live Active Signal Pulse Beacon */}
        <div className="absolute top-1 right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 border border-white"></span>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center tracking-tight leading-none font-brand">
          <span className={`${textSizes[size]} font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight`}>
            VTel
          </span>
          <span className={`${textSizes[size]} font-extrabold ml-1.5 ${isDark ? 'text-sky-300' : 'text-blue-600'} tracking-tight`}>
            Solutions
          </span>
        </div>
        {showSubtitle && (
          <p className={`${subSizes[size]} font-mono tracking-[0.18em] uppercase font-extrabold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Telecom RF & GIS Mapping
          </p>
        )}
      </div>
    </div>
  );
};
