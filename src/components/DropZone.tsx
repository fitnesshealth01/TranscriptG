import React, { useState, useRef } from "react";
import { Upload, FileAudio, FileVideo, FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  acceptTypes?: string;
  maxSizeMB?: number;
  label?: string;
  sublabel?: string;
  fileTypesList?: string[];
  isLoading?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  onFileSelect,
  acceptTypes = "audio/*,video/*,.mp3,.wav,.m4a,.ogg,.mp4,.mov,.srt,.vtt,.json,.txt",
  maxSizeMB = 25,
  label = "Drop audio, video, or subtitle files here",
  sublabel = "Instant browser-session processing • No login required",
  fileTypesList = ["MP3", "WAV", "M4A", "OGG", "MP4", "MOV", "SRT", "VTT"],
  isLoading = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndPass = (file: File) => {
    setError(null);
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      setError(`File size (${sizeInMB.toFixed(1)}MB) exceeds the maximum allowed limit of ${maxSizeMB}MB.`);
      return;
    }
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndPass(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPass(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`glass-card glass-card-hover p-8 sm:p-12 rounded-3xl text-center cursor-pointer relative overflow-hidden transition-all duration-300 border-2 ${
          isDragging
            ? "border-[#ff4d00] bg-[#ff4d00]/5 scale-[1.01]"
            : "border-dashed border-neutral-300 hover:border-[#ff4d00]/50"
        } ${isLoading ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Floating icon cluster */}
        <div className="relative w-16 h-16 mx-auto mb-5 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#ff4d00]/15 rounded-2xl rotate-6 animate-pulse" />
          <div className="absolute inset-0 bg-[#00d9ff]/15 rounded-2xl -rotate-6" />
          <div className="relative w-14 h-14 bg-white rounded-xl shadow-md border border-black/10 flex items-center justify-center text-[#ff4d00]">
            <Upload className="w-7 h-7 transition-transform group-hover:scale-110" />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-[#0d0f12] mb-2 tracking-tight">
          {label}
        </h3>

        <p className="text-sm text-neutral-500 mb-6 max-w-md mx-auto">
          {sublabel}
        </p>

        {/* Supported badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-lg mx-auto">
          {fileTypesList.map((ext) => (
            <span
              key={ext}
              className="px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200/80 text-[11px] font-mono text-neutral-600 font-semibold"
            >
              .{ext.toLowerCase()}
            </span>
          ))}
          <span className="px-2.5 py-1 rounded-md bg-[#ff4d00]/10 text-[#ff4d00] text-[11px] font-mono font-bold">
            Max {maxSizeMB}MB
          </span>
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
