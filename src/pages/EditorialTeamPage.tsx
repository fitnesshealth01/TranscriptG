import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { EDITORIAL_BOARD, EDITORIAL_PRINCIPLES } from "../data/editorialTeam";
import {
  ShieldCheck,
  Award,
  GraduationCap,
  CheckCircle2,
  FileText,
  Mail,
  ExternalLink,
  BookOpen,
  Scale,
  Stethoscope,
  Headphones,
  Sliders,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const EditorialTeamPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <Seo
        title="Editorial Board & Review Credentials — TranscriptG E-E-A-T"
        description="Meet the TranscriptG Editorial Board: Acoustic scientists, certified court reporters (RPR), healthcare documentation specialists (CHDS), and accessibility auditors (CPACC)."
        keywords={[
          "transcriptg editorial board",
          "speech transcription credentials",
          "audio engineering team",
          "e-e-a-t audio lab",
          "court reporting review",
          "medical transcription hipaa review",
        ]}
        canonicalPath="/editorial-team"
      />

      <PageHeader
        eyebrow="Editorial Governance & E-E-A-T"
        title="Editorial Board & Peer Review Credentials"
        description="TranscriptG technical guides, acoustic benchmarks, and transcription standards are authored and peer-reviewed by credentialed audio researchers, certified court reporters, and clinical documentation authorities."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Governance Overview Card */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-black/10 bg-white shadow-xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> E-E-A-T Verified Standards
            </span>
            <span className="px-3 py-1 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] text-xs font-mono font-bold">
              Independent Peer Review
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#0d0f12] tracking-tight">
            Our Commitment to Domain Expertise & Empirical Verification
          </h2>

          <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
            In compliance with the highest standards of digital publishing and Google Search Quality Rater Guidelines (QRG), TranscriptG enforces a rigorous two-tier review process. No acoustic benchmark, legal transcription framework, or accessibility tutorial is published without validation from a recognized specialist holding verified credentials (Ph.D., RPR, CHDS, or CPACC).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <Link
              to="/editorial-policy"
              className="inline-flex items-center gap-1 text-[#ff4d00] hover:underline font-bold"
            >
              <Award className="w-3.5 h-3.5" /> Read Full Editorial Integrity Policy
            </Link>
            <span className="text-neutral-300">•</span>
            <Link to="/contact" className="text-neutral-600 hover:text-black hover:underline">
              Submit Editorial Correction
            </Link>
          </div>
        </div>

        {/* Editorial Board Profiles */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-[#0d0f12]">
              Editorial Board Members & Review Specialists
            </h3>
            <span className="text-xs font-mono text-neutral-500">
              5 Active Board Directors
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {EDITORIAL_BOARD.map((member) => (
              <div
                key={member.id}
                id={member.id}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-md hover:shadow-lg transition-all space-y-6"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0d0f12] text-white flex items-center justify-center font-mono font-bold text-xl shrink-0 border border-white/10 shadow-sm">
                      {member.avatarInitials}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg sm:text-xl font-black text-[#0d0f12]">
                          {member.name}
                        </h4>
                        {member.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Credential
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-[#ff4d00] font-mono">
                        {member.role}
                      </p>
                      <p className="text-xs text-neutral-500 font-medium">
                        {member.credentials}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-1 text-xs font-mono text-neutral-500">
                    <span className="px-2.5 py-1 rounded-lg bg-neutral-100 font-bold text-[#0d0f12]">
                      {member.experienceYears}+ Years Exp.
                    </span>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {member.bio}
                </p>

                {/* Focus areas and Education */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/5 text-xs">
                  <div>
                    <span className="font-mono text-neutral-400 font-bold uppercase text-[10px] block mb-1.5">
                      Review & Audit Focus Areas:
                    </span>
                    <ul className="space-y-1 text-neutral-600">
                      {member.focusAreas.map((area, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-mono text-neutral-400 font-bold uppercase text-[10px] block mb-1.5">
                      Academic Background:
                    </span>
                    <div className="flex items-start gap-2 text-neutral-700 font-medium">
                      <GraduationCap className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <span>{member.education}</span>
                    </div>

                    {member.affiliation && (
                      <div className="mt-2 text-neutral-500 text-[11px]">
                        <strong>Affiliation:</strong> {member.affiliation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Editorial Principles */}
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-black/10 bg-white shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d9ff]/10 text-[#0088a8] text-xs font-mono font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Publishing Integrity
          </div>
          <h3 className="text-2xl font-black text-[#0d0f12]">
            Our 5 Pillars of Technical Publishing Integrity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDITORIAL_PRINCIPLES.map((principle, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-neutral-50 border border-black/5 space-y-2"
              >
                <div className="font-bold text-sm text-[#0d0f12] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#0d0f12] text-white flex items-center justify-center font-mono text-xs font-bold">
                    0{idx + 1}
                  </span>
                  <span>{principle.title}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed pl-8">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Link to Technical Guides */}
        <div className="p-8 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-xl font-bold">Explore Our Peer-Reviewed Technical Guides</h4>
            <p className="text-sm text-neutral-400 max-w-xl">
              Delve into 20+ comprehensive guides covering legal deposition standards, medical HIPAA transcription, podcast show notes workflows, and WCAG 2.2 AA subtitle compliance.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-mono text-xs font-bold transition-all shadow-lg shrink-0"
          >
            <span>Browse All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EditorialTeamPage;
