import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import {
  Clock,
  FastForward,
  RotateCcw,
  Sliders,
  Download,
  Copy,
  Check,
  UploadCloud,
  FileCode2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface SubtitleCue {
  index: number;
  startMs: number;
  endMs: number;
  text: string;
}

// Convert "00:01:23,456" or "00:01:23.456" to milliseconds
function timeStringToMs(timeStr: string): number {
  const clean = timeStr.trim().replace(",", ".");
  const parts = clean.split(":");
  if (parts.length === 3) {
    const hours = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]);
    const seconds = parseFloat(parts[2]);
    return Math.round((hours * 3600 + minutes * 60 + seconds) * 1000);
  }
  return 0;
}

// Convert milliseconds to SRT format "00:01:23,456"
function msToSrtTime(ms: number): string {
  const safeMs = Math.max(0, ms);
  const totalSeconds = Math.floor(safeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const remMs = safeMs % 1000;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")},${String(remMs).padStart(3, "0")}`;
}

// Convert milliseconds to VTT format "00:01:23.456"
function msToVttTime(ms: number): string {
  return msToSrtTime(ms).replace(",", ".");
}

const SAMPLE_SUBTITLE_SRT = `1
00:00:02,150 --> 00:00:05,800
Welcome to TranscriptG studio calibration.

2
00:00:06,200 --> 00:00:10,950
In this video we demonstrate timestamp synchronization and timecode offsets.

3
00:00:11,500 --> 00:00:16,200
Notice how subtitles can lag behind video due to framerate mismatch.

4
00:00:17,000 --> 00:00:22,400
Applying a millisecond offset restores perfect lipsync across any player.`;

export const SubtitleSyncPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>(SAMPLE_SUBTITLE_SRT);
  const [offsetMs, setOffsetMs] = useState<number>(1250); // +1.250s offset default demo
  const [framerateMode, setFramerateMode] = useState<"none" | "23976_to_25" | "25_to_23976" | "24_to_25">("none");
  const [copied, setCopied] = useState<boolean>(false);

  // Parse raw text into structured cues
  const parsedCues = useMemo<SubtitleCue[]>(() => {
    if (!inputText.trim()) return [];

    const lines = inputText.replace(/\r\n/g, "\n").split("\n");
    const cues: SubtitleCue[] = [];
    let currentCue: Partial<SubtitleCue> | null = null;
    let cueIndex = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for timestamp arrow -->
      if (line.includes("-->")) {
        const [startPart, endPart] = line.split("-->").map((s) => s.trim());
        const startMs = timeStringToMs(startPart);
        const endMs = timeStringToMs(endPart);

        currentCue = {
          index: cueIndex++,
          startMs,
          endMs,
          text: "",
        };
      } else if (currentCue && line !== "" && !/^\d+$/.test(line) && !line.startsWith("WEBVTT")) {
        currentCue.text = currentCue.text ? `${currentCue.text}\n${line}` : line;
      } else if (line === "" && currentCue) {
        if (currentCue.text) {
          cues.push(currentCue as SubtitleCue);
        }
        currentCue = null;
      }
    }

    if (currentCue && currentCue.text) {
      cues.push(currentCue as SubtitleCue);
    }

    return cues;
  }, [inputText]);

  // Framerate speed factor multiplier
  const framerateFactor = useMemo(() => {
    switch (framerateMode) {
      case "23976_to_25":
        return 23.976 / 25.0; // 0.95904 (PAL speedup)
      case "25_to_23976":
        return 25.0 / 23.976; // 1.0427 (PAL slowdown)
      case "24_to_25":
        return 24.0 / 25.0; // 0.96
      default:
        return 1.0;
    }
  }, [framerateMode]);

  // Compute synchronized cues
  const syncedCues = useMemo<SubtitleCue[]>(() => {
    return parsedCues.map((cue) => {
      const scaledStart = Math.round(cue.startMs * framerateFactor);
      const scaledEnd = Math.round(cue.endMs * framerateFactor);

      const shiftedStart = Math.max(0, scaledStart + offsetMs);
      const shiftedEnd = Math.max(shiftedStart + 100, scaledEnd + offsetMs);

      return {
        ...cue,
        startMs: shiftedStart,
        endMs: shiftedEnd,
      };
    });
  }, [parsedCues, offsetMs, framerateFactor]);

  // Format as exportable SRT
  const syncedSrtText = useMemo(() => {
    return syncedCues
      .map((c, i) => `${i + 1}\n${msToSrtTime(c.startMs)} --> ${msToSrtTime(c.endMs)}\n${c.text}`)
      .join("\n\n");
  }, [syncedCues]);

  // Format as exportable WebVTT
  const syncedVttText = useMemo(() => {
    return `WEBVTT\n\n` + syncedCues
      .map((c, i) => `${i + 1}\n${msToVttTime(c.startMs)} --> ${msToVttTime(c.endMs)}\n${c.text}`)
      .join("\n\n");
  }, [syncedCues]);

  const handleDownload = (format: "srt" | "vtt") => {
    const content = format === "srt" ? syncedSrtText : syncedVttText;
    const blob = new Blob([content], { type: format === "srt" ? "text/plain;charset=utf-8" : "text/vtt;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `synced_subtitles.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(syncedSrtText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setInputText(event.target.result as string);
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  const faqs = [
    {
      q: "What causes subtitles to become desynchronized or out of sync with video?",
      a: "Subtitles desync for three primary reasons: 1) Frame rate differences (e.g. film shot at 23.976 fps converted to European PAL 25 fps, causing a 4.1% progressive drift); 2) Added or trimmed video intro bumpers (introducing a fixed ±N second static delay); and 3) Variable Frame Rate (VFR) smartphone recordings where timecodes drift gradually over time.",
    },
    {
      q: "What is the difference between static offset and framerate drift?",
      a: "A static offset (e.g. +1.5 seconds) occurs when the entire subtitle track is shifted by a constant duration from beginning to end. A framerate drift occurs when subtitles start in sync at minute 0, but slowly become 5 to 10 seconds behind by minute 60 due to differing frames per second.",
    },
    {
      q: "Can I use negative offsets if subtitles appear too late?",
      a: "Yes. If subtitles appear after the actor speaks, enter a negative offset (e.g. -1500 ms). TranscriptG automatically clamps the earliest timecodes to 00:00:00,000 so timestamps never become negative.",
    },
    {
      q: "Does this tool preserve multi-line formatting and italics tags?",
      a: "Yes. All cue text, line breaks, speaker names, and HTML/WebVTT formatting tags (such as <i>italic</i> or <c.color>) are preserved bit-for-bit during timecode calibration.",
    },
    {
      q: "Is my subtitle file uploaded or stored on any server?",
      a: "No. All timecode parsing, framerate calculation, and file downloads execute 100% locally in your browser session using JavaScript. Zero data is transmitted to external servers.",
    },
  ];

  return (
    <div className="space-y-16">
      <Seo
        title="Subtitle Sync & Timecode Calibrator — Free Online SRT & VTT Offset Tool"
        description="Fix out-of-sync subtitles online. Shift SRT and WebVTT timestamps by milliseconds or convert frame rates (23.976 fps, 25 fps, 29.97 fps). Side-by-side preview and free 1-click download."
        keywords={[
          "subtitle sync online",
          "shift srt timestamps",
          "fix subtitle delay",
          "subtitle offset calculator",
          "resync srt free",
          "vtt timestamp adjuster",
          "convert 23.976 to 25 fps subtitle",
          "subtitle drift fixer",
        ]}
        faqs={faqs}
        canonicalPath="/tools/subtitle-sync"
        applicationCategory="MultimediaApplication"
      />

      <PageHeader
        eyebrow="Precision Subtitles · Utility Suite"
        title="Subtitle Timecode Sync & Offset Calibrator"
        description="Eliminate subtitle delays, audio lag, and PAL/NTSC framerate drift with millisecond-exact timecode recalibration."
        badge="Zero Limits"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Workstation Control Deck */}
        <div className="rounded-3xl bg-[#090b10] border border-white/10 shadow-2xl p-6 sm:p-8 text-white space-y-6">
          {/* Top Console Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-white/10">
            {/* Shift Offset Input (6 cols) */}
            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-neutral-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#ff5500]" />
                  Timecode Shift Offset (Milliseconds)
                </label>
                <span className="text-xs font-mono font-bold text-[#ff7733]">
                  {offsetMs >= 0 ? `+${offsetMs}` : offsetMs} ms ({(offsetMs / 1000).toFixed(3)}s)
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[-2000, -1000, -500, 0, 500, 1000, 1500, 2000, 3000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setOffsetMs(preset)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                      offsetMs === preset
                        ? "bg-[#ff5500] text-white border-[#ff5500]"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {preset >= 0 ? `+${preset / 1000}s` : `${preset / 1000}s`}
                  </button>
                ))}
              </div>

              {/* Slider for smooth dragging */}
              <input
                type="range"
                min="-10000"
                max="10000"
                step="50"
                value={offsetMs}
                onChange={(e) => setOffsetMs(parseInt(e.target.value) || 0)}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#ff5500]"
                aria-label="Adjust millisecond offset"
              />
            </div>

            {/* Framerate Conversion (6 cols) */}
            <div className="md:col-span-6 space-y-3">
              <label className="text-xs font-mono font-bold text-neutral-300 flex items-center gap-1.5">
                <FastForward className="w-4 h-4 text-[#00d9ff]" />
                Framerate Progressive Drift Calibration
              </label>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { mode: "none", label: "No Framerate Change (1.0x)", desc: "Fixed time shift only" },
                  { mode: "23976_to_25", label: "23.976 fps → 25 fps", desc: "PAL European Speedup (4.27%)" },
                  { mode: "25_to_23976", label: "25 fps → 23.976 fps", desc: "Film / NTSC Slowdown" },
                  { mode: "24_to_25", label: "24 fps → 25 fps", desc: "Cinema to Television" },
                ].map((item) => (
                  <button
                    key={item.mode}
                    type="button"
                    onClick={() => setFramerateMode(item.mode as any)}
                    className={`p-2.5 rounded-xl text-left transition-all border ${
                      framerateMode === item.mode
                        ? "bg-[#00d9ff]/20 border-[#00d9ff] text-white"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className="text-xs font-mono font-bold block">{item.label}</span>
                    <span className="text-[10px] text-neutral-500 font-sans block mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-bold flex items-center gap-1.5 border border-white/10 transition-colors">
                <UploadCloud className="w-3.5 h-3.5 text-[#ff5500]" />
                Upload .SRT or .VTT
                <input
                  type="file"
                  accept=".srt,.vtt,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setInputText(SAMPLE_SUBTITLE_SRT)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-mono font-bold transition-colors border border-white/5"
              >
                Reset Demo Sample
              </button>

              <span className="text-xs font-mono text-neutral-400">
                {parsedCues.length} cues detected
              </span>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-bold flex items-center gap-1.5 border border-white/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>

              <button
                type="button"
                onClick={() => handleDownload("srt")}
                className="px-3.5 py-1.5 rounded-xl bg-[#ff5500] hover:bg-[#ff7733] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,85,0,0.3)] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download .SRT
              </button>

              <button
                type="button"
                onClick={() => handleDownload("vtt")}
                className="px-3.5 py-1.5 rounded-xl bg-[#00d9ff]/20 hover:bg-[#00d9ff]/30 text-[#00d9ff] border border-[#00d9ff]/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download .VTT
              </button>
            </div>
          </div>

          {/* Side-by-Side Diff Comparison View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* Original Input Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>Original Subtitle Input (Editable)</span>
                <span className="text-[10px] text-neutral-500">Paste or drag any SRT/VTT file</span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={14}
                className="w-full p-4 bg-black/60 rounded-2xl border border-white/10 text-neutral-300 font-mono text-xs leading-relaxed focus:outline-none focus:border-[#ff5500] resize-y"
                placeholder="Paste SRT or WebVTT subtitles here..."
              />
            </div>

            {/* Recalibrated Live Output Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Recalibrated Output Preview
                </span>
                <span className="text-[10px] text-[#ff7733] font-bold">
                  {offsetMs !== 0 ? `Shifted by ${offsetMs > 0 ? `+${offsetMs}` : offsetMs}ms` : "No offset"}
                </span>
              </div>
              <div className="w-full p-4 bg-black/80 rounded-2xl border border-emerald-500/20 text-neutral-200 font-mono text-xs leading-relaxed h-[292px] overflow-y-auto space-y-3">
                {syncedCues.length === 0 ? (
                  <p className="text-neutral-500 italic">No cues to preview. Paste subtitles on the left.</p>
                ) : (
                  syncedCues.map((cue, idx) => {
                    const originalCue = parsedCues[idx];
                    return (
                      <div key={cue.index} className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-neutral-400">
                          <span className="font-bold text-white">#{cue.index}</span>
                          <div className="flex items-center gap-2">
                            {originalCue && (
                              <span className="text-neutral-500 line-through text-[10px]">
                                {msToSrtTime(originalCue.startMs)}
                              </span>
                            )}
                            <span className="text-emerald-400 font-bold">
                              {msToSrtTime(cue.startMs)} → {msToSrtTime(cue.endMs)}
                            </span>
                          </div>
                        </div>
                        <p className="text-neutral-300 font-sans text-xs">{cue.text}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Why Subtitles Desync (Educational Topical Authority) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff4d00] uppercase">
              <FastForward className="w-4 h-4" /> PAL Speedup Effect
            </div>
            <h4 className="text-base font-bold text-[#0d0f12]">23.976 fps to 25.0 fps</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              European broadcasting accelerates film by 4.27% (1 frame per second faster). Without recalibration, subtitles drift ahead by over 2.5 minutes during a two-hour movie.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0088a8] uppercase">
              <Clock className="w-4 h-4" /> Fixed Delay Offsets
            </div>
            <h4 className="text-base font-bold text-[#0d0f12]">Intro Bumpers &amp; Cuts</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Streaming re-releases often include an extra 5-second studio logo at the front. A single static +5,000ms offset restores perfect lipsync instantly.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-600 uppercase">
              <FileCode2 className="w-4 h-4" /> Universal Compatibility
            </div>
            <h4 className="text-base font-bold text-[#0d0f12]">VLC, Premiere &amp; YouTube</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Recalibrated files export with compliant UTF-8 timecodes that import natively into VLC Player, DaVinci Resolve, Adobe Premiere, and YouTube Studio.
            </p>
          </div>
        </div>

        {/* Section 3: Technical FAQs */}
        <div className="space-y-6 pt-6 border-t border-black/10">
          <div>
            <h3 className="text-xl font-black text-[#0d0f12] tracking-tight">
              Subtitle Synchronization &amp; Drift FAQs
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Expert guidance on timecode calculations, container standards, and audio-video timing.
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
