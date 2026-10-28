import React from 'react';

// Aura Architectural Monogram Vector Paths (Faceted Architectural 'A')
const auraOuterPath = "M50 12 L88 92 L68 92 L50 52 L32 92 L12 92 Z";
const auraInnerPath = "M50 64 L62 84 L38 84 Z";

export function AuraLogo({ className = '', pathClassName = '', title = 'Aura Architectural Atelier' }) {
  return (
    <svg className={className} viewBox="0 0 100 104" role="img" aria-label={title}>
      <path d={auraOuterPath} className={pathClassName} pathLength="1" />
      <path d={auraInnerPath} className={pathClassName} pathLength="1" />
    </svg>
  );
}

// Re-export as BrandLogo for clean component usage
export { AuraLogo as BrandLogo };

const iconPaths = {
  home: (
    <>
      <path d="M6 22 24 7l18 15" />
      <path d="M10 19v22h10V30h8v11h10V19" />
      <path d="M34 11v6" />
    </>
  ),
  building: (
    <>
      <path d="M14 42V8h20v34" />
      <path d="M34 20h8v22M6 42V24h8" />
      <path d="M19 14h2M27 14h2M19 21h2M27 21h2M19 28h2M27 28h2M19 35h2M27 35h2M9 30h2M9 36h2M37 27h2M37 34h2M3 42h42" />
    </>
  ),
  chair: (
    <>
      <rect x="16" y="5" width="16" height="16" rx="4" />
      <path d="M12 21v4a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-4M24 28v7M13 41l11-6 11 6M24 35v6" />
      <circle cx="12" cy="42" r="2" />
      <circle cx="36" cy="42" r="2" />
      <circle cx="24" cy="43" r="2" />
    </>
  ),
  kitchen: (
    <>
      <path d="M18 5h12M24 5v4M14 15l4-6h12l4 6z" />
      <rect x="6" y="22" width="36" height="20" rx="1.5" />
      <path d="M6 30h16M22 22v20M30 22v20M14 26h4M14 36h4M27 31v4M33 31v4" />
    </>
  ),
  tools: (
    <>
      <path d="M30 8a8 8 0 0 0 8 10l-20 20a4 4 0 1 1-6-6l20-20a8 8 0 0 0-2-4z" />
      <path d="M10 8l6 6-2 2-6-6zM16 14l6 6M30 30l8 8a3 3 0 0 1-4 4l-8-8" />
    </>
  ),
  cubes: (
    <>
      <path d="M24 4l9 5v10l-9 5-9-5V9z" />
      <path d="M15 19l9 5v10l-9 5-9-5V24z" />
      <path d="M33 19l9 5v10l-9 5-9-5" />
      <path d="M15 9l9 5 9-5M6 24l9 5 9-5M24 24l9 5 9-5M24 14v10M15 29v10M33 29v10" />
    </>
  ),
  shield: (
    <>
      <path d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10z" />
      <path d="M16 24l6 6 11-12" />
    </>
  ),
  clock: (
    <>
      <circle cx="24" cy="24" r="19" />
      <path d="M24 12v12l9 6" />
    </>
  ),
  phone: (
    <path d="M14 6h6l3 9-4 3a24 24 0 0 0 11 11l3-4 9 3v6a4 4 0 0 1-4 4C21 38 10 27 10 10a4 4 0 0 1 4-4z" />
  ),
  pin: (
    <>
      <path d="M24 44s14-13 14-25a14 14 0 0 0-28 0c0 12 14 25 14 25z" />
      <circle cx="24" cy="19" r="5" />
    </>
  ),
  globe: (
    <>
      <circle cx="24" cy="24" r="18" />
      <path d="M6 24h36M24 6c5 5 7 11 7 18s-2 13-7 18c-5-5-7-11-7-18s2-13 7-18z" />
    </>
  ),
  arrow: (
    <path d="M10 24h28M28 14l10 10-10 10" />
  )
};

export function Icon({ name, className = '', size }) {
  const content = iconPaths[name];
  if (!content) return null;
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}

export function WhatsAppIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
      <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-2.6-1.6 9.7 9.7 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5a.6.6 0 0 0 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.8.8a3.3 3.3 0 0 0 2.2-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.4z" />
    </svg>
  );
}
