import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { AUTHOR } from "../data/author";
import { ShieldCheck, Mail, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

export const EditorialPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Seo
        title="Editorial Policy & Fact-Checking – TranscriptG"
        description="Read TranscriptG's editorial guidelines on authorship, AI assistance, corrections, advertising independence, and practical content standards."
        keywords={[
          "transcriptg editorial policy",
          "fact checking policy",
          "ai editorial standards",
          "corrections policy",
        ]}
        canonicalPath="/editorial-policy"
      />

      <PageHeader
        eyebrow="Publishing Standards & Ethics"
        title="Editorial Policy"
        description="Our simple, honest approach to writing guides, testing tools, making corrections, and maintaining advertising independence."
      />

      <div className="space-y-8 text-neutral-800 text-sm sm:text-base leading-relaxed">
        {/* Authorship & Creation */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#0d0f12]">
            1. Authorship &amp; Content Creation
          </h2>
          <p className="text-neutral-700">
            All guides, tutorials, and documentation on TranscriptG are authored and maintained by the site founder, {AUTHOR.name}. I write these guides based on firsthand testing of the tools on this site and practical audio workflows. AI writing tools may be used to assist with formatting, outlining, or proofreading, but every published piece is manually reviewed, tested, and edited by me before going live.
          </p>
        </section>

        {/* Accuracy & Testing */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#0d0f12]">
            2. Practical Verification &amp; Dates
          </h2>
          <p className="text-neutral-700">
            Tutorials describe the actual functionality of the web tools available on TranscriptG. Every guide displays a "Published" and "Last updated" date so you can see when the information was last verified against the current version of the software.
          </p>
        </section>

        {/* Corrections Policy */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#0d0f12]">
            3. Corrections &amp; Updates
          </h2>
          <p className="text-neutral-700">
            If you notice an error in a tutorial, an outdated step, or a tool behavior that does not match what a guide describes, please email me at{" "}
            <a
              href={`mailto:${AUTHOR.email}`}
              className="text-[#ff4d00] font-bold underline hover:text-[#e04400]"
            >
              {AUTHOR.email}
            </a>
            . I review feedback promptly and update the affected guide with corrections.
          </p>
        </section>

        {/* Advertising Independence */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#0d0f12]">
            4. Advertising Independence
          </h2>
          <p className="text-neutral-700">
            TranscriptG is a free platform supported by web advertising. Commercial advertisers do not dictate, review, or influence what is written in our tutorials, and sponsors do not have access to edit published articles.
          </p>
        </section>

        {/* No Legal or Medical Advice */}
        <section className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
          <h2 className="text-base font-bold text-[#0d0f12] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>5. Informational Purpose (No Legal or Medical Advice)</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Content on TranscriptG is provided for general technical and educational purposes only. Automated AI transcripts should not be treated as certified court transcripts or official medical records. Always consult qualified professionals for formal legal or medical documentation.
          </p>
        </section>

        {/* Footer info */}
        <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500">
          <span>Author &amp; Maintainer: {AUTHOR.name}</span>
          <span>Last updated: October 2026</span>
        </div>
      </div>
    </div>
  );
};

export default EditorialPolicyPage;
