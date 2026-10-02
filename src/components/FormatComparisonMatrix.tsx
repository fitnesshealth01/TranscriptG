import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Sparkles, FileCode2, SlidersHorizontal } from "lucide-react";

interface SubtitleFormatSpec {
  name: string;
  extension: string;
  mimeType: string;
  timecodeDelimiter: string;
  hasHeader: boolean;
  headerExample: string;
  stylingSupport: "None" | "Basic HTML" | "Full CSS ::cue" | "Rich XML" | "Advanced Script";
  positioningSupport: boolean;
  positioningDetails: string;
  nativeBrowserTrack: boolean;
  streamingStandard: string;
  idealUseCase: string;
  convertPath: string;
}

const FORMAT_SPECS: SubtitleFormatSpec[] = [
  {
    name: "WebVTT",
    extension: ".vtt",
    mimeType: "text/vtt",
    timecodeDelimiter: "Period (00:01:20.500)",
    hasHeader: true,
    headerExample: "WEBVTT",
    stylingSupport: "Full CSS ::cue",
    positioningSupport: true,
    positioningDetails: "Native line:80% position:50% align:center",
    nativeBrowserTrack: true,
    streamingStandard: "W3C Web Standard & HLS / DASH",
    idealUseCase: "Modern websites, HTML5 video players, Safari, Chrome, streaming services.",
    convertPath: "/convert",
  },
  {
    name: "SubRip",
    extension: ".srt",
    mimeType: "application/x-subrip",
    timecodeDelimiter: "Comma (00:01:20,500)",
    hasHeader: false,
    headerExample: "None (starts directly at cue 1)",
    stylingSupport: "Basic HTML",
    positioningSupport: false,
    positioningDetails: "Standard bottom-center only",
    nativeBrowserTrack: false,
    streamingStandard: "Universal Video Editing (Premiere, Resolve, FCP)",
    idealUseCase: "Offline video editing timelines, YouTube manual caption uploads, VLC.",
    convertPath: "/convert",
  },
  {
    name: "TTML / DFXP",
    extension: ".ttml / .dfxp",
    mimeType: "application/ttml+xml",
    timecodeDelimiter: "Frames or Clock (00:01:20:15)",
    hasHeader: true,
    headerExample: "<tt xmlns='http://www.w3.org/ns/ttml'>",
    stylingSupport: "Rich XML",
    positioningSupport: true,
    positioningDetails: "Pixel / percentage multi-region coordinates",
    nativeBrowserTrack: false,
    streamingStandard: "SMPTE ST 2052, Netflix, Apple TV, Broadcast",
    idealUseCase: "Hollywood cinematic packages, commercial television networks, OTT platforms.",
    convertPath: "/convert",
  },
  {
    name: "Advanced SubStation",
    extension: ".ass / .ssa",
    mimeType: "text/x-ssa",
    timecodeDelimiter: "Period (0:01:20.50)",
    hasHeader: true,
    headerExample: "[Script Info] Title: Project",
    stylingSupport: "Advanced Script",
    positioningSupport: true,
    positioningDetails: "Vector graphics & exact X/Y coordinate overrides",
    nativeBrowserTrack: false,
    streamingStandard: "Open Source Media (MPV, Fansubbing, Anime)",
    idealUseCase: "Complex typography, animated karaoke text, custom graphic overlays.",
    convertPath: "/convert",
  },
  {
    name: "Structured JSON Cues",
    extension: ".json",
    mimeType: "application/json",
    timecodeDelimiter: "Floating Point Seconds (80.5)",
    hasHeader: true,
    headerExample: '{"segments": [...]}',
    stylingSupport: "None",
    positioningSupport: true,
    positioningDetails: "Programmatic bounding box metadata",
    nativeBrowserTrack: false,
    streamingStandard: "OpenAI Whisper, Google Cloud Speech, AWS Transcribe",
    idealUseCase: "Developer pipelines, AI summarization engines, custom client apps.",
    convertPath: "/process",
  },
  {
    name: "Plain Transcript",
    extension: ".txt",
    mimeType: "text/plain",
    timecodeDelimiter: "None (Timestamps Stripped)",
    hasHeader: false,
    headerExample: "None",
    stylingSupport: "None",
    positioningSupport: false,
    positioningDetails: "Standard flowing manuscript text",
    nativeBrowserTrack: false,
    streamingStandard: "Print, Publishing, Legal Transcripts, CMS",
    idealUseCase: "Blog posts, editorial manuscripts, study notes, document archives.",
    convertPath: "/convert",
  },
];

