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
import { FileCode2, RefreshCw, Sparkles, Trash2, FileCheck, AlertCircle } from "lucide-react";

export const ConvertPage: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [formatDetected, setFormatDetected] = useState<"srt" | "vtt" | "json" | "txt">("srt");
  const [segments, setSegments] = useState<CueSegment[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);

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

  return (
    <div className="space-y-12">
      <Seo
        title="Free SRT Converter & Subtitle Format Translator (SRT, VTT, JSON)"
        description="Instant closed-caption & subtitle format converter. Convert SRT to VTT, VTT to SRT, JSON, or plain text. Real-time preview, timecode parsing, 100% free."
        keywords="SRT converter, VTT converter, srt to vtt, vtt to srt, subtitle converter, closed caption converter, srt to json, subtitle timecode editor"
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
            <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode2 className="w-5 h-5 text-[#ff4d00]" />
                  <h3 className="text-lg font-black text-[#0d0f12]">Source Input</h3>
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
                  className="px-3.5 py-1.5 rounded-xl bg-[#ff4d00]/10 hover:bg-[#ff4d00]/20 text-[#ff4d00] text-xs font-mono font-bold transition-colors"
                >
                  Load Sample SRT
                </button>

                {inputText.trim() && (
                  <button
                    onClick={handleClear}
                    className="px-3.5 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-xs font-mono font-bold transition-colors ml-auto flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                )}
              </div>

              {/* Paste Textarea */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste SRT, VTT, JSON, or plain text content here..."
                rows={16}
                className="w-full p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs font-mono text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] transition-colors leading-relaxed"
              />

              {parseError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{parseError}</span>
                </div>
              )}
            </div>
          </div>

          {/* OUTPUT COLUMN (RIGHT) */}
          <div className="space-y-6">
            {segments.length > 0 ? (
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-3xl border border-black/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-lg font-black text-[#0d0f12]">Parsed Output Preview</h3>
                    </div>
                    <span className="text-xs font-mono text-neutral-500 font-semibold">
                      {segments.length} Cues Detected
                    </span>
                  </div>

                  <Manuscript
                    segments={segments}
                    title="Converted Subtitle"
                    onUpdateSegment={(id, newText) => {
                      setSegments((prev) =>
                        prev.map((s) => (s.id === id ? { ...s, text: newText } : s))
                      );
                    }}
                  />
                </div>

                <ExportSuite segments={segments} title="Converted_Subtitle" />
              </div>
            ) : (
              <div className="glass-card p-12 rounded-3xl border border-black/10 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <FileCode2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0d0f12]">No Subtitle Data Loaded</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  Paste or upload SRT/VTT content on the left to inspect timecoded cues and export to any target format instantly.
                </p>
                <button
                  onClick={handleLoadSample}
                  className="px-4 py-2 rounded-xl bg-[#ff4d00] text-white text-xs font-mono font-bold thermal-glow transition-all hover:scale-105"
                >
                  Load Sample Subtitle
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Tool Guide */}
        <ConvertGuide />
      </div>
    </div>
  );
};
