import React, { useEffect, useRef, useState } from "react";

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
  const [isProdDomain, setIsProdDomain] = useState(false);
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname.toLowerCase();
    const isProd = host === "transcriptg.com" || host === "www.transcriptg.com";
    setIsProdDomain(isProd);

    if (!isProd || pushedRef.current) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      setAdBlocked(true);
    }
  }, [slot]);

  // Determine reserved minimum height to guarantee zero Cumulative Layout Shift (CLS)
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
      {/* Explicit Better Ads Standard Label */}
      <div className="flex items-center justify-center gap-2 mb-1.5">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-semibold select-none">
          ADVERTISEMENT
        </span>
      </div>

      <div
        className={`w-full rounded-2xl border border-black/5 bg-neutral-50/60 p-2 flex items-center justify-center relative ${minHeightClass}`}
      >
        {isProdDomain ? (
          <ins
            className="adsbygoogle w-full"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9246342607636743"
            data-ad-slot={slot !== "default-content-slot" ? slot : undefined}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        ) : (
          /* Subtle preview placeholder adhering strictly to Better Ads spatial standards */
          <div className="text-center py-4 px-3 space-y-1 select-none pointer-events-none">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-200/80 text-[10px] font-mono font-bold text-neutral-600">
              Google AdSense Zone · Reserved Viewport Box
            </div>
            <p className="text-[11px] font-mono text-neutral-400 max-w-md mx-auto">
              CLS-Protected Ad Container (Better Ads Standards Compliant · Auto-Adapts on Approval)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdSenseBanner;
