import { BlogArticle } from "./types";

export const article07_accessibilityAdaWcag: BlogArticle = {
  slug: "closed-caption-accessibility-compliance-ada-section-508",
  title: "Closed Caption Accessibility Compliance: The Definitive Guide to ADA, Section 508 & WCAG 2.2",
  metaTitle: "Closed Caption Accessibility: ADA, Section 508 & WCAG 2.2 Compliance",
  metaDescription: "Ensure your digital video and audio content complies with ADA Title III, Section 508, FCC regulations, and WCAG 2.2 Level AA/AAA closed captioning standards.",
  keywords: "ADA caption compliance, Section 508 closed captions, WCAG 2.2 video accessibility, FCC captioning rules, legal subtitle requirements, digital accessibility audit",
  category: "Legal & Standards",
  readTime: "17 min read",
  date: "August 2026",
  author: "TranscriptG Accessibility & Legal Standards Group",
  authorRole: "Digital Accessibility Compliance Officers & Regulatory Counsel",
  summary: "A comprehensive guide to legal accessibility mandates, contrast ratios, synchronization thresholds, non-speech audio cues, speaker identification rules, and mitigating ADA Title III litigation risk.",
  tableOfContents: [
    { id: "accessibility-mandates", title: "1. The Global Regulatory Framework: ADA, Section 508 & EAA" },
    { id: "wcag-success-criteria", title: "2. WCAG 2.2 Success Criteria for Pre-Recorded Media" },
    { id: "accuracy-synchronization", title: "3. Legal Accuracy & Synchronization Thresholds" },
    { id: "sound-effects-speakers", title: "4. Non-Speech Audio, Sound Effects & Speaker Tags" },
    { id: "contrast-and-typography", title: "5. Visual Presentation: Contrast Ratios & Reading Speeds" },
    { id: "litigation-risks", title: "6. Mitigating Legal Liability & ADA Title III Lawsuits" },
    { id: "compliance-workflow", title: "7. Building a Compliant Subtitle Workflow with TranscriptG" },
    { id: "faqs", title: "8. Frequently Asked Questions" },
  ],
  content: `
## Accessibility as a Legal and Ethical Imperative

Over **1.5 billion people worldwide** live with some degree of hearing loss. In the United States, the European Union, and globally, providing accurate closed captions on digital video media is no longer an optional courtesy—it is a strict legal requirement under federal and international disability law.

Organizations that fail to deliver compliant captions face significant legal liability under **Americans with Disabilities Act (ADA) Title III**, **Section 508 of the Rehabilitation Act**, and the **European Accessibility Act (EAA)**.

This guide outlines the precise technical standards required to achieve full compliance with **WCAG 2.2 Level AA/AAA** benchmarks.

---

## 1. The Global Regulatory Framework

- **ADA Title III (United States):** Prohibits discrimination on the basis of disability in "places of public accommodation." Federal courts have consistently ruled that commercial websites, streaming services, and online learning platforms qualify as public accommodations.
- **Section 508 (US Federal Government):** Mandates that all federal agencies and contractors make electronic media fully accessible to persons with disabilities.
- **European Accessibility Act (EAA 2025/2026):** Enforces strict digital accessibility standards across all digital media products, e-commerce platforms, and audiovisual services operating in the EU.
- **FCC Closed Captioning Rules (Broadcast & Online Video):** Governs television and Internet protocol (IP) video delivery, requiring accurate, synchronized, and complete caption tracks.

---

## 2. WCAG 2.2 Success Criteria for Media

The **Web Content Accessibility Guidelines (WCAG 2.2)** define the global gold standard for media accessibility:

| Success Criterion | Level | Requirement Description | Compliance Standard |
|---|---|---|---|
| **1.2.1 Audio-only / Video-only** | Level A | Full text transcript provided for pre-recorded audio | Formatted transcript with all spoken dialogue and descriptive sounds |
| **1.2.2 Captions (Prerecorded)** | **Level A** | Closed captions provided for all pre-recorded video with audio | Synchronized SRT/VTT file containing dialogue, speakers, and sound cues |
| **1.2.4 Captions (Live)** | Level AA | Real-time closed captions for live broadcasts | Sub-3 second latency live captioning stream |
| **1.2.8 Media Alternative** | Level AAA | Full synchronized multimedia text transcript | Comprehensive narrative transcript matching video flow |

---

## 3. Legal Accuracy & Synchronization Thresholds

Under federal regulatory enforcement, captions must satisfy four core pillars:

1. **Accuracy:** Captions must match the spoken dialogue to the fullest extent possible, with an accuracy target of **99%+ Word Error Rate (WER)**. Auto-generated captions that contain frequent misspellings fail legal muster.
2. **Synchronization:** Subtitle text must appear synchronously with spoken audio, with timing errors restricted to **less than $\\pm 100$ milliseconds**.
3. **Completeness:** Captions must run continuously from the start of the program to the end, with zero missing sections.
4. **Placement:** Captions must not obscure on-screen text, essential graphics, or the speaker's face.

---

## 4. Non-Speech Audio, Sound Effects & Speaker Tags

Achieving true accessibility requires conveying more than spoken words:

- **Speaker Identification:** When multiple speakers appear off-camera or switch turns, introduce their name in brackets: \`[Dr. Chen]\` or via WebVTT tags \`<v Dr. Chen>\`.
- **Meaningful Sound Effects:** Transcribe contextual acoustic events essential to understanding: \`[applause]\`, \`[door creaks shut]\`, \`[dramatic orchestral music]\`.
- **Music Lyrics:** Indicate song lyrics using musical notes: \`♪ [Upbeat jazz music playing] ♪\`.

---

## 5. Visual Presentation: Contrast Ratios & Reading Speeds

- **Reading Speed Limits:** Subtitle display duration should not exceed **17 to 20 characters per second (CPS)** to ensure viewers have sufficient time to read.
- **Line Length Constraints:** Maximum **37 characters per line**, and no more than **2 lines per subtitle block**.
- **Color Contrast:** Captions must meet a minimum **4.5:1 color contrast ratio** against the video background (standardized using white text on a semi-transparent black background bounding box).
  `,
  faqs: [
    { q: "Are YouTube auto-captions sufficient for ADA compliance?", a: "No. Federal courts and the Department of Justice have repeatedly ruled that unedited auto-generated captions fail ADA Title III standards due to lack of punctuation, capitalization, and poor accuracy on proper nouns." },
    { q: "What is the penalty for non-compliant video captions?", a: "ADA Title III lawsuits can result in legal settlements ranging from $25,000 to $100,000+, plus mandatory court-ordered injunctive remediation." },
  ],
};
