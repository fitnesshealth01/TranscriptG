import React from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { ShieldCheck, Zap, Globe2, Sparkles, CheckCircle2 } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <Seo
        title="About TranscriptG — Precision Linguistic Laboratory"
        description="Learn about TranscriptG: public-access, no-login, privacy-first transcription platform designed for lossless speed and 90+ languages support."
      />

      <PageHeader
        eyebrow="Company & Mission"
        title="Public-Access Precision Linguistic Laboratory"
        description="We believe transcription tools should be fast, private, public-access, and free of paywalls or intrusive ads."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 space-y-6">
          <h2 className="text-2xl font-black text-[#0d0f12]">Our Core Philosophy</h2>
          <p className="text-neutral-700 text-base leading-relaxed">
            TranscriptG was engineered to eliminate artificial barriers in digital communication. Modern workflows rely heavily on audio and video media, yet converting sound into searchable, structured text remains locked behind monthly subscriptions, mandatory account signups, and ad-cluttered interfaces.
          </p>
          <p className="text-neutral-700 text-base leading-relaxed">
            We built TranscriptG with a strict zero-friction principle: <strong>No login required, no watermarks, no quotas on standard flows, and 100% session privacy.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0d0f12]">Privacy First</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Your audio and text buffers exist strictly within your session. Files are never stored permanently, never sold, and never mined for advertising.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00d9ff]/15 text-[#0088a8] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0d0f12]">Sub-Second Speed</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Engineered with modern full-stack web architecture to return timecoded subtitle cues and summaries in seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
