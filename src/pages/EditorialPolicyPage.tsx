import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck,
  Scale,
  AlertCircle,
  Mail,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export const EditorialPolicyPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <Seo
        title="Editorial Policy & Fact-Checking Standards — TranscriptG"
        description="TranscriptG editorial integrity charter: empirical benchmarking, mandatory peer review by credentialed specialists, AI oversight standards, and advertising independence."
        keywords={[
          "transcriptg editorial policy",
          "fact checking standards",
          "audio benchmarking ethics",
          "peer review policy",
          "advertising independence transcriptg",
        ]}
        canonicalPath="/editorial-policy"
      />

      <PageHeader
        eyebrow="Integrity & Governance"
        title="Editorial Integrity & Fact-Checking Policy"
        description="Our charter governing technical research, acoustic benchmarking, human specialist review, and strict advertising independence."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 bg-white shadow-xl space-y-10 text-neutral-800 text-sm sm:text-base leading-relaxed">
          
          <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 flex items-center justify-between text-xs font-mono text-neutral-600">
            <span>Last Updated: August 2026</span>
            <span className="font-bold text-[#ff4d00]">Version 3.2 Standards</span>
          </div>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#0d0f12] text-white flex items-center justify-center font-mono text-xs">
                01
              </span>
              <span>Mission & Editorial Scope</span>
            </h2>
            <p>
              TranscriptG publishes in-depth engineering documentation, acoustic benchmarks, subtitle conversion standards, and regulatory compliance frameworks (such as HIPAA, WCAG 2.2 AA, and Court Reporting verbatim guidelines).
            </p>
            <p>
              Our editorial mandate is to deliver authoritative, empirical, and directly actionable knowledge to software engineers, audio technicians, legal transcriptionists, healthcare professionals, and content creators. We strictly prohibit shallow, repetitive, or low-value content.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#0d0f12] text-white flex items-center justify-center font-mono text-xs">
                02
              </span>
              <span>Empirical Benchmarking & Acoustic Testing</span>
            </h2>
            <p>
              When TranscriptG discusses Word Error Rates (WER), audio codec bitrates, or speech recognition latency, numbers are not estimated or regurgitated from marketing materials. All figures are derived from reproducible tests using open corpora (LibriSpeech, Common Voice, TED-LIUM) or standard audio engineering equations (Nyquist-Shannon sampling limits, PCM linear bitrates).
            </p>
            <p>
              Test parameters—including sample rate, bit depth, audio channel count, and background Signal-to-Noise Ratio (SNR)—must be fully documented within every benchmark article.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#0d0f12] text-white flex items-center justify-center font-mono text-xs">
                03
              </span>
              <span>Mandatory Peer Review & E-E-A-T Framework</span>
            </h2>
            <p>
              Every article published in our Linguistic Journal must undergo peer review by an accredited member of the TranscriptG Editorial Board before publication:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-700">
              <li>
                <strong>Acoustic & Engineering Guides:</strong> Reviewed by a Ph.D. in Computational Linguistics or IEEE member specializing in speech recognition.
              </li>
              <li>
                <strong>Legal Transcription Guides:</strong> Reviewed by an active Registered Professional Reporter (RPR) or Certified Realtime Reporter (CRR).
              </li>
              <li>
                <strong>Medical & Clinical Guides:</strong> Reviewed by a Certified Healthcare Documentation Specialist (CHDS).
              </li>
              <li>
                <strong>Accessibility & Subtitle Guides:</strong> Reviewed by an IAAP Certified Professional in Accessibility Core Competencies (CPACC).
              </li>
            </ul>
            <p>
              Author bylines and reviewer stamps reflect verifiable real-world credentials, establishing transparent accountability for all claims.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#0d0f12] text-white flex items-center justify-center font-mono text-xs">
                04
              </span>
              <span>Policy on Generative AI & Human Oversight</span>
            </h2>
            <p>
              While TranscriptG builds neural speech recognition and AI text processing engines, we maintain a zero-tolerance policy against unedited or autonomous AI text publishing. Every guide, code snippet, and tutorial is authored, verified, and audited by human domain specialists. AI tools may only be utilized for grammatical review and structural formatting under human direction.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#0d0f12] text-white flex items-center justify-center font-mono text-xs">
                05
              </span>
              <span>Advertising Independence & Better Ads Standards</span>
            </h2>
            <p>
              TranscriptG is sustained through privacy-safe contextual advertising (including Google AdSense) to maintain all speech engines free for public access.
            </p>
            <p>
              To maintain uncompromised editorial integrity:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-700">
              <li>
                Advertisers and sponsors possess zero input or approval rights over editorial content, tool evaluations, or benchmark rankings.
              </li>
              <li>
                All advertising units are strictly demarcated with clear "Advertisement" labels and conform 100% to Coalition for Better Ads standards (no auto-playing audio, no pop-ups, no full-screen overlays).
              </li>
              <li>
                We do not sell sponsored reviews, paid guest posts, or surreptitious affiliate placements masquerading as independent analysis.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#0d0f12] text-white flex items-center justify-center font-mono text-xs">
                06
              </span>
              <span>Corrections & Editorial Feedback</span>
            </h2>
            <p>
              We welcome reader scrutiny and technical verification. If you detect a calculation error, outmoded technical standard, or misattributed citation, contact our editorial team directly at:
            </p>
            <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 font-mono text-sm space-y-1">
              <div><strong>Editorial Inquiry Desk:</strong> editorial@transcriptg.com</div>
              <div><strong>Mailing:</strong> TranscriptG Engineering Lab, 440 N Barranca Ave, Covina, CA 91723</div>
              <div><strong>Response SLA:</strong> Technical verification within 48 business hours.</div>
            </div>
            <p className="text-xs text-neutral-500">
              Verified corrections are logged with an explicit update timestamp and revision note directly at the top of the affected article.
            </p>
          </section>

          {/* Bottom Link Box */}
          <div className="pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/editorial-team"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#ff4d00] hover:underline font-mono"
            >
              <span>View Editorial Board Member Bios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="text-xs text-neutral-500 hover:text-black font-mono underline"
            >
              About TranscriptG Architecture
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditorialPolicyPage;
