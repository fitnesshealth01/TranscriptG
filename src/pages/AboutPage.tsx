import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import {
  ShieldCheck,
  Zap,
  Globe2,
  Sparkles,
  CheckCircle2,
  Cpu,
  Lock,
  Server,
  FileCode,
  Users,
  Building2,
  Mail,
  Award
} from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <Seo
        title="About TranscriptG — Free Public-Access Acoustic & Linguistic Engineering Lab"
        description="Learn about TranscriptG: our public-access speech mission, zero-retention privacy architecture, engineering benchmarks, and commitment to free speech tools."
        keywords={[
          "about transcriptg",
          "speech technology laboratory",
          "acoustic AI mission",
          "free transcription team",
          "zero retention audio engineering",
          "open linguistic laboratory",
        ]}
        canonicalPath="/about"
      />

      <PageHeader
        eyebrow="Company & Engineering Lab"
        title="Public-Access Precision Linguistic Laboratory"
        description="We engineer high-throughput speech recognition, subtitle conversion, and text-intelligence utilities accessible to everyone without paywalls or tracking."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Core Mission Card */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 space-y-6 bg-white shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Our Foundational Mission
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0d0f12] tracking-tight">
            Democratizing Speech Technology & Preserving Data Privacy
          </h2>
          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">
            Spoken language is the most natural, rich medium of human thought. Yet in modern digital workflows, converting voice into structured, searchable, accessible text is frequently gatekept by expensive recurring SaaS subscriptions, mandatory account creation, and invasive user tracking.
          </p>
          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed">
            <strong>TranscriptG</strong> was established by audio engineers and computational linguists with a single mandate: build a high-precision, sub-second linguistic engine that is 100% public-access, free of mandatory logins, and architected with absolute zero-retention ephemeral privacy.
          </p>
        </div>

        {/* 4 Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-4 bg-white shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0d0f12]">Zero Data Retention (ZDR)</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We process audio streams and text buffers strictly in volatile server RAM. When your HTTP connection completes, buffers are instantly deallocated. Zero disk writes, zero database storage, and zero model training on your data.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-4 bg-white shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0d0f12]">Sub-Second Neural Execution</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Powered by optimized Transformer acoustic models and modern full-stack web architecture, TranscriptG achieves transcription speeds up to 50x faster than real-time audio playback.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-4 bg-white shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0d0f12]">90+ Languages & Regional Dialects</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              From global business languages like English, Spanish, Mandarin, and German to regional dialects and low-resource languages, our acoustic models handle accents and code-switching naturally.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-4 bg-white shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0d0f12]">Universal Subtitle Standards</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Seamlessly bridge SubRip (.SRT), WebVTT (.VTT), Word (.DOCX), and JSON formats with frame-accurate millisecond timecode conversion compliant with WCAG 2.2 accessibility guidelines.
            </p>
          </div>
        </div>

        {/* Engineering Team & Verified Identity Card */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 space-y-6 bg-white shadow-xl">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-[#ff4d00]" />
            <h3 className="text-2xl font-bold text-[#0d0f12]">Engineering Team & Leadership</h3>
          </div>
          <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
            TranscriptG is developed and maintained by a dedicated group of distributed systems engineers, audio mastering specialists, and computational linguistics researchers. Our team actively contributes to open-source speech toolkits, accessibility compliance standards, and digital signal processing pipelines.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
              <div className="text-xs font-mono font-bold text-[#ff4d00] uppercase">Acoustic Signal Lab</div>
              <div className="text-sm font-bold text-[#0d0f12]">Digital Signal Processing</div>
              <div className="text-xs text-neutral-500">Spectral Gating & Filter Chains</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
              <div className="text-xs font-mono font-bold text-[#ff4d00] uppercase">NLP Research</div>
              <div className="text-sm font-bold text-[#0d0f12]">Multimodal Transformer Models</div>
              <div className="text-xs text-neutral-500">Multilingual Tokenization & ASR</div>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
              <div className="text-xs font-mono font-bold text-[#ff4d00] uppercase">Platform Systems</div>
              <div className="text-sm font-bold text-[#0d0f12]">Zero-Retention Security</div>
              <div className="text-xs text-neutral-500">Ephemeral Memory Routing</div>
            </div>
          </div>
        </div>

        {/* Contact & Support Callout */}
        <div className="p-8 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-xl font-bold">Have questions or want to partner with us?</h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              Our engineering team responds to inquiries within 24 hours.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-2xl bg-[#ff4d00] text-white text-xs font-mono font-bold hover:bg-[#e04400] transition-colors whitespace-nowrap"
          >
            Get In Touch With Our Team →
          </Link>
        </div>
      </div>
    </div>
  );
};
