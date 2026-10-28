import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from './Icons';
import { BackgroundCanvas } from './BackgroundCanvas';

gsap.registerPlugin(ScrollTrigger);

export function ServicesWalkthrough({ site, loaded, onNavigate }) {
  const rootRef = useRef(null);
  const hudRef = useRef(null);
  const progressRef = useRef(0);

  const { hero, intro, services, finale, contact } = site;
  const totalSteps = services.items.length + 3;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main scroll scrub through the entire experience section
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
          progressRef.current = self.progress;
          const currentIdx = Math.round(self.progress * (totalSteps - 1)) - 2;
          const isService = currentIdx >= 0 && currentIdx < services.items.length;

          if (hudRef.current) {
            hudRef.current.classList.toggle('is-on', isService);
            if (isService) {
              const bTag = hudRef.current.querySelector('b');
              const emTag = hudRef.current.querySelector('em');
              if (bTag) bTag.textContent = String(currentIdx + 1).padStart(2, '0');
              if (emTag) emTag.textContent = services.items[currentIdx].title.join(' ');
            }
          }
          gsap.set('.xp-hud__bar i', { scaleY: self.progress });
        }
      });

      // Hero text parallax out on scroll
      gsap.to('.xp-hero__inner', {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.xp-hero',
          start: 'top top',
          end: '70% top',
          scrub: true
        }
      });

      // 3D perspective fly-in and fly-out for cards
      gsap.utils.toArray('.xp-step:not(.xp-hero) .xp-card').forEach(card => {
        gsap.timeline({
          scrollTrigger: {
            trigger: card.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
          .fromTo(
            card,
            { opacity: 0, y: 140, rotateX: -18, z: -200 },
            { opacity: 1, y: 0, rotateX: 0, z: 0, ease: 'power2.out', duration: 0.38 }
          )
          .to(card, { opacity: 1, duration: 0.24 })
          .to(card, { opacity: 0, y: -140, rotateX: 14, z: -200, ease: 'power2.in', duration: 0.38 });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [services.items, totalSteps]);

  // Entrance animation when loader finishes
  useEffect(() => {
    if (!loaded) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.1 })
        .from('.xp-hero__line > span', {
          yPercent: 120,
          rotateX: -60,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.1
        })
        .from(
          '.xp-hero__fade',
          { opacity: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.08 },
          '-=1'
        );
    }, rootRef);

    return () => ctx.revert();
  }, [loaded]);

  const handleActionClick = (e, href) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <section className="xp" ref={rootRef}>
      <div className="xp__stage">
        <BackgroundCanvas progressRef={progressRef} items={services.items} />
        <div className="xp__shade" />
        
        {/* HUD Indicator */}
        <div className="xp-hud" ref={hudRef} aria-hidden="true">
          <span>Room</span>
          <b>01</b>
          <span>/ {String(services.items.length).padStart(2, '0')}</span>
          <em />
        </div>

        {/* HUD Vertical Scroll Progress Bar */}
        <div className="xp-hud__bar" aria-hidden="true">
          <i />
        </div>
      </div>

      <div className="xp__steps">
        {/* Step 1: Hero */}
        <div className="xp-step xp-hero" id="top">
          <div className="xp-hero__inner">
            <p className="eyebrow xp-hero__fade">
              <span className="dot" /> {hero.eyebrow}
            </p>
            <h1 className="xp-hero__title">
              {hero.lines.map((line, idx) => (
                <span
                  key={line}
                  className={`xp-hero__line ${idx === 1 ? 'is-outline' : ''}`}
                >
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            <p className="xp-hero__sub xp-hero__fade">{hero.sub}</p>
            <div className="xp-hero__actions xp-hero__fade">
              <a
                className="btn btn--gold"
                href={hero.cta.href}
                onClick={e => handleActionClick(e, hero.cta.href)}
              >
                <span>{hero.cta.label}</span>
                <Icon name="arrow" />
              </a>
              <a
                className="btn btn--ghost"
                href={`tel:+91${contact.phones[0].replace(/\s/g, '')}`}
              >
                <Icon name="phone" />
                <span>{contact.phones[0]}</span>
              </a>
            </div>
          </div>
          <p className="xp-hero__hint xp-hero__fade">
            <i /> {hero.hint}
          </p>
        </div>

        {/* Step 2: Intro */}
        <div className="xp-step xp-step--center">
          <div className="xp-card xp-card--intro">
            <p className="eyebrow">
              <span className="dot" /> {intro.label}
            </p>
            <p className="xp-intro__text">{intro.text}</p>
            <p className="xp-intro__note">
              <Icon name="arrow" /> {intro.note}
            </p>
          </div>
        </div>

        {/* Steps 3 - 10: 8 Service Cards */}
        {services.items.map((item, idx) => {
          const isRight = idx % 2 === 1;
          return (
            <div
              key={item.image + idx}
              className={`xp-step ${isRight ? 'xp-step--right' : 'xp-step--left'}`}
              id={idx === 0 ? 'services' : undefined}
            >
              <article className="xp-card xp-card--room">
                <div className="xp-card__top">
                  <span className="xp-card__num">
                    {String(idx + 1).padStart(2, '0')}
                    <small> / {String(services.items.length).padStart(2, '0')}</small>
                  </span>
                  <Icon name={item.icon} className="xp-card__icon" />
                </div>
                <h2>
                  {item.title[0]}
                  <br />
                  <span>{item.title[1]}</span>
                </h2>
                <p className="xp-card__tags">{item.tags.join('  |  ')}</p>
                <p className="xp-card__text">{item.text}</p>
                <a
                  className="xp-card__link"
                  href="#contact"
                  onClick={e => handleActionClick(e, '#contact')}
                >
                  Enquire about this <Icon name="arrow" />
                </a>
              </article>
            </div>
          );
        })}

        {/* Step 11: Finale */}
        <div className="xp-step xp-step--center xp-step--finale">
          <div className="xp-card xp-card--finale">
            <p className="eyebrow">
              <span className="dot" /> {finale.label}
            </p>
            <h2 className="display">
              {finale.title[0]}
              <br />
              <em>{finale.title[1]}</em>
            </h2>
            <a
              className="btn btn--gold btn--lg"
              href={finale.cta.href}
              onClick={e => handleActionClick(e, finale.cta.href)}
            >
              <span>{finale.cta.label}</span>
              <Icon name="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

