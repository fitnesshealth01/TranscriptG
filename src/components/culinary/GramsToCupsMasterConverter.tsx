import React, { useState, useMemo } from "react";
import {
  CULINARY_INGREDIENTS,
  CulinaryIngredient,
  CUP_STANDARDS,
  CupStandard,
} from "../../data/culinaryIngredients";
import { MeasuringCupVisualizer } from "./MeasuringCupVisualizer";
import { ArrowLeftRight, Search, Copy, Check, Printer, Sparkles, SlidersHorizontal, BookOpen } from "lucide-react";

export const GramsToCupsMasterConverter: React.FC = () => {
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("flour_all_purpose");
  const [selectedStandardId, setSelectedStandardId] = useState<string>("us_customary");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Conversion Mode: "grams_to_cups" or "cups_to_grams"
  const [mode, setMode] = useState<"weight_to_volume" | "volume_to_weight">("weight_to_volume");

  // Numeric Values
  const [weightInput, setWeightInput] = useState<string>("250");
  const [volumeInput, setVolumeInput] = useState<string>("1.0");

  // Units
  const [weightUnit, setWeightUnit] = useState<"g" | "oz" | "kg" | "lb">("g");
  const [volumeUnit, setVolumeUnit] = useState<"cups" | "tbsp" | "tsp" | "ml" | "floz">("cups");

  const [copied, setCopied] = useState<boolean>(false);

  // Selected Ingredient & Standard
  const selectedIngredient = useMemo(() => {
    return (
      CULINARY_INGREDIENTS.find((i) => i.id === selectedIngredientId) ||
      CULINARY_INGREDIENTS[0]
    );
  }, [selectedIngredientId]);

  const selectedStandard = useMemo(() => {
    return (
      CUP_STANDARDS.find((s) => s.id === selectedStandardId) ||
      CUP_STANDARDS[0]
    );
  }, [selectedStandardId]);

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    CULINARY_INGREDIENTS.forEach((i) => cats.add(i.category));
    return Array.from(cats);
  }, []);

  // Filtered ingredients
  const filteredIngredients = useMemo(() => {
    return CULINARY_INGREDIENTS.filter((item) => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchQuery, activeCategory]);

  // Grams per Cup calibrated to the chosen standard
  const gramsPerCupForStandard = useMemo(() => {
    const standardMl = selectedStandard.ml;
    // Calculate based on density (g/ml * standard volume ml)
    return selectedIngredient.densityGPerMl * standardMl;
  }, [selectedIngredient, selectedStandard]);

  // Calculate conversions
  const { calculatedGrams, calculatedCups, calculatedTbsp, calculatedTsp, calculatedMl, calculatedOz } = useMemo(() => {
    let rawGrams = 0;

    if (mode === "weight_to_volume") {
      const numVal = parseFloat(weightInput) || 0;
      switch (weightUnit) {
        case "g":
          rawGrams = numVal;
          break;
        case "oz":
          rawGrams = numVal * 28.3495;
          break;
        case "kg":
          rawGrams = numVal * 1000;
          break;
        case "lb":
          rawGrams = numVal * 453.592;
          break;
      }
    } else {
      const numVal = parseFloat(volumeInput) || 0;
      let standardCups = 0;
      switch (volumeUnit) {
        case "cups":
          standardCups = numVal;
          break;
        case "tbsp":
          standardCups = numVal / 16;
          break;
        case "tsp":
          standardCups = numVal / 48;
          break;
        case "ml":
          standardCups = numVal / selectedStandard.ml;
          break;
        case "floz":
          standardCups = (numVal * 29.5735) / selectedStandard.ml;
          break;
      }
      rawGrams = standardCups * gramsPerCupForStandard;
    }

    const cups = rawGrams / gramsPerCupForStandard;
    const tbsp = cups * 16;
    const tsp = tbsp * 3;
    const ml = cups * selectedStandard.ml;
    const oz = rawGrams / 28.3495;

    return {
      calculatedGrams: rawGrams,
      calculatedCups: cups,
      calculatedTbsp: tbsp,
      calculatedTsp: tsp,
      calculatedMl: ml,
      calculatedOz: oz,
    };
  }, [
    mode,
    weightInput,
    weightUnit,
    volumeInput,
    volumeUnit,
    gramsPerCupForStandard,
    selectedStandard,
  ]);

  // Quick preset cup selection handler
  const handlePresetCups = (cupsVal: number) => {
    if (mode === "weight_to_volume") {
      const calculatedG = cupsVal * gramsPerCupForStandard;
      setWeightInput(calculatedG.toFixed(1));
      setWeightUnit("g");
    } else {
      setVolumeInput(cupsVal.toString());
      setVolumeUnit("cups");
    }
  };

  // Toggle Swap Mode
  const handleSwapMode = () => {
    if (mode === "weight_to_volume") {
      setMode("volume_to_weight");
      setVolumeInput(calculatedCups.toFixed(2));
      setVolumeUnit("cups");
    } else {
      setMode("weight_to_volume");
      setWeightInput(calculatedGrams.toFixed(1));
      setWeightUnit("g");
    }
  };

  // Copy Results to Clipboard
  const handleCopySummary = () => {
    const summary = `${calculatedGrams.toFixed(1)}g of ${selectedIngredient.name} = ${calculatedCups.toFixed(2)} ${selectedStandard.name} (${calculatedTbsp.toFixed(1)} tbsp / ${calculatedOz.toFixed(2)} oz)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Print Kitchen Cheat Sheet
  const handlePrint = () => {
    window.print();
  };

  // Common reference weights for matrix
  const referenceWeights = [15, 25, 50, 75, 100, 125, 150, 175, 200, 250, 300, 500];

  return (
    <div className="space-y-10">
      {/* 1. MAIN CONVERTER CARD */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-black/10 shadow-xl space-y-8 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ff4d00]/5 rounded-full blur-2xl pointer-events-none" />

        {/* Top Control Bar: Ingredient Search & Cup Standard */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search and Select Ingredient */}
            <div className="lg:col-span-8 space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
                1. Select Culinary Ingredient ({CULINARY_INGREDIENTS.length}+ Calibrated)
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search ingredient (e.g. flour, brown sugar, butter, oats, cocoa)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-black/15 bg-neutral-50/70 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:bg-white"
                />
              </div>
            </div>

            {/* Regional Cup Standard Selector */}
            <div className="lg:col-span-4 space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
                2. Cup Regional Standard
              </label>
              <select
                value={selectedStandardId}
                onChange={(e) => setSelectedStandardId(e.target.value)}
                className="w-full py-2.5 px-3 rounded-2xl border border-black/15 bg-neutral-50/70 text-xs font-mono font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:bg-white cursor-pointer"
              >
                {CUP_STANDARDS.map((std) => (
                  <option key={std.id} value={std.id}>
                    {std.shortName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#ff4d00] text-white shadow-2xs font-bold"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Popular Ingredient Chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase mr-1">Popular:</span>
            {CULINARY_INGREDIENTS.filter((i) => i.popular).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedIngredientId(item.id);
                  setSearchQuery("");
                }}
                className={`px-2.5 py-1 rounded-xl text-xs transition-all cursor-pointer ${
                  selectedIngredientId === item.id
                    ? "bg-amber-100 border border-amber-400 text-amber-900 font-bold"
                    : "bg-neutral-50 hover:bg-neutral-100 border border-black/5 text-neutral-700 font-medium"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2. DUAL INTERACTIVE CONVERSION ENGINE */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-neutral-50/80 p-5 sm:p-7 rounded-3xl border border-black/5">
          {/* Input Box 1 (Weight or Volume) */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 font-bold">
                {mode === "weight_to_volume" ? "Weight / Mass (Input)" : "Volume (Input)"}
              </label>
              <span className="text-[11px] font-mono text-[#ff4d00] font-semibold">
                {mode === "weight_to_volume" ? "Scale / grams" : "Cups / spoons"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                step="any"
                min="0"
                value={mode === "weight_to_volume" ? weightInput : volumeInput}
                onChange={(e) => {
                  if (mode === "weight_to_volume") {
                    setWeightInput(e.target.value);
                  } else {
                    setVolumeInput(e.target.value);
                  }
                }}
                placeholder="0"
                className="w-full py-3 px-4 rounded-2xl border border-black/15 bg-white text-2xl font-mono font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#ff4d00]"
              />

              {mode === "weight_to_volume" ? (
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as any)}
                  className="py-3 px-3.5 rounded-2xl border border-black/15 bg-white text-sm font-mono font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#ff4d00] cursor-pointer"
                >
                  <option value="g">grams (g)</option>
                  <option value="oz">ounces (oz)</option>
                  <option value="kg">kilograms (kg)</option>
                  <option value="lb">pounds (lb)</option>
                </select>
              ) : (
                <select
                  value={volumeUnit}
                  onChange={(e) => setVolumeUnit(e.target.value as any)}
                  className="py-3 px-3.5 rounded-2xl border border-black/15 bg-white text-sm font-mono font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#ff4d00] cursor-pointer"
                >
                  <option value="cups">cups</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="ml">milliliters (ml)</option>
                  <option value="floz">fluid oz (fl oz)</option>
                </select>
              )}
            </div>
          </div>

          {/* Center Swap Button */}
          <div className="md:col-span-1 flex justify-center py-2">
            <button
              type="button"
              onClick={handleSwapMode}
              title="Swap conversion direction (Grams ⇄ Cups)"
              className="w-12 h-12 rounded-2xl bg-white border border-black/15 shadow-sm hover:border-[#ff4d00] hover:text-[#ff4d00] text-neutral-700 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Output Box 2 (Converted Result) */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 font-bold">
                {mode === "weight_to_volume" ? "Volume Result" : "Weight Result"}
              </label>
              <button
                type="button"
                onClick={handleCopySummary}
                className="text-[11px] font-mono text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl border border-black/15 bg-white flex items-center justify-between">
              <div>
                <div className="text-2xl font-mono font-bold text-[#ff4d00]">
                  {mode === "weight_to_volume" ? calculatedCups.toFixed(2) : calculatedGrams.toFixed(1)}
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  {mode === "weight_to_volume"
                    ? `${selectedStandard.shortName}`
                    : `grams (${calculatedOz.toFixed(2)} oz)`}
                </div>
              </div>

              {/* Spoon and ML extra breakdown */}
              <div className="text-right font-mono text-xs text-neutral-600">
                <div>{calculatedTbsp.toFixed(1)} tbsp</div>
                <div>{calculatedMl.toFixed(0)} mL</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. VISUAL MEASURING CUP COMPONENT */}
        <MeasuringCupVisualizer
          cupsValue={calculatedCups}
          ingredient={selectedIngredient}
          cupStandard={selectedStandard}
          onPresetSelect={handlePresetCups}
        />

        {/* 4. REFERENCE LOOKUP MATRIX FOR SELECTED INGREDIENT */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-3">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-700 font-bold">
                Cheat Sheet Matrix for {selectedIngredient.name}
              </h4>
              <p className="text-xs text-neutral-500">
                Calculated for standard {selectedStandard.name} ({selectedStandard.ml} ml)
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Kitchen Sheet</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {referenceWeights.map((w) => {
              const cupsVal = w / gramsPerCupForStandard;
              const tbspVal = cupsVal * 16;
              return (
                <div
                  key={w}
                  onClick={() => {
                    setMode("weight_to_volume");
                    setWeightInput(w.toString());
                    setWeightUnit("g");
                  }}
                  className="p-3 rounded-2xl bg-neutral-50 hover:bg-amber-50/70 border border-black/5 hover:border-amber-300 transition-all cursor-pointer text-center group"
                >
                  <div className="text-sm font-mono font-bold text-[#0d0f12] group-hover:text-[#ff4d00]">
                    {w} grams
                  </div>
                  <div className="text-xs font-mono text-neutral-600 font-medium mt-0.5">
                    {cupsVal.toFixed(2)} cup{cupsVal >= 1.05 ? "s" : ""}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    {tbspVal.toFixed(1)} tbsp
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
