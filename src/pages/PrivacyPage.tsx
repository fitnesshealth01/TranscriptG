import React from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <Seo
        title="Privacy Policy & Zero-Retention Security — TranscriptG"
        description="TranscriptG privacy policy: zero permanent storage, zero account tracking, Google AdSense cookie compliance, GDPR and CCPA privacy rights."
        keywords={[
          "transcriptg privacy policy",
          "zero data retention transcription",
          "ferpa audio compliance",
          "gdpr speech to text",
          "adsense privacy compliance",
        ]}
        canonicalPath="/privacy"
      />

      <PageHeader
        eyebrow="Privacy & Security"
        title="Privacy Policy & Cookie Disclosure"
        description="Effective Date: August 2026 · Updated for AdSense, GDPR & CCPA Compliance"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 space-y-8 text-neutral-800 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">1. Introduction & Core Privacy Commitment</h2>
            <p>
              TranscriptG ("we", "our", or "us") operates a public-access, privacy-first audio transcription and text-intelligence web platform. We are committed to protecting your personal information and respecting your right to privacy.
            </p>
            <p>
              We do not require account registration, passwords, credit card credentials, or personal contact information to utilize our core transcription and conversion tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">2. Zero-Retention File Processing Policy</h2>
            <p>
              Audio files, video files, and text inputs submitted to TranscriptG Engine 01, Engine 02, or Engine 03 are processed entirely in temporary (ephemeral) server memory for the duration of your active HTTP request.
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-neutral-700">
              <li>Uploaded media files are never saved to disk storage.</li>
              <li>Files and transcriptions are never archived, cataloged, or indexed.</li>
              <li>Your audio recordings and text manuscripts are never used to train machine learning models.</li>
              <li>All temporary buffers are automatically purged immediately after the output is generated.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">3. Third-Party Advertising & Google AdSense Cookies</h2>
            <p>
              To maintain our platform as a free public utility, TranscriptG may partner with third-party advertising vendors, including <strong>Google AdSense</strong>, to serve non-intrusive advertisements when you visit our website.
            </p>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites on the Internet:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-700">
              <li>
                <strong>Google's Advertising Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to TranscriptG and/or other sites on the Internet.
              </li>
              <li>
                <strong>Personalized Advertising Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#ff4d00] underline font-bold">Google Ad Settings</a>. Alternatively, users can opt out of third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#ff4d00] underline font-bold">www.aboutads.info</a>.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">4. Analytics & Operational Logs</h2>
            <p>
              We maintain minimal, non-identifiable operational logs (e.g., standard HTTP request status codes and bandwidth usage metrics) solely to maintain system availability, prevent denial-of-service abuse, and monitor API endpoint performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">5. GDPR Rights for European Union Residents</h2>
            <p>
              If you reside in the European Economic Area (EEA), you have the right to access, update, or delete any personal information we may hold. Because TranscriptG operates on a zero-retention, no-account basis, we do not store identifiable personal profiles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">6. CCPA / CPRA Notice for California Residents</h2>
            <p>
              Under the California Consumer Privacy Act (CCPA), California consumers have the right to request disclosure of categories of personal information collected, request deletion, and opt out of the sale or sharing of personal information. TranscriptG does not sell or trade personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">7. Contact & Privacy Inquiries</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please visit our <a href="/contact" className="text-[#ff4d00] underline font-bold">Contact Page</a> or reach out to our privacy officer directly via email at <span className="font-mono font-bold text-[#0d0f12]">privacy@transcriptg.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

