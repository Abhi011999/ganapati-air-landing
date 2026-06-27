"use client";

import { useState, useEffect, useRef } from "react";

function fmtVal(n: number) {
  if (n >= 10000000) return `Rs. ${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `Rs. ${(n / 100000).toFixed(1)} L`;
  return `Rs. ${n.toLocaleString("en-IN")}`;
}

function LiveNumber({ value, fmt, accent = false }: { value: number; fmt: (n: number) => string; accent?: boolean }) {
  const [display, setDisplay]   = useState(value);
  const [flashing, setFlashing] = useState(false);
  const frameRef  = useRef<number>(0);
  const fromRef   = useRef<number>(value);
  const flashRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fromRef.current = display;
    const start = performance.now();
    const from  = fromRef.current;
    const to    = value;
    const dur   = 500;

    // flash glow on change
    setFlashing(true);
    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = setTimeout(() => setFlashing(false), 600);

    const run = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * e);
      if (t < 1) frameRef.current = requestAnimationFrame(run);
    };
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(run);
    return () => {
      cancelAnimationFrame(frameRef.current);
      if (flashRef.current) clearTimeout(flashRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span className={`live-num${flashing ? (accent ? " live-num--flash-accent" : " live-num--flash") : ""}`}>
      {fmt(display)}
    </span>
  );
}

const OCC = [
  { label: "35%", sub: "Conservative", value: 35 },
  { label: "50%", sub: "Moderate",     value: 50 },
  { label: "75%", sub: "Optimistic",   value: 75 },
];

export default function Calculator() {
  const [occ, setOcc]     = useState(50);
  const [years, setYears] = useState(5);

  const PRICE   = 26800000;
  const ADR     = 21000;
  const APPRATE = 10;

  const annual      = ADR * (occ / 100) * 365 * 0.5;
  const yieldPct    = (annual / PRICE) * 100;
  const futureVal   = PRICE * Math.pow(1 + APPRATE / 100, years);
  const totalReturn = annual * years + (futureVal - PRICE);

  return (
    <section className="section calc" id="calculator">
      <div className="wrap">
        <div className="calc__top reveal">
          <span className="sec-tag">Returns Calculator</span>
          <h2 className="sec-title" style={{ marginTop: 10 }}><span>Run the numbers.</span></h2>
          <p className="calc__nature-line">
            <svg className="calc__leaf" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c0 0-8-4-8-12a8 8 0 0 1 16 0c0 8-8 12-8 12z"/>
              <path d="M12 22V10"/>
              <path d="M8 14l4-4 4 4"/>
            </svg>
            Your villa earns while nature breathes around it
          </p>
        </div>

        <div className="calc__compact reveal">

          {/* ── Controls row ── */}
          <div className="calc__controls">

            {/* Occupancy */}
            <div className="calc__field">
              <div className="calc__field-label">Occupancy</div>
              <div className="calc__occ-row">
                {OCC.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    className={`calc__occ-btn${occ === s.value ? " active" : ""}`}
                    onClick={() => setOcc(s.value)}
                  >
                    <span className="calc__occ-pct">{s.label}</span>
                    <span className="calc__occ-sub">{s.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Horizon */}
            <div className="calc__field">
              <div className="calc__field-label">Horizon</div>
              <div className="calc__horizon-big">
                <span className="calc__horizon-num">{years}</span>
                <span className="calc__horizon-unit">yrs</span>
              </div>
              <input
                type="range" min={3} max={15} step={1} value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="calc__slider"
              />
              <div className="calc__range-labels"><span>3 yrs</span><span>15 yrs</span></div>
            </div>
          </div>

          {/* ── Results row ── */}
          <div className="calc__results-row">
            <div className="calc__result-cell">
              <div className="calc__result-label">Annual income</div>
              <div className="calc__result-num">
                <LiveNumber value={annual} fmt={fmtVal} />
              </div>
              <div className="calc__result-sub">{yieldPct.toFixed(1)}% yield</div>
            </div>
            <div className="calc__result-divider" />
            <div className="calc__result-cell calc__result-cell--accent">
              <div className="calc__result-label">Total over {years} yrs</div>
              <div className="calc__result-num">
                <LiveNumber value={totalReturn} fmt={fmtVal} accent />
              </div>
              <div className="calc__result-sub">rental + appreciation</div>
            </div>
          </div>

          {/* Live bar */}
          <div className="calc__livebar">
            <div className="calc__livebar-fill" style={{ width: `${Math.min((yieldPct / 15) * 100, 100)}%` }} />
          </div>

        </div>

        <div className="calc__footer-row reveal">
          <div className="calc__nature-icons">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8C8 10 5.9 16.17 3.82 19.53c-.67 1.11.98 2.07 1.65.96.69-1.15 1.83-2.77 3.53-4.07"/>
              <path d="M12 22V12"/>
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="4" r="2"/>
              <path d="M12 6v6"/>
              <path d="M8 10c1.5-1 5.5-1 7 0"/>
              <path d="M9 14c1-1.5 5-1.5 6 0"/>
              <path d="M10 18c.8-1 3.2-1 4 0"/>
              <path d="M12 18v4"/>
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c0 0-8-4-8-12a8 8 0 0 1 16 0c0 8-8 12-8 12z"/>
              <path d="M12 22V10"/>
            </svg>
          </div>
          <p className="calc__disclaimer">Illustrative only. Not guaranteed or assured returns.</p>
        </div>
      </div>
    </section>
  );
}
