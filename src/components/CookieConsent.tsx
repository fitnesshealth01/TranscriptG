import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, X } from "lucide-react";

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("transcriptg_cookie_consent");
    if (!consent) {
      // Small delay for smooth pop-in
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("transcriptg_cookie_consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside aria-label="Cookie and Privacy Consent" className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-in">
      <div className="glass-card p-5 rounded-2xl border border-black/15 shadow-2xl bg-white/95 backdrop-blur-xl text-[#0d0f12] space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-sm text-[#0d0f12]">
            <ShieldCheck className="w-4 h-4 text-[#ff4d00]" /> Privacy & Cookie Consent
          </div>
          <button
            onClick={handleAccept}
            className="text-neutral-400 hover:text-black transition-colors"
            title="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          TranscriptG uses essential session cookies and partner ad technologies (such as Google AdSense) to keep transcription tools free. Learn more in our{" "}
          <Link to="/privacy" className="text-[#ff4d00] underline font-bold">
            Privacy Policy
          </Link>.
        </p>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-xl bg-[#0d0f12] text-white text-xs font-bold hover:bg-[#ff4d00] transition-colors shadow-sm"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </aside>
  );
};
