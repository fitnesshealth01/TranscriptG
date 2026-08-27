import React, { useState } from "react";
import { OVEN_TEMP_GUIDE, OvenTempReference } from "../../data/culinaryIngredients";
import { Flame, Thermometer } from "lucide-react";

export const OvenTempConverter: React.FC = () => {
  const [fahrenheit, setFahrenheit] = useState<number>(350);

  const celsius = Math.round(((fahrenheit - 32) * 5) / 9);
  const fanCelsius = Math.max(0, celsius - 20);

  // Approximate Gas Mark
  const getGasMark = (f: number): string => {
    if (f < 260) return "1/4";
    if (f < 285) return "1/2";
    if (f < 310) return "1";
    if (f < 335) return "2";
    if (f < 360) return "4";
    if (f < 385) return "5";
    if (f < 410) return "6";
    if (f < 435) return "7";
    if (f < 460) return "8";
    if (f < 485) return "9";
    return "10";
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-xl font-bold">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0d0f12]">Oven Temperature Converter</h3>
            <p className="text-xs text-neutral-500 font-mono">Convert Fahrenheit (°F), Celsius (°C), Fan Oven & UK Gas Mark</p>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Slider & Input */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
                Oven Temperature (°F)
              </label>
              <span className="text-sm font-mono font-bold text-[#ff4d00]">{fahrenheit}°F</span>
            </div>
            <input
              type="range"
              min="200"
              max="500"
              step="5"
              value={fahrenheit}
              onChange={(e) => setFahrenheit(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#ff4d00]"
            />
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {[300, 325, 350, 375, 400, 425, 450, 475].map((temp) => (
              <button
                key={temp}
                type="button"
                onClick={() => setFahrenheit(temp)}
                className={`py-1 px-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  fahrenheit === temp ? "bg-[#ff4d00] text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                }`}
              >
                {temp}°F
              </button>
            ))}
          </div>
        </div>

        {/* Real-time converted values */}
        <div className="md:col-span-6 grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-black/5 space-y-0.5">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Celsius (Conventional)</div>
            <div className="text-xl font-mono font-bold text-[#0d0f12]">{celsius}°C</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 space-y-0.5">
            <div className="text-[10px] font-mono text-sky-700 uppercase">Fan / Convection</div>
            <div className="text-xl font-mono font-bold text-sky-900">{fanCelsius}°C</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-100 space-y-0.5">
            <div className="text-[10px] font-mono text-amber-700 uppercase">UK Gas Mark</div>
            <div className="text-xl font-mono font-bold text-amber-900">Gas {getGasMark(fahrenheit)}</div>
          </div>
        </div>
      </div>

      {/* Reference Master Table */}
      <div className="border-t border-black/5 pt-4">
        <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold mb-3">
          Standard Baking Temperature Cheat Sheet
        </div>
        <div className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-50 text-neutral-600 border-b border-black/5">
              <tr>
                <th className="py-2 px-3">Fahrenheit</th>
                <th className="py-2 px-3">Celsius</th>
                <th className="py-2 px-3">Fan Oven (-20°C)</th>
                <th className="py-2 px-3">Gas Mark</th>
                <th className="py-2 px-3">Culinary Baking Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white">
              {OVEN_TEMP_GUIDE.map((row) => (
                <tr
                  key={row.fahrenheit}
                  onClick={() => setFahrenheit(row.fahrenheit)}
                  className={`hover:bg-neutral-50 cursor-pointer transition-colors ${
                    fahrenheit === row.fahrenheit ? "bg-orange-50/70 font-bold text-[#ff4d00]" : "text-neutral-700"
                  }`}
                >
                  <td className="py-2 px-3">{row.fahrenheit}°F</td>
                  <td className="py-2 px-3">{row.celsius}°C</td>
                  <td className="py-2 px-3">{row.celsiusFan}°C</td>
                  <td className="py-2 px-3">Gas {row.gasMark}</td>
                  <td className="py-2 px-3 text-neutral-500 font-sans text-xs">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
