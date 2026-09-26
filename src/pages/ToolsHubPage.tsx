import React, { useState, useMemo, useEffect } from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { Link } from "react-router-dom";
import {
  validateSubtitles,
  autoFixSubtitles,
  calculateSpeechMetrics,
  calculateAudioTelemetry,
  ValidationReport,
  AudioTelemetryParams,
} from "../lib/captionUtilities";
import {
  Wand2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Mic,
  FileText,
  Sliders,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Download,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Info,
  Layers,
  HardDrive,
  Radio,
} from "lucide-react";

const SAMPLE_SRT_WITH_ISSUES = `1
00:00:01,000 --> 00:00:02,200
Welcome to TranscriptG. Today we explore high-precision speech-to-text acoustic recognition and subtitle timing benchmarks across broadcast streams.

2
00:00:02,100 --> 00:00:03,800
Notice this second cue starts before the previous one finished, creating an overlapping timecode violation that breaks television decoder standards.

3
00:00:04,500 --> 00:00:05,000
This short cue packs too many syllables in half a second, spiking the reading speed beyond comfortable human comprehension limits!`;

const SAMPLE_TEXT_FOR_SPEECH = `Automatic speech recognition has fundamentally transformed how human discourse is indexed, archived, and communicated. Rather than listening to hours of audio sequentially, computational speech pipelines enable instant semantic search, automated closed captioning for hearing accessibility, and real-time multilingual translation across global audiences. Modern neural models combine deep convolutional acoustic frontends with self-attention transformer layers, minimizing word error rates even in reverberant, noisy environments.`;

