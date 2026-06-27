"use client";

import { useState, useEffect, useRef } from "react";

function fmtVal(n: number) {
  if (n >= 10000000) return `Rs. ${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `Rs. ${(n / 100000).toFixed(1)} L`;
  return `Rs. ${n.toLocaleString("en-IN")}`;
}

function LiveNumber({ value, fmt }: { value: number; fmt: (n: number) => string }) {
  const [display, setDisplay] = useState(value);
  const frameRef = useRef<number>(0);
  const fromRef  = useRef<number>(value);

  useEffect(() => {
    fromRef.current = display;
    const start = performance.now();
    const from  = fromRef.current;
    const to    = value;
    const dur   = 450;
    const run   = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * e);
      if (t < 1) frameRef.current = requestAnimationFrame(run);
    };
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frameRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{fmt(display)}</>;
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
              <div className="calc__field-label">
                Horizon <span className="calc__field-val">{years} yrs</span>
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
                <LiveNumber value={totalReturn} fmt={fmtVal} />
              </div>
              <div className="calc__result-sub">rental + appreciation</div>
            </div>
          </div>

          {/* Live bar */}
          <div className="calc__livebar">
            <div className="calc__livebar-fill" style={{ width: `${Math.min((yieldPct / 15) * 100, 100)}%` }} />
          </div>

        </div>

        <p className="calc__disclaimer reveal">
          Illustrative only. Not guaranteed or assured returns.
        </p>
      </div>
    </section>
  );
}
