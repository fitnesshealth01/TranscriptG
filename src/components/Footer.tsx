import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { ShieldCheck, Zap, Globe2, FileCode2 } from "lucide-react";
import { TOOLS_REGISTRY } from "../lib/navigation";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0d0f12] text-white pt-16 pb-28 border-t border-white/10 relative overflow-hidden w-full max-w-full">
      {/* Background glow accents */}
      <div className="absolute -top-32 right-0 w-96 h-96 bg-[#ff4d00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00d9ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="brightness-200">
              <Logo />
            </div>
            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
              TranscriptG is a high-precision linguistic laboratory that turns sound into knowledge. Zero accounts, zero ads, public-access, and privacy-first.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00d9ff]" /> 100% Session Private
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                <Globe2 className="w-3.5 h-3.5 text-[#ff4d00]" /> 90+ Languages
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> &lt;2s Latency
              </span>
            </div>
          </div>

          {/* Dynamic Engines from Registry */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold mb-4">
              Linguistic & Academic Engines
            </h3>
            <ul className="space-y-2.5 text-sm">
              {TOOLS_REGISTRY.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={tool.path}
                    className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    {tool.badge && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
                    )}
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Export Formats */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#00d9ff] font-bold mb-4">
              Lossless Exports
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400 font-mono text-xs">
              <li className="flex items-center gap-1.5"><FileCode2 className="w-3.5 h-3.5 text-neutral-500" /> SRT (SubRip Subtitle)</li>
              <li className="flex items-center gap-1.5"><FileCode2 className="w-3.5 h-3.5 text-neutral-500" /> VTT (Web Video Text)</li>
              <li className="flex items-center gap-1.5"><FileCode2 className="w-3.5 h-3.5 text-neutral-500" /> TXT & Markdown</li>
              <li className="flex items-center gap-1.5"><FileCode2 className="w-3.5 h-3.5 text-neutral-500" /> Structured JSON</li>
              <li className="flex items-center gap-1.5"><FileCode2 className="w-3.5 h-3.5 text-neutral-500" /> PDF Document</li>
              <li className="flex items-center gap-1.5"><FileCode2 className="w-3.5 h-3.5 text-neutral-500" /> DOCX Word File</li>
            </ul>
          </div>

          {/* Resources & Company */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold mb-4">
              Resources & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/blog" className="text-neutral-300 hover:text-white transition-colors">
                  Linguistic Journal (Blog)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About TranscriptG
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact & Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>© {new Date().getFullYear()} TranscriptG. All rights reserved. Built for global open access.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/sitemap.xml" target="_blank" className="hover:text-neutral-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
