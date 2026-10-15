import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Scale,
  FileText,
  AlertCircle,
  Mail,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Lock,
  Globe2,
  ExternalLink,
} from "lucide-react";
import { Seo } from "../components/Seo";

export const CopyrightPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const copyrightFaqs = [
    {
      q: "Does TranscriptG download, store, or stream YouTube videos?",
      a: "No. TranscriptG does not download, stream-rip, store, or distribute YouTube audio or video files. Video playback is rendered exclusively via YouTube's official embedded player in full compliance with YouTube Developer Terms of Service.",
    },
    {
      q: "What is Fair Use under 17 U.S.C. § 107?",
      a: "Fair Use is a legal doctrine under United States copyright law that permits limited use of copyrighted material without requiring permission from the rights holder for purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Generating text transcripts for personal study, note-taking, and accessibility generally falls under transformative fair use.",
    },
    {
      q: "Who owns the copyright of generated transcripts and exported files?",
      a: "You retain all rights to your original content and transcripts created from your own recordings. For third-party public videos, original speech copyright remains with the content creator, while user annotations and personal study notes belong to the user.",
    },
    {
      q: "How do I submit a DMCA takedown notice?",
      a: "If you believe any content or link on TranscriptG infringes upon your copyrighted work, you can submit a written notification under 17 U.S.C. § 512(c)(3) to our designated DMCA Agent at akashsinghsolanki66@gmail.com with the required statutory details.",
    },
    {
      q: "Does TranscriptG keep copies of my uploaded audio or transcribed text?",
      a: "No. TranscriptG is engineered with a strict zero-retention policy. Audio transcription and format conversions are executed locally in your browser memory or processed ephemerally during your active session. We do not store or sell your transcripts.",
    },
  ];

  return (
    <>
      <Seo
        title="Copyright, DMCA Safe Harbor & Fair Use Policy — TranscriptG"
        description="Official Copyright Policy, DMCA 17 U.S.C. § 512 Notice & Takedown guidelines, Fair Use educational standards, and Designated Copyright Agent contact information for TranscriptG."
        canonicalPath="/copyright"
        keywords={[
          "transcriptg copyright policy",
          "dmca safe harbor transcriptg",
          "fair use transcript policy",
          "designated dmca agent",
          "youtube developer compliance",
          "intellectual property policy",
        ]}
        faqs={copyrightFaqs}
      />

      <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-4 border-b border-black/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-mono font-bold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Legal &amp; Policy Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d0f12] tracking-tight">
            Copyright, DMCA Safe Harbor &amp; Fair Use Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-3xl">
            TranscriptG is dedicated to respecting intellectual property rights, adhering strictly to Title 17 of the United States Code (17 U.S.C. § 107 &amp; § 512), and supporting educational accessibility under international fair use standards.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 pt-2">
            <span>Effective Date: January 1, 2026</span>
            <span>•</span>
            <span>Last Updated: October 2026</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold">17 U.S.C. § 512(c) Compliant</span>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0d0f12]">Fair Use Standards</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our tools operate under 17 U.S.C. § 107 for personal education, academic study, hearing accessibility, and critical commentary.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0d0f12]">No Stream Ripping</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              TranscriptG does not rip, download, duplicate, or host audio/video streams. Video playback utilizes official YouTube embedded players.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0d0f12]">Zero Data Retention</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Uploaded audio files and transcribed manuscripts remain within your client session. We do not maintain audio databases.
            </p>
          </div>
        </div>

        {/* Section 1: Fair Use Doctrine */}
        <section className="space-y-4 rounded-3xl bg-white border border-black/10 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-mono font-bold text-neutral-700">
              01
            </span>
            Educational Fair Use Doctrine (17 U.S.C. § 107)
          </h2>
          <div className="text-xs sm:text-sm text-neutral-600 space-y-3 leading-relaxed">
            <p>
              Under Section 107 of the United States Copyright Act (17 U.S.C. § 107), the fair use of a copyrighted work, including uses such as criticism, comment, news reporting, teaching (including multiple copies for classroom use), scholarship, or research, is not an infringement of copyright.
            </p>
            <p>
              TranscriptG provides software utilities intended to assist students, researchers, journalists, accessibility professionals, and language learners in:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
              <li>
                <strong>Accessibility accommodations:</strong> Providing text transcripts for individuals with hearing impairments, cognitive processing differences, or auditory sensitivities pursuant to the Americans with Disabilities Act (ADA) and Section 508.
              </li>
              <li>
                <strong>Academic quotation and citation:</strong> Allowing researchers to cite accurate verbatim quotations and timestamps from public lectures, debates, conferences, and educational seminars.
              </li>
              <li>
                <strong>Personal note-taking and indexation:</strong> Creating personal study summaries and searchable indexes of publicly accessible instructional videos without re-distributing media.
              </li>
              <li>
                <strong>Translation and linguistic study:</strong> Enabling multilingual comprehension of spoken lectures across diverse languages.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: YouTube & Platform Terms of Service Alignment */}
        <section className="space-y-4 rounded-3xl bg-white border border-black/10 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-mono font-bold text-neutral-700">
              02
            </span>
            Platform Independence &amp; YouTube Terms Alignment
          </h2>
          <div className="text-xs sm:text-sm text-neutral-600 space-y-3 leading-relaxed">
            <p>
              TranscriptG is an independent web application. We explicitly declare that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-700">
              <li>
                <strong>No Endorsement or Affiliation:</strong> TranscriptG is not affiliated with, endorsed, sponsored, or certified by YouTube, Google LLC, Alphabet Inc., or any of their subsidiaries. All trademarks, service marks, logos, and brand names are the property of their respective owners.
              </li>
              <li>
                <strong>No Circumvention or Stream Ripping:</strong> TranscriptG strictly avoids circumventing technological protection measures (TPMs). The platform does NOT provide software to download, rip, convert to MP3, or store video/audio files from YouTube or any other streaming service.
              </li>
              <li>
                <strong>Official Player Utilization:</strong> Any video rendering on this website is facilitated exclusively through YouTube's official embedded iFrame player API, preserving view counts, ads, creator attribution, and channel links in full accordance with the YouTube Developer Policies and Terms of Service.
              </li>
              <li>
                <strong>Public Metadata Processing:</strong> Transcription extraction processes publicly provided author captions or analyzes public educational speech streams for study note generation without bypassing content access controls.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: DMCA Notice & Takedown Procedure */}
        <section className="space-y-4 rounded-3xl bg-white border border-black/10 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-mono font-bold text-neutral-700">
              03
            </span>
            DMCA Safe Harbor &amp; Notice of Copyright Infringement (17 U.S.C. § 512)
          </h2>
          <div className="text-xs sm:text-sm text-neutral-600 space-y-3 leading-relaxed">
            <p>
              TranscriptG complies with the notice-and-takedown procedures established by the Digital Millennium Copyright Act (17 U.S.C. § 512). If you are a copyright owner or an authorized agent and believe that content accessible through our services infringes upon your copyright, you may send a written notification to our Designated DMCA Agent.
            </p>
            <p>
              Pursuant to 17 U.S.C. § 512(c)(3), your notification must include substantially the following information:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-neutral-700">
              <li>
                A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
              </li>
              <li>
                Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works.
              </li>
              <li>
                Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit TranscriptG to locate the material (e.g., exact URL).
              </li>
              <li>
                Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and, if available, an electronic mail address.
              </li>
              <li>
                A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
              </li>
              <li>
                A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
              </li>
            </ol>
          </div>
        </section>

        {/* Section 4: Designated Agent Contact Card */}
        <section className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-black">Designated DMCA Copyright Agent</h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Please direct all copyright infringement inquiries, DMCA notices, and legal questions to our designated agent:
          </p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm font-mono">
            <div><strong>Agent Name:</strong> Akash Singh Solanki</div>
            <div><strong>Department:</strong> TranscriptG Compliance &amp; Legal Operations</div>
            <div>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:akashsinghsolanki66@gmail.com"
                className="text-red-400 hover:text-red-300 underline"
              >
                akashsinghsolanki66@gmail.com
              </a>
            </div>
            <div><strong>Notice Turnaround:</strong> Typically reviewed and acknowledged within 24–48 business hours.</div>
          </div>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Note: Under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages, including court costs and attorneys' fees.
          </p>
        </section>

        {/* Section 5: Counter-Notification Procedure */}
        <section className="space-y-4 rounded-3xl bg-white border border-black/10 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-mono font-bold text-neutral-700">
              04
            </span>
            Counter-Notification Procedures (17 U.S.C. § 512(g))
          </h2>
          <div className="text-xs sm:text-sm text-neutral-600 space-y-3 leading-relaxed">
            <p>
              If content you posted was removed or disabled as a result of a DMCA notice, and you believe this was done by mistake or misidentification, you may submit a written counter-notification to our Designated Agent.
            </p>
            <p>
              To be effective under 17 U.S.C. § 512(g)(3), a counter-notification must include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-700">
              <li>Your physical or electronic signature.</li>
              <li>Identification of the material that was removed or to which access was disabled and the location where it appeared.</li>
              <li>A statement under penalty of perjury that you have a good faith belief the material was removed or disabled as a result of mistake or misidentification.</li>
              <li>Your name, address, telephone number, and a statement consenting to jurisdiction of Federal District Court for your judicial district.</li>
            </ul>
          </div>
        </section>

        {/* Section 6: User Content & Data Rights */}
        <section className="space-y-4 rounded-3xl bg-white border border-black/10 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12] flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-mono font-bold text-neutral-700">
              05
            </span>
            User Content Ownership &amp; Privacy Guarantees
          </h2>
          <div className="text-xs sm:text-sm text-neutral-600 space-y-3 leading-relaxed">
            <p>
              When you upload personal audio, video recordings, dictations, or subtitle files to TranscriptG:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-700">
              <li>
                <strong>100% User Ownership:</strong> You retain all intellectual property, copyright, and commercial ownership rights to your original files and the transcripts generated from them.
              </li>
              <li>
                <strong>No Training on User Data:</strong> We do not use your private uploaded audio files or personal transcripts to train public AI models.
              </li>
              <li>
                <strong>Zero Session Storage:</strong> Once you close or reload your browser window, your temporary memory cache is cleared immediately.
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#0d0f12] tracking-tight">
              Copyright &amp; Compliance FAQ
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              Common legal and intellectual property questions regarding audio-visual transcription
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copyrightFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-black/8 shadow-2xs space-y-2"
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#0d0f12]">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation Footer */}
        <div className="pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-black underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-black underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/editorial-policy" className="hover:text-black underline">
              Editorial Policy
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-black underline">
              Contact Us
            </Link>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-red-600 font-bold hover:text-red-700"
          >
            Explore Free Tools Suite <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CopyrightPage;
