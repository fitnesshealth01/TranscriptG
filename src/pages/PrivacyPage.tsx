import React from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <Seo
        title="Privacy Policy — TranscriptG"
        description="TranscriptG privacy policy: zero permanent storage, zero account tracking, 100% session-private processing."
      />

      <PageHeader
        eyebrow="Privacy & Security"
        title="Privacy Policy"
        description="Effective Date: August 2026 · Privacy-First Architecture Guarantee"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 space-y-8 text-neutral-800 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">1. Overview</h2>
            <p>
              TranscriptG operates under a strict privacy-first policy. We do not require account creation, logins, credit card details, or personal contact information to utilize any of our transcription or text-intelligence engines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">2. Data Handling & File Retention</h2>
            <p>
              Media files (audio, video) and text inputs uploaded to TranscriptG are processed in memory strictly for the duration of your request. Files are never written to permanent disk storage, stored in databases, or used to train public machine learning models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">3. Third-Party Analytics & Cookies</h2>
            <p>
              We maintain a minimal, non-intrusive operational log to monitor system availability and API health. We do not place tracking cookies or third-party advertising cookies on your device.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">4. Contact</h2>
            <p>
              For privacy inquiries, please visit our <a href="/contact" className="text-[#ff4d00] underline font-bold">Contact Page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
