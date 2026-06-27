"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Calculator from "./Calculator";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-line");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function OpenSpaceChart() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const Bar = (h: string, delay: string, cls: string, label: string) => (
    <div className={`openspace__bar ${cls}`} style={{ height: on ? h : "0%", transitionDelay: delay }}>{label}</div>
  );
  return (
    <div className="openspace__chart" ref={ref}>
      <div className="openspace__bar-group">
        <div className="openspace__bar-wrap">
          {Bar("55%", "0s",    "openspace__bar--built",        "55%")}
          {Bar("45%", "0.15s", "openspace__bar--open-typical", "45%")}
        </div>
        <div className="openspace__bar-label">Built · Open</div>
        <div className="openspace__bar-title">Typical Project</div>
      </div>
      <div className="openspace__vs">vs</div>
      <div className="openspace__bar-group">
        <div className="openspace__bar-wrap">
          {Bar("46%", "0s",    "openspace__bar--built-air", "46%")}
          {Bar("54%", "0.15s", "openspace__bar--open-air",  "54%")}
        </div>
        <div className="openspace__bar-label">Built · Open</div>
        <div className="openspace__bar-title">Ganapati AIR</div>
      </div>
    </div>
  );
}

/* ── 20 curated real project photos, zero duplicates ── */
const galleryImages = [
  { src: "/images/project/aerial-villas.jpg",      label: "Aerial View" },
  { src: "/images/project/aerial-masterplan.jpg",  label: "Master Plan" },
  { src: "/images/project/arched-walkway.jpg",     label: "Arched Walkway" },
  { src: "/images/project/entrance-gate.jpg",      label: "Entrance" },
  { src: "/images/project/villa-exterior.jpg",     label: "Villa Exterior" },
  { src: "/images/project/rooftop-pool-2.jpg",     label: "Infinity Pool" },
  { src: "/images/project/amphitheatre.jpg",       label: "Amphitheatre" },
  { src: "/images/project/park-sculpture.jpg",     label: "Landscaped Park" },
  { src: "/images/project/garden-landscape.jpg",   label: "Garden" },
  { src: "/images/project/clubhouse-exterior.jpg", label: "Clubhouse" },
  { src: "/images/project/sunken-seating.jpg",     label: "Sunken Seating" },
  { src: "/images/project/street-view-2.jpg",      label: "Street View" },
  { src: "/images/project/master-bedroom.jpg",     label: "Master Bedroom" },
  { src: "/images/project/bedroom-4.jpg",          label: "Bedroom" },
  { src: "/images/project/open-living.jpg",        label: "Living Area" },
  { src: "/images/project/loft-interior.jpg",      label: "Living Space" },
  { src: "/images/project/bathroom.jpg",           label: "Bathroom" },
  { src: "/images/project/powder-room.jpg",        label: "Powder Room" },
  { src: "/images/project/driveway-2.jpg",         label: "Driveway" },
  { src: "/images/project/rooftop-pool.jpg",       label: "Pool Deck" },
];

