import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import {
  Gauge,
  Clock,
  FileText,
  Mic,
  Activity,
  Sliders,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Volume2,
  Zap,
} from "lucide-react";

const SAMPLE_SPEECHES = [
  {
    id: "conversational",
    title: "Conversational Podcast (Optimal)",
    words: "In this episode we explore how machine learning models analyze acoustic features directly from audio waveforms. When you record high-fidelity speech, the neural network captures subtle cadence variations that help listeners follow along effortlessly.",
    minutes: 1,
    seconds: 24,
  },
  {
    id: "keynote",
    title: "Keynote Announcement (Deliberate)",
    words: "Every once in a while, a revolutionary product comes along that changes everything. Today, we are introducing three breakthrough devices: a wide-screen touch controller, a revolutionary mobile phone, and a breakthrough internet communications device.",
    minutes: 1,
    seconds: 50,
  },
  {
    id: "rapid-youtube",
    title: "YouTube Tech Review (Fast-Paced)",
    words: "Alright guys welcome back to the channel. Today we are testing five incredible AI tools that will completely transform your editing workflow in under twenty minutes without any complicated plugins or subscription fees.",
    minutes: 0,
    seconds: 32,
  },
];

export const SpeechRateCalculatorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"text_to_wpm" | "duration_planner">("text_to_wpm");

  // Mode 1: Text & Duration -> WPM
  const [speechText, setSpeechText] = useState<string>(SAMPLE_SPEECHES[0].words);
  const [durationMins, setDurationMins] = useState<number>(SAMPLE_SPEECHES[0].minutes);
  const [durationSecs, setDurationSecs] = useState<number>(SAMPLE_SPEECHES[0].seconds);

  // Mode 2: Duration Planner
  const [targetMins, setTargetMins] = useState<number>(5);
  const [targetSecs, setTargetSecs] = useState<number>(0);

  // Word count calculations
  const textStats = useMemo(() => {
    const trimmed = speechText.trim();
    if (!trimmed) {
      return { words: 0, characters: 0, sentences: 0 };
    }
    const words = trimmed.split(/\s+/).filter(Boolean).length;
    const characters = trimmed.length;
    const sentences = trimmed.split(/[.!?]+/).filter(Boolean).length;
    return { words, characters, sentences };
  }, [speechText]);

  const totalTimeSeconds = useMemo(() => {
    return Math.max(1, durationMins * 60 + durationSecs);
  }, [durationMins, durationSecs]);

  // Exact WPM
  const calculatedWpm = useMemo(() => {
    if (textStats.words === 0) return 0;
    return Math.round((textStats.words / totalTimeSeconds) * 60);
  }, [textStats.words, totalTimeSeconds]);

  // Diagnosis classification
  const paceDiagnosis = useMemo(() => {
    if (calculatedWpm === 0) {
      return { label: "Enter Speech & Time", color: "text-neutral-400", bg: "bg-white/5", desc: "Awaiting input" };
    }
    if (calculatedWpm < 115) {
      return {
        label: "Deliberate / Solemn",
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/30",
        desc: "Ideal for memorial addresses, formal legal proceedings, and non-native language learners.",
      };
    }
    if (calculatedWpm <= 160) {
      return {
        label: "Natural Conversational (Optimal)",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/30",
        desc: "Gold standard for TED talks, podcasts, audiobooks, and business presentations. Highest comprehension retention.",
      };
    }
    if (calculatedWpm <= 190) {
      return {
        label: "Brisk / Energetic",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/30",
        desc: "Great for fast-paced YouTube videos, radio commercials, and upbeat news broadcasts.",
      };
    }
    return {
      label: "Hyper-Fast / Auctioneer",
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/30",
      desc: "Fast disclaimer tempo. Listener recall drops significantly unless paired with on-screen subtitles.",
    };
  }, [calculatedWpm]);

  // Duration Planner targets
  const plannerTargetSeconds = useMemo(() => {
    return Math.max(1, targetMins * 60 + targetSecs);
  }, [targetMins, targetSecs]);

  const plannerEstimates = useMemo(() => {
    const mins = plannerTargetSeconds / 60;
    return [
      {
        tempo: "Slow / Ceremonial (110 WPM)",
        words: Math.round(mins * 110),
        useCase: "Keynotes, eulogies, meditation, introductory lectures",
      },
      {
        tempo: "Conversational Standard (140 WPM)",
        words: Math.round(mins * 140),
        useCase: "Podcasts, TED talks, business pitches, audiobooks",
      },
      {
        tempo: "Brisk / Media (165 WPM)",
        words: Math.round(mins * 165),
        useCase: "YouTube tutorials, TV news, high-energy demos",
      },
      {
        tempo: "Rapid / Voiceover (190 WPM)",
        words: Math.round(mins * 190),
        useCase: "30-second commercial spots, podcast sponsor reads",
      },
    ];
  }, [plannerTargetSeconds]);

  const faqs = [
    {
      q: "What is the average human speech rate in Words Per Minute (WPM)?",
      a: "In conversational English, average speech rate ranges between 130 and 150 words per minute (WPM). Professional audiobook narrators aim for 140 to 155 WPM, while television news anchors average 150 to 165 WPM.",
    },
    {
      q: "How many words is a 5-minute presentation or keynote?",
      a: "At a standard, comfortable presentation pace of 130 to 140 WPM, a 5-minute speech requires between 650 and 700 words. Leaving time for audience pauses, slides, and emphasis, 600 to 650 words is optimal.",
    },
    {
      q: "Does speech speed affect automatic speech recognition (ASR) accuracy?",
      a: "Yes. Speaking between 120 and 160 WPM yields the highest transcription accuracy (often exceeding 98%). Rates above 200 WPM lead to word slurring and elision, which can slightly increase Word Error Rate unless processed by high-grade acoustic models like TranscriptG.",
    },
    {
      q: "How do I calculate words per minute from an audio recording?",
      a: "Divide the total number of spoken words by the recording duration in seconds, then multiply by 60. For example: 350 words in 2 minutes and 30 seconds (150s) = (350 ÷ 150) × 60 = 140 WPM.",
    },
    {
      q: "Can TranscriptG transcribe and calculate speech speed automatically?",
      a: "Yes. Simply upload any MP3, WAV, or YouTube video to TranscriptG's Speech-to-Text engine. It provides instant word counts, sentence timestamps, and automated pacing diagnostics without manual counting.",
    },
  ];

  return (
    <div className="space-y-16">
      <Seo
        title="Speech Rate & WPM Calculator — Words Per Minute Audio & Speech Planner"
        description="Calculate speech rate in words per minute (WPM), speech duration, and pacing metrics. Plan word counts for 5-minute speeches, TED talks, YouTube scripts, and audiobooks."
        keywords={[
          "speech rate calculator",
          "words per minute calculator",
          "wpm speech calculator",
          "speech duration calculator",
          "how long is a 5 minute speech",
          "audio reading speed calculator",
          "speech tempo analyzer",
          "presentation word count planner",
        ]}
        faqs={faqs}
        canonicalPath="/tools/speech-rate-calculator"
        applicationCategory="MultimediaApplication"
      />

      <PageHeader
        eyebrow="Speech Analytics · Utility Suite"
        title="Speech Rate & WPM Analyzer"
        description="Measure speaking velocity, diagnose presentation pacing, and calculate exact speech duration for keynotes, podcasts, and videos."
        badge="Zero Limits"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Tabs between Mode 1 and Mode 2 */}
        <div className="flex items-center justify-center">
          <div className="p-1.5 rounded-2xl bg-black/5 border border-black/10 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("text_to_wpm")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "text_to_wpm"
                  ? "bg-[#ff5500] text-white shadow-md"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Analyze Speech Velocity (Text + Duration &rarr; WPM)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("duration_planner")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "duration_planner"
                  ? "bg-[#ff5500] text-white shadow-md"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Speech Duration Planner (Target Time &rarr; Words Needed)
            </button>
          </div>
        </div>

        {/* MODE 1: ANALYZE SPEECH VELOCITY */}
        {activeTab === "text_to_wpm" && (
          <div className="rounded-3xl bg-[#090b10] border border-white/10 shadow-2xl p-6 sm:p-8 text-white space-y-8">
            {/* Sample Preset Buttons */}
            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                Load Realistic Sample:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {SAMPLE_SPEECHES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      setSpeechText(sample.words);
                      setDurationMins(sample.minutes);
                      setDurationSecs(sample.seconds);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono border border-white/10 transition-colors"
                  >
                    {sample.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Text & Time Input (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <label className="flex items-center gap-1.5 text-neutral-300 font-bold">
                      <FileText className="w-4 h-4 text-[#ff5500]" />
                      Spoken Transcript / Script Text
                    </label>
                    <span className="text-[#00d9ff] font-bold">
                      {textStats.words} words · {textStats.characters} characters
                    </span>
                  </div>
                  <textarea
                    value={speechText}
                    onChange={(e) => setSpeechText(e.target.value)}
                    rows={8}
                    className="w-full p-4 bg-black/60 rounded-2xl border border-white/10 text-neutral-200 font-sans text-sm leading-relaxed focus:outline-none focus:border-[#ff5500] resize-y"
                    placeholder="Paste your spoken audio transcript or speech text here..."
                  />
                </div>

                {/* Duration Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-neutral-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#ff5500]" />
                    Total Spoken Audio Duration
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block mb-1">Minutes</span>
                      <input
                        type="number"
                        min="0"
                        max="300"
                        value={durationMins}
                        onChange={(e) => setDurationMins(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3 py-2.5 bg-black/60 rounded-xl border border-white/15 text-white font-mono font-bold text-base focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block mb-1">Seconds</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={durationSecs}
                        onChange={(e) => setDurationSecs(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                        className="w-full px-3 py-2.5 bg-black/60 rounded-xl border border-white/15 text-white font-mono font-bold text-base focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Speedometer & Telemetry (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-black/40 p-6 rounded-2xl border border-white/10">
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-300 flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-[#ff5500]" />
                      Pacing Velocity
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {totalTimeSeconds} seconds total
                    </span>
                  </div>

                  {/* Primary WPM Display */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                      Speaking Rate
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-mono font-black text-white tabular-nums tracking-tight">
                        {calculatedWpm}
                      </span>
                      <span className="text-base font-mono text-[#ff5500] font-bold">
                        WPM
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 block pt-1">
                      ~{(calculatedWpm / 60).toFixed(2)} words per second
                    </span>
                  </div>

                  {/* Diagnosis Card */}
                  <div className={`p-4 rounded-2xl border ${paceDiagnosis.bg} space-y-1`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold ${paceDiagnosis.color}`}>
                        {paceDiagnosis.label}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {paceDiagnosis.desc}
                    </p>
                  </div>
                </div>

                {/* Direct Link to Engine 01 */}
                <div className="pt-2">
                  <Link
                    to="/transcribe"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#ff5500] hover:bg-[#ff7733] text-white text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(255,85,0,0.35)]"
                  >
                    <Mic className="w-4 h-4" />
                    Transcribe Real Audio to Auto-Count Words →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: DURATION PLANNER */}
        {activeTab === "duration_planner" && (
          <div className="rounded-3xl bg-[#090b10] border border-white/10 shadow-2xl p-6 sm:p-8 text-white space-y-8">
            <div className="max-w-2xl mx-auto space-y-6 text-center">
              <h3 className="text-xl font-black text-white tracking-tight">
                Speech Duration Script Planner
              </h3>
              <p className="text-xs text-neutral-400">
                Determine exactly how many words you need to write to fit your allotted presentation or video slot.
              </p>

              {/* Target Duration Selector */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block mb-1">Target Minutes</span>
                  <input
                    type="number"
                    min="0"
                    max="180"
                    value={targetMins}
                    onChange={(e) => setTargetMins(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-28 px-4 py-2.5 bg-black/60 rounded-xl border border-white/15 text-white font-mono font-bold text-center text-lg focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block mb-1">Target Seconds</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={targetSecs}
                    onChange={(e) => setTargetSecs(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="w-28 px-4 py-2.5 bg-black/60 rounded-xl border border-white/15 text-white font-mono font-bold text-center text-lg focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                {[
                  { m: 0, s: 30, label: "30s Short / Reel" },
                  { m: 1, s: 0, label: "1 min Pitch" },
                  { m: 3, s: 0, label: "3 min Lightning" },
                  { m: 5, s: 0, label: "5 min Ignite" },
                  { m: 10, s: 0, label: "10 min Demo" },
                  { m: 18, s: 0, label: "18 min TED Talk" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setTargetMins(item.m);
                      setTargetSecs(item.s);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                      targetMins === item.m && targetSecs === item.s
                        ? "bg-[#ff5500] text-white border-[#ff5500]"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Words Estimates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plannerEstimates.map((plan, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3 relative overflow-hidden group hover:border-[#ff5500]/50 transition-all"
                >
                  <span className="text-[11px] font-mono font-bold text-neutral-400 block">
                    {plan.tempo}
                  </span>
                  <div className="text-3xl font-mono font-black text-white tabular-nums tracking-tight">
                    {plan.words.toLocaleString()}{" "}
                    <span className="text-xs font-mono text-[#ff5500]">words</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-1 border-t border-white/5">
                    {plan.useCase}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Industry Speech Benchmarks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff4d00] uppercase">
              <Mic className="w-4 h-4" /> TED Talk Standard
            </div>
            <h4 className="text-base font-bold text-[#0d0f12]">135 to 150 WPM</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Allows speakers to breathe, modulate emotional pitch, and allow complex narrative arguments to resonate with multinational live audiences.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase">
              <Volume2 className="w-4 h-4" /> Audiobook Narration
            </div>
            <h4 className="text-base font-bold text-[#0d0f12]">145 to 160 WPM</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Audible and Apple Books quality guidelines recommend 150 WPM. Enables listeners to comfortably speed up playback to 1.25x or 1.5x without vocal distortion.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0088a8] uppercase">
              <TrendingUp className="w-4 h-4" /> Short-Form Video (TikTok / Shorts)
            </div>
            <h4 className="text-base font-bold text-[#0d0f12]">165 to 185 WPM</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              High-retention social content removes all dead-air pauses to prevent swipe-away, relying on bold subtitle cues to anchor viewer focus.
            </p>
          </div>
        </div>

        {/* Section 3: Technical FAQs */}
        <div className="space-y-6 pt-6 border-t border-black/10">
          <div>
            <h3 className="text-xl font-black text-[#0d0f12] tracking-tight">
              Speech Velocity &amp; Duration Calculation FAQs
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Authoritative answers on speaking rates, verbal pacing, and script planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-black/10 space-y-2">
                <h4 className="text-xs font-mono font-bold text-[#0d0f12]">
                  {faq.q}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
