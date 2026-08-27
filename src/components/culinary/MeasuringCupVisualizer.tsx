import React from "react";
import { CulinaryIngredient, CupStandard } from "../../data/culinaryIngredients";

interface MeasuringCupVisualizerProps {
  cupsValue: number;
  ingredient: CulinaryIngredient;
  cupStandard: CupStandard;
  onPresetSelect?: (cups: number) => void;
}

// Convert decimal cups into traditional culinary fractions + spoon remainder
export function formatCulinaryMeasurement(cups: number): {
  fractionStr: string;
  spoonBreakdown: string;
  exactDecimal: string;
} {
  if (isNaN(cups) || cups <= 0) {
    return { fractionStr: "0 cups", spoonBreakdown: "0 tbsp", exactDecimal: "0.00" };
  }

  const wholeCups = Math.floor(cups);
  const remainder = cups - wholeCups;

  // Closest standard baking fraction
  const fractions = [
    { value: 0, label: "" },
    { value: 1 / 8, label: "1/8" },
    { value: 1 / 4, label: "1/4" },
    { value: 1 / 3, label: "1/3" },
    { value: 3 / 8, label: "3/8" },
    { value: 1 / 2, label: "1/2" },
    { value: 5 / 8, label: "5/8" },
    { value: 2 / 3, label: "2/3" },
    { value: 3 / 4, label: "3/4" },
    { value: 7 / 8, label: "7/8" },
    { value: 1, label: "" },
  ];

  let closestFraction = fractions[0];
  let minDiff = 999;
  for (const f of fractions) {
    const diff = Math.abs(remainder - f.value);
    if (diff < minDiff) {
      minDiff = diff;
      closestFraction = f;
    }
  }

  let fractionStr = "";
  if (closestFraction.value === 1) {
    const totalWhole = wholeCups + 1;
    fractionStr = `${totalWhole} cup${totalWhole > 1 ? "s" : ""}`;
  } else if (wholeCups === 0 && closestFraction.value === 0) {
    fractionStr = `${cups.toFixed(2)} cups`;
  } else if (wholeCups === 0) {
    fractionStr = `${closestFraction.label} cup`;
  } else if (closestFraction.value === 0) {
    fractionStr = `${wholeCups} cup${wholeCups > 1 ? "s" : ""}`;
  } else {
    fractionStr = `${wholeCups} ${closestFraction.label} cups`;
  }

  // Exact tablespoons and teaspoons decomposition (1 cup = 16 tbsp, 1 tbsp = 3 tsp)
  const totalTbsp = cups * 16;
  const wholeTbsp = Math.floor(totalTbsp);
  const remainderTsp = Math.round((totalTbsp - wholeTbsp) * 3);

  const parts: string[] = [];
  if (wholeCups > 0) parts.push(`${wholeCups} cup${wholeCups > 1 ? "s" : ""}`);
  const remainingTbspInCup = wholeTbsp % 16;
  if (remainingTbspInCup > 0) parts.push(`${remainingTbspInCup} tbsp`);
  if (remainderTsp > 0) parts.push(`${remainderTsp} tsp`);

  const spoonBreakdown = parts.length > 0 ? parts.join(" + ") : "0 tsp";

  return {
    fractionStr,
    spoonBreakdown,
    exactDecimal: cups.toFixed(2),
  };
}

