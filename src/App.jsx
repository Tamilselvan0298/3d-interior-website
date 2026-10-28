import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { siteData } from './siteData';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ServicesWalkthrough } from './components/ServicesWalkthrough';
import { ProcessCarousel } from './components/ProcessCarousel';
import { PromiseGrid } from './components/PromiseGrid';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ThemeSwitcher } from './components/ThemeSwitcher';

gsap.registerPlugin(ScrollTrigger);

const isReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Smooth Scrolling with Lenis
  useLayoutEffect(() => {
    if (isReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true
    });
    window.__lenis = lenis;

    lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);

    const rafTicker = time => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafTicker);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Update loading state and start scroll when ready
  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !loaded);
    if (loaded) {
      window.__lenis?.start();
      document.fonts?.ready?.then(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    }
  }, [loaded]);

  // Parallax and Reveal Effects
  useLayoutEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Speed Parallax
      gsap.utils.toArray('[data-speed]').forEach(el => {
        const speed = parseFloat(el.dataset.speed);
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      // Inner Parallax on Images
      gsap.utils.toArray('[data-inner-parallax]').forEach(el => {
        const img = el.querySelector('img');
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -9, scale: 1.18 },
          {
            yPercent: 9,
            scale: 1.18,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      // Reveal Animations on enter
      gsap.utils.toArray('[data-reveal]').forEach(el => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%'
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Smooth scroll handler for anchor links
  const handleNavigate = selector => {
    const target = document.querySelector(selector);
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.6 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const preloadImages = siteData.services.items.map(s => s.image);

  return (
    <>
      <Loader images={preloadImages} onDone={() => setLoaded(true)} />
      <CustomCursor />
      <Navbar site={siteData} onNavigate={handleNavigate} />
      <main>
        <ServicesWalkthrough site={siteData} loaded={loaded} onNavigate={handleNavigate} />
        <ProcessCarousel data={siteData.process} />
        <PromiseGrid data={siteData.promise} />
        <ContactForm data={siteData.cta} contact={siteData.contact} />
      </main>
      <Footer site={siteData} onNavigate={handleNavigate} />
      <ThemeSwitcher />
    </>
  );
}

