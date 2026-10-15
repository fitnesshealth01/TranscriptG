import { CueSegment } from "../lib/transcript";

export interface SampleAudioItem {
  id: string;
  title: string;
  category: string;
  durationSeconds: number;
  speakerCount: number;
  audioFreq: number; // For synth playback
  description: string;
  summary: string;
  segments: CueSegment[];
  speakers: { name: string; role: string; color: string }[];
}

export const SAMPLE_AUDIO_ITEMS: SampleAudioItem[] = [
  {
    id: "tech-podcast",
    title: "AI Audio Engineering & Neural ASR",
    category: "Podcast & Media",
    durationSeconds: 28,
    speakerCount: 2,
    audioFreq: 320,
    description: "Deep dive into end-to-end Whisper and Gemini speech architectures with acoustic loss functions.",
    summary: "Alex and Dr. Sarah Miller discuss the paradigm shift in modern automatic speech recognition (ASR), moving from legacy hybrid HMM-GMM models to end-to-end transformer encoders that process raw mel-spectrograms with zero loss of phonetic context.",
    speakers: [
      { name: "Alex Rivera", role: "Podcast Host", color: "text-[#ff5500] border-[#ff5500]/30 bg-[#ff5500]/10" },
      { name: "Dr. Sarah Miller", role: "Audio AI Researcher", color: "text-[#00d9ff] border-[#00d9ff]/30 bg-[#00d9ff]/10" },
    ],
    segments: [
      {
        id: "tp-1",
        start: 0.0,
        end: 4.8,
        text: "Welcome back to Studio Signal. Today we are breaking down why acoustic modeling has transformed so rapidly over the past three years.",
      },
      {
        id: "tp-2",
        start: 5.2,
        end: 11.4,
        text: "Thanks Alex. The primary breakthrough was moving away from separate phonetic aligners toward unified sequence-to-sequence transformers that evaluate cross-attention over full audio frames.",
      },
      {
        id: "tp-3",
        start: 12.0,
        end: 17.6,
        text: "And that directly solves the hallucination problem in heavy ambient noise environments, especially with 16 kilohertz downsampling.",
      },
      {
        id: "tp-4",
        start: 18.2,
        end: 23.5,
        text: "Exactly. By pairing acoustic frequency masking with contextual token decoding, word error rates dropped below three percent across multilingual benchmarks.",
      },
      {
        id: "tp-5",
        start: 24.0,
        end: 28.0,
        text: "That explains why real-time in-browser transcription is now so remarkably fast and reliable.",
      },
    ],
  },
  {
    id: "earnings-call",
    title: "Alphabet Q3 Infrastructure & Cloud Briefing",
    category: "Finance & Enterprise",
    durationSeconds: 26,
    speakerCount: 2,
    audioFreq: 440,
    description: "Executive discussion on capital expenditures, data center capacity, and enterprise subscription margins.",
    summary: "The executive team outlines disciplined capital allocation toward custom TPU acceleration, achieving 34% year-over-year revenue growth in enterprise cloud services with expanding operating leverage.",
    speakers: [
      { name: "Chief Financial Officer", role: "Executive", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
      { name: "Head of Investor Relations", role: "Host", color: "text-amber-400 border-amber-400/30 bg-amber-400/10" },
    ],
    segments: [
      {
        id: "ec-1",
        start: 0.0,
        end: 5.4,
        text: "Good afternoon and thank you for joining our third quarter earnings call. Operating income grew thirty-four percent year-over-year.",
      },
      {
        id: "ec-2",
        start: 5.9,
        end: 12.1,
        text: "Our investments in next-generation inference hardware and liquid-cooled data clusters have unlocked unprecedented operational efficiencies for enterprise customers.",
      },
      {
        id: "ec-3",
        start: 12.8,
        end: 19.3,
        text: "We expect free cash flow margins to stabilize above thirty-two percent as customer renewal rates and multi-year contract values remain at historic peaks.",
      },
      {
        id: "ec-4",
        start: 20.0,
        end: 26.0,
        text: "We will now open the floor to questions from institutional analysts. Operator, please state the instructions.",
      },
    ],
  },
  {
    id: "clinical-interview",
    title: "Post-Operative Orthopedic Recovery Protocol",
    category: "Medical & Health",
    durationSeconds: 25,
    speakerCount: 2,
    audioFreq: 510,
    description: "Clinical consultation reviewing range of motion milestones, pain medication taper, and physical therapy scheduling.",
    summary: "Dr. Chen evaluates the patient's two-week post-arthroscopy progress, noting minimal joint effusion, satisfactory 95-degree flexion, and approving transition from crutches to weight-bearing physical therapy exercises.",
    speakers: [
      { name: "Dr. Jonathan Chen", role: "Orthopedic Surgeon", color: "text-purple-400 border-purple-400/30 bg-purple-400/10" },
      { name: "Patient", role: "Patient", color: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
    ],
    segments: [
      {
        id: "ci-1",
        start: 0.0,
        end: 5.1,
        text: "Good morning. Looking at your incision sites today, wound healing is progressing cleanly with no signs of erythema or edema.",
      },
      {
        id: "ci-2",
        start: 5.6,
        end: 11.2,
        text: "The swelling has gone down substantially, but I still experience mild tightness when attempting full knee extension in the mornings.",
      },
      {
        id: "ci-3",
        start: 11.8,
        end: 18.0,
        text: "That is entirely expected at fourteen days. We will authorize your physical therapy clinic to advance to closed-kinetic-chain quadriceps strengthening.",
      },
      {
        id: "ci-4",
        start: 18.6,
        end: 25.0,
        text: "You can safely discontinue the anti-inflammatory medication and focus on ice compression twice daily following therapy sessions.",
      },
    ],
  },
];