export const FormatComparisonMatrix: React.FC = () => {
  const [filterFeature, setFilterFeature] = useState<string>("all");

  const filteredSpecs = FORMAT_SPECS.filter((spec) => {
    if (filterFeature === "web") return spec.nativeBrowserTrack;
    if (filterFeature === "positioning") return spec.positioningSupport;
    if (filterFeature === "styling") return spec.stylingSupport !== "None";
    return true;
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#ff4d00]">
            Architectural Specification Matrix
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0d0f12] mt-1">
            Universal Subtitle &amp; Caption Format Comparison
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
            Detailed engineering breakdown comparing timecode syntax, styling engines, browser support, and broadcast compliance across major subtitle specifications.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-black/5 text-xs font-mono font-bold shrink-0">
          <button
            type="button"
            onClick={() => setFilterFeature("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterFeature === "all" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-black"
            }`}
          >
            All Formats
          </button>
          <button
            type="button"
            onClick={() => setFilterFeature("web")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterFeature === "web" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-black"
            }`}
          >
            Native Web
          </button>
          <button
            type="button"
            onClick={() => setFilterFeature("positioning")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterFeature === "positioning" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-black"
            }`}
          >
            Positioning
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-neutral-50 border-b border-black/10 font-mono font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4">Format</th>
              <th className="py-3.5 px-4">Timecode Delimiter</th>
              <th className="py-3.5 px-4">Styling System</th>
              <th className="py-3.5 px-4">Screen Placement</th>
              <th className="py-3.5 px-4 text-center">HTML5 &lt;track&gt;</th>
              <th className="py-3.5 px-4">Target Ecosystem</th>
              <th className="py-3.5 px-4 text-right">Converter</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 font-sans">
            {filteredSpecs.map((spec) => (
              <tr key={spec.name} className="hover:bg-neutral-50/80 transition-colors">
                <td className="py-4 px-4 font-mono font-bold text-[#0d0f12]">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#0d0f12]">{spec.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-mono">
                      {spec.extension}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-normal mt-0.5 max-w-[220px]">
                    {spec.idealUseCase}
                  </div>
                </td>
                <td className="py-4 px-4 font-mono text-neutral-700 text-xs">
                  {spec.timecodeDelimiter}
                </td>
                <td className="py-4 px-4 text-neutral-800 font-medium">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      spec.stylingSupport === "Full CSS ::cue"
                        ? "bg-purple-100 text-purple-800"
                        : spec.stylingSupport === "Rich XML"
                        ? "bg-blue-100 text-blue-800"
                        : spec.stylingSupport === "Basic HTML"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {spec.stylingSupport}
                  </span>
                </td>
                <td className="py-4 px-4 text-xs text-neutral-600">
                  {spec.positioningSupport ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {spec.positioningDetails}
                    </span>
                  ) : (
                    <span className="text-neutral-400 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" />
                      Bottom center only
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-center">
                  {spec.nativeBrowserTrack ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 mx-auto">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 text-neutral-400 mx-auto">
                      <X className="w-3.5 h-3.5" />
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 text-xs text-neutral-700 font-mono">
                  {spec.streamingStandard}
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    to={spec.convertPath}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/5 hover:bg-[#ff4d00] hover:text-white font-mono text-xs font-bold text-neutral-800 transition-colors"
                  >
                    <span>Convert</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
