import React, { useState } from "react";
import { Scale, Copy, Check, RefreshCw } from "lucide-react";

export const RecipeScaler: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
`250g All-Purpose Flour
150g Granulated White Sugar
113g Butter (1 stick)
2 large Eggs
5g Baking Powder (1 tsp)
120ml Whole Milk`
  );
  const [multiplier, setMultiplier] = useState<number>(2.0);
  const [copied, setCopied] = useState<boolean>(false);

  // Scaler logic: multiplies numbers found in line while preserving units and descriptions
  const scaleRecipe = (text: string, scale: number): string => {
    return text
      .split("\n")
      .map((line) => {
        if (!line.trim()) return line;
        // Match numbers (including decimals or fractions like 1/2, 1 1/2, 2.5)
        return line.replace(/(\d+\s+\d+\/\d+|\d+\/\d+|\d+\.?\d*)/g, (match) => {
          let num = 0;
          if (match.includes("/")) {
            if (match.includes(" ")) {
              const [whole, frac] = match.split(" ");
              const [numr, den] = frac.split("/");
              num = parseFloat(whole) + parseFloat(numr) / parseFloat(den);
            } else {
              const [numr, den] = match.split("/");
              num = parseFloat(numr) / parseFloat(den);
            }
          } else {
            num = parseFloat(match);
          }

          if (isNaN(num)) return match;
          const scaled = num * scale;
          // Format neatly: if close to integer, show integer, else 1 or 2 decimals
          if (Math.abs(scaled - Math.round(scaled)) < 0.01) {
            return `${Math.round(scaled)}`;
          }
          return `${parseFloat(scaled.toFixed(2))}`;
        });
      })
      .join("\n");
  };

  const scaledOutput = scaleRecipe(inputText, multiplier);

  const handleCopy = () => {
    navigator.clipboard.writeText(scaledOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-xl font-bold">
            <Scale className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0d0f12]">Recipe Batch Multiplier & Scaler</h3>
            <p className="text-xs text-neutral-500 font-mono">Scale whole ingredient lists up or down (0.5x, 2x, 3x, or custom yield)</p>
          </div>
        </div>

        {/* Multiplier Presets */}
        <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-2xl">
          {[0.5, 1.5, 2, 3, 4].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMultiplier(m)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                multiplier === m ? "bg-purple-600 text-white shadow-xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {m}x
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Input Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold block">
            Original Recipe Ingredients
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={7}
            placeholder="Paste your recipe ingredient list here..."
            className="w-full p-3.5 rounded-2xl border border-black/15 font-mono text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-neutral-50/50 resize-y"
          />
        </div>

        {/* Right: Scaled Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-purple-700 font-bold">
              Scaled Output ({multiplier}x Yield)
            </label>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Scaled Recipe"}</span>
            </button>
          </div>
          <div className="w-full p-3.5 rounded-2xl border border-purple-200 bg-purple-50/30 font-mono text-xs text-neutral-900 whitespace-pre-wrap min-h-[148px]">
            {scaledOutput}
          </div>
        </div>
      </div>
    </div>
  );
};
