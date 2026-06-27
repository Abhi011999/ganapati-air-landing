"use client";

import { useState } from "react";

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

const OCC_STEPS = [
  { label: "Conservative", sub: "35%", value: 35 },
  { label: "Moderate",     sub: "50%", value: 50 },
  { label: "Optimistic",   sub: "75%", value: 75 },
];

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

  return (
    <section className="section calc" id="calculator">
      <div className="wrap">
        <div className="calc__inner">
          <div className="calc__left">
            <span className="sec-tag reveal">Returns Calculator</span>
            <h2 className="sec-title reveal-line" style={{ marginTop: 12 }}><span>Run<br/>the numbers.</span></h2>
            <p className="sec-body reveal" style={{ marginTop: 16 }}>
              Based on Rs. 21,000 avg nightly rate, 50/50 revenue split, 10% annual appreciation.
            </p>

            <div className="calc__drag-hint reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
              <span>Move the sliders to model your returns</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16V4m0 0L3 8m4-4l4 4"/><path d="M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
            </div>
            <div className="calc__group reveal">
              <div className="calc__group-label">Occupancy</div>
              <div className="calc__tabs">
                {OCC_STEPS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    className={`calc__tab${occ === s.value ? " active" : ""}`}
                    onClick={() => setOcc(s.value)}
                  >
                    <span className="calc__tab-main">{s.label}</span>
                    <span className="calc__tab-sub">{s.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="calc__group reveal">
              <div className="calc__group-label">Horizon: {years} Years</div>
              <input
                type="range" min={3} max={15} step={1} value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="calc__slider"
              />
              <div className="calc__range-labels"><span>3 yrs</span><span>15 yrs</span></div>
            </div>
          </div>

          <div className="calc__right reveal">
            <div className="calc__big-num">
              <div className="calc__big-val">{fmt(ownerShare)}</div>
              <div className="calc__big-label">Annual rental income (your 50%)</div>
            </div>
            <div className="calc__divider" />
            <div className="calc__big-num">
              <div className="calc__big-val calc__big-val--accent">{yieldPct.toFixed(1)}%</div>
              <div className="calc__big-label">Rental yield on Rs. 2.68 Cr</div>
            </div>
            <div className="calc__divider" />
            <div className="calc__big-num">
              <div className="calc__big-val">{fmt(totalReturn)}</div>
              <div className="calc__big-label">Total return over {years} years (rental + appreciation)</div>
            </div>
            <p className="calc__disclaimer">
              Illustrative only. Not guaranteed or assured returns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
