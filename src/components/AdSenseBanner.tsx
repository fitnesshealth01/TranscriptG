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
  slot,
  format = "auto",
  responsive = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);
  const [isProdDomain, setIsProdDomain] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = window.location.hostname.toLowerCase();
    const isProd = host === "transcriptg.com" || host === "www.transcriptg.com";
    setIsProdDomain(isProd);

    // Only invoke ad push if on production custom domain and a real slot is configured
    if (!isProd || !slot || pushedRef.current) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // Silently catch adblock or initial loading issues
    }
  }, [slot]);

  // If no slot provided, let Google Auto-Ads manage in-page placements automatically
  if (!slot || !isProdDomain) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`my-6 text-center overflow-hidden transition-all duration-300 ${className}`}
      aria-hidden="true"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9246342607636743"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};