export default function LandingPage() {
  useReveal();

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav__logo-wrap">
          <Image
            src="/ganapati-logo.jpg"
            alt="Ganapati Builders"
            width={40} height={40}
            style={{ objectFit: "contain", borderRadius: 7, flexShrink: 0 }}
          />
          <div className="nav__logo-divider" />
          <Image
              src="/air-logo.jpg"
              alt="Ganapati AIR"
              width={110} height={38}
              style={{ objectFit: "contain", display: "block" }}
            />
        </div>
        <div className="nav__tag">Awakenings in Reflection</div>
      </nav>

      {/* 1. HERO */}
      <section className="hero" id="hero">
        <div className="hero__left">
          <span className="hero__eyebrow reveal">Managed Investment Villas</span>
          <h1 className="hero__title reveal-line"><span>Ganapati AIR</span></h1>
          <p className="hero__subtitle reveal-line"><span>Awakenings in Reflection</span></p>
          <p className="hero__desc reveal">
            Managed luxury investment villas, 2 km from the Isha Foundation.
            Own a fully furnished villa, let a professional operator run it as
            a hospitality asset, and earn returns while your asset appreciates.
          </p>
          <div className="hero__chips reveal">
            <span className="hero__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9"/></svg>
              56 Villas
            </span>
            <span className="hero__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              2 km from Isha Foundation
            </span>
            <span className="hero__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 5.18 2 2 0 015 3h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              45 min from BLR Airport
            </span>
            <span className="hero__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              RERA Approved
            </span>
          </div>
        </div>
        <div className="hero__right">
          <Image
            src="/images/project/rooftop-pool-2.jpg"
            alt="Ganapati AIR infinity pool"
            fill sizes="(max-width:900px) 100vw, 50vw"
            priority style={{ objectFit: "cover" }}
          />
          <div className="hero__right-caption">Kavaranahalli, Karnataka 562101</div>
        </div>
      </section>

      {/* 2. OPPORTUNITY */}
      <section className="section opportunity" id="opportunity">
        <div className="wrap">
          <div className="opportunity__inner">
            <div className="opportunity__image reveal">
              <Image src="/images/project/aerial-villas.jpg" alt="Aerial view of Ganapati AIR" fill sizes="(max-width:900px) 100vw, 40vw" style={{ objectFit: "cover", borderRadius: "2px" }} />
            </div>
            <div>
              <div className="sec-header">
                <span className="sec-tag reveal">The Opportunity</span>
                <h2 className="sec-title reveal-line"><span>Your villa.<br/>Managed for you.</span></h2>
                <p className="sec-body reveal">
                  Ganapati AIR is designed as a managed investment asset, not just a second home.
                  You purchase a fully furnished, turnkey villa. A professional property manager
                  operates it as a short-stay hospitality property and handles everything:
                  guests, upkeep, and operations.
                </p>
                <p className="sec-body reveal" style={{ marginTop: "16px" }}>
                  Rental income is shared with you, while the asset itself appreciates over time.
                  It is a hands-off ownership model: your villa works for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT OVERVIEW */}
      <section className="section overview" id="overview">
        <div className="wrap">
          <div className="overview__grid">
            <div>
              <div className="sec-header">
                <span className="sec-tag reveal">Project Overview</span>
                <h2 className="sec-title reveal-line"><span>What you own</span></h2>
              </div>
              <ul className="overview__list">
                {[
                  "56 fully furnished villas set on approximately 6 acres",
                  "2 BHK layout, delivered turnkey with all white goods, private swimming pool, power backup, and complete furnishing included",
                  "Two villa configurations available",
                  "Possession approximately 3 years from launch",
                ].map((item) => (
                  <li key={item} className="overview__list-item reveal">
                    <span className="overview__bullet" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="rera-badge reveal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                <div>
                  <div className="rera-badge__label">RERA Approved</div>
                  <div className="rera-badge__number">PRM/KA/RERA/1254/460/PR/161225/008340</div>
                </div>
              </div>
            </div>
            <div className="reveal">
              <table className="overview__table">
                <thead>
                  <tr>
                    <th>Configuration</th>
                    <th>Plot Size</th>
                    <th>Built-up Area</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Type A</td><td>1,750 sq ft</td><td>1,700 sq ft</td></tr>
                  <tr><td>Type B</td><td>1,500 sq ft</td><td>1,600 sq ft</td></tr>
                </tbody>
              </table>
              <p className="overview__table-note">Both types include private pool, full furnishing, and white goods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOCATION */}
      <section className="section location" id="location">
        <div className="wrap">
          <div className="location__inner">
            <div className="location__map reveal">
              <iframe
                title="Ganapati AIR Location"
                src="https://maps.google.com/maps?q=FPMJ%2B953,+Kavaranahalli,+Karnataka+562101&output=embed&z=15"
                style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div>
              <div className="sec-header">
                <span className="sec-tag reveal">Location and Connectivity</span>
                <h2 className="sec-title reveal-line"><span>Serenity.<br/>Well-connected.</span></h2>
                <p className="sec-body reveal">
                  A serene, reflective location near Isha, with strong airport connectivity
                  making it equally suited to personal retreats and hospitality guests.
                </p>
              </div>
              <div className="location__facts">
                {[
                  { icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>, title: "2 km from Isha Foundation", desc: "Steps from one of the world's most visited spiritual destinations, attracting millions of visitors annually." },
                  { icon: <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 5.18 2 2 0 015 3h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>, title: "45 min from BLR International Airport", desc: "Strong airport connectivity ensures a consistent flow of domestic and international guests." },
                  { icon: <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>, title: "Strong growth corridor", desc: "Proximity to Foxconn campus, Deep Tech Park, Ramaiah Medical Campus, and Nandi Hills eco-tourism." },
                ].map((f, i) => (
                  <div key={i} className="location__fact reveal">
                    <div className="location__fact-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                    </div>
                    <div>
                      <div className="location__fact-title">{f.title}</div>
                      <div className="location__fact-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://maps.app.goo.gl/9doFd11JoS5UNYbAA" target="_blank" rel="noopener noreferrer" className="location__map-cta reveal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OPEN SPACE */}
      <section className="section openspace" id="openspace">
        <div className="wrap">
          <div className="openspace__inner">
            <div>
              <div className="sec-header">
                <span className="sec-tag reveal">Our Key Differentiator</span>
                <h2 className="sec-title reveal-line"><span>Wide-open<br/>greens.</span></h2>
                <p className="sec-body reveal">
                  Most plotted developments in Bangalore use up to 55% of land as saleable plots.
                  Ganapati AIR uses only 46%. That extra 9% is not sold — it stays as parks,
                  green buffers, and open walkways for residents.
                </p>
                <p className="sec-body reveal" style={{ marginTop: 12 }}>
                  More open land means more trees, better air, more privacy between villas,
                  and a genuinely resort-like setting — not just on paper, but in daily life.
                </p>
              </div>
              <div className="openspace__stat-line reveal">
                <div className="openspace__stat-num">46%</div>
                <div className="openspace__stat-label">actual plotted area vs 55% permitted</div>
              </div>
              <div className="openspace__green-panel reveal">
                <div className="openspace__green-cell openspace__green-cell--built">
                  <div className="openspace__green-cell-pct">55%</div>
                  <div className="openspace__green-cell-label">Typical project</div>
                  <div className="openspace__green-cell-note">Max saleable land used</div>
                </div>
                <div className="openspace__green-cell openspace__green-cell--open">
                  <div className="openspace__green-cell-pct">46%</div>
                  <div className="openspace__green-cell-label">Ganapati AIR</div>
                  <div className="openspace__green-cell-note">9% more kept as open green space</div>
                </div>
              </div>
              <div className="openspace__pills reveal">
                {["15 to 16% dedicated parks", "Lake buffer preserved", "Better privacy", "More greenery", "Better ventilation"].map((p) => (
                  <span key={p} className="openspace__pill">{p}</span>
                ))}
              </div>
            </div>
            <OpenSpaceChart />
          </div>
        </div>
      </section>

      {/* 6. INVESTMENT MODEL */}
      <section className="section model" id="model">
        <div className="wrap">
          <div className="sec-header" style={{ maxWidth: 640 }}>
            <span className="sec-tag reveal">Investment Model</span>
            <h2 className="sec-title reveal-line"><span>Simple.<br/>Transparent.</span></h2>
            <p className="sec-body reveal">
              A fully managed model designed to give you the returns of a hospitality
              business without any of the operational burden.
            </p>
          </div>
          <div className="model__grid">
            {[
              { n: "01", t: "You Invest", d: "Purchase a fully furnished, ready-to-operate villa at Rs. 2.68 Cr, turnkey, with pool, white goods, and all furnishing included." },
              { n: "02", t: "Operator Manages", d: "A professional property manager operates the villa as a short-stay hospitality asset. Guests, upkeep, and operations are all handled." },
              { n: "03", t: "Revenue Split 50/50", d: "Rental revenue is shared equally between you and the property manager. Transparent, agreed upfront, no hidden deductions." },
              { n: "04", t: "Zero Operating Cost", d: "All operating costs including villa upkeep, clubhouse, and full infrastructure maintenance are borne by the property manager, not you." },
            ].map((c) => (
              <div key={c.n} className="model__card reveal">
                <div className="model__card-num">{c.n}</div>
                <div className="model__card-title">{c.t}</div>
                <div className="model__card-desc">{c.d}</div>
              </div>
            ))}
          </div>
          <div className="model__note reveal">
            The property manager is currently being finalised. Details to be confirmed and shared with interested buyers.
          </div>
        </div>
      </section>

      {/* 7. RETURNS */}
      <section className="section returns" id="returns">
        <div className="wrap">
          <div className="returns__inner">
            <div>
              <div className="sec-header">
                <span className="sec-tag reveal">Illustrative Returns</span>
                <h2 className="sec-title reveal-line"><span>What you<br/>could earn</span></h2>
                <p className="sec-body reveal">
                  Based on an average tariff of Rs. 21,000 per villa per night and a 50% revenue
                  share to the owner, against the Rs. 2.68 Cr villa price. Returns commence after
                  possession (approximately 3 years), once operations stabilise.
                </p>
              </div>
              <div className="returns__table-wrap reveal">
                <table className="returns__table">
                  <thead>
                    <tr>
                      <th>Occupancy</th>
                      <th>Owner Annual Share (50%)</th>
                      <th>Return on Rs. 2.68 Cr</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>35% (base case)</td><td>Rs. 13,41,375</td><td>5.0%</td></tr>
                    <tr><td>50%</td><td>Rs. 19,16,250</td><td>7.1%</td></tr>
                    <tr><td>65%</td><td>Rs. 24,91,125</td><td>9.3%</td></tr>
                    <tr><td>75%</td><td>Rs. 28,74,375</td><td>10.7%</td></tr>
                  </tbody>
                </table>
                <p className="returns__disclaimer">
                  These figures are illustrative projections only and do not constitute guaranteed or assured returns.
                  Actual returns depend on market conditions, occupancy, and operator performance.
                </p>
              </div>
            </div>
            <div className="returns__highlights">
              {[
                { val: "5.0%",     label: "Base case return",      note: "At just 35% occupancy, conservative scenario" },
                { val: "10.7%",    label: "Optimistic return",      note: "At 75% occupancy, scaling meaningfully" },
                { val: "Rs. 21K",  label: "Average nightly tariff", note: "Basis for all illustrative projections" },
                { val: "50:50",    label: "Revenue split",          note: "Equal share between owner and operator" },
              ].map((h) => (
                <div key={h.val} className="returns__highlight reveal">
                  <div className="returns__highlight-val">{h.val}</div>
                  <div className="returns__highlight-label">{h.label}</div>
                  <div className="returns__highlight-note">{h.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <Calculator />

      {/* 8. PRICING */}
      <section className="section pricing" id="pricing">
        <div className="wrap">
          <div className="pricing__inner">
            <div>
              <div className="sec-header">
                <span className="sec-tag reveal">Pricing</span>
                <h2 className="sec-title reveal-line"><span>Everything<br/>included.</span></h2>
                <p className="sec-body reveal">
                  One all-in price. No hidden extras. Furnishing, white goods, and private pool
                  are all part of the Rs. 2.68 Cr.
                </p>
              </div>
              <div className="pricing__price reveal">Rs. 2.68 Cr</div>
              <div className="pricing__price-label reveal">Per villa, fully furnished and inclusive</div>
              <div className="pricing__includes reveal">
                {["Private swimming pool", "Full furnishing, move-in ready", "All white goods included", "Power backup", "Professional landscaping"].map((item) => (
                  <div key={item} className="pricing__include-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="pricing__payment reveal">
              <div className="pricing__payment-title">Payment Plan</div>
              <div className="pricing__payment-item">
                <span className="pricing__payment-step">On Plot Registration</span>
                <span className="pricing__payment-val">50%</span>
              </div>
              <div className="pricing__payment-item">
                <span className="pricing__payment-step">Construction-linked</span>
                <span className="pricing__payment-val">50%</span>
              </div>
              <p style={{ fontSize: "var(--sub)", color: "rgba(250,250,248,0.4)", marginTop: "16px", fontStyle: "italic" }}>
                Construction-linked plan details available on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. AMENITIES */}
      <section className="section amenities" id="amenities">
        <div className="wrap">
          <div className="amenities__inner">
            <div>
              <div className="sec-header">
                <span className="sec-tag reveal">Amenities</span>
                <h2 className="sec-title reveal-line"><span>A resort within<br/>your project.</span></h2>
              </div>
              <div className="amenities__grid">
                <div className="reveal">
                  <div className="amenities__col-title">Clubhouse</div>
                  <ul className="amenities__list">
                    {["Swimming pool", "Business room", "Kids play area"].map((a) => (
                      <li key={a} className="amenities__item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="reveal">
                  <div className="amenities__col-title">Developer Commercial</div>
                  <ul className="amenities__list">
                    {["Restaurant", "Banquet hall", "Spa", "Amphitheatre"].map((a) => (
                      <li key={a} className="amenities__item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="amenities__image reveal">
              <Image src="/images/project/clubhouse-exterior.jpg" alt="Clubhouse" fill sizes="(max-width:900px) 100vw, 45vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* 10. GALLERY */}
      <section className="section gallery" id="gallery">
        <div className="wrap">
          <div className="sec-header" style={{ maxWidth: 640 }}>
            <span className="sec-tag reveal">Gallery</span>
            <h2 className="sec-title reveal-line"><span>See it.</span></h2>
            <p className="sec-body reveal">Every space. Every detail.</p>
          </div>
          <div className="gallery__grid">
            {galleryImages.map((img) => (
              <div key={img.src} className="gallery__item reveal">
                <Image src={img.src} alt={img.label} fill sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                <div className="gallery__label">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <div>
            <div className="footer__brand-logo">
              <Image src="/ganapati-logo.jpg" alt="Ganapati Builders" width={52} height={52} style={{ objectFit: "contain", borderRadius: 8 }} />
              <Image src="/air-logo.jpg" alt="Ganapati AIR" width={100} height={36} style={{ objectFit: "contain" }} />
            </div>
            <div className="footer__brand-name">Ganapati AIR</div>
            <div className="footer__brand-tag">Awakenings in Reflection</div>
            <div className="footer__rera-badge">
              <div className="footer__rera-badge-label">RERA Approved</div>
              <div className="footer__rera-badge-num">PRM/KA/RERA/1254/460/PR/161225/008340</div>
            </div>

          </div>
          <div>
            <div className="footer__col-title">Project</div>
            <div className="footer__col-item">56 Managed Villas</div>
            <div className="footer__col-item">2 BHK with Private Pool</div>
            <div className="footer__col-item">Possession in approximately 3 Years</div>
            <div className="footer__col-item" style={{ marginTop: 16 }}>FPMJ+953, Kavaranahalli,<br />Karnataka 562101</div>
            <div className="footer__col-item">
              <a href="https://maps.app.goo.gl/9doFd11JoS5UNYbAA" target="_blank" rel="noopener noreferrer" className="footer__map-link">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z"/><circle cx="8" cy="6" r="1.8"/></svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__disclaimer">
            All images and projections on this page are illustrative and indicative only.
            Figures, returns, and projections are subject to change and do not constitute
            guaranteed or assured returns. This page is for informational purposes only.
            Detailed brochure coming soon.
          </p>

        </div>
        <div className="footer__credit">
          <span>DVP —</span>
          <a href="https://socialmusketeers.in" target="_blank" rel="noopener noreferrer">socialmusketeers.in</a>
        </div>
      </footer>
    </>
  );
}
