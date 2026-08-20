import React from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "./Logo";
import { FloatingDock } from "./FloatingDock";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { CookieConsent } from "./CookieConsent";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0d0f12] relative font-sans antialiased">
      <ScrollToTop />
      <CookieConsent />

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf9f6]/80 backdrop-blur-md border-b border-black/5 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Logo />
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-neutral-500 font-semibold">Engine v3.7 Active</span>
          <span className="px-2 py-0.5 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] font-bold text-[10px]">
            Public Access
          </span>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 pb-16">
        <Outlet />
      </main>

      {/* Floating Bottom Dock */}
      <FloatingDock />

      {/* Footer */}
      <Footer />
    </div>
  );
};
