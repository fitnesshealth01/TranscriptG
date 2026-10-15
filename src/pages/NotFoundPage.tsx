import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { ArrowLeft, FileQuestion } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <Seo
        title="404 — Page Not Found | TranscriptG"
        description="The page you were looking for does not exist."
        noindex={true}
      />

      <div className="glass-card p-10 sm:p-16 rounded-3xl border border-black/10 max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h1 className="text-4xl font-black text-[#0d0f12]">404 — Cue Not Found</h1>

        <p className="text-sm text-neutral-600 leading-relaxed">
          The requested page route could not be located in our linguistic registry.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#ff4d00] text-white font-mono font-bold text-xs thermal-glow transition-transform hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-100 text-[#0d0f12] font-mono font-bold text-xs hover:bg-neutral-200 transition-colors"
          >
            All Free Tools
          </Link>
        </div>

        <div className="pt-4 border-t border-black/5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-500">
          <Link to="/transcribe" className="hover:text-black underline">Audio Transcribe</Link>
          <span>•</span>
          <Link to="/youtube-transcript" className="hover:text-black underline">YouTube Captions</Link>
          <span>•</span>
          <Link to="/convert" className="hover:text-black underline">Subtitle Converter</Link>
          <span>•</span>
          <Link to="/blog" className="hover:text-black underline">Guides &amp; Blog</Link>
        </div>
      </div>
    </div>
  );
};
