"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

function useScrollNav() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".nav");
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add("nav--scrolled");
      } else {
        nav.classList.remove("nav--scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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

/* ── Lightbox state ── */
/* ── 12 curated unique photos ── */
const galleryImages = [
  { src: "/images/project/aerial-villas.jpg",      label: "Aerial View" },
  { src: "/images/project/entrance-gate.jpg",      label: "Entrance" },
  { src: "/images/project/villa-exterior.jpg",     label: "Villa Exterior" },
  { src: "/images/project/rooftop-pool-2.jpg",     label: "Infinity Pool" },
  { src: "/images/project/street-view-2.jpg",      label: "Street View" },
  { src: "/images/project/amphitheatre.jpg",       label: "Amphitheatre" },
  { src: "/images/project/garden-landscape.jpg",   label: "Garden" },
  { src: "/images/project/clubhouse-exterior.jpg", label: "Clubhouse" },
  { src: "/images/project/sunken-seating.jpg",     label: "Sunken Seating" },
  { src: "/images/project/bedroom-4.jpg",          label: "Bedroom" },
  { src: "/images/project/open-living.jpg",        label: "Living Area" },
  { src: "/images/project/bathroom.jpg",           label: "Bathroom" },
];

export default function LandingPage() {
  useReveal();
  useScrollNav();

  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg = useCallback(() => setLightbox((p) => p !== null ? (p - 1 + galleryImages.length) % galleryImages.length : 0), []);
  const nextImg = useCallback(() => setLightbox((p) => p !== null ? (p + 1) % galleryImages.length : 0), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, prevImg, nextImg]);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav__logo-wrap">
          <div className="nav__logo-bg">
            <Image
              src="/ganapati-logo.jpg"
              alt="Ganapati Builders"
              width={36} height={36}
              style={{ objectFit: "contain", borderRadius: 6, flexShrink: 0, display: "block" }}
            />
          </div>
          <div className="nav__logo-divider" />
          <div className="nav__air-bg">
            <Image
              src="/air-logo.jpg"
              alt="Ganapati AIR"
              width={100} height={34}
              style={{ objectFit: "contain", display: "block" }}
            />
          </div>
        </div>
        <div className="nav__tag">Awakenings in Reflection</div>
      </nav>

      {/* 1. HERO */}
      <section className="hero" id="hero">
        {/* Hero background — responsive */}
        <div className="hero__bg">
          <Image src="/images/hero-mobile.png" alt="Ganapati AIR villa" fill sizes="100vw" priority style={{ objectFit: "cover" }} className="block md:hidden" />
          <Image src="/images/hero-desktop.jpg" alt="Ganapati AIR villa" fill sizes="100vw" priority style={{ objectFit: "cover" }} className="hidden md:block" />
        </div>
        {/* Gradient overlay */}
        <div className="hero__overlay" />
        {/* Content */}
        <div className="hero__content">
          <span className="hero__eyebrow">Managed Investment Villas</span>
          <h1 className="hero__title"><span>Ganapati AIR</span></h1>
          <p className="hero__subtitle"><span>Awakenings in Reflection</span></p>
          <p className="hero__desc">
            Managed luxury investment villas, 2 km from the Isha Foundation.
            Own a fully furnished villa, earn returns while your asset appreciates.
          </p>
          <div className="hero__chips">
            <span className="hero__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9"/></svg>
              56 Villas
            </span>
            <span className="hero__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              2 km from Isha
            </span>
            <span className="hero__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 5.18 2 2 0 015 3h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              45 min from BLR
            </span>
            <span className="hero__chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              RERA Approved
            </span>
          </div>
        </div>
        <div className="hero__location-tag">Kavaranahalli, Karnataka</div>
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar">
        <div className="wrap">
          <div className="stats-bar__inner">
            {[
              { val: "6.5", unit: "Acres",  label: "Land Parcel" },
              { val: "56",  unit: "",       label: "Villas" },
              { val: "54",  unit: "%",      label: "Open & Green" },
              { val: "2 BHK", unit: "",    label: "with Private Pool" },
              { val: "RERA", unit: "",     label: "Approved" },
              { val: "CUDA", unit: "",     label: "Approved" },
              { val: "E-Khata", unit: "",  label: "Clear Title" },
            ].map((s) => (
              <div key={s.label} className="stats-bar__item">
                <span className="stats-bar__val">{s.val}<span className="stats-bar__unit">{s.unit}</span></span>
                <span className="stats-bar__label">{s.label}</span>
              </div>
            ))}
          </div>
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

      {/* WHY DIFFERENT */}
      <section className="section whydiff" id="why-different">
        <div className="wrap">
          <div className="sec-header" style={{ maxWidth: 600 }}>
            <span className="sec-tag reveal">What Sets Us Apart</span>
            <h2 className="sec-title reveal-line"><span>Not just a villa.<br/>A managed investment.</span></h2>
          </div>
          <div className="whydiff__grid">
            {[
              { n: "01", t: "Fully Furnished",       d: "Move-in ready with curated furniture, fittings, and white goods. Nothing to source, nothing to arrange." },
              { n: "02", t: "Professionally Managed", d: "A dedicated hospitality operator handles bookings, guests, upkeep, and daily operations for you." },
              { n: "03", t: "Rental Income",          d: "Earn consistent revenue from every guest booking without any involvement. Income flows to you automatically." },
              { n: "04", t: "Long-term Appreciation", d: "Prime location near Isha Foundation with rapidly developing infrastructure means your asset grows in value." },
              { n: "05", t: "Hands-free Ownership",   d: "Own luxury real estate without any operational burden. Your villa runs itself. Your money works for you." },
            ].map((c) => (
              <div key={c.n} className="whydiff__card reveal">
                <div className="whydiff__num">{c.n}</div>
                <div className="whydiff__title">{c.t}</div>
                <div className="whydiff__desc">{c.d}</div>
              </div>
            ))}
          </div>
          <div className="whydiff__badge reveal">
            <span>Own</span><span className="whydiff__dot" /><span>Earn</span><span className="whydiff__dot" /><span>Appreciate</span>
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
                <h2 className="sec-title reveal-line"><span>The villa,<br/>in detail.</span></h2>
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
          <div className="sec-header" style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <span className="sec-tag reveal">Our Key Differentiator</span>
            <h2 className="sec-title reveal-line" style={{ color: "var(--white)" }}><span>More green.<br/>Less concrete.</span></h2>
            <p className="sec-body reveal" style={{ color: "rgba(250,250,248,0.6)", maxWidth: 520, margin: "0 auto" }}>
              Most projects in Bangalore use up to 55% of land for saleable plots.
              We use only 46%. That means 54% of the entire project stays open, green, and breathable.
            </p>
          </div>

          {/* Visual bar comparison */}
          <div className="openspace__bars reveal">
            <div className="openspace__bar-row">
              <div className="openspace__bar-name">Typical Project</div>
              <div className="openspace__bar-track">
                <div className="openspace__bar-fill openspace__bar-fill--built" style={{ width: "55%" }}>
                  <span>55% Built</span>
                </div>
                <div className="openspace__bar-fill openspace__bar-fill--green" style={{ width: "45%" }}>
                  <span>45% Open</span>
                </div>
              </div>
            </div>
            <div className="openspace__bar-row openspace__bar-row--air">
              <div className="openspace__bar-name">Ganapati AIR</div>
              <div className="openspace__bar-track">
                <div className="openspace__bar-fill openspace__bar-fill--built" style={{ width: "46%" }}>
                  <span>46% Built</span>
                </div>
                <div className="openspace__bar-fill openspace__bar-fill--green openspace__bar-fill--green-air" style={{ width: "54%" }}>
                  <span>54% Open 🌿</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits row */}
          <div className="openspace__benefits reveal">
            {[
              { icon: "🌳", title: "More Trees", desc: "15 to 16% of land dedicated to parks and green buffers" },
              { icon: "🏞️", title: "Lake Buffer", desc: "Natural lake boundary preserved, no encroachment" },
              { icon: "🏡", title: "More Privacy", desc: "Greater spacing between villas, less crowding" },
              { icon: "🍃", title: "Fresh Air", desc: "Better natural ventilation across the entire layout" },
            ].map((b) => (
              <div key={b.title} className="openspace__benefit">
                <div className="openspace__benefit-icon">{b.icon}</div>
                <div className="openspace__benefit-title">{b.title}</div>
                <div className="openspace__benefit-desc">{b.desc}</div>
              </div>
            ))}
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

      {/* HOW IT WORKS */}
      <section className="section howitworks" id="how-it-works">
        <div className="wrap">
          <div className="sec-header" style={{ maxWidth: 600 }}>
            <span className="sec-tag reveal">How It Works</span>
            <h2 className="sec-title reveal-line"><span>The revenue<br/>share model.</span></h2>
            <p className="sec-body reveal">A simple, transparent model designed to make your villa work for you from day one.</p>
          </div>
          <div className="howitworks__steps">
            {[
              { n: "01", t: "You buy the villa",              d: "Secure your fully furnished 2 BHK villa with a private pool at Rs. 2.68 Cr, turnkey." },
              { n: "02", t: "Villa is fully ready",           d: "Furnished, fitted with white goods, landscaped, and completely turnkey upon possession." },
              { n: "03", t: "Operator takes over",           d: "A dedicated hospitality company handles all bookings, guest services, and upkeep." },
              { n: "04", t: "Guests book and stay",          d: "Travellers and spiritual seekers near Isha Foundation fill your villa year-round." },
              { n: "05", t: "Revenue shared 50:50",          d: "Net rental proceeds split equally between you and the operator. Transparent, agreed upfront.", highlight: true },
              { n: "06", t: "You earn while asset grows",    d: "Passive rental income every month, plus long-term capital appreciation in a prime corridor." },
            ].map((s, i) => (
              <div key={s.n} className={`howitworks__step reveal${(s as {highlight?: boolean}).highlight ? " howitworks__step--hl" : ""}`}>
                <div className="howitworks__step-num">{s.n}</div>
                <div className="howitworks__step-body">
                  <div className="howitworks__step-title">{s.t}</div>
                  <div className="howitworks__step-desc">{s.d}</div>
                </div>
                {i < 5 && <div className="howitworks__connector" />}
              </div>
            ))}
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

      {/* INFRASTRUCTURE */}
      <section className="section infra" id="infrastructure">
        <div className="wrap">
          <div className="sec-header" style={{ maxWidth: 600 }}>
            <span className="sec-tag reveal">Infrastructure</span>
            <h2 className="sec-title reveal-line"><span>Built with care.<br/>Designed to last.</span></h2>
            <p className="sec-body reveal">Every layer of infrastructure planned for longevity, sustainability, and quiet comfort.</p>
          </div>
          <div className="infra__grid">
            {[
              { n: "01", t: "Security",              d: "Gated community with 24/7 manned security, CCTV surveillance, and controlled access." },
              { n: "02", t: "Water Supply",          d: "Dedicated borewell and overhead tank with pressurized distribution to every villa." },
              { n: "03", t: "Electricity",           d: "BESCOM-approved infrastructure with dedicated transformer and underground cabling." },
              { n: "04", t: "Service Connections",   d: "Underground utility ducting for water, electricity, and communication lines to every plot." },
              { n: "05", t: "Street Lighting",       d: "Energy-efficient LED lighting across all internal roads and common areas." },
              { n: "06", t: "Rainwater Harvesting",  d: "Integrated pits across the layout for sustainable groundwater recharge." },
              { n: "07", t: "Sewage Treatment",      d: "On-site STP for eco-friendly waste processing with treated water reused for landscaping." },
              { n: "08", t: "Fibre-ready",           d: "High-speed internet, DTH, and intercom infrastructure ready for every villa." },
            ].map((f) => (
              <div key={f.n} className="infra__item reveal">
                <span className="infra__num">{f.n}</span>
                <div>
                  <div className="infra__title">{f.t}</div>
                  <div className="infra__desc">{f.d}</div>
                </div>
              </div>
            ))}
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
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`gallery__item reveal gallery__item--${i}`}
                onClick={() => setLightbox(i)}
                aria-label={`Preview ${img.label}`}
              >
                <Image src={img.src} alt={img.label} fill sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                <div className="gallery__overlay">
                  <div className="gallery__zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <line x1="16.5" y1="16.5" x2="22" y2="22" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                  <span className="gallery__overlay-label">{img.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="glightbox" onClick={closeLightbox}>
          <button className="glightbox__close" onClick={closeLightbox} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <button className="glightbox__nav glightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prevImg(); }} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div className="glightbox__img" onClick={(e) => e.stopPropagation()}>
            <Image src={galleryImages[lightbox].src} alt={galleryImages[lightbox].label} fill sizes="90vw" style={{ objectFit: "contain" }} priority />
            <span className="glightbox__caption">{galleryImages[lightbox].label}</span>
          </div>
          <button className="glightbox__nav glightbox__nav--next" onClick={(e) => { e.stopPropagation(); nextImg(); }} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div className="glightbox__dots">
            {galleryImages.map((_, i) => (
              <button key={i} className={`glightbox__dot${i === lightbox ? " active" : ""}`} onClick={(e) => { e.stopPropagation(); setLightbox(i); }} aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        </div>
      )}

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

          </div>
        </div>
        {/* Full map embed */}
        <div className="footer__map">
          <iframe
            title="Ganapati AIR Location"
            src="https://maps.google.com/maps?q=FPMJ%2B953,+Kavaranahalli,+Karnataka+562101&output=embed&z=15"
            width="100%"
            height="320"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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
          <span>DVP</span>
          <a href="https://socialmusketeers.in" target="_blank" rel="noopener noreferrer">socialmusketeers.in</a>
        </div>
      </footer>
    </>
  );
}
