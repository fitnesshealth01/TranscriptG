export interface EditorialMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  affiliation?: string;
  bio: string;
  focusAreas: string[];
  education: string;
  experienceYears: number;
  avatarInitials: string;
  verified: boolean;
  linkedInUrl?: string;
}

export const EDITORIAL_BOARD: EditorialMember[] = [
  {
    id: "dr-evelyn-vance",
    name: "Dr. Evelyn Vance, Ph.D.",
    role: "Chief Acoustic Scientist & Editorial Director",
    credentials: "Ph.D. Computational Linguistics & Phonetics, IEEE Senior Member",
    affiliation: "TranscriptG Acoustic Research Lab",
    bio: "Dr. Vance oversees speech science research and editorial verification at TranscriptG. With 16+ years analyzing acoustic feature extraction, neural automatic speech recognition (ASR), and phonetic alignment, she ensures all technical benchmarks and audio guides adhere to empirical acoustic measurement standards.",
    focusAreas: [
      "Automatic Speech Recognition (ASR)",
      "Acoustic Modeling & Noise Suppression",
      "Audio Codec Architecture (Opus/FLAC/AAC)",
      "Empirical Word Error Rate (WER) Benchmarks",
    ],
    education: "Ph.D. in Computational Linguistics, Massachusetts Institute of Technology",
    experienceYears: 16,
    avatarInitials: "EV",
    verified: true,
  },
  {
    id: "marcus-sterling",
    name: "Marcus Sterling, RPR, CRR",
    role: "Legal Transcription & Deposition Standards Consultant",
    credentials: "Registered Professional Reporter (RPR), Certified Realtime Reporter (CRR)",
    affiliation: "National Court Reporters Association (NCRA) Active Fellow",
    bio: "Marcus has directed court reporting and deposition transcription teams across state and federal courts for over 18 years. He establishes TranscriptG's protocols for verbatim precision, non-verbal token handling, and timestamped forensic audio alignment.",
    focusAreas: [
      "Verbatim Legal Reporting Standards",
      "Deposition & Courtroom Transcription",
      "Chain-of-Custody & Audio Tamper Evidence",
      "Timecode Synchronization in Civil Proceedings",
    ],
    education: "B.S. in Court Reporting & Legal Technologies",
    experienceYears: 18,
    avatarInitials: "MS",
    verified: true,
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova, CHDS, AHDI-F",
    role: "Medical Documentation & HIPAA Compliance Director",
    credentials: "Certified Healthcare Documentation Specialist (CHDS), AHDI Fellow",
    affiliation: "Healthcare Documentation Integrity Board",
    bio: "Elena is a clinical documentation authority with 15+ years guiding HIPAA-compliant medical dictation workflows. She reviews all medical transcription guides, sanitization protocols, and zero-retention ephemeral processing safeguards at TranscriptG.",
    focusAreas: [
      "HIPAA Security & Ephemeral Memory Processing",
      "Clinical Dictation & EHR Structured Data",
      "Pharmacological & Anatomical Nomenclature",
      "Doctor-Patient Audio Confidentiality",
    ],
    education: "M.S. in Health Informatics & Clinical Documentation",
    experienceYears: 15,
    avatarInitials: "ER",
    verified: true,
  },
  {
    id: "david-k-chen",
    name: "David K. Chen, CPACC",
    role: "Digital Accessibility & Subtitling Lead Auditor",
    credentials: "Certified Professional in Accessibility Core Competencies (IAAP)",
    affiliation: "W3C WCAG Working Group Contributor",
    bio: "David specializes in WCAG 2.2 AA/AAA video accessibility, broadcast closed captioning regulations (FCC / Section 508), and subtitle cue timing ergonomics. He authored TranscriptG's automated subtitle syntax validation engine rules.",
    focusAreas: [
      "WCAG 2.2 AA / Section 508 Accessibility",
      "Characters-Per-Second (CPS) & Reading Comfort",
      "SRT / VTT Timecode Syntax Standards",
      "Broadcast Closed Captioning Latency",
    ],
    education: "B.S. in Human-Computer Interaction & Accessibility",
    experienceYears: 12,
    avatarInitials: "DC",
    verified: true,
  },
  {
    id: "maya-lin",
    name: "Maya Lin, M.Sc.",
    role: "Senior Linguistic Engineer & Lead Technical Author",
    credentials: "M.Sc. in Natural Language Processing (Stanford)",
    affiliation: "TranscriptG Engineering Group",
    bio: "Maya leads software development for TranscriptG's client-side speech utilities, subtitle parsing engines, and multilingual formatting algorithms. She conducts regular comparative analyses across 90+ supported speech dialects.",
    focusAreas: [
      "Multilingual NLP & Tokenization",
      "Client-Side Subtitle Parser Engineering",
      "Speaking Rate & WPM Ergonomics",
      "Audio Bitrate & Lossless Storage Mathematics",
    ],
    education: "M.Sc. in Natural Language Processing, Stanford University",
    experienceYears: 9,
    avatarInitials: "ML",
    verified: true,
  },
];

export const EDITORIAL_PRINCIPLES = [
  {
    title: "Empirical & Reproducible Benchmarks",
    description:
      "All audio compression calculations, Word Error Rate (WER) evaluations, and speech rate statistics published on TranscriptG are derived from reproducible tests, standardized test corpora (e.g. LibriSpeech, Common Voice), or verified broadcast industry specifications.",
  },
  {
    title: "Rigorous Peer Review Prior to Publication",
    description:
      "Every technical article, legal guideline, or accessibility standard is formally reviewed by a credentialed member of our Editorial Board (Ph.D., RPR, CHDS, or CPACC) before being published or updated.",
  },
  {
    title: "Human Editorial Oversight on AI Tools",
    description:
      "While we build and benchmark cutting-edge acoustic AI models, every article, guide, and interactive utility on TranscriptG is architected, tested, and vetted by human domain specialists. We strictly prohibit low-value unedited AI-generated content.",
  },
  {
    title: "Strict Editorial Independence from Advertisers",
    description:
      "Advertising partners, sponsors, or affiliate relationships never influence our editorial judgments, software tool evaluations, or benchmark results. We maintain a rigid separation between monetization and editorial integrity.",
  },
  {
    title: "Transparent Corrections & Fact-Checking Policy",
    description:
      "If technical inaccuracies, outmoded regulatory references, or syntax anomalies are discovered, our team corrects them promptly with a clear version change notice. Readers can submit corrections directly to editorial@transcriptg.com.",
  },
];
