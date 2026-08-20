import React, { useState, useEffect } from "react";
import { SpectrumTrace } from "./SpectrumTrace";
import { Loader2, FileAudio, Sparkles, ShieldCheck } from "lucide-react";

interface ProcessingViewProps {
  fileName?: string;
  fileSizeMB?: number;
  message?: string;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  fileName = "Audio_Track.mp3",
  fileSizeMB,
  message = "Processing media file...",
}) => {
  const steps = [
    "Ingesting media stream...",
    "Analyzing spectral frequencies...",
    "Transcribing acoustic cues in 90+ languages...",
    "Synthesizing structured manuscript & timestamps...",
  ];

  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2800);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="glass-card p-8 sm:p-12 rounded-3xl text-center max-w-2xl mx-auto border border-black/10 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4d00]/10 rounded-full blur-3xl pointer-events-none" />

      {/* File Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-700 mb-6">
        <FileAudio className="w-4 h-4 text-[#ff4d00]" />
        <span className="truncate max-w-xs">{fileName}</span>
        {fileSizeMB && <span className="text-neutral-400">({fileSizeMB.toFixed(1)}MB)</span>}
      </div>

      <h3 className="text-2xl font-black text-[#0d0f12] mb-2 tracking-tight">
        {message}
      </h3>

      <p className="text-sm font-mono text-[#ff4d00] font-semibold mb-6 animate-pulse flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        {steps[currentStepIdx]}
      </p>

      {/* Spectrum trace animation */}
      <div className="my-8 py-4 px-6 bg-black/5 rounded-2xl border border-black/5">
        <SpectrumTrace active={true} barsCount={36} heightClass="h-16" accentColor="mixed" />
      </div>

      {/* Status Indicators */}
      <div className="flex items-center justify-center gap-6 text-xs text-neutral-500 font-mono">
        <div className="flex items-center gap-1.5">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00d9ff]" />
          <span>High-Precision AI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Session Encrypted</span>
        </div>
      </div>
    </div>
  );
};
