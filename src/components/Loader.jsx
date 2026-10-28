import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { BrandLogo } from './Icons';

export function Loader({ images, onDone }) {
  const rootRef = useRef(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let finished = false;
    const startTime = performance.now();
    const state = { v: 0 };

    const animateProgress = (val, duration = 0.8) => {
      gsap.to(state, {
        v: val,
        duration,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => setPct(Math.round(state.v))
      });
    };

    // Staggered intro of logo mark and brand name
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.loader__mark path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: 0.25 })
        .to('.loader__mark path', { fillOpacity: 1, duration: 0.6, ease: 'power1.out' }, '-=0.4')
        .from('.loader__word span', { yPercent: 110, duration: 0.9, stagger: 0.05, ease: 'expo.out' }, 0.4);
    }, rootRef);

    const completeLoader = () => {
      if (finished || cancelled) return;
      finished = true;
      try {
        animateProgress(100, 0.4);

        const elapsed = (performance.now() - startTime) / 1000;
        const delay = Math.max(0, 1.4 - elapsed);

        if (!rootRef.current) {
          onDone();
          return;
        }

        const inner = rootRef.current.querySelector('.loader__inner');
        gsap.timeline({ delay: delay + 0.15 })
          .to(inner || {}, { y: -30, opacity: 0, duration: 0.6, ease: 'power3.in' })
          .to(rootRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.15')
          .add(() => onDone(), '-=0.6')
          .set(rootRef.current, { display: 'none' });
      } catch {
        onDone();
      }
    };

    let loaded = 0;
    const total = images.length || 1;
    images.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        loaded += 1;
        animateProgress((loaded / total) * 95);
        if (loaded >= total) completeLoader();
      };
      img.src = src;
    });

    const fallbackTimeout = setTimeout(completeLoader, 3000);

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimeout);
      ctx.revert();
    };
  }, [images, onDone]);

  return (
    <div className="loader" ref={rootRef} aria-hidden="true">
      <div className="loader__inner">
        <BrandLogo className="loader__mark" />
        <div className="loader__word">
          {'AURA ATELIER'.split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </div>
        <div className="loader__bar">
          <i style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <div className="loader__pct">{String(pct).padStart(3, '0')}</div>
      </div>
    </div>
  );
}
