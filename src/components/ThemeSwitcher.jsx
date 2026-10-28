import React, { useEffect, useState } from 'react';

export const THEMES = [
  {
    id: 'walnut',
    name: 'Warm Ivory + Champagne + Walnut',
    accent: '#D6C2A5',
    bg: '#141210'
  },
  {
    id: 'monochrome',
    name: 'Titanium & Sterling Platinum',
    accent: '#e2e8f0',
    bg: '#07080a'
  },
  {
    id: 'cyan',
    name: 'Glacier Cyan & Arctic Slate',
    accent: '#00e5ff',
    bg: '#04090e'
  },
  {
    id: 'cobalt',
    name: 'Royal Cobalt & Electric Azure',
    accent: '#38bdf8',
    bg: '#050812'
  },
  {
    id: 'crimson',
    name: 'Architectural Crimson & Ruby',
    accent: '#f43f5e',
    bg: '#090607'
  }
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('aura_theme') || 'walnut';
  });

  const selectTheme = id => {
    setCurrentTheme(id);
    localStorage.setItem('aura_theme', id);
    if (id === 'walnut') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', id);
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: id } }));
  };

  useEffect(() => {
    if (currentTheme === 'walnut') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', currentTheme);
    }
  }, [currentTheme]);

  return (
    <div className="theme-switcher" data-cursor="Palette" aria-label="Color Theme Switcher">
      <small>Palette</small>
      {THEMES.map(t => (
        <button
          key={t.id}
          className={`theme-dot ${currentTheme === t.id ? 'is-active' : ''}`}
          style={{
            background: `linear-gradient(135deg, ${t.accent} 50%, ${t.bg} 50%)`
          }}
          onClick={() => selectTheme(t.id)}
          title={t.name}
          aria-label={t.name}
        />
      ))}
    </div>
  );
}
