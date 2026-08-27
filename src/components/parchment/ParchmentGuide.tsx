import React, { useState } from "react";
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  ChevronDown,
  Lock,
  ExternalLink,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Award,
  Layers,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export const ParchmentGuide: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is a Parchment transcript, and how does the network work?",
      a: "Parchment is the leading digital credential exchange network used by more than 4,000 colleges, universities, and 13,000 high schools worldwide. When you order a transcript via Parchment, your institution's registrar generates an encrypted digital credential containing a cryptographic digital signature (Adobe CDS) that verifies its authenticity when opened in compliant PDF viewers."
    },
    {
      q: "What is the difference between an Official and an Unofficial transcript?",
      a: "An Official Transcript contains a tamper-evident digital certificate (Blue Ribbon Adobe CDS signature), registrar seal, and unique Document ID (DID). It is transmitted directly from institution to recipient. An Unofficial Transcript is typically a self-service PDF or portal printout without cryptographic signatures, suitable for personal review, GPA planning, or advising."
    },
    {
      q: "Can I use TranscriptG to parse both official and unofficial transcripts?",
      a: "Yes! TranscriptG's Academic Intelligence Engine accepts official Parchment electronic PDFs, scanned paper transcripts, National Student Clearinghouse documents, and self-service registrar text exports. It automatically extracts courses, grades, credits, terms, and recomputes cumulative GPAs."
    },
    {
      q: "Why does my Parchment PDF say 'Invalid Signature' or 'Signature Unknown' in Google Chrome?",
      a: "Web browsers like Google Chrome, Safari, and Apple Preview use lightweight PDF renderers that do not connect to the Adobe Approved Trust List (AATL). To see the official green checkmark or blue ribbon digital signature, open the PDF in Adobe Acrobat Reader on desktop."
    },
    {
      q: "How does the cumulative GPA calculation work?",
      a: "Cumulative GPA equals Total Quality Points divided by Total GPA Credits Attempted. Quality Points are determined by multiplying course credits by standard grade point weights (e.g., 4.0 for A, 3.7 for A-, 3.3 for B+, 3.0 for B, 2.0 for C, 0.0 for F). Pass/Fail and transferred credits with no grade points are excluded from GPA calculation."
    },
    {
      q: "How do I order a transcript through Parchment for AMCAS or LSAC?",
      a: "Log in to Parchment, select your institution, choose AMCAS or LSAC as the destination recipient, and enter your AMCAS AAMC ID & Transcript ID (or LSAC Account Number). Parchment will automatically match your official electronic record to your application portal."
    },
    {
      q: "What causes a Parchment transcript hold and how do I fix it?",
      a: "A 'Hold on Record' status occurs when your school registrar halts fulfillment due to unpaid tuition/fees, unreturned library materials, parking tickets, or missing financial aid exit counseling. Contact your university's bursar or registrar office directly to clear the hold; Parchment cannot clear holds on behalf of institutions."
    },
    {
      q: "Is my academic data stored or shared by TranscriptG?",
      a: "No. TranscriptG operates on an immutable Zero-Data-Retention architecture. Files and transcript data exist exclusively in ephemeral RAM during your active session and are permanently destroyed upon completion. No student records, SSNs, or grades are ever stored on disk or used for AI training, ensuring complete FERPA privacy."
    },
    {
      q: "How can I convert my college semester transcript to a 4.0 AMCAS / Medical School format?",
      a: "Use our interactive course editor to verify course classifications (BCPM: Biology, Chemistry, Physics, Math) and export directly as an AMCAS-formatted CSV file ready for medical school application entry."
    },
    {
      q: "Can high school transcripts with weighted AP / Honors GPAs be calculated?",
      a: "Yes. TranscriptG supports 5.0 weighted GPA scales (+1.0 for AP/IB/Dual Enrollment courses, +0.5 for Honors), calculating both unweighted 4.0 and weighted cumulative averages simultaneously."
    }
  ];

  return (
    <div className="space-y-16 mt-16 pt-12 border-t border-black/10">
      {/* Overview Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
          Academic Knowledge Base
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0d0f12] tracking-tight">
          Everything You Need to Know About Parchment Transcripts
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Master the official transcript exchange workflow, cryptographic security standards, GPA conversion scales, and graduate school submission requirements.
        </p>
      </div>

      {/* Guide Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0d0f12]">
            1. The Parchment Credential Network
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Parchment serves as the verified bridge between educational registrars and destination institutions. Over 4,000 universities utilize Parchment's automated electronic data interchange (EDI) to dispatch cryptographically locked credentials within minutes.
          </p>
          <ul className="space-y-1.5 text-xs text-neutral-700 font-medium">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d00]" /> Real-time order status tracking</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d00]" /> Unique Document ID (DID) tracking</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d00]" /> Direct integration with Common App & AMCAS</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#00d9ff]/15 text-[#0088a8] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0d0f12]">
            2. Official vs. Unofficial Transcripts
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Official electronic transcripts feature Adobe CDS cryptographic digital signatures. If any grade, course title, or text character is altered, the digital seal breaks and shows a "Tampered Document" warning in PDF viewers.
          </p>
          <ul className="space-y-1.5 text-xs text-neutral-700 font-medium">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#0088a8]" /> Adobe Certified Document Services (CDS)</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#0088a8]" /> VOID watermark on printed copies</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#0088a8]" /> Direct electronic delivery to admissions</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0d0f12]">
            3. Standard GPA & Quality Points
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Standard 4.0 collegiate grading scales assign 4.0 quality points per credit for an A, 3.7 for A-, 3.3 for B+, and 3.0 for B. High school transcripts often incorporate +1.0 weighted bonus points for Advanced Placement (AP) and International Baccalaureate (IB) courses.
          </p>
          <ul className="space-y-1.5 text-xs text-neutral-700 font-medium">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Standard 4.0 Unweighted Scale</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> 5.0 AP / Honors Weighted Scale</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> AMCAS BCPM Pre-Med Conversion</li>
          </ul>
        </div>
      </div>

      {/* Step by Step Ordering Guide */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 bg-gradient-to-br from-white to-neutral-50 shadow-sm space-y-8">
        <div className="max-w-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
            Actionable Walkthrough
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0d0f12] tracking-tight mt-1">
            How to Order an Official Parchment Transcript in 4 Steps
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#0d0f12] text-white font-mono font-bold text-xs flex items-center justify-center">
              01
            </div>
            <h4 className="font-bold text-sm text-[#0d0f12]">Create / Log In</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Visit Parchment.com and enter your school name to locate your institution's dedicated order portal.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#ff4d00] text-white font-mono font-bold text-xs flex items-center justify-center">
              02
            </div>
            <h4 className="font-bold text-sm text-[#0d0f12]">Select Recipient</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Choose an application service (Common App, AMCAS, LSAC), another university, or your own verified email.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#0088a8] text-white font-mono font-bold text-xs flex items-center justify-center">
              03
            </div>
            <h4 className="font-bold text-sm text-[#0d0f12]">Provide Consent</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Sign the digital FERPA consent waiver allowing your registrar to release your educational records.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              04
            </div>
            <h4 className="font-bold text-sm text-[#0d0f12]">Track Delivery</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Receive your Document ID (DID) and monitor real-time fulfillment, download notifications, and verification.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-black/10 bg-white shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff4d00] uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0d0f12] hover:text-[#ff4d00] transition-colors bg-neutral-50/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-[#ff4d00]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/80 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
