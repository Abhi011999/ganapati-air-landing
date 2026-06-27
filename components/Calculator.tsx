"use client";

import { useState, useEffect, useRef } from "react";

function useAnimatedNumber(target: number, decimals = 0) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const fromRef  = useRef<number>(target);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = performance.now();
    const duration = 600;

    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = fromRef.current + (target - fromRef.current) * eased;
      setDisplay(current);
      if (t < 1) frameRef.current = requestAnimationFrame(animate);
    };

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString("en-IN");
}

function fmt(n: number) {
  if (n >= 10000000) return `${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `${(n / 100000).toFixed(1)} L`;
  return n.toLocaleString("en-IN");
}

function fmtAnimated(n: number) {
  if (n >= 10000000) return `${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `${(n / 100000).toFixed(1)} L`;
  return n.toLocaleString("en-IN");
}

const OCC_STEPS = [
  { label: "Conservative", sub: "35%", value: 35 },
  { label: "Moderate",     sub: "50%", value: 50 },
  { label: "Optimistic",   sub: "75%", value: 75 },
];

function LiveNumber({ value, prefix = "Rs.", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const frameRef = useRef<number>(0);
  const fromRef  = useRef<number>(value);
  const startRef = useRef<number>(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = performance.now();
    const duration = 500;
    const to = value;
    const animate = (now: number) => {
      const t = Math.min((now - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = fromRef.current + (to - fromRef.current) * eased;
      setDisplay(cur);
      if (t < 1) frameRef.current = requestAnimationFrame(animate);
    };
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{prefix} {fmtAnimated(display)}{suffix}</>;
}

export default function Calculator() {
  const [occ, setOcc]     = useState(50);
  const [years, setYears] = useState(5);

  const PRICE   = 26800000;
  const ADR     = 21000;
  const APPRATE = 10;

  const ownerShare  = ADR * (occ / 100) * 365 * 0.5;
  const yieldPct    = (ownerShare / PRICE) * 100;
  const futureValue = PRICE * Math.pow(1 + APPRATE / 100, years);
  const totalReturn = (ownerShare * years) + (futureValue - PRICE);

  // Progress bar width for yield (max ~15%)
  const yieldWidth = Math.min((yieldPct / 15) * 100, 100);
  // Progress bar for total return vs price
  const returnWidth = Math.min((totalReturn / (PRICE * 3)) * 100, 100);

  return (
    <section className="section calc" id="calculator">
      <div className="wrap">

        {/* Header */}
        <div className="calc__header reveal">
          <span className="sec-tag">Returns Calculator</span>
          <h2 className="sec-title reveal-line" style={{ marginTop: 14 }}><span>Run the numbers.</span></h2>
          <p className="sec-body" style={{ marginTop: 12, color: "rgba(250,250,248,0.55)" }}>
            Drag the sliders. Watch your returns update live.
          </p>
        </div>

        <div className="calc__bento">

          {/* ── Card A: Occupancy selector ── */}
          <div className="calc__card calc__card--occ reveal">
            <div className="calc__card-label">Occupancy Rate</div>
            <div className="calc__occ-tabs">
              {OCC_STEPS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={`calc__occ-tab${occ === s.value ? " active" : ""}`}
                  onClick={() => setOcc(s.value)}
                >
                  <span className="calc__occ-tab-pct">{s.sub}</span>
                  <span className="calc__occ-tab-name">{s.label}</span>
                </button>
              ))}
            </div>
            <div className="calc__occ-hint">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="8" cy="8" r="6"/><path d="M8 7v4M8 5.5v.5"/>
              </svg>
              Tap to switch scenario
            </div>
          </div>

          {/* ── Card B: Horizon slider ── */}
          <div className="calc__card calc__card--horizon reveal">
            <div className="calc__card-label">Investment Horizon</div>
            <div className="calc__horizon-num">{years}<span>yrs</span></div>
            <input
              type="range" min={3} max={15} step={1} value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="calc__slider"
            />
            <div className="calc__range-labels"><span>3 yrs</span><span>15 yrs</span></div>
            <div className="calc__occ-hint">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 8h10M9 5l4 3-4 3"/>
              </svg>
              Slide to set your horizon
            </div>
          </div>

          {/* ── Card C: Annual income (big hero number) ── */}
          <div className="calc__card calc__card--income reveal">
            <div className="calc__card-label">Your Annual Rental Income</div>
            <div className="calc__hero-num">
              <LiveNumber value={ownerShare} />
            </div>
            <div className="calc__income-sub">50% of total rental revenue</div>
            {/* Live yield bar */}
            <div className="calc__bar-wrap">
              <div className="calc__bar-track">
                <div className="calc__bar-fill" style={{ width: `${yieldWidth}%` }} />
              </div>
              <div className="calc__bar-label">
                {yieldPct.toFixed(1)}% rental yield on Rs. 2.68 Cr
              </div>
            </div>
          </div>

          {/* ── Card D: Total return ── */}
          <div className="calc__card calc__card--total reveal">
            <div className="calc__card-label">Total Return over {years} Years</div>
            <div className="calc__hero-num calc__hero-num--accent">
              <LiveNumber value={totalReturn} />
            </div>
            <div className="calc__income-sub">Rental income + capital appreciation at 10% p.a.</div>
            <div className="calc__bar-wrap">
              <div className="calc__bar-track">
                <div className="calc__bar-fill calc__bar-fill--accent" style={{ width: `${returnWidth}%` }} />
              </div>
              <div className="calc__bar-label">
                vs Rs. 2.68 Cr invested
              </div>
            </div>
          </div>

        </div>

        <p className="calc__disclaimer reveal">
          Illustrative projections only. Not guaranteed or assured returns. Actual returns depend on occupancy, market conditions, and operator performance.
        </p>
      </div>
    </section>
  );
}
