"use client";

import { useState, useCallback } from "react";

const ADR_PRESETS = [
  { label: "₹15,000 / night", value: 15000 },
  { label: "₹18,000 / night", value: 18000 },
  { label: "₹21,000 / night", value: 21000 },
];

const OCC_PRESETS = [
  { label: "Conservative (35%)", value: 35 },
  { label: "Moderate (50%)", value: 50 },
  { label: "Optimistic (75%)", value: 75 },
];

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function Calculator() {
  const [occupancy, setOccupancy] = useState(50);
  const [adr, setAdr]             = useState(21000);
  const [years, setYears]         = useState(5);
  const [appRate, setAppRate]     = useState(10);

  const PRICE = 26800000; // ₹2.68 Cr

  const grossAnnual   = adr * (occupancy / 100) * 365;
  const ownerShare    = grossAnnual * 0.5;
  const yieldPct      = (ownerShare / PRICE) * 100;
  const futureValue   = PRICE * Math.pow(1 + appRate / 100, years);
  const capitalGain   = futureValue - PRICE;
  const totalRental   = ownerShare * years;
  const totalReturn   = capitalGain + totalRental;

  const setSlider = useCallback(
    (setter: (v: number) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => setter(Number(e.target.value)),
    []
  );

  return (
    <section className="section calc" id="calculator">
      <div className="wrap">
        <div className="sec-header" style={{ maxWidth: 640 }}>
          <span className="sec-tag reveal">Investment Calculator</span>
          <h2 className="sec-title reveal-line"><span>How much<br/>will you earn?</span></h2>
          <p className="sec-body reveal">
            Move the sliders to model your scenario. See live estimates of
            your annual rental income, yield, and total return over time.
          </p>
        </div>

        <div className="calc__body">
          {/* ── Controls ── */}
          <div className="calc__controls">

            {/* Occupancy */}
            <div className="calc__field">
              <div className="calc__field-header">
                <label className="calc__field-label">Occupancy Rate</label>
                <span className="calc__field-value">{occupancy}%</span>
              </div>
              <div className="calc__presets">
                {OCC_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className={`calc__preset${occupancy === p.value ? " active" : ""}`}
                    onClick={() => setOccupancy(p.value)}
                  >{p.label}</button>
                ))}
              </div>
              <input type="range" min={20} max={90} step={1} value={occupancy}
                onChange={setSlider(setOccupancy)} className="calc__slider" />
              <div className="calc__range-labels"><span>20%</span><span>90%</span></div>
            </div>

            {/* ADR */}
            <div className="calc__field">
              <div className="calc__field-header">
                <label className="calc__field-label">Average Daily Rate</label>
                <span className="calc__field-value">₹{adr.toLocaleString("en-IN")} / night</span>
              </div>
              <div className="calc__presets">
                {ADR_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className={`calc__preset${adr === p.value ? " active" : ""}`}
                    onClick={() => setAdr(p.value)}
                  >{p.label}</button>
                ))}
              </div>
              <input type="range" min={8000} max={30000} step={500} value={adr}
                onChange={setSlider(setAdr)} className="calc__slider" />
              <div className="calc__range-labels"><span>₹8,000</span><span>₹30,000</span></div>
            </div>

            {/* Appreciation */}
            <div className="calc__field">
              <div className="calc__field-header">
                <label className="calc__field-label">Annual Appreciation</label>
                <span className="calc__field-value">{appRate}% p.a.</span>
              </div>
              <input type="range" min={5} max={20} step={1} value={appRate}
                onChange={setSlider(setAppRate)} className="calc__slider" />
              <div className="calc__range-labels"><span>5%</span><span>20%</span></div>
            </div>

            {/* Horizon */}
            <div className="calc__field">
              <div className="calc__field-header">
                <label className="calc__field-label">Investment Horizon</label>
                <span className="calc__field-value">{years} Years</span>
              </div>
              <input type="range" min={3} max={15} step={1} value={years}
                onChange={setSlider(setYears)} className="calc__slider" />
              <div className="calc__range-labels"><span>3 Years</span><span>15 Years</span></div>
            </div>

          </div>

          {/* ── Results ── */}
          <div className="calc__results">
            <div className="calc__results-title">Your Estimated Returns</div>

            <div className="calc__row calc__row--highlight">
              <span className="calc__row-label">Your Annual Share (50%)</span>
              <span className="calc__row-val">{fmt(ownerShare)}</span>
            </div>

            <div className="calc__row">
              <span className="calc__row-label">Gross Villa Revenue (Annual)</span>
              <span className="calc__row-val">{fmt(grossAnnual)}</span>
            </div>

            <div className="calc__row">
              <span className="calc__row-label">Rental Yield on ₹2.68 Cr</span>
              <span className="calc__row-val">{yieldPct.toFixed(2)}% p.a.</span>
            </div>

            <div className="calc__divider" />

            <div className="calc__row">
              <span className="calc__row-label">Projected Villa Value ({years}Y)</span>
              <span className="calc__row-val">{fmt(futureValue)}</span>
            </div>

            <div className="calc__row">
              <span className="calc__row-label">Capital Gain ({years}Y)</span>
              <span className="calc__row-val">{fmt(capitalGain)}</span>
            </div>

            <div className="calc__row">
              <span className="calc__row-label">Total Rental Income ({years}Y)</span>
              <span className="calc__row-val">{fmt(totalRental)}</span>
            </div>

            <div className="calc__divider" />

            <div className="calc__row calc__row--total">
              <span className="calc__row-label">Total Return ({years}Y)</span>
              <span className="calc__row-val">{fmt(totalReturn)}</span>
            </div>

            <p className="calc__disclaimer">
              Illustrative projections only. Not guaranteed or assured returns. Actual performance
              subject to market conditions and operator results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
