import React, { useState } from "react";
import { Copy, Check, Info } from "lucide-react";

export const ButterStickConverter: React.FC = () => {
  const [sticks, setSticks] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const grams = sticks * 113.398;
  const ounces = sticks * 4.0;
  const tablespoons = sticks * 8.0;
  const teaspoons = tablespoons * 3.0;
  const cups = sticks * 0.5;

  const handleCopySummary = () => {
    const text = `${sticks} stick${sticks !== 1 ? "s" : ""} of butter = ${grams.toFixed(1)}g = ${cups.toFixed(2)} cups = ${tablespoons} tbsp = ${ounces.toFixed(1)} oz`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl font-bold">
            🧈
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0d0f12]">US Butter Stick Calculator</h3>
            <p className="text-xs text-neutral-500 font-mono">Convert US butter packaging sticks to grams, tbsp, cups & oz</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-medium transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy Result"}</span>
        </button>
      </div>

      {/* Interactive Controls & Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Input Selector */}
        <div className="md:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-1.5">
              Butter Sticks Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSticks((prev) => Math.max(0.25, prev - 0.25))}
                className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-mono font-bold text-neutral-700 cursor-pointer text-lg"
              >
                -
              </button>
              <input
                type="number"
                step="0.25"
                min="0"
                value={sticks}
                onChange={(e) => setSticks(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full text-center py-2 px-3 rounded-xl border border-black/15 font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => setSticks((prev) => prev + 0.25)}
                className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-mono font-bold text-neutral-700 cursor-pointer text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Quick presets */}
          <div className="grid grid-cols-4 gap-1.5">
            {[0.5, 1, 2, 4].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSticks(s)}
                className={`py-1.5 px-2 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer ${
                  sticks === s ? "bg-amber-500 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                }`}
              >
                {s} {s === 1 ? "stick" : "sticks"}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Butter Stick Illustration */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="text-xs font-mono font-bold text-amber-900 flex items-center justify-between">
              <span>Standard 1 US Stick = 8 Tablespoons</span>
              <span className="text-amber-700 font-normal">1/2 Cup | 113.4g | 4 oz</span>
            </div>

            {/* 8 Tablespoons butter wrapper ruler */}
            <div className="grid grid-cols-8 gap-0.5 bg-amber-200/80 p-1 rounded-xl border border-amber-300">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="py-3 px-0.5 text-center bg-linear-to-b from-amber-100 to-amber-200 border-r border-amber-300 last:border-r-0 rounded-sm"
                >
                  <span className="text-[10px] font-mono font-bold text-amber-900 block">T{i + 1}</span>
                  <span className="text-[8px] font-mono text-amber-700 block">14g</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Output Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/5">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Grams</div>
              <div className="text-base font-mono font-bold text-[#0d0f12]">{grams.toFixed(1)}g</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/5">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">US Cups</div>
              <div className="text-base font-mono font-bold text-[#0d0f12]">{cups.toFixed(2)}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/5">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Tablespoons</div>
              <div className="text-base font-mono font-bold text-[#0d0f12]">{tablespoons} tbsp</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/5">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Ounces</div>
              <div className="text-base font-mono font-bold text-[#0d0f12]">{ounces.toFixed(1)} oz</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