export const MeasuringCupVisualizer: React.FC<MeasuringCupVisualizerProps> = ({
  cupsValue,
  ingredient,
  cupStandard,
  onPresetSelect,
}) => {
  // Clamp fill percentage for 0 to 2 cups beaker
  const maxCapacityCups = 2.0;
  const clampedCups = Math.min(Math.max(cupsValue || 0, 0), maxCapacityCups);
  const fillPercentage = (clampedCups / maxCapacityCups) * 100;
  const isOverflowing = (cupsValue || 0) > maxCapacityCups;

  const { fractionStr, spoonBreakdown, exactDecimal } = formatCulinaryMeasurement(cupsValue || 0);

  // Gradient themes based on ingredient category
  const getIngredientColors = (category: string) => {
    switch (category) {
      case "Flours & Starches":
        return {
          fill: "from-amber-100 via-amber-200 to-amber-300",
          border: "border-amber-400/80",
          particle: "bg-amber-300/60",
          glow: "rgba(245, 158, 11, 0.15)",
        };
      case "Sugars & Sweeteners":
        return {
          fill: "from-amber-50 via-orange-100 to-amber-200",
          border: "border-orange-300",
          particle: "bg-orange-200/60",
          glow: "rgba(249, 115, 22, 0.15)",
        };
      case "Dairy, Fats & Oils":
        return {
          fill: "from-yellow-100 via-amber-200 to-yellow-300",
          border: "border-yellow-400",
          particle: "bg-yellow-300/60",
          glow: "rgba(234, 179, 8, 0.18)",
        };
      case "Baking & Chocolate":
        return {
          fill: "from-amber-800 via-amber-900 to-stone-900",
          border: "border-amber-700",
          particle: "bg-amber-700/60",
          glow: "rgba(120, 53, 15, 0.25)",
        };
      case "Grains & Cereals":
      case "Nuts & Seeds":
        return {
          fill: "from-stone-200 via-amber-200 to-stone-300",
          border: "border-stone-400",
          particle: "bg-amber-300/50",
          glow: "rgba(168, 162, 158, 0.2)",
        };
      case "Liquids & Purees":
      default:
        return {
          fill: "from-sky-200 via-sky-300 to-cyan-400",
          border: "border-sky-400",
          particle: "bg-sky-400/50",
          glow: "rgba(14, 165, 233, 0.2)",
        };
    }
  };

  const theme = getIngredientColors(ingredient.category);

  // Graduations on the measuring cup (from bottom to top)
  const ticks = [
    { cups: 0.25, label: "1/4", ml: Math.round(cupStandard.ml * 0.25) },
    { cups: 0.5, label: "1/2", ml: Math.round(cupStandard.ml * 0.5) },
    { cups: 0.75, label: "3/4", ml: Math.round(cupStandard.ml * 0.75) },
    { cups: 1.0, label: "1 Cup", ml: Math.round(cupStandard.ml) },
    { cups: 1.25, label: "1 1/4", ml: Math.round(cupStandard.ml * 1.25) },
    { cups: 1.5, label: "1 1/2", ml: Math.round(cupStandard.ml * 1.5) },
    { cups: 1.75, label: "1 3/4", ml: Math.round(cupStandard.ml * 1.75) },
    { cups: 2.0, label: "2 Cups", ml: Math.round(cupStandard.ml * 2.0) },
  ];

  const presets = [0.25, 0.333, 0.5, 0.667, 0.75, 1.0, 1.5, 2.0];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
            Interactive Cup Visualizer & Measure
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#0d0f12] flex items-baseline gap-2 mt-0.5">
            <span>{fractionStr}</span>
            <span className="text-xs font-mono text-neutral-500 font-normal">({exactDecimal} cups)</span>
          </div>
        </div>

        {/* Spoon Breakdown Pill */}
        <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs font-mono text-amber-900 font-semibold shadow-2xs flex items-center gap-1.5">
          <span>🥄 {spoonBreakdown}</span>
        </div>
      </div>

      {/* Main Beaker Visual Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Visual Glass Measuring Cup */}
        <div className="md:col-span-6 flex justify-center items-center py-2">
          <div className="relative w-56 h-72 flex items-center justify-center">
            {/* Glass Beaker Spout (Left) */}
            <div className="absolute top-2 -left-3 w-5 h-5 bg-white border-t-2 border-l-2 border-neutral-300 rounded-tl-lg transform -rotate-45" />

            {/* Glass Handle (Right) */}
            <div className="absolute top-12 -right-6 w-8 h-36 border-4 border-l-0 border-neutral-300/80 rounded-r-3xl" />

            {/* Main Glass Beaker Container */}
            <div className="relative w-44 h-64 rounded-b-3xl border-2 border-neutral-300 bg-linear-to-b from-white/40 via-white/20 to-neutral-100/40 backdrop-blur-xs overflow-hidden shadow-inner flex flex-col justify-end">
              {/* Measurement Tick Marks & Labels (Left: Cups, Right: mL) */}
              <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between py-4 px-2.5">
                {ticks
                  .slice()
                  .reverse()
                  .map((t) => {
                    const tickHeightPercent = (t.cups / maxCapacityCups) * 100;
                    return (
                      <div
                        key={t.cups}
                        className="absolute w-full left-0 flex items-center justify-between px-2 text-[9px] font-mono text-neutral-600 font-bold"
                        style={{ bottom: `${tickHeightPercent}%` }}
                      >
                        {/* Cups Tick (Left) */}
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-0.5 bg-neutral-500 rounded-full" />
                          <span className="drop-shadow-xs bg-white/80 px-1 rounded">{t.label}</span>
                        </div>

                        {/* mL Tick (Right) */}
                        <div className="flex items-center gap-1">
                          <span className="text-neutral-400 font-normal">{t.ml}ml</span>
                          <span className="w-2.5 h-0.5 bg-neutral-400 rounded-full" />
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Liquid / Dry Powder Fill Level Animation */}
              <div
                className={`w-full bg-linear-to-t ${theme.fill} border-t-2 ${theme.border} relative transition-all duration-500 ease-out`}
                style={{ height: `${fillPercentage}%` }}
              >
                {/* Surface Meniscus Ripple / Texture */}
                {fillPercentage > 5 && (
                  <div className="absolute top-0 left-0 right-0 h-2 bg-white/40 blur-[1px] animate-pulse" />
                )}

                {/* Sub-surface measurement label */}
                {fillPercentage > 20 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="px-2 py-0.5 rounded-full bg-black/20 text-white font-mono text-xs font-bold tracking-tight backdrop-blur-xs">
                      {fractionStr}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Overflow warning banner if > 2 cups */}
            {isOverflowing && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-mono font-bold whitespace-nowrap shadow-md">
                +{(cupsValue - 2.0).toFixed(2)} cups overflow
              </div>
            )}
          </div>
        </div>

        {/* Right Info & Quick Presets */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-600 uppercase tracking-wide">
              Selected Standard: {cupStandard.name}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              1 {cupStandard.name} holds <strong>{cupStandard.ml} mL</strong>. For <em>{ingredient.name}</em>, 1 full cup equals exactly <strong>{ingredient.gramsPerUsCup} grams</strong> ({ (ingredient.gramsPerUsCup / 28.3495).toFixed(2) } oz).
            </p>
            {ingredient.measuringTip && (
              <div className="pt-2 border-t border-black/5 text-xs text-amber-900 bg-amber-50/60 p-2.5 rounded-xl flex items-start gap-2">
                <span className="text-base leading-none">💡</span>
                <span><strong>Chef Tip:</strong> {ingredient.measuringTip}</span>
              </div>
            )}
          </div>

          {/* Quick Preset Fraction Buttons */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
              Quick Cup Presets (Click to Load)
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {presets.map((preset) => {
                const isSelected = Math.abs(cupsValue - preset) < 0.01;
                const label = preset === 0.333 ? "1/3" : preset === 0.667 ? "2/3" : preset === 0.25 ? "1/4" : preset === 0.5 ? "1/2" : preset === 0.75 ? "3/4" : `${preset}`;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => onPresetSelect && onPresetSelect(preset)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#ff4d00] text-white shadow-xs scale-102"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {label} cup
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
