import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { AUTHOR } from "../data/author";
import {
  Mail,
  ShieldCheck,
  Cpu,
  AlertTriangle,
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const AboutPage: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Amity University",
    },
    url: "https://transcriptg.com/about",
    email: AUTHOR.email,
    ...(AUTHOR.linkedIn ? { sameAs: [AUTHOR.linkedIn] } : {}),
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Seo
        title="About TranscriptG – Free Audio & Video Transcription"
        description="Learn about TranscriptG: a free, no-login tool built by Akash Singh Solanki to convert, translate, and summarize audio, video, and subtitle files."
        keywords={[
          "about transcriptg",
          "akash singh solanki",
          "free transcription tool",
          "how transcriptg works",
        ]}
        canonicalPath="/about"
      />

      {/* Embedded Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <PageHeader
        eyebrow="Background & Purpose"
        title="About TranscriptG"
        description="Learn why TranscriptG was built, how the tools process files, and who maintains the platform."
      />

      <div className="space-y-10 text-neutral-800 leading-relaxed text-sm sm:text-base">
        {/* Section 2: What it is */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0d0f12]">
            What TranscriptG Is
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            TranscriptG is a free web tool that turns audio and video into text, converts subtitle files (SRT, VTT, JSON, and TXT), translates transcripts and subtitles, and summarizes spoken content using modern AI models. No account creation or sign-up is required.
          </p>
        </section>

        {/* Section 3: Why it exists */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0d0f12]">
            Why It Exists
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            I built TranscriptG to give students, video creators, journalists, and developers a straightforward, free, no-login way to get transcripts, subtitles, translations, and summaries without installing desktop software or dealing with subscription paywalls.
          </p>
        </section>

        {/* Section 4: How it works */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0d0f12]">
            How It Works
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            When you upload an audio or video file or submit a YouTube link, the data is sent securely to our application server and processed using Google's Gemini models. The model analyzes the speech to generate timestamps, transcripts, translations, or summaries, which are returned directly to your browser.
          </p>
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-700 space-y-1">
            <strong className="text-[#0d0f12] font-semibold block">Data Handling:</strong>
            <p>
              Media files are held in temporary memory buffers only for the duration of the request needed to generate your transcript, and are not saved to persistent server disks or stored in databases.
            </p>
          </div>
        </section>

        {/* Section 5: Limits and accuracy */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0d0f12]">
            Limits &amp; Accuracy
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            AI speech recognition produces strong results on clear speech, but output can contain mistakes—particularly with heavy background noise, rapid overlapping dialogue, regional accents, or specialized technical and medical terminology. Always review and verify important transcripts before publishing them or relying on them for legal, official, or medical purposes.
          </p>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Uploaded audio files are capped at 25MB per request. For longer recordings, compress the audio to MP3 or split into smaller segments before uploading.
            </p>
          </div>
        </section>

        {/* Section 6: About the author card */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Photo or Initials */}
            {!imgError ? (
              <img
                src={AUTHOR.photo}
                alt={AUTHOR.name}
                onError={() => setImgError(true)}
                className="w-20 h-20 rounded-2xl object-cover border border-black/10 shadow-sm shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-[#0d0f12] text-white flex items-center justify-center font-mono font-bold text-xl shrink-0">
                AS
              </div>
            )}

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff4d00] font-bold">
                Creator &amp; Maintainer
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0d0f12]">
                {AUTHOR.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                {AUTHOR.role} · {AUTHOR.education}
              </p>
            </div>
          </div>

          <div className="text-neutral-700 text-sm leading-relaxed space-y-3 pt-2 border-t border-black/5">
            <p>
              I'm an Information Technology graduate (B.Tech, Amity University) and the person behind TranscriptG. I build and maintain every tool on this site, from the transcription and subtitle converter to the translation and summary features.
            </p>
            <p>
              I started TranscriptG to give people a quick, free way to turn recordings and videos into text without signing up for anything. I test the tools myself on real audio and video, and I update the guides when the tools change or I find a better way to do something.
            </p>
            <p>
              If something doesn't work or a result looks wrong, email me at{" "}
              <a
                href={`mailto:${AUTHOR.email}`}
                className="text-[#ff4d00] font-bold underline hover:text-[#e04400]"
              >
                {AUTHOR.email}
              </a>{" "}
              and I'll look into it.
            </p>
          </div>

          <div className="pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-500">
            <span>Written and maintained by {AUTHOR.name}</span>
            <a
              href={`mailto:${AUTHOR.email}`}
              className="inline-flex items-center gap-1.5 text-[#ff4d00] font-bold hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{AUTHOR.email}</span>
            </a>
          </div>
        </section>

        {/* Section 7: Contact link & Last updated */}
        <section className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-black/10 text-xs text-neutral-500 font-mono">
          <div>
            Have questions or tool suggestions?{" "}
            <Link to="/contact" className="text-[#ff4d00] font-bold underline">
              Contact Page
            </Link>
          </div>
          <span>Last updated: October 2026</span>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
