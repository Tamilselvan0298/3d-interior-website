import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop/fine pointers
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.documentElement.classList.add('has-cursor');
    gsap.set([ringRef.current, dotRef.current], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100
    });

    const setRingX = gsap.quickTo(ringRef.current, 'x', { duration: 0.5, ease: 'power3' });
    const setRingY = gsap.quickTo(ringRef.current, 'y', { duration: 0.5, ease: 'power3' });
    const setDotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power3' });
    const setDotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power3' });

    const handlePointerMove = e => {
      setRingX(e.clientX);
      setRingY(e.clientY);
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    const handlePointerOver = e => {
      const target = e.target.closest('a, button, [data-cursor], input, select, textarea');
      const cursorText = target?.dataset?.cursor || '';
      const isInput = target && /INPUT|SELECT|TEXTAREA/.test(target.tagName);

      ringRef.current.classList.toggle('is-hover', !!target && !isInput);
      ringRef.current.classList.toggle('has-label', !!cursorText);
      labelRef.current.textContent = cursorText;
    };

    const handlePointerLeave = () => {
      gsap.to([ringRef.current, dotRef.current], { opacity: 0, duration: 0.25 });
    };

    const handlePointerEnter = () => {
      gsap.to([ringRef.current, dotRef.current], { opacity: 1, duration: 0.25 });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerenter', handlePointerEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerenter', handlePointerEnter);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span ref={labelRef} />
      </div>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}

