import React from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <Seo
        title="Terms of Service — TranscriptG"
        description="TranscriptG Terms of Service: guidelines for public-access usage, rights, and responsibilities."
      />

      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Effective Date: August 2026 · Fair & Transparent Public Usage"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 space-y-8 text-neutral-800 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">1. Acceptable Use</h2>
            <p>
              TranscriptG is provided for lawful personal, professional, and commercial transcription, format conversion, and text processing. You agree not to upload malicious media, automate abuse of system endpoints, or bypass platform limits.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">2. Intellectual Property Rights</h2>
            <p>
              You retain 100% ownership of all rights, titles, and interests in the audio files, transcripts, and converted subtitles processed using TranscriptG. TranscriptG claims zero ownership or rights over user content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">3. Service Availability</h2>
            <p>
              While we strive for 99.9% uptime, TranscriptG is provided on an "as-is" and "as-available" basis without warranties of any kind.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