export const ToolsHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"validator" | "speechRate" | "audioSize">("validator");

  // --- Subtitle Validator State ---
  const [subtitleInput, setSubtitleInput] = useState(SAMPLE_SRT_WITH_ISSUES);
  const [copiedSubtitles, setCopiedSubtitles] = useState(false);
  const [fixedNotice, setFixedNotice] = useState(false);

  const validationReport: ValidationReport = useMemo(() => {
    return validateSubtitles(subtitleInput);
  }, [subtitleInput]);

  const handleAutoFix = () => {
    const fixed = autoFixSubtitles(subtitleInput);
    setSubtitleInput(fixed);
    setFixedNotice(true);
    setTimeout(() => setFixedNotice(false), 3000);
  };

  const handleCopySubtitles = () => {
    navigator.clipboard.writeText(subtitleInput);
    setCopiedSubtitles(true);
    setTimeout(() => setCopiedSubtitles(false), 2000);
  };

  // --- Speech Rate & WPM Calculator State ---
  const [speechTextInput, setSpeechTextInput] = useState(SAMPLE_TEXT_FOR_SPEECH);
  const speechMetrics = useMemo(() => {
    return calculateSpeechMetrics(speechTextInput);
  }, [speechTextInput]);

  // Interactive Live Pacer State
  const [targetWpm, setTargetWpm] = useState<number>(140);
  const [isPacing, setIsPacing] = useState(false);
  const [activePacerWordIndex, setActivePacerWordIndex] = useState(0);

  const speechWords = useMemo(() => {
    return speechTextInput.trim().split(/\s+/).filter(Boolean);
  }, [speechTextInput]);

  useEffect(() => {
    let interval: any = null;
    if (isPacing && speechWords.length > 0) {
      const msPerWord = (60 / targetWpm) * 1000;
      interval = setInterval(() => {
        setActivePacerWordIndex((prev) => {
          if (prev >= speechWords.length - 1) {
            setIsPacing(false);
            return 0;
          }
          return prev + 1;
        });
      }, msPerWord);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPacing, targetWpm, speechWords]);

  // --- Audio Telemetry Calculator State ---
  const [durationHours, setDurationHours] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(45);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);
  const [sampleRate, setSampleRate] = useState<number>(44100);
  const [bitDepth, setBitDepth] = useState<16 | 24 | 32>(16);
  const [channels, setChannels] = useState<1 | 2 | 6>(2);
  const [codec, setCodec] = useState<AudioTelemetryParams["codec"]>("MP3_192");

  const totalDurationSeconds = durationHours * 3600 + durationMinutes * 60 + durationSeconds;

  const audioTelemetry = useMemo(() => {
    return calculateAudioTelemetry({
      durationSeconds: Math.max(1, totalDurationSeconds),
      sampleRateHz: sampleRate,
      bitDepth,
      channels,
      codec,
    });
  }, [totalDurationSeconds, sampleRate, bitDepth, channels, codec]);

  return (
    <div className="space-y-12">
      <Seo
        title="Interactive Audio & Caption Utility Tools — TranscriptG"
        description="Free in-browser speech utilities: Subtitle syntax validator, timecode overlap detector, WPM speaking rate calculator, and audio file size/bitrate estimator."
        keywords={[
          "subtitle validator",
          "srt timecode checker",
          "cps calculator",
          "speaking rate calculator",
          "wpm speech pacing",
          "audio file size calculator",
          "wav to mp3 size estimator",
          "audio bitrate calculator",
        ]}
        canonicalPath="/tools"
      />

      <PageHeader
        eyebrow="Interactive Audio Lab"
        title="Professional Speech & Subtitle Engineering Utilities"
        description="Free, real-time client-side calculators. Test subtitle syntax, compute speaking rates, calculate audio bitrates, and verify broadcast compliance without uploading files to third-party servers."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-neutral-200/80 max-w-xl mx-auto font-mono text-xs font-bold">
          <button
            onClick={() => setActiveTab("validator")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === "validator"
                ? "bg-white text-[#0d0f12] shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#ff4d00]" />
            <span>Subtitle Validator</span>
          </button>

          <button
            onClick={() => setActiveTab("speechRate")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === "speechRate"
                ? "bg-white text-[#0d0f12] shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#0088a8]" />
            <span>Speech & WPM Pacer</span>
          </button>

          <button
            onClick={() => setActiveTab("audioSize")}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === "audioSize"
                ? "bg-white text-[#0d0f12] shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-purple-600" />
            <span>Bitrate & Size Calc</span>
          </button>
        </div>

        {/* TAB 1: SUBTITLE SYNTAX & TIMECODE VALIDATOR */}
        {activeTab === "validator" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Editor & Controls */}
              <div className="lg:col-span-2 space-y-4">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-black/5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00]" />
                      <h3 className="font-bold text-sm sm:text-base text-[#0d0f12]">
                        SRT / VTT Input Stream
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-mono font-bold">
                        Format: {validationReport.format}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSubtitleInput(SAMPLE_SRT_WITH_ISSUES)}
                        className="text-xs font-mono text-neutral-500 hover:text-[#ff4d00] transition-colors underline"
                      >
                        Reset Demo
                      </button>
                      <button
                        onClick={handleCopySubtitles}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-semibold transition-colors"
                      >
                        {copiedSubtitles ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={subtitleInput}
                    onChange={(e) => setSubtitleInput(e.target.value)}
                    rows={13}
                    className="w-full p-4 font-mono text-xs sm:text-sm bg-neutral-50 rounded-2xl border border-black/10 focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] outline-none leading-relaxed transition-all resize-y"
                    placeholder="Paste raw SRT or WebVTT content here..."
                  />

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                      <span>Total Cues: {validationReport.totalCues}</span>
                      <span>•</span>
                      <span>
                        Total Duration:{" "}
                        {Math.floor(validationReport.totalDurationSec / 60)}m{" "}
                        {Math.round(validationReport.totalDurationSec % 60)}s
                      </span>
                    </div>

                    <button
                      onClick={handleAutoFix}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0d0f12] hover:bg-[#ff4d00] text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <Wand2 className="w-4 h-4" />
                      <span>Auto-Fix Timecodes & Wrap Lines</span>
                    </button>
                  </div>

                  {fixedNotice && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Subtitles re-indexed, overlapping timestamps capped, and long lines wrapped to 40 characters!
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Diagnostic Summary */}
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white shadow-lg space-y-4">
                  <h4 className="font-bold text-sm text-[#0d0f12] uppercase tracking-wider font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Compliance Audit
                  </h4>

                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div
                      className={`p-3 rounded-xl border ${
                        validationReport.errorsCount > 0
                          ? "bg-red-50 border-red-200 text-red-700"
                          : "bg-emerald-50 border-emerald-200 text-emerald-700"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold">Fatal Syntax Errors</div>
                      <div className="text-xl font-black mt-1">
                        {validationReport.errorsCount}
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-xl border ${
                        validationReport.warningsCount > 0
                          ? "bg-amber-50 border-amber-200 text-amber-800"
                          : "bg-emerald-50 border-emerald-200 text-emerald-700"
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold">Standard Warnings</div>
                      <div className="text-xl font-black mt-1">
                        {validationReport.warningsCount}
                      </div>
                    </div>
                  </div>

                  {/* Quality Indicators */}
                  <div className="space-y-2.5 pt-2 text-xs font-mono border-t border-black/5">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Overlapping Cues:</span>
                      <span
                        className={`font-bold ${
                          validationReport.overlapCuesCount > 0 ? "text-red-600" : "text-emerald-600"
                        }`}
                      >
                        {validationReport.overlapCuesCount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-600">
                      <span>High CPS (&gt;25 Char/Sec):</span>
                      <span
                        className={`font-bold ${
                          validationReport.highCpsCuesCount > 0 ? "text-amber-600" : "text-emerald-600"
                        }`}
                      >
                        {validationReport.highCpsCuesCount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Long Lines (&gt;42 Chars):</span>
                      <span
                        className={`font-bold ${
                          validationReport.longLinesCount > 0 ? "text-amber-600" : "text-emerald-600"
                        }`}
                      >
                        {validationReport.longLinesCount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Average Reading Speed:</span>
                      <span className="font-bold text-[#0d0f12]">
                        {validationReport.averageCps.toFixed(1)} CPS
                      </span>
                    </div>
                  </div>

                  {/* Issue List */}
                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase text-neutral-500 font-mono mb-2">
                      Detected Anomalies
                    </div>
                    {validationReport.cues.some((c) => c.issues.length > 0) ? (
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {validationReport.cues
                          .filter((c) => c.issues.length > 0)
                          .map((cue) => (
                            <div
                              key={cue.index}
                              className="p-2.5 rounded-xl bg-neutral-50 border border-black/5 text-xs space-y-1 font-mono"
                            >
                              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-700">
                                <span>Cue #{cue.index}</span>
                                <span className="text-neutral-400">
                                  {cue.startTimeSec.toFixed(1)}s - {cue.endTimeSec.toFixed(1)}s
                                </span>
                              </div>
                              {cue.issues.map((issue, idx) => (
                                <p key={idx} className="text-red-600 text-[11px] leading-tight">
                                  • {issue}
                                </p>
                              ))}
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>All subtitle cues meet broadcast standards and WCAG 2.2 AA rules!</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Educational Box */}
                <div className="p-5 rounded-2xl bg-neutral-100/80 border border-black/5 text-xs text-neutral-700 space-y-2">
                  <div className="font-bold font-mono text-[#0d0f12] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#ff4d00]" /> Broadcast Subtitle Guidelines
                  </div>
                  <p className="leading-relaxed">
                    Broadcast networks (BBC, Netflix, FCC) enforce a maximum reading speed of 20 to 25 Characters Per Second (CPS) and a limit of 42 characters per line to ensure deaf and hard-of-hearing viewers can comfortably process speech alongside visual media.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SPEECH RATE & WPM / READING TIME CALCULATOR */}
        {activeTab === "speechRate" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Text Input */}
              <div className="lg:col-span-2 space-y-4">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-black/5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0088a8]" />
                      <h3 className="font-bold text-sm sm:text-base text-[#0d0f12]">
                        Speech Manuscript / Transcript
                      </h3>
                    </div>
                    <button
                      onClick={() => setSpeechTextInput(SAMPLE_TEXT_FOR_SPEECH)}
                      className="text-xs font-mono text-neutral-500 hover:text-[#ff4d00] transition-colors underline"
                    >
                      Load Sample Text
                    </button>
                  </div>

                  <textarea
                    value={speechTextInput}
                    onChange={(e) => setSpeechTextInput(e.target.value)}
                    rows={9}
                    className="w-full p-4 font-mono text-xs sm:text-sm bg-neutral-50 rounded-2xl border border-black/10 focus:border-[#0088a8] outline-none leading-relaxed transition-all resize-y"
                    placeholder="Type or paste speech, podcast script, or transcript text..."
                  />

                  {/* Interactive Word-by-Word Teleprompter Pacer */}
                  <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-mono uppercase text-[#00d9ff] font-bold">
                          Interactive Speaking Pacer
                        </div>
                        <p className="text-xs text-neutral-400">
                          Follow the highlighted word to practice delivering your speech at exact target WPM.
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl font-mono text-xs">
                          <span className="text-neutral-400">Target:</span>
                          <input
                            type="number"
                            min={80}
                            max={240}
                            step={5}
                            value={targetWpm}
                            onChange={(e) => setTargetWpm(Number(e.target.value))}
                            className="w-12 bg-transparent text-white font-bold text-right outline-none"
                          />
                          <span className="text-neutral-400">WPM</span>
                        </div>

                        <button
                          onClick={() => setIsPacing(!isPacing)}
                          className={`p-2.5 rounded-xl font-bold transition-all flex items-center gap-1.5 text-xs font-mono ${
                            isPacing
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-[#00d9ff] hover:bg-[#00c2e6] text-[#0d0f12]"
                          }`}
                        >
                          {isPacing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span>{isPacing ? "Pause" : "Start Pacer"}</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsPacing(false);
                            setActivePacerWordIndex(0);
                          }}
                          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono"
                          title="Reset Pacer"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Word Visualizer Container */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 max-h-40 overflow-y-auto font-sans text-sm sm:text-base leading-relaxed text-neutral-300">
                      {speechWords.map((word, idx) => (
                        <span
                          key={idx}
                          className={`inline-block mr-1.5 transition-colors duration-150 px-1 rounded ${
                            idx === activePacerWordIndex
                              ? "bg-[#ff4d00] text-white font-bold scale-105"
                              : idx < activePacerWordIndex
                              ? "text-neutral-500"
                              : "text-neutral-200"
                          }`}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics & Duration Benchmarks */}
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white shadow-lg space-y-5">
                  <h4 className="font-bold text-sm text-[#0d0f12] uppercase tracking-wider font-mono">
                    Speech & Readability Telemetry
                  </h4>

                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5">
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Total Words</div>
                      <div className="text-2xl font-black text-[#0d0f12] mt-0.5">
                        {speechMetrics.wordCount}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5">
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Characters</div>
                      <div className="text-2xl font-black text-[#0d0f12] mt-0.5">
                        {speechMetrics.characterCount}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5">
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Sentences</div>
                      <div className="text-xl font-bold text-[#0d0f12] mt-0.5">
                        {speechMetrics.sentenceCount}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5">
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Reading Ease</div>
                      <div className="text-xl font-bold text-[#ff4d00] mt-0.5">
                        {speechMetrics.readingEaseScore} / 100
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-950 font-mono space-y-1">
                    <div className="font-bold text-[11px] uppercase tracking-wider text-sky-700">
                      Reading Grade Level
                    </div>
                    <div className="font-bold text-sm text-[#0d0f12]">
                      {speechMetrics.readingGradeLevel}
                    </div>
                  </div>

                  {/* Estimated Delivery Durations */}
                  <div className="space-y-3 pt-2 border-t border-black/5 font-mono text-xs">
                    <div className="font-bold text-neutral-500 uppercase text-[10px]">
                      Estimated Duration By Pace
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                      <span className="text-neutral-600">Conversational (145 WPM):</span>
                      <span className="font-bold text-[#0d0f12]">
                        {Math.floor(speechMetrics.durationMinutes.conversationalSpeech)}m{" "}
                        {Math.round((speechMetrics.durationMinutes.conversationalSpeech % 1) * 60)}s
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                      <span className="text-neutral-600">Keynote Presentation (100 WPM):</span>
                      <span className="font-bold text-[#0d0f12]">
                        {Math.floor(speechMetrics.durationMinutes.slowSpeech)}m{" "}
                        {Math.round((speechMetrics.durationMinutes.slowSpeech % 1) * 60)}s
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                      <span className="text-neutral-600">Rapid Delivery / Podcast (180 WPM):</span>
                      <span className="font-bold text-[#0d0f12]">
                        {Math.floor(speechMetrics.durationMinutes.rapidSpeech)}m{" "}
                        {Math.round((speechMetrics.durationMinutes.rapidSpeech % 1) * 60)}s
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                      <span className="text-neutral-600">Silent Reading (240 WPM):</span>
                      <span className="font-bold text-[#0d0f12]">
                        {Math.floor(speechMetrics.durationMinutes.silentReading)}m{" "}
                        {Math.round((speechMetrics.durationMinutes.silentReading % 1) * 60)}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIO BITRATE & FILE SIZE ESTIMATOR */}
        {activeTab === "audioSize" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Parameters Input Form */}
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-xl space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-black/5">
                    <HardDrive className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-base text-[#0d0f12]">
                      Acoustic & Audio Codec Parameters
                    </h3>
                  </div>

                  {/* Audio Duration */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-neutral-500">
                      Audio Recording Duration
                    </label>
                    <div className="grid grid-cols-3 gap-3 font-mono text-sm">
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Hours</span>
                        <input
                          type="number"
                          min={0}
                          max={24}
                          value={durationHours}
                          onChange={(e) => setDurationHours(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full p-2.5 rounded-xl border border-black/10 bg-neutral-50 font-bold outline-none focus:border-purple-600"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Minutes</span>
                        <input
                          type="number"
                          min={0}
                          max={59}
                          value={durationMinutes}
                          onChange={(e) => setDurationMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full p-2.5 rounded-xl border border-black/10 bg-neutral-50 font-bold outline-none focus:border-purple-600"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block">Seconds</span>
                        <input
                          type="number"
                          min={0}
                          max={59}
                          value={durationSeconds}
                          onChange={(e) => setDurationSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full p-2.5 rounded-xl border border-black/10 bg-neutral-50 font-bold outline-none focus:border-purple-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Codec Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-neutral-500">
                      Encoding Codec & Target Bitrate
                    </label>
                    <select
                      value={codec}
                      onChange={(e) => setCodec(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-black/10 bg-neutral-50 font-mono text-sm font-bold outline-none focus:border-purple-600"
                    >
                      <option value="WAV">Uncompressed Linear PCM (WAV) — Lossless Studio Master</option>
                      <option value="FLAC">FLAC Lossless Audio (~55% PCM size) — Archival Grade</option>
                      <option value="MP3_128">MP3 Standard Voice (128 kbps) — Standard Podcast</option>
                      <option value="MP3_192">MP3 High-Fidelity (192 kbps) — Balanced Broadcast</option>
                      <option value="MP3_320">MP3 Studio CBR (320 kbps) — Maximum MP3 Quality</option>
                      <option value="AAC_128">AAC / M4A (128 kbps) — Modern Mobile Streaming</option>
                      <option value="AAC_256">AAC / M4A (256 kbps) — Apple Music Standard</option>
                      <option value="OPUS_64">Opus Voice Codec (64 kbps) — Optimal Web Speech</option>
                      <option value="OPUS_96">Opus Music & Speech (96 kbps) — Discord / WebRTC</option>
                    </select>
                  </div>

                  {/* Sample Rate & Channels */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-400">Sample Rate</label>
                      <select
                        value={sampleRate}
                        onChange={(e) => setSampleRate(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-black/10 bg-neutral-50 text-xs font-bold"
                      >
                        <option value={16000}>16,000 Hz (Optimal STT)</option>
                        <option value={22050}>22,050 Hz (AM Radio)</option>
                        <option value={44100}>44,100 Hz (Audio CD)</option>
                        <option value={48000}>48,000 Hz (Broadcast/Video)</option>
                        <option value={96000}>96,000 Hz (Hi-Res Studio)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-400">Bit Depth</label>
                      <select
                        value={bitDepth}
                        onChange={(e) => setBitDepth(Number(e.target.value) as any)}
                        className="w-full p-2.5 rounded-xl border border-black/10 bg-neutral-50 text-xs font-bold"
                      >
                        <option value={16}>16-bit Integer</option>
                        <option value={24}>24-bit Studio</option>
                        <option value={32}>32-bit Float</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-neutral-400">Channel Mode</label>
                      <select
                        value={channels}
                        onChange={(e) => setChannels(Number(e.target.value) as any)}
                        className="w-full p-2.5 rounded-xl border border-black/10 bg-neutral-50 text-xs font-bold"
                      >
                        <option value={1}>1 Channel (Mono Speech)</option>
                        <option value={2}>2 Channels (Stereo)</option>
                        <option value={6}>6 Channels (5.1 Surround)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Output Readout */}
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white shadow-lg space-y-5">
                  <h4 className="font-bold text-sm text-[#0d0f12] uppercase tracking-wider font-mono">
                    Storage & Bandwidth Footprint
                  </h4>

                  <div className="space-y-3 font-mono">
                    <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                      <div className="text-[10px] uppercase font-bold text-purple-700">
                        Estimated File Size
                      </div>
                      <div className="text-3xl font-black text-[#0d0f12] mt-1">
                        {audioTelemetry.compressedSizeMB > 1024
                          ? `${(audioTelemetry.compressedSizeMB / 1024).toFixed(2)} GB`
                          : `${audioTelemetry.compressedSizeMB.toFixed(2)} MB`}
                      </div>
                      <div className="text-xs text-purple-800 mt-1 font-sans">
                        Compressed at {audioTelemetry.effectiveBitrateKbps} kbps ({audioTelemetry.compressionRatio}% reduction vs raw PCM)
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-50 border border-black/5 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Uncompressed PCM:</span>
                      <span className="font-bold text-[#0d0f12]">
                        {audioTelemetry.uncompressedSizeMB > 1024
                          ? `${(audioTelemetry.uncompressedSizeMB / 1024).toFixed(2)} GB`
                          : `${audioTelemetry.uncompressedSizeMB.toFixed(2)} MB`}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-50 border border-black/5 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Bandwidth per 1,000 Plays:</span>
                      <span className="font-bold text-[#0d0f12]">
                        {audioTelemetry.monthlyBandwidthPer1000PlaysGB.toFixed(2)} GB / mo
                      </span>
                    </div>
                  </div>

                  {/* AI Speech Recognition Recommendation */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 leading-relaxed">
                    <div className="font-bold font-mono text-[11px] uppercase tracking-wider flex items-center gap-1.5 text-amber-800">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> ASR Optimization Advice
                    </div>
                    <p>{audioTelemetry.sttRecommendation}</p>
                  </div>

                  <Link
                    to="/transcribe"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0d0f12] hover:bg-[#ff4d00] text-white font-mono text-xs font-bold transition-all shadow-md"
                  >
                    <Mic className="w-4 h-4" /> Transcribe Audio File Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Launch Cards to Main Production Engines */}
        <div className="pt-8 border-t border-black/10">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">
            Connect With Core Production Engines
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/transcribe"
              className="p-5 rounded-2xl bg-white border border-black/10 hover:border-[#ff4d00] hover:shadow-lg transition-all group space-y-2"
            >
              <div className="w-9 h-9 rounded-xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center font-bold">
                <Mic className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors">
                Speech-to-Text Engine
              </h4>
              <p className="text-xs text-neutral-500">
                Upload MP3, WAV, M4A, or MP4 files for high-precision timecoded transcription.
              </p>
            </Link>

            <Link
              to="/youtube-transcript"
              className="p-5 rounded-2xl bg-white border border-black/10 hover:border-red-500 hover:shadow-lg transition-all group space-y-2"
            >
              <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
                <Radio className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#0d0f12] group-hover:text-red-600 transition-colors">
                YouTube Transcript Generator
              </h4>
              <p className="text-xs text-neutral-500">
                Extract chapter timestamps, video summaries, and study notes with zero friction.
              </p>
            </Link>

            <Link
              to="/convert"
              className="p-5 rounded-2xl bg-white border border-black/10 hover:border-[#0088a8] hover:shadow-lg transition-all group space-y-2"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0088a8]/10 text-[#0088a8] flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#0d0f12] group-hover:text-[#0088a8] transition-colors">
                Universal Subtitle Converter
              </h4>
              <p className="text-xs text-neutral-500">
                Convert between SRT, VTT, JSON, TXT, and DOCX subtitle formats losslessly.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ToolsHubPage;
