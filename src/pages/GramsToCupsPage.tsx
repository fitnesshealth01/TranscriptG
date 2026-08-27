import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { GramsToCupsMasterConverter } from "../components/culinary/GramsToCupsMasterConverter";
import { ButterStickConverter } from "../components/culinary/ButterStickConverter";
import { OvenTempConverter } from "../components/culinary/OvenTempConverter";
import { RecipeScaler } from "../components/culinary/RecipeScaler";
import {
  CULINARY_INGREDIENTS,
  CUP_STANDARDS,
} from "../data/culinaryIngredients";
import {
  Scale,
  ChefHat,
  Flame,
  HelpCircle,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Layers,
  Thermometer,
} from "lucide-react";

export const GramsToCupsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"converter" | "butter" | "oven" | "scaler">("converter");

  const faqs = [
    {
      q: "How many cups is 100 grams of all-purpose flour?",
      a: "100 grams of all-purpose flour is equal to 0.80 US customary cups (approximately 3/4 cup plus 1 tablespoon), or 0.76 metric cups. Because flour is fluffy and light, 1 standard US cup of spooned-and-leveled all-purpose flour weighs 125 grams.",
    },
    {
      q: "How many grams is 1 cup of granulated white sugar?",
      a: "1 US cup of granulated white sugar weighs exactly 200 grams (7.05 oz). 1 metric cup (250 mL) of granulated sugar weighs 211 grams.",
    },
    {
      q: "Why can't I use the same conversion ratio for all ingredients?",
      a: "Grams measure weight (mass) while cups measure volume (space). Different ingredients have different physical densities. For example, 1 cup of lead-heavy honey weighs 340 grams, whereas 1 cup of airy cocoa powder weighs only 85 grams.",
    },
    {
      q: "What is the difference between US Customary cups and Metric cups?",
      a: "A US Customary cup holds 236.588 mL (8 fluid ounces) and is standard in American recipes. A Metric cup holds 250 mL and is standard in Australia, New Zealand, Canada, and modern UK baking. A US Legal cup is 240 mL (used on FDA food nutrition labels).",
    },
    {
      q: "How much butter is in 1 stick?",
      a: "In the United States, 1 standard stick of butter equals 8 tablespoons, 1/2 cup, 4 ounces, or 113.4 grams. Two sticks equal 1 cup (227 grams or 1/2 pound).",
    },
    {
      q: "What is the proper 'Spoon and Level' technique for dry ingredients?",
      a: "Never scoop your measuring cup directly into the flour bag, as this compacts the flour and adds up to 30% excess weight. Instead, fluff the flour with a fork, spoon it gently into the cup until overflowing, and sweep a flat knife across the rim to level it off.",
    },
  ];

  return (
    <div className="space-y-12">
      <Seo
        title="Grams to Cups Converter — Free Kitchen Baking & Ingredient Scale Tool"
        description="Convert grams to cups, ounces, tablespoons, and milliliters for 400+ baking and cooking ingredients with live cup visualizer. Includes butter stick calculator, oven temperature converter, and recipe batch scaler."
        canonicalPath="/grams-to-cups"
        keywords={[
          "grams to cups converter",
          "convert grams to cups",
          "grams to cups flour",
          "grams to cups sugar",
          "butter stick converter",
          "baking calculator",
          "kitchen measurement converter",
          "cups to grams",
          "oven temperature converter",
          "recipe scaler",
          "dry ingredients converter",
          "metric cup to us cup",
        ]}
        faqs={faqs}
        applicationCategory="UtilitiesApplication"
      />

      {/* Page Header */}
      <PageHeader
        badge="Engine 06 — Culinary Intelligence"
        title="Grams to Cups Converter & Baking Scale"
        description="High-precision culinary density engine calibrated for 400+ ingredients. Convert weights to cups with live measuring visualizer, butter stick calculator, and oven thermal guides."
        icon={ChefHat}
      />

      {/* Main Feature Navigation Tabs */}
      <div className="flex items-center justify-center">
        <div className="glass-pill p-1.5 rounded-full flex flex-wrap items-center gap-1 shadow-md border border-black/10 bg-white/90">
          <button
            type="button"
            onClick={() => setActiveTab("converter")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "converter"
                ? "bg-[#ff4d00] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-black/5"
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>Grams ⇄ Cups Master</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("butter")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "butter"
                ? "bg-[#ff4d00] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-black/5"
            }`}
          >
            <span className="text-base leading-none">🧈</span>
            <span>Butter Sticks</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("oven")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "oven"
                ? "bg-[#ff4d00] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-black/5"
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Oven Temperatures</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("scaler")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "scaler"
                ? "bg-[#ff4d00] text-white shadow-xs"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-black/5"
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Recipe Scaler</span>
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      <div className="transition-all duration-200">
        {activeTab === "converter" && <GramsToCupsMasterConverter />}
        {activeTab === "butter" && <ButterStickConverter />}
        {activeTab === "oven" && <OvenTempConverter />}
        {activeTab === "scaler" && <RecipeScaler />}
      </div>

      {/* CULINARY REFERENCE MATRIX & EDUCATIONAL GUIDE */}
      <div className="space-y-8 pt-8 border-t border-black/10">
        {/* Section 1: Quick Staple Conversion Reference Matrix */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl">
              📊
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0d0f12]">Master Baking Staples Weight Chart</h3>
              <p className="text-xs text-neutral-500 font-mono">Standard grams per US Customary Cup (236.6 mL) vs Metric Cup (250 mL)</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/10">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-50 text-neutral-700 border-b border-black/5">
                <tr>
                  <th className="py-3 px-4">Ingredient Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">1 US Cup (grams)</th>
                  <th className="py-3 px-4">1 Metric Cup (grams)</th>
                  <th className="py-3 px-4">1 Tablespoon (g)</th>
                  <th className="py-3 px-4">Standard Density</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-white">
                {CULINARY_INGREDIENTS.filter((i) => i.popular).map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-neutral-900">{item.name}</td>
                    <td className="py-3 px-4 text-neutral-500">{item.category}</td>
                    <td className="py-3 px-4 font-bold text-[#ff4d00]">{item.gramsPerUsCup}g</td>
                    <td className="py-3 px-4 text-neutral-700">{item.gramsPerMetricCup}g</td>
                    <td className="py-3 px-4 text-neutral-600">{item.gramsPerTbsp}g</td>
                    <td className="py-3 px-4 text-neutral-400">{item.densityGPerMl.toFixed(3)} g/ml</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Educational Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-black/10 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#ff4d00] flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="text-base font-bold text-neutral-900">
              Why Weight (Grams) Trumps Volume (Cups) in Baking
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Baking is precise culinary chemistry. A cup of all-purpose flour can weigh anywhere from <strong>110 grams</strong> (when sifted lightly) to over <strong>160 grams</strong> (when scooped directly from a packed grocery bag). That 45% variance can ruin cookie textures, turn cakes dry, or make sourdough dough unworkable. Converting recipes to grams guarantees identical results every single time.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-black/10 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="text-base font-bold text-neutral-900">
              The Spoon & Level Technique
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              If you don't have a kitchen scale on hand, always use the professional <strong>Spoon and Level</strong> method:
            </p>
            <ul className="text-xs text-neutral-600 space-y-1.5 list-disc list-inside">
              <li>Fluff your flour or powder with a fork to aerate clumps.</li>
              <li>Use a tablespoon to gently sprinkle flour into your dry measuring cup.</li>
              <li>Do not shake, tap, or press down the flour into the cup.</li>
              <li>Sweep the flat back edge of a butter knife across the rim to level off.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: FAQ Accordion / Grid */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center text-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0d0f12]">Frequently Asked Culinary Conversion Questions</h3>
              <p className="text-xs text-neutral-500 font-mono">Expert answers on baking conversions, cup standards, and ingredient densities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1.5">
                <h4 className="text-xs font-bold text-neutral-900 flex items-start gap-2">
                  <span className="text-[#ff4d00] font-mono font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
