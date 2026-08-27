import React from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { ShieldAlert, FileCheck2, Scale, AlertTriangle, Copyright } from "lucide-react";

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <Seo
        title="Terms of Service & Public Usage Agreement — TranscriptG"
        description="TranscriptG Terms of Service: acceptable use policies, disclaimer of AI accuracy, limitation of liability, and 100% user intellectual property ownership."
        keywords={[
          "terms of service",
          "user agreement",
          "legal disclaimer",
          "AI transcription liability",
          "acceptable use policy",
          "transcriptg terms",
        ]}
        canonicalPath="/terms"
      />

      <PageHeader
        eyebrow="Legal & Regulatory"
        title="Terms of Service & User Agreement"
        description="Effective Date: August 2026 · Transparent Public Usage & Responsibility Framework"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 space-y-10 text-neutral-800 text-sm sm:text-base leading-relaxed bg-white shadow-xl">
          
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#ff4d00]" />
              <h2 className="text-xl font-bold text-[#0d0f12]">1. Acceptance of Terms</h2>
            </div>
            <p>
              By accessing, browsing, or utilizing any services provided by <strong>TranscriptG</strong> (including Engine 01: Transcribe, Engine 02: Convert, Engine 03: Process, and our technical knowledge base), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our accompanying <a href="/privacy" className="text-[#ff4d00] font-bold underline">Privacy Policy</a>.
            </p>
            <p>
              If you do not agree with any part of these terms, you must immediately discontinue use of the platform.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-[#ff4d00]" />
              <h2 className="text-xl font-bold text-[#0d0f12]">2. Acceptable Use & User Responsibilities</h2>
            </div>
            <p>
              TranscriptG is provided for lawful personal, professional, academic, and commercial audio transcription, subtitle conversion, and natural language processing. You expressly agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm text-neutral-700">
              <li>Upload audio or media files that violate intellectual property rights, copyrights, or privacy rights of any third party.</li>
              <li>Upload malicious binary code, trojans, corrupted containers, or payloads engineered to compromise platform infrastructure.</li>
              <li>Automate continuous high-frequency requests (DDoS or scraping) that impair service availability for other users.</li>
              <li>Upload media containing illegal, non-consensual surveillance audio or materials prohibited by local or international law.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Copyright className="w-5 h-5 text-[#ff4d00]" />
              <h2 className="text-xl font-bold text-[#0d0f12]">3. Intellectual Property Rights & Ownership</h2>
            </div>
            <p>
              <strong>You retain 100% exclusive ownership</strong> of all audio recordings, video files, text inputs, generated transcripts, and converted subtitles processed through TranscriptG.
            </p>
            <p>
              TranscriptG claims zero copyright, ownership, license, or distribution rights over your content. Furthermore, because we do not retain files in persistent storage, we do not store copies of your intellectual property.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#ff4d00]" />
              <h2 className="text-xl font-bold text-[#0d0f12]">4. Disclaimer of AI Accuracy & Medical/Legal Advice</h2>
            </div>
            <p>
              TranscriptG utilizes advanced neural speech-to-text models and large language model intelligence. While our algorithms achieve industry-leading accuracy (typically 98%+), <strong>automated transcriptions may contain inaccuracies, homophone substitutions, missing punctuation, or AI hallucinations</strong> caused by poor audio fidelity, background noise, or heavy accents.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-2">
              <p className="font-bold">Important Notice for Legal and Healthcare Professionals:</p>
              <p>
                Transcripts and summaries generated by TranscriptG do not constitute certified court reporter transcripts, official legal discovery records, or formal medical diagnoses. Users are solely responsible for human-verifying all outputs prior to submitting to legal proceedings, medical charts, or contractual agreements.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#ff4d00]" />
              <h2 className="text-xl font-bold text-[#0d0f12]">5. Limitation of Liability & "As-Is" Provision</h2>
            </div>
            <p>
              TranscriptG is provided on an <strong>"AS IS" and "AS AVAILABLE"</strong> basis without warranties of any kind, whether express, implied, statutory, or otherwise, including implied warranties of merchantability or fitness for a particular purpose.
            </p>
            <p>
              In no event shall TranscriptG, its engineers, contributors, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-neutral-700">
              <li>Inaccuracies or typographical errors in generated transcripts or summaries.</li>
              <li>Temporary server downtime, network latency, or service interruptions.</li>
              <li>Data loss occurring during local browser communication or network disconnects.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">6. Third-Party Services & Links</h2>
            <p>
              Our website may display advertisements served by Google AdSense or contain links to external third-party sites (e.g., W3C standards, Audacity documentation). We do not control or endorse the content, policies, or practices of external third-party platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0d0f12]">7. Modifications to Terms</h2>
            <p>
              We reserve the right to revise or update these Terms of Service at any time. Changes become effective immediately upon posting to this page. Your continued use of the platform constitutes acceptance of revised terms.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-black/10">
            <h2 className="text-xl font-bold text-[#0d0f12]">8. Contact & Inquiries</h2>
            <p>
              For legal inquiries, copyright notices, or questions regarding these terms, please contact our team at <span className="font-mono font-bold text-[#0d0f12]">legal@transcriptg.com</span> or via our <a href="/contact" className="text-[#ff4d00] font-bold underline">Contact Page</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
