import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, X } from "lucide-react";

/**
 * Triggers the Google Certified CMP revocation dialog if active,
 * or re-opens TranscriptG's consent modal.
 */
export function openCookieConsent() {
  if (typeof window !== "undefined") {
    const gfc = (window as any).googlefc;
    if (gfc && typeof gfc.showRevocationMessage === "function") {
      gfc.showRevocationMessage();
      return;
    }
    window.dispatchEvent(new CustomEvent("open_cookie_consent"));
  }
}

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("transcriptg_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access fail-safe
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setShow(true);
    window.addEventListener("open_cookie_consent", handleOpen);
    return () => window.removeEventListener("open_cookie_consent", handleOpen);
  }, []);

  const handleChoice = (preference: "accepted" | "essential") => {
    try {
      localStorage.setItem("transcriptg_cookie_consent", preference);
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-in"
    >
      <div className="p-4 sm:p-5 rounded-2xl border border-black/10 shadow-2xl bg-white/95 backdrop-blur-xl text-[#0d0f12] space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-sm text-[#0d0f12]">
            <ShieldCheck className="w-4 h-4 text-[#ff4d00]" />
            <span>Cookie &amp; Advertising Consent</span>
          </div>
          <button
            onClick={() => handleChoice("essential")}
            className="text-neutral-400 hover:text-black transition-colors p-1"
            title="Dismiss with essential cookies only"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          TranscriptG and advertising partners (such as Google AdSense) use cookies to analyze site traffic and deliver relevant, non-intrusive ads that keep our transcription tools 100% free. You can review your choices anytime in our{" "}
          <Link to="/privacy" className="text-[#ff4d00] underline font-semibold">
            Privacy Policy
          </Link>{" "}
          or manage your{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff4d00] underline font-semibold"
          >
            Google Ad Settings
          </a>.
        </p>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={() => handleChoice("essential")}
            className="px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700 text-xs font-semibold hover:bg-neutral-200 transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={() => handleChoice("accepted")}
            className="px-4 py-1.5 rounded-xl bg-[#0d0f12] text-white text-xs font-bold hover:bg-[#ff4d00] transition-colors shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
};
