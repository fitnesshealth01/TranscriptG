import React, { useState, useEffect } from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { Manuscript } from "../components/Manuscript";
import { ExportSuite } from "../components/ExportSuite";
import { ConvertGuide } from "../components/ConvertGuide";
import {
  CueSegment,
  detectFormat,
  parseSRT,
  parseVTT,
  parseJSON,
  parseTXT,
  SAMPLE_SRT,
} from "../lib/transcript";
import {
  FileCode2,
  RefreshCw,
  Sparkles,
  Trash2,
  FileCheck,
  AlertCircle,
  Play,
  Copy,
  Check
} from "lucide-react";

export const ConvertPage: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_SRT);
  const [formatDetected, setFormatDetected] = useState<"srt" | "vtt" | "json" | "txt">("srt");
  const [segments, setSegments] = useState<CueSegment[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Re-parse whenever input changes
  useEffect(() => {
    if (!inputText.trim()) {
      setSegments([]);
      setParseError(null);
      return;
    }

    try {
      const fmt = detectFormat(inputText);
      setFormatDetected(fmt);

      let parsed: CueSegment[] = [];
      if (fmt === "srt") {
        parsed = parseSRT(inputText);
      } else if (fmt === "vtt") {
        parsed = parseVTT(inputText);
      } else if (fmt === "json") {
        parsed = parseJSON(inputText);
      } else {
        parsed = parseTXT(inputText);
      }

      setSegments(parsed);
      setParseError(null);
    } catch (err: any) {
      setParseError("Could not parse subtitle format. Please check formatting.");
    }
  }, [inputText]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setInputText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleLoadSample = () => {
    setInputText(SAMPLE_SRT);
  };

  const handleClear = () => {
    setInputText("");
    setSegments([]);
    setParseError(null);
  };

  const handleCopyInput = () => {
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convertFaqs = [
    {
      q: "What is the difference between SRT and WebVTT (VTT)?",
      a: "SRT (SubRip) uses comma-delimited milliseconds (00:00:01,000) and is standard for offline media players, Premiere Pro, and VLC. WebVTT (.vtt) uses period-delimited milliseconds (00:00:01.000), starts with a WEBVTT header, and is native to HTML5 web video players.",
    },
    {
      q: "Does format conversion alter or drift my subtitle timecodes?",
      a: "No. TranscriptG's format conversion engine parses timecodes with millisecond precision, ensuring zero audio-visual sync drift across format migrations.",
    },
    {
      q: "Can I convert JSON subtitle files to SRT or VTT?",
      a: "Yes. TranscriptG automatically detects structured JSON cue arrays and converts them into standard SRT or WebVTT files instantaneously.",
    },
    {
      q: "Is there any file size limit for subtitle conversion?",
      a: "You can convert subtitle scripts of any length — from short YouTube clips to full 3-hour feature film subtitle tracks.",
    },
  ];

  return (
    <div className="space-y-12">
      <Seo
        title="Free Subtitle Converter — Convert SRT to VTT, VTT to SRT, JSON & TXT"
        description="Lossless closed-caption & subtitle format converter. Convert SRT to VTT, VTT to SRT, JSON, TXT, PDF, and DOCX instantaneously with millisecond timecode precision. 100% free, no login."
        keywords={[
          "srt to vtt converter",
          "vtt to srt converter",
          "subtitle converter",
          "convert srt to text",
          "vtt to txt",
          "subtitle format translator",
          "closed captions converter",
          "json to srt",
          "srt to json converter",
          "webvtt converter online",
        ]}
        faqs={convertFaqs}
        canonicalPath="/convert"
        applicationCategory="MultimediaApplication"
      />

      <PageHeader
        eyebrow="Engine 02 · Subtitle Format Engine"
        title="Lossless Subtitle & Format Conversion"
        description="Convert SRT, VTT, TXT, and JSON subtitle files instantaneously while maintaining precise timecodes."
        badge="SRT ↔ VTT ↔ TXT ↔ JSON"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SOURCE COLUMN (LEFT) */}
          <div className="space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 space-y-4 bg-white shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-5 h-5 text-[#ff4d00]" />
                  <h3 className="text-lg font-black text-[#0d0f12]">Source Input Payload</h3>
                </div>

                {inputText.trim() && (
                  <span className="px-2.5 py-1 rounded-full bg-[#00d9ff]/15 text-[#0088a8] text-xs font-mono font-bold uppercase">
                    Detected: {formatDetected.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Upload or Sample Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <label className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-bold border border-neutral-200 cursor-pointer transition-colors">
                  Upload File (.srt/.vtt/.txt)
                  <input
                    type="file"
                    accept=".srt,.vtt,.txt,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleLoadSample}
                  className="px-3.5 py-1.5 rounded-xl bg-[#ff4d00]/10 hover:bg-[#ff4d00]/20 text-[#ff4d00] text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3" /> Reset Sample SRT
                </button>

                {inputText.trim() && (
                  <>
                    <button
                      onClick={handleCopyInput}
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-bold transition-colors flex items-center gap-1"
                      title="Copy Source Text"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={handleClear}
                      className="px-3.5 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-xs font-mono font-bold transition-colors ml-auto flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear
                    </button>
                  </>
                )}
              </div>

              {/* Paste Textarea */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your SRT, WebVTT, JSON, or plain text subtitle here..."
                rows={12}
                className="w-full p-4 bg-neutral-50 rounded-2xl border border-neutral-200 font-mono text-xs text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] leading-relaxed resize-y"
              />

              {parseError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{parseError}</span>
                </div>
              )}
            </div>
          </div>

          {/* TARGET COLUMN (RIGHT) */}
          <div className="space-y-6">
            {segments.length > 0 ? (
              <div className="space-y-6">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-lg font-black text-[#0d0f12]">Parsed Cues ({segments.length})</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-500">
                      Live Subtitle Preview
                    </span>
                  </div>

                  <Manuscript
                    segments={segments}
                    title="Converted_Subtitles"
                    onUpdateSegment={(id, newText) => {
                      setSegments((prev) =>
                        prev.map((s) => (s.id === id ? { ...s, text: newText } : s))
                      );
                    }}
                  />
                </div>

                <ExportSuite
                  segments={segments}
                  title="TranscriptG_Converted"
                />
              </div>
            ) : (
              <div className="glass-card p-12 rounded-3xl border border-black/10 text-center space-y-4 bg-white shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                  <FileCode2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#0d0f12]">No Subtitle Data Loaded</h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Paste subtitle text on the left or click "Reset Sample SRT" to preview the live converter.
                </p>
                <button
                  onClick={handleLoadSample}
                  className="px-4 py-2 rounded-xl bg-[#0d0f12] text-white text-xs font-mono font-bold hover:bg-[#ff4d00] transition-colors"
                >
                  Load Sample Subtitle Track
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Guide */}
        <ConvertGuide />
      </div>
    </div>
  );
};
