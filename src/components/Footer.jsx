import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrandLogo, WhatsAppIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export function Footer({ site, onNavigate }) {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer__giant span', {
        yPercent: 100,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer__giant',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <>
      <footer className="footer" ref={footerRef}>
        <div className="footer__top">
          <div className="footer__brand">
            <BrandLogo className="footer__logo" />
            <p>{site.footer.note}</p>
          </div>

          <div className="footer__col">
            <small>Explore</small>
            {site.nav.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={e => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer__col">
            <small>Disciplines</small>
            {site.services.items.slice(0, 6).map(item => (
              <span key={item.title.join(' ')}>{item.title.join(' ')}</span>
            ))}
          </div>

          <div className="footer__col">
            <small>Atelier</small>
            {site.contact.phones.map(phone => (
              <a key={phone} href={`tel:+91${phone.replace(/\s/g, '')}`}>
                {phone}
              </a>
            ))}
            <span>{site.contact.address.join(', ')}</span>
          </div>
        </div>

        {/* Giant architectural watermark */}
        <div className="footer__giant" aria-hidden="true">
          {'AURA ATELIER'.split('').map((char, idx) => (
            <span key={idx}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.brand.full}
          </span>
          <span className="footer__tag">— {site.brand.tagline} —</span>
          <a href="#top" onClick={e => handleLinkClick(e, '#top')}>
            Back to top ↑
          </a>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        className="wa-float"
        href={`https://wa.me/${site.contact.whatsapp}?text=Hi%20Aura%20Atelier%2C%20I%20would%20like%20to%20discuss%20a%20private%20architectural%20commission.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with Atelier"
        data-cursor="Connect"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
