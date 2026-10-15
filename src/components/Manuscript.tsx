import React, { useState } from "react";
import { CueSegment, formatTimeDisplay } from "../lib/transcript";
import { Search, Sparkles, Copy, Check, Edit2, Play, Clock, FileText } from "lucide-react";

interface ManuscriptProps {
  segments: CueSegment[];
  summary?: string;
  languageDetected?: string;
  onUpdateSegment?: (id: string, newText: string) => void;
  title?: string;
  currentTime?: number;
  onSeekToTime?: (seconds: number) => void;
}

export const Manuscript: React.FC<ManuscriptProps> = ({
  segments: initialSegments,
  summary,
  languageDetected,
  onUpdateSegment,
  title = "Manuscript Cues",
  currentTime,
  onSeekToTime,
}) => {
  const [segments, setSegments] = useState<CueSegment[]>(initialSegments);

  // Keep segments in sync with parent when new file or sample is loaded
  React.useEffect(() => {
    setSegments(initialSegments);
  }, [initialSegments]);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Filtered segments
  const filtered = segments.filter((seg) =>
    seg.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTextChange = (id: string, text: string) => {
    const updated = segments.map((s) => (s.id === id ? { ...s, text } : s));
    setSegments(updated);
    if (onUpdateSegment) {
      onUpdateSegment(id, text);
    }
  };

  const copyCueText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyFullManuscript = () => {
    const fullText = segments.map((s) => `[${formatTimeDisplay(s.start)}] ${s.text}`).join("\n\n");
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top AI Summary Box if available */}
      {summary && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border-l-4 border-l-[#ff4d00] bg-gradient-to-r from-white via-white to-[#ff4d00]/5 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#ff4d00]/10 flex items-center justify-center text-[#ff4d00]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0d0f12]">AI Executive Summary</h3>
              {languageDetected && (
                <span className="text-xs font-mono text-neutral-500">
                  Language: <strong className="text-[#00d9ff] font-semibold">{languageDetected}</strong>
                </span>
              )}
            </div>
          </div>
          <p className="text-neutral-700 text-sm sm:text-base leading-relaxed italic bg-black/5 p-4 rounded-2xl border border-black/5">
            "{summary}"
          </p>
        </div>
      )}

      {/* Control Toolbar */}
      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within manuscript..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 rounded-xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] transition-colors"
          />
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs font-mono">
          <span className="text-neutral-500 font-semibold">
            {filtered.length} {filtered.length === 1 ? "Cue" : "Cues"}
          </span>
          <button
            onClick={copyFullManuscript}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold border border-neutral-200 transition-colors"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-600" />}
            {copiedAll ? "Copied All" : "Copy Full Text"}
          </button>
        </div>
      </div>

      {/* Cue Cards Stream */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="glass-card p-8 rounded-2xl text-center text-neutral-500 text-sm">
            No cues found matching "{searchQuery}".
          </div>
        ) : (
          filtered.map((seg) => {
            const isActive =
              currentTime !== undefined &&
              currentTime >= seg.start &&
              currentTime <= seg.end;

            return (
              <div
                key={seg.id}
                className={`p-4 sm:p-5 rounded-2xl transition-all duration-200 group relative border ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff5500]/10 via-white to-white border-[#ff5500] shadow-[0_0_20px_rgba(255,85,0,0.18)] scale-[1.01]"
                    : "glass-card border-black/5 hover:border-[#ff4d00]/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  {/* Timestamp Button */}
                  <button
                    type="button"
                    onClick={() => onSeekToTime && onSeekToTime(seg.start)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                      isActive
                        ? "bg-[#ff5500] text-white border-[#ff5500] shadow-sm animate-pulse cursor-pointer"
                        : "bg-neutral-100 text-[#0d0f12] border-neutral-200/80 hover:bg-[#ff5500]/10 hover:text-[#ff5500] hover:border-[#ff5500]/30 cursor-pointer"
                    }`}
                    title="Click to jump audio to this cue"
                  >
                    <Clock className={`w-3 h-3 ${isActive ? "text-white" : "text-[#ff4d00]"}`} />
                    <span>{formatTimeDisplay(seg.start)}</span>
                    <span className={isActive ? "text-white/70" : "text-neutral-400"}>→</span>
                    <span>{formatTimeDisplay(seg.end)}</span>
                  </button>

                {/* Quick actions */}
                <div className="flex items-center gap-2 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyCueText(seg.id, seg.text)}
                    className="p-1.5 rounded-lg hover:bg-black/5 text-neutral-500 hover:text-neutral-900 transition-colors"
                    title="Copy cue text"
                  >
                    {copiedId === seg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => setEditingId(editingId === seg.id ? null : seg.id)}
                    className="p-1.5 rounded-lg hover:bg-black/5 text-neutral-500 hover:text-neutral-900 transition-colors"
                    title="Edit cue text"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Cue Text or Editable Area */}
              {editingId === seg.id ? (
                <textarea
                  value={seg.text}
                  onChange={(e) => handleTextChange(seg.id, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  rows={2}
                  autoFocus
                  className="w-full p-2.5 bg-white rounded-xl border border-[#ff4d00] text-sm text-[#0d0f12] focus:outline-none focus:ring-2 focus:ring-[#ff4d00]/20 font-sans"
                />
              ) : (
                <p
                  onClick={() => setEditingId(seg.id)}
                  className="text-neutral-800 text-sm sm:text-base leading-relaxed cursor-pointer hover:text-black transition-colors"
                >
                  {seg.text}
                </p>
              )}
            </div>
          );
        })
      )}
    </div>
  </div>
);
};
