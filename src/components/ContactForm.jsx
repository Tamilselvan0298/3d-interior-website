import React, { useState } from 'react';
import { Icon, WhatsAppIcon } from './Icons';

export function ContactForm({ data, contact }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: data.services[0],
    area: '',
    message: ''
  });

  const handleChange = field => e => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const lines = [
      'Hi Aura Architectural Atelier, I would like to inquire about a project.',
      `Client Name: ${formData.name}`,
      `Contact Phone: ${formData.phone}`,
      `Discipline: ${formData.service}`,
      formData.area && `Location / City: ${formData.area}`,
      formData.message && `Project Scope: ${formData.message}`
    ].filter(Boolean);

    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  };

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;

  return (
    <section className="contact" id="contact">
      <header className="contact__head" data-reveal="true">
        <p className="eyebrow">
          <span className="dot" /> {data.label}
        </p>
        <h2 className="display display--xl">
          {data.title[0]}
          <br />
          <em>{data.title[1]}</em>
        </h2>
        <p className="contact__lead">{data.text}</p>
      </header>

      <div className="contact__grid">
        <form className="form" onSubmit={handleSubmit} data-reveal="true">
          <label className="field">
            <input
              required
              value={formData.name}
              onChange={handleChange('name')}
              placeholder=" "
              autoComplete="name"
            />
            <span>Your name</span>
          </label>

          <label className="field">
            <input
              required
              value={formData.phone}
              onChange={handleChange('phone')}
              placeholder=" "
              inputMode="tel"
              autoComplete="tel"
              pattern="[0-9 +\-]{10,15}"
            />
            <span>Phone number</span>
          </label>

          <label className="field field--select">
            <select value={formData.service} onChange={handleChange('service')}>
              {data.services.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <span>Discipline</span>
          </label>

          <label className="field">
            <input
              value={formData.area}
              onChange={handleChange('area')}
              placeholder=" "
            />
            <span>Location / City</span>
          </label>

          <label className="field field--wide">
            <textarea
              rows="3"
              value={formData.message}
              onChange={handleChange('message')}
              placeholder=" "
            />
            <span>Tell us about your space and timeline (optional)</span>
          </label>

          <button className="btn btn--gold btn--lg" type="submit">
            <WhatsAppIcon className="btn__wa" />
            <span>Connect on WhatsApp</span>
          </button>
        </form>

        <aside className="contact__info" data-reveal="true">
          <div className="info-row">
            <Icon name="phone" />
            <div>
              <small>Private Line</small>
              {contact.phones.map(phone => (
                <a
                  key={phone}
                  href={`tel:+91${phone.replace(/\s/g, '')}`}
                  className="info-big"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          <div className="info-row">
            <Icon name="pin" />
            <div>
              <small>Visit the Atelier</small>
              <address>
                {contact.address.map(line => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <span className="info-hours">{contact.hours}</span>
            </div>
          </div>

          <div className="info-row">
            <Icon name="globe" />
            <div>
              <small>Digital Atelier</small>
              <a href={`https://${contact.website}`} target="_blank" rel="noopener">
                {contact.website}
              </a>
            </div>
          </div>

          <div className="map">
            <iframe
              title="Aura Architectural Atelier on Google Maps"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
