import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEP_ANGLE = 40;

export function ProcessCarousel({ data }) {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const steps = data.steps;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.ring__card', rootRef.current);
      const dots = gsap.utils.toArray('.ring__dot', rootRef.current);

      const updateCarousel = progress => {
        if (!cards.length || !ringRef.current) return;
        const cardWidth = cards[0].offsetWidth || 320;
        const radius = Math.round(cardWidth * 1.55);
        const rotationAngle = progress * (steps.length - 1) * STEP_ANGLE;

        ringRef.current.style.transform = `translateZ(${-radius}px) rotateY(${-rotationAngle}deg)`;

        cards.forEach((card, idx) => {
          const cardAngle = idx * STEP_ANGLE;
          const diff = Math.abs(cardAngle - rotationAngle);

          card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
          card.style.opacity = String(gsap.utils.clamp(0, 1, 1.15 - diff / 95));
          card.style.filter = `brightness(${gsap.utils.clamp(0.35, 1, 1 - diff / 70)})`;
          card.classList.toggle('is-front', diff < STEP_ANGLE / 2);
        });

        const activeIndex = Math.round(progress * (steps.length - 1));
        dots.forEach((dot, idx) => {
          dot.classList.toggle('is-on', idx === activeIndex);
        });
      };

      updateCarousel(0);

      gsap.to(
        { p: 0 },
        {
          p: 1,
          ease: 'none',
          onUpdate: function () {
            updateCarousel(this.targets()[0].p);
          },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * steps.length * 0.85}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: self => updateCarousel(self.progress)
          }
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section className="ring-sec" id="process" ref={rootRef}>
      <header className="ring-sec__head">
        <p className="eyebrow">
          <span className="dot" /> {data.label}
        </p>
        <h2 className="display">
          {data.title[0]}
          <br />
          <em>{data.title[1]}</em>
        </h2>
      </header>

      <div className="ring__viewport">
        <div className="ring" ref={ringRef}>
          {steps.map((step, idx) => (
            <article key={step.title} className="ring__card">
              <div className="ring__media">
                <img src={step.image} alt={`${step.title} stage`} loading="lazy" />
                <span className="ring__num">0{idx + 1}</span>
              </div>
              <div className="ring__body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <ul>
                  {step.points.map(point => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="ring__dots" aria-hidden="true">
        {steps.map(step => (
          <span key={step.title} className="ring__dot">
            <i />
            {step.title}
          </span>
        ))}
      </div>
    </section>
  );
}

