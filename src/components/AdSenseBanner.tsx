import React, { useEffect, useRef } from "react";

interface AdSenseBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slot = "default-content-slot",
  format = "auto",
  responsive = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  // Keep ad units completely hidden until site approval
  const isAdSenseEnabled = Boolean((import.meta as any)?.env?.VITE_ADSENSE_ENABLED === "true");

  useEffect(() => {
    if (!isAdSenseEnabled || typeof window === "undefined") return;
    const host = window.location.hostname.toLowerCase();
    const isProd = host === "transcriptg.com" || host === "www.transcriptg.com";

    if (!isProd || pushedRef.current) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // Ad blocker handling
    }
  }, [slot, isAdSenseEnabled]);

  // If AdSense is not explicitly enabled in the environment, render zero DOM nodes
  if (!isAdSenseEnabled) {
    return null;
  }

  const minHeightClass =
    format === "rectangle"
      ? "min-h-[250px]"
      : format === "horizontal"
      ? "min-h-[90px]"
      : "min-h-[100px]";

  return (
    <div
      ref={containerRef}
      className={`my-8 w-full max-w-full overflow-hidden text-center transition-all ${className}`}
    >
      <div className="flex items-center justify-center gap-2 mb-1.5">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-semibold select-none">
          ADVERTISEMENT
        </span>
      </div>

      <div
        className={`w-full rounded-2xl border border-black/5 bg-neutral-50/60 p-2 flex items-center justify-center relative ${minHeightClass}`}
      >
        <ins
          className="adsbygoogle w-full"
          style={{ display: "block" }}
          data-ad-client="ca-pub-9246342607636743"
          data-ad-slot={slot !== "default-content-slot" ? slot : undefined}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
};

export default AdSenseBanner;
