import React, { useEffect, useRef, useState } from "react";

interface AdSenseBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slot = "1234567890",
  format = "auto",
  responsive = true,
  className = "",
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);
  const [isProductionDomain, setIsProductionDomain] = useState(false);

  useEffect(() => {
    // Only fire live ad calls on official production custom domain
    // Prevents invalid traffic/unauthorized host policy violations on Cloud Run preview, localhost, or dev domains
    const host = typeof window !== "undefined" ? window.location.hostname.toLowerCase() : "";
    const isProd = host === "transcriptg.com" || host === "www.transcriptg.com";
    setIsProductionDomain(isProd);

    if (!isProd || pushedRef.current) return;

    try {
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushedRef.current = true;
      }
    } catch (e) {
      // Ignore adsbygoogle errors when blocked by client adblockers or sandbox
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={`my-8 p-4 rounded-2xl border border-black/5 bg-neutral-50/50 text-center relative overflow-hidden ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2 font-bold select-none">
        Advertisement
      </div>

      <div className="min-h-[90px] flex items-center justify-center overflow-hidden">
        {isProductionDomain ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9246342607636743"
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        ) : (
          <div className="text-xs font-mono text-neutral-400 border border-dashed border-neutral-200 rounded-xl px-4 py-3">
            [AdSense Unit: Active on transcriptg.com]
          </div>
        )}
      </div>
    </div>
  );
};
