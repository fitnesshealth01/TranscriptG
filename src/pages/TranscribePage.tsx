import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { DropZone } from "../components/DropZone";
import { ProcessingView } from "../components/ProcessingView";
import { Manuscript } from "../components/Manuscript";
import { ExportSuite } from "../components/ExportSuite";
import { TranscribeGuide } from "../components/TranscribeGuide";
import { WaveformPlayer } from "../components/WaveformPlayer";
import { SAMPLE_AUDIO_ITEMS, SampleAudioItem } from "../data/sampleAudios";
import {
  CueSegment,
  SUPPORTED_LANGUAGES,
  SAMPLE_SEGMENTS,
  SAMPLE_SUMMARY,
  formatTimeDisplay
} from "../lib/transcript";
import {
  Sparkles,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Zap,
  Globe2,
  HelpCircle,
  Play,
  FileAudio,
  CheckCircle2,
  FileText,
  Sliders,
  Volume2
} from "lucide-react";

export const TranscribePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [generateSummary, setGenerateSummary] = useState(true);
  const [selectedLang, setSelectedLang] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Result state
  const [segments, setSegments] = useState<CueSegment[] | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [languageDetected, setLanguageDetected] = useState<string>("");

  const [retryStatus, setRetryStatus] = useState<string | null>(null);

  // Audio Workstation Player states
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [audioFreq, setAudioFreq] = useState<number>(360);
  const [trackTitle, setTrackTitle] = useState<string>("Master Acoustic Stream");
  const [speakerLabel, setSpeakerLabel] = useState<string | undefined>(undefined);
  const [silenceTrimmerActive, setSilenceTrimmerActive] = useState<boolean>(false);
  const animationFrameRef = React.useRef<number | null>(null);
  const lastTickRef = React.useRef<number>(0);

  // Compute total duration from segments
  const totalAudioDuration = React.useMemo(() => {
    if (!segments || segments.length === 0) return 28;
    return Math.max(10, Math.ceil(segments[segments.length - 1].end));
  }, [segments]);

  // Audio Playback Animation Clock
  React.useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    lastTickRef.current = performance.now();

    const loop = (now: number) => {
      const deltaSec = ((now - lastTickRef.current) / 1000) * playbackSpeed;
      lastTickRef.current = now;

      setCurrentTime((prev) => {
        let nextTime = prev + deltaSec;

        // Silence Trimmer: jump gaps > 1.2s between segments
        if (silenceTrimmerActive && segments) {
          const inAnySegment = segments.some((s) => nextTime >= s.start && nextTime <= s.end);
          if (!inAnySegment) {
            const nextUpcoming = segments.find((s) => s.start > nextTime);
            if (nextUpcoming && (nextUpcoming.start - nextTime) > 1.0) {
              nextTime = nextUpcoming.start;
            }
          }
        }

        if (nextTime >= totalAudioDuration) {
          setIsPlaying(false);
          return 0;
        }
        return nextTime;
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, totalAudioDuration, silenceTrimmerActive, segments]);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setIsLoading(true);
    setRetryStatus(null);

    const maxAttempts = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxAttempts && !success) {
      attempt++;
      try {
        if (attempt > 1) {
          setRetryStatus(`High demand detected. Retrying automatically (Attempt ${attempt}/${maxAttempts})...`);
          await new Promise((r) => setTimeout(r, 1500));
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("generateSummary", String(generateSummary));
        formData.append("targetLanguage", selectedLang);

        const res = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        let json: any = {};
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          try {
            json = await res.json();
          } catch {
            throw new Error("Unable to parse response from server.");
          }
        } else {
          const textResp = await res.text();
          throw new Error(
            `Server error (${res.status}): ${textResp.replace(/<[^>]*>/g, "").slice(0, 120).trim() || "Service temporary busy. Retrying..."}`
          );
        }

        if (!res.ok || json.error) {
          throw new Error(json.error || "Failed to transcribe media file.");
        }

        const data = json.data;
        if (data && data.segments) {
          const mappedSegments: CueSegment[] = data.segments.map((s: any, idx: number) => ({
            id: `seg-${idx + 1}`,
            start: s.start ?? idx * 3,
            end: s.end ?? (idx + 1) * 3,
            text: s.text ?? "",
          }));

          setSegments(mappedSegments);
          setSummary(data.summary || "");
          setLanguageDetected(data.languageDetected || "Detected");
          success = true;
          setRetryStatus(null);
        } else {
          throw new Error("Invalid response format received from server.");
        }
      } catch (err: any) {
        console.error(`Transcribe error (attempt ${attempt}/${maxAttempts}):`, err);
        if (attempt >= maxAttempts) {
          setError(err.message || "An unexpected error occurred during transcription.");
        }
      }
    }

    setIsLoading(false);
  };

  const handleLoadSample = (sampleItem?: SampleAudioItem) => {
    const chosen = sampleItem || SAMPLE_AUDIO_ITEMS[0];
    setFile(new File(["sample-audio-bytes"], `${chosen.id}.mp3`, { type: "audio/mp3" }));
    setSegments(chosen.segments);
    setSummary(chosen.summary);
    setLanguageDetected("English (US)");
    setTrackTitle(chosen.title);
    setAudioFreq(chosen.audioFreq);
    setSpeakerLabel(chosen.category);
    setCurrentTime(0);
    setIsPlaying(false);
    setError(null);
  };

  const handleReset = () => {
    setFile(null);
    setSegments(null);
    setSummary("");
    setLanguageDetected("");
    setError(null);
    setIsLoading(false);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const transcribeFaqs = [
    {
      q: "What audio and video file formats are supported for transcription?",
      a: "TranscriptG supports all major audio and video media containers including MP3, WAV, M4A, AAC, OGG, FLAC, WEBM, MP4, MOV, and AVI up to 25MB per upload.",
    },
    {
      q: "Are the transcripts timecoded for video subtitle editing?",
      a: "Yes. Every transcript includes millisecond-accurate timestamps and speaker cues that can be directly exported to SRT, VTT, JSON, TXT, PDF, and DOCX.",
    },
    {
      q: "How fast is the speech recognition inference?",
      a: "Standard recordings process within 2 to 5 seconds depending on file length, providing instant text rendering with automated chaptering and summaries.",
    },
    {
      q: "Is there any limit to the number of transcriptions I can perform?",
      a: "No. TranscriptG is an open public utility with unlimited free sessions and zero login friction.",
    },
  ];

  return (
    <div className="space-y-12">
      <Seo
        title="Speech to Text & Audio Transcriber — Free MP3, WAV & Video Transcription Engine"
        description="Free online speech-to-text audio and video transcription tool. Convert MP3, WAV, M4A, and MP4 into timecoded subtitles, transcripts, and AI executive summaries in 90+ languages. Zero login, no watermark."
        keywords={[
          "speech to text",
          "audio transcription",
          "transcribe mp3 to text",
          "video transcription free",
          "free speech to text converter",
          "transcribe audio online",
          "mp3 to text converter",
          "wav to text",
          "voice to text generator",
          "ai speech recognition",
          "subtitles generator",
        ]}
        faqs={transcribeFaqs}
        canonicalPath="/transcribe"
        applicationCategory="MultimediaApplication"
      />

      <PageHeader
        eyebrow="Engine 01 · Speech → Text"
        title="High-Precision Audio & Video Transcription"
        description="Turn spoken audio into structured, timecoded manuscripts, subtitles, and AI summaries instantly."
        badge="25MB Max"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Workspace (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {!segments && !isLoading && (
              <div className="space-y-6">
                {/* Configuration Bar */}
                <div className="glass-card p-5 rounded-2xl border border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-mono font-bold text-neutral-700 flex items-center gap-1.5">
                      <Globe2 className="w-4 h-4 text-[#ff4d00]" /> Spoken Language:
                    </label>
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      className="px-3 py-1.5 bg-neutral-100 rounded-xl border border-neutral-200 text-xs font-mono font-bold text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
                    >
                      {SUPPORTED_LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono font-bold text-neutral-800">
                      <input
                        type="checkbox"
                        checked={generateSummary}
                        onChange={(e) => setGenerateSummary(e.target.checked)}
                        className="w-4 h-4 rounded text-[#ff4d00] focus:ring-[#ff4d00] accent-[#ff4d00]"
                      />
                      <Sparkles className="w-3.5 h-3.5 text-[#ff4d00]" />
                      Generate AI Summary
                    </label>

                    <button
                      onClick={() => handleLoadSample()}
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-[#ff4d00]/10 text-neutral-700 hover:text-[#ff4d00] text-xs font-mono font-bold transition-colors border border-neutral-200 flex items-center gap-1.5"
                    >
                      <Play className="w-3 h-3 text-[#ff4d00]" /> Try Sample Demo
                    </button>
                  </div>
                </div>

                {/* Dropzone */}
                <DropZone
                  onFileSelect={handleFileSelect}
                  acceptTypes="audio/*,video/*,.mp3,.wav,.m4a,.ogg,.mp4,.mov"
                  maxSizeMB={25}
                  label="Drop audio or video file here"
                  sublabel="MP3, WAV, M4A, OGG, MP4, MOV up to 25MB • Session private"
                  fileTypesList={["MP3", "WAV", "M4A", "OGG", "MP4", "MOV"]}
                  isLoading={isLoading}
                />

                {/* Preloaded Multi-Scenario Sample Showcase */}
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-neutral-50/80 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0d0f12] uppercase tracking-wider">
                      <FileAudio className="w-4 h-4 text-[#ff4d00]" /> Instant 1-Click Interactive Audio Demonstrations
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500">
                      Test audio scrubbing &amp; speaker cues without uploading
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Select any preloaded acoustic scenario to load its audio waveform, synchronized speaker cues, and executive summary directly into the workstation:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    {SAMPLE_AUDIO_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-white border border-black/10 shadow-xs hover:border-[#ff4d00] hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="px-2 py-0.5 rounded-md bg-[#ff4d00]/10 text-[#ff4d00] font-bold">
                              {item.category}
                            </span>
                            <span className="text-neutral-500 font-bold">{item.durationSeconds}s</span>
                          </div>
                          <h4 className="text-xs font-bold text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleLoadSample(item)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-100 hover:bg-[#ff4d00] text-neutral-800 hover:text-white text-xs font-mono font-bold transition-all border border-neutral-200 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          Launch Demo →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Loading View */}
            {isLoading && (
              <ProcessingView
                fileName={file?.name}
                fileSizeMB={file ? file.size / (1024 * 1024) : undefined}
                message={retryStatus || "Transcribing media stream with high-precision AI..."}
              />
            )}

            {/* Error View */}
            {error && (
              <div className="glass-card p-6 rounded-3xl border border-red-200 bg-red-50/50 space-y-4">
                <div className="flex items-start gap-3 text-red-700">
                  <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-base">Transcription Failed</h4>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-mono text-xs font-bold hover:bg-red-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Try Again
                </button>
              </div>
            )}

            {/* Results View */}
            {segments && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h3 className="text-xl font-black text-[#0d0f12]">Transcription Complete</h3>
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-bold border border-neutral-200 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#ff4d00]" /> Transcribe Another File
                  </button>
                </div>

                {/* Interactive Studio Waveform Player */}
                <WaveformPlayer
                  duration={totalAudioDuration}
                  currentTime={currentTime}
                  isPlaying={isPlaying}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  onSeek={(t) => setCurrentTime(t)}
                  audioFreq={audioFreq}
                  trackTitle={trackTitle}
                  speakerLabel={speakerLabel}
                  onSpeedChange={(speed) => setPlaybackSpeed(speed)}
                  silenceTrimmerActive={silenceTrimmerActive}
                  onToggleSilenceTrimmer={() => setSilenceTrimmerActive(!silenceTrimmerActive)}
                />

                <Manuscript
                  segments={segments}
                  summary={summary}
                  languageDetected={languageDetected}
                  title={file?.name || "Audio Transcript"}
                  currentTime={currentTime}
                  onSeekToTime={(t) => {
                    setCurrentTime(t);
                    setIsPlaying(true);
                  }}
                  onUpdateSegment={(id, newText) => {
                    setSegments((prev) =>
                      prev ? prev.map((s) => (s.id === id ? { ...s, text: newText } : s)) : null
                    );
                  }}
                />

                <ExportSuite
                  segments={segments}
                  title={file?.name ? file.name.replace(/\.[^/.]+$/, "") : "TranscriptG_Audio"}
                  summary={summary}
                />
              </div>
            )}
          </div>

          {/* Sidebar / Aside (Right col) */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4 bg-white shadow-sm">
              <h3 className="text-base font-black text-[#0d0f12] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#ff4d00]" /> How Engine 01 Works
              </h3>
              <ol className="space-y-3 text-xs text-neutral-600 leading-relaxed font-sans">
                <li className="flex gap-2">
                  <strong className="font-mono text-[#ff4d00]">1.</strong>
                  <span><strong>Acoustic Ingestion:</strong> Audio/video buffer is sent securely to our high-precision AI pipeline.</span>
                </li>
                <li className="flex gap-2">
                  <strong className="font-mono text-[#ff4d00]">2.</strong>
                  <span><strong>Sub-Second Alignment:</strong> Timecode boundaries are generated for natural sentence boundaries.</span>
                </li>
                <li className="flex gap-2">
                  <strong className="font-mono text-[#ff4d00]">3.</strong>
                  <span><strong>Lossless Export:</strong> Download as SRT/VTT for video subtitling, or PDF/DOCX for document reporting.</span>
                </li>
              </ol>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-3 bg-gradient-to-br from-neutral-900 to-[#0d0f12] text-white">
              <div className="flex items-center gap-2 text-[#00d9ff] text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4" /> Privacy Guarantee
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Files are processed strictly for your active session and never stored or retained on disk.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Tool Documentation Guide */}
        <TranscribeGuide />
      </div>
    </div>
  );
};
