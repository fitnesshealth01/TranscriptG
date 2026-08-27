import React from "react";

interface SpectrumTraceProps {
  barsCount?: number;
  heightClass?: string;
  active?: boolean;
  accentColor?: "orange" | "cyan" | "mixed";
  showLineWave?: boolean;
}

export const SpectrumTrace: React.FC<SpectrumTraceProps> = ({
  barsCount = 28,
  heightClass = "h-12",
  active = true,
  accentColor = "mixed",
  showLineWave = true,
}) => {
  return (
    <div className={`relative w-full ${heightClass} flex flex-col justify-end overflow-hidden`}>
      {/* Animated bars */}
      <div className="flex items-end justify-between gap-1 w-full h-full px-2">
        {Array.from({ length: barsCount }).map((_, i) => {
          const isEven = i % 2 === 0;
          const bg =
            accentColor === "orange"
              ? "bg-[#ff4d00]"
              : accentColor === "cyan"
              ? "bg-[#00d9ff]"
              : isEven
              ? "bg-[#ff4d00]"
              : "bg-[#00d9ff]";

          // Generate varied default heights
          const baseHeightPercent = Math.max(20, Math.sin(i * 0.4) * 40 + 50);
          const animationDelay = `${(i * 0.05).toFixed(2)}s`;

          return (
            <div
              key={i}
              className={`w-1 rounded-full ${bg} transition-all duration-300 ${
                active ? "animate-spectrum-bar" : ""
              }`}
              style={{
                height: active ? `${baseHeightPercent}%` : "15%",
                animationDelay,
                opacity: 0.85 + (i % 3) * 0.05,
              }}
            />
          );
        })}
      </div>

      {/* TraceLine SVG Wave Overlay */}
      {showLineWave && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 overflow-hidden"
          preserveAspectRatio="none"
          viewBox="0 0 400 100"
        >
          <path
            d="M0,50 Q40,20 80,50 T160,50 T240,50 T320,50 T400,50"
            fill="none"
            stroke="#ff4d00"
            strokeWidth="2"
            className={active ? "animate-pulse" : ""}
          />
        </svg>
      )}
    </div>
  );
};
