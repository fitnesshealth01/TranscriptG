import React from "react";
import { Link } from "react-router-dom";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="TranscriptG Home"
    >
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0f12] p-2 flex items-center justify-center border border-black/10 shadow-md group-hover:border-[#ff4d00]/40 transition-colors">
        {/* Animated mini spectrum trace in logo */}
        <div className="flex items-end gap-[2px] h-4">
          <span className="w-[3px] bg-[#ff4d00] rounded-full animate-spectrum-bar h-full"></span>
          <span className="w-[3px] bg-[#00d9ff] rounded-full animate-spectrum-bar h-[65%]" style={{ animationDelay: "0.2s" }}></span>
          <span className="w-[3px] bg-[#ff4d00] rounded-full animate-spectrum-bar h-[85%]" style={{ animationDelay: "0.4s" }}></span>
          <span className="w-[3px] bg-[#00d9ff] rounded-full animate-spectrum-bar h-[45%]" style={{ animationDelay: "0.1s" }}></span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-black tracking-tight text-[#0d0f12] leading-none flex items-center gap-0.5">
          Transcript<span className="text-[#ff4d00]">G</span>
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold leading-tight">
          Linguistic Engine
        </span>
      </div>
    </Link>
  );
};
