import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "./Logo";
import { FloatingDock } from "./FloatingDock";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { CookieConsent } from "./CookieConsent";
import { ToolsLauncherModal } from "./ToolsLauncherModal";
import { LayoutGrid } from "lucide-react";

export const Layout: React.FC = () => {
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#0d0f12] relative font-sans antialiased w-full max-w-full overflow-x-hidden">
      <ScrollToTop />
      <CookieConsent />

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#faf9f6]/85 backdrop-blur-md border-b border-black/5 px-4 sm:px-8 py-3 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-500 font-semibold">Engine v3.7 Active</span>
            <span className="px-2 py-0.5 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] font-bold text-[10px]">
              Public Access
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsToolsModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/5 hover:bg-[#ff4d00]/10 hover:text-[#ff4d00] text-neutral-700 font-bold transition-all text-xs cursor-pointer border border-black/5"
            aria-label="Open tool directory"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#ff4d00]" />
            <span className="font-mono">All Tools</span>
          </button>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 pb-20 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Floating Bottom Dock */}
      <FloatingDock />

      {/* Footer */}
      <Footer />

      {/* Tools Modal (triggered from header) */}
      <ToolsLauncherModal
        isOpen={isToolsModalOpen}
        onClose={() => setIsToolsModalOpen(false)}
      />
    </div>
  );
};

