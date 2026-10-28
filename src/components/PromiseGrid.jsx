import React, { useRef } from 'react';
import gsap from 'gsap';
import { Icon } from './Icons';

function PillarCard({ item, index }) {
  const cardRef = useRef(null);

  const handlePointerMove = e => {
    if (e.pointerType !== 'mouse') return;
    const rect = cardRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;

    gsap.to(cardRef.current, {
      rotateY: (xRatio - 0.5) * 16,
      rotateX: (0.5 - yRatio) * 14,
      duration: 0.6,
      ease: 'power3'
    });

    cardRef.current.style.setProperty('--gx', `${xRatio * 100}%`);
    cardRef.current.style.setProperty('--gy', `${yRatio * 100}%`);
  };

  const handlePointerLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  return (
    <article
      className="pillar"
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-reveal="true"
    >
      <div className="pillar__glare" />
      <span className="pillar__num">0{index + 1}</span>
      <Icon name={item.icon} className="pillar__icon" />
      <h3>{item.title}</h3>
      <p className="pillar__tags">{item.tags}</p>
      <p>{item.text}</p>
    </article>
  );
}

export function PromiseGrid({ data }) {
  return (
    <section className="pillars" id="promise">
      <div className="pillars__glow" aria-hidden="true" data-speed="0.6" />
      <header className="pillars__head" data-reveal="true">
        <p className="eyebrow">
          <span className="dot" /> {data.label}
        </p>
        <h2 className="display">
          {data.title[0]}
          <br />
          <em>{data.title[1]}</em>
        </h2>
      </header>

      <div className="pillars__grid">
        {data.items.map((item, idx) => (
          <PillarCard key={item.title} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}

