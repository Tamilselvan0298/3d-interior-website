import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrandLogo } from './Icons';

gsap.registerPlugin(ScrollTrigger);

export function Navbar({ site, onNavigate }) {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        const scrollY = self.scroll();
        navRef.current?.classList.toggle('is-scrolled', scrollY > 40);
        navRef.current?.classList.toggle('is-hidden', self.direction === 1 && scrollY > window.innerHeight * 0.9);
      }
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    if (menuOpen) {
      window.__lenis?.stop();
    } else {
      window.__lenis?.start();
    }
  }, [menuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      onNavigate(href);
    }, menuOpen ? 350 : 0);
  };

  const primaryPhone = site.contact.phones[0];
  const rawPhone = primaryPhone.replace(/\s/g, '');

  return (
    <header className={`nav ${menuOpen ? 'is-open' : ''}`} ref={navRef}>
      <a
        href="#top"
        className="nav__brand"
        onClick={e => handleLinkClick(e, '#top')}
        aria-label={site.brand.full}
      >
        <BrandLogo className="nav__logo" />
        <span className="nav__name">
          <b>AURA</b> Atelier
          <small>Architectural Studio</small>
        </span>
      </a>

      <nav className="nav__links" aria-label="Primary">
        {site.nav.map(item => (
          <a
            key={item.href}
            href={item.href}
            onClick={e => handleLinkClick(e, item.href)}
            className="link-roll"
          >
            <span data-text={item.label}>{item.label}</span>
          </a>
        ))}
      </nav>

      <a className="btn btn--gold nav__cta" href={`tel:+91${rawPhone}`}>
        <span>{primaryPhone}</span>
      </a>

      <button
        className="nav__burger"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Menu"
        aria-expanded={menuOpen}
      >
        <i />
        <i />
      </button>

      <div className="menu" aria-hidden={!menuOpen}>
        <div className="menu__links">
          {site.nav.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={e => handleLinkClick(e, item.href)}
              style={{ '--i': idx }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <small>0{idx + 1}</small>
              {item.label}
            </a>
          ))}
        </div>

        <div className="menu__foot">
          {site.contact.phones.map(p => (
            <a key={p} href={`tel:+91${p.replace(/\s/g, '')}`} tabIndex={menuOpen ? 0 : -1}>
              {p}
            </a>
          ))}
          <p>{site.contact.address.join(', ')}</p>
        </div>
      </div>
    </header>
  );
}
