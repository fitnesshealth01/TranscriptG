import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import {
  Calculator,
  HardDrive,
  Activity,
  Sliders,
  Clock,
  Layers,
  ArrowRight,
  Download,
  Info,
  CheckCircle2,
  FileAudio,
  Radio,
  Zap,
} from "lucide-react";

interface AudioFormatSpec {
  id: string;
  name: string;
  type: "Uncompressed" | "Lossless" | "Lossy";
  bitrateKbps?: number; // Fixed for lossy
  compressionRatio?: number; // Approx for FLAC
  color: string;
  description: string;
}

const FORMAT_SPECS: AudioFormatSpec[] = [
  {
    id: "wav-pcm",
    name: "WAV / AIFF (Linear PCM)",
    type: "Uncompressed",
    color: "text-[#ff5500]",
    description: "Industry standard for DAW recording, editing, and master delivery. Zero audio data loss.",
  },
  {
    id: "flac",
    name: "FLAC (Lossless)",
    type: "Lossless",
    compressionRatio: 0.58, // ~58% of uncompressed
    color: "text-emerald-400",
    description: "Open-source lossless compression preserving 100% bit-exact acoustic fidelity at ~60% size.",
  },
  {
    id: "mp3-320",
    name: "MP3 (320 kbps CBR High)",
    type: "Lossy",
    bitrateKbps: 320,
    color: "text-amber-400",
    description: "Maximum quality MP3 standard for commercial music distribution, clubs, and DJ playback.",
  },
  {
    id: "mp3-192",
    name: "MP3 (192 kbps Podcast Std)",
    type: "Lossy",
    bitrateKbps: 192,
    color: "text-blue-400",
    description: "Recommended balance between clarity and bandwidth for spoken podcasts and audiobooks.",
  },
  {
    id: "mp3-128",
    name: "MP3 (128 kbps Voice Opt)",
    type: "Lossy",
    bitrateKbps: 128,
    color: "text-cyan-400",
    description: "Bandwidth-efficient spoken audio profile for web voice memos and radio archives.",
  },
  {
    id: "aac-256",
    name: "AAC / M4A (256 kbps Apple)",
    type: "Lossy",
    bitrateKbps: 256,
    color: "text-purple-400",
    description: "High-efficiency perceptual codec used by Apple Music, YouTube, and AAC audio streams.",
  },
  {
    id: "opus-96",
    name: "Opus (96 kbps Speech)",
    type: "Lossy",
    bitrateKbps: 96,
    color: "text-rose-400",
    description: "Modern IETF speech codec with ultra-low latency, outperforming MP3 160k at half the bitrate.",
  },
];

export const BitrateCalculatorPage: React.FC = () => {
  // Input states
  const [sampleRate, setSampleRate] = useState<number>(48000); // 48kHz default video/DAW standard
  const [bitDepth, setBitDepth] = useState<number>(24); // 24-bit default
  const [channels, setChannels] = useState<number>(2); // Stereo default
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(15);
  const [seconds, setSeconds] = useState<number>(0);

  // Compute total duration in seconds
  const totalSeconds = useMemo(() => {
    return Math.max(1, hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  // Uncompressed Linear PCM calculation:
  // Bitrate (bits/sec) = sampleRate * bitDepth * channels
  // Bytes/sec = Bitrate / 8
  const uncompressedBitrateBps = sampleRate * bitDepth * channels;
  const uncompressedBitrateKbps = uncompressedBitrateBps / 1000;
  const uncompressedTotalBytes = (uncompressedBitrateBps / 8) * totalSeconds;
  const uncompressedSizeMB = uncompressedTotalBytes / (1024 * 1024);
  const uncompressedSizeGB = uncompressedSizeMB / 1024;

  // Comparison matrix across formats
  const comparisonResults = useMemo(() => {
    return FORMAT_SPECS.map((spec) => {
      let finalBytes = 0;
      let effectiveKbps = 0;

      if (spec.type === "Uncompressed") {
        finalBytes = uncompressedTotalBytes;
        effectiveKbps = uncompressedBitrateKbps;
      } else if (spec.type === "Lossless" && spec.compressionRatio) {
        finalBytes = uncompressedTotalBytes * spec.compressionRatio;
        effectiveKbps = uncompressedBitrateKbps * spec.compressionRatio;
      } else if (spec.type === "Lossy" && spec.bitrateKbps) {
        effectiveKbps = spec.bitrateKbps;
        finalBytes = ((spec.bitrateKbps * 1000) / 8) * totalSeconds;
      }

      const sizeMB = finalBytes / (1024 * 1024);
      const mbPerMin = sizeMB / (totalSeconds / 60);

      // Streaming download time estimate on 50 Mbps broadband
      const downloadSecs = (finalBytes * 8) / (50 * 1000 * 1000);

      return {
        ...spec,
        sizeMB,
        effectiveKbps,
        mbPerMin,
        downloadSecs,
      };
    });
  }, [uncompressedTotalBytes, uncompressedBitrateKbps, totalSeconds]);

  const faqs = [
    {
      q: "What is the formula to calculate uncompressed audio file size?",
      a: "The standard formula is: File Size (Bytes) = (Sample Rate in Hz × Bit Depth in bits × Channels × Duration in seconds) ÷ 8. For example, 1 minute of CD audio (44,100 Hz, 16-bit, Stereo 2ch) equals 44,100 × 16 × 2 × 60 ÷ 8 = 10,584,000 bytes (~10.09 MB).",
    },
    {
      q: "Why is 48 kHz / 24-bit the industry standard for video and transcription?",
      a: "48 kHz aligns synchronously with video frame rates (24fps, 25fps, 30fps), preventing inter-frame audio drift. 24-bit depth provides 144 dB of dynamic range, ensuring low-noise floor recordings that allow ASR models like TranscriptG to achieve the highest possible word recognition accuracy.",
    },
    {
      q: "How much smaller is FLAC compared to uncompressed WAV?",
      a: "FLAC typically achieves a 40% to 50% file size reduction without discarding any audio frequencies. Unlike lossy MP3 or AAC, FLAC decompresses into bit-for-bit identical PCM audio upon playback.",
    },
    {
      q: "What bitrate is recommended for podcast and speech audio hosting?",
      a: "For mono speech recordings, 96 kbps to 128 kbps CBR MP3 or 64 kbps Opus is optimal. For stereo podcasts with intro music and multiple hosts, 192 kbps CBR MP3 provides broadcast-grade transparency while respecting mobile RSS download limits.",
    },
    {
      q: "Can high bitrate audio improve AI transcription accuracy?",
      a: "Yes. Heavily compressed audio (under 64 kbps MP3) introduces high-frequency swishing and pre-echo artifacts around consonant sibilants ('s', 'th', 'f'), increasing Word Error Rate (WER). Uploading uncompressed WAV or high-bitrate AAC ensures crisp acoustic phoneme detection.",
    },
  ];

  return (
    <div className="space-y-16">
      <Seo
        title="Audio Bitrate & File Size Calculator — Free WAV, MP3, FLAC & AAC Tool"
        description="Calculate exact audio file sizes, bitrates, and streaming bandwidth across WAV, FLAC, MP3, AAC, and Opus. Adjust sample rates (44.1k to 192k), bit depth, channels, and duration."
        keywords={[
          "audio bitrate calculator",
          "wav file size calculator",
          "audio file size calculator",
          "mp3 bitrate calculator",
          "audio bandwidth calculator",
          "uncompressed audio calculator",
          "sample rate bit depth calculator",
          "pcm audio calculator",
        ]}
        faqs={faqs}
        canonicalPath="/tools/bitrate-calculator"
        applicationCategory="MultimediaApplication"
      />

      <PageHeader
        eyebrow="Acoustic Engineering · Utility Suite"
        title="Audio Bitrate & File Size Calculator"
        description="Compute exact storage footprints, transmission bitrates, and compression ratios across major professional audio formats in real time."
        badge="Zero Limits"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Interactive Calculator Console */}
        <div className="rounded-3xl bg-[#090b10] border border-white/10 shadow-2xl p-6 sm:p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls (Left 6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <Sliders className="w-4 h-4 text-[#ff5500]" />
                <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-white">
                  Acoustic Stream Parameters
                </h3>
              </div>

              {/* Sample Rate Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-300 flex items-center justify-between">
                  <span>Sample Rate (Frequency)</span>
                  <span className="text-[#00d9ff]">{sampleRate.toLocaleString()} Hz</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { rate: 44100, label: "44.1 kHz (CD)" },
                    { rate: 48000, label: "48 kHz (Video)" },
                    { rate: 96000, label: "96 kHz (Hi-Res)" },
                    { rate: 192000, label: "192 kHz (Studio)" },
                  ].map((item) => (
                    <button
                      key={item.rate}
                      type="button"
                      onClick={() => setSampleRate(item.rate)}
                      className={`p-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                        sampleRate === item.rate
                          ? "bg-[#ff5500] text-white border-[#ff5500] shadow-[0_0_12px_rgba(255,85,0,0.35)]"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bit Depth Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-300 flex items-center justify-between">
                  <span>Bit Depth (Resolution)</span>
                  <span className="text-amber-400">{bitDepth}-bit PCM</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { bits: 16, label: "16-bit (96 dB)" },
                    { bits: 24, label: "24-bit (144 dB)" },
                    { bits: 32, label: "32-bit Float" },
                  ].map((item) => (
                    <button
                      key={item.bits}
                      type="button"
                      onClick={() => setBitDepth(item.bits)}
                      className={`p-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                        bitDepth === item.bits
                          ? "bg-[#ff5500] text-white border-[#ff5500] shadow-[0_0_12px_rgba(255,85,0,0.35)]"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Channels Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-neutral-300 flex items-center justify-between">
                  <span>Channels (Track Configuration)</span>
                  <span className="text-emerald-400">
                    {channels === 1 ? "1.0 Mono" : channels === 2 ? "2.0 Stereo" : "5.1 Surround"}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { ch: 1, label: "Mono (1 ch)" },
                    { ch: 2, label: "Stereo (2 ch)" },
                    { ch: 6, label: "5.1 Surround (6 ch)" },
                  ].map((item) => (
                    <button
                      key={item.ch}
                      type="button"
                      onClick={() => setChannels(item.ch)}
                      className={`p-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                        channels === item.ch
                          ? "bg-[#ff5500] text-white border-[#ff5500] shadow-[0_0_12px_rgba(255,85,0,0.35)]"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Inputs */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono font-bold text-neutral-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
                  Recording Duration
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block mb-1">Hours</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={hours}
                      onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-2 bg-black/60 rounded-xl border border-white/15 text-white font-mono font-bold text-sm focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block mb-1">Minutes</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                      className="w-full px-3 py-2 bg-black/60 rounded-xl border border-white/15 text-white font-mono font-bold text-sm focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block mb-1">Seconds</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                      className="w-full px-3 py-2 bg-black/60 rounded-xl border border-white/15 text-white font-mono font-bold text-sm focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Real-Time Results Telemetry (Right 6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 bg-black/40 p-6 rounded-2xl border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-300">
                      Uncompressed Master Size
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    Linear PCM {bitDepth}-bit
                  </span>
                </div>

                {/* Primary Metric Display */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">
                    Estimated File Footprint
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-mono font-black text-white tabular-nums tracking-tight">
                      {uncompressedSizeMB >= 1024
                        ? `${uncompressedSizeGB.toFixed(2)} GB`
                        : `${uncompressedSizeMB.toFixed(1)} MB`}
                    </span>
                    <span className="text-xs font-mono text-[#ff5500] font-bold">
                      ({uncompressedTotalBytes.toLocaleString()} bytes)
                    </span>
                  </div>
                </div>

                {/* Secondary Telemetry Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-neutral-400 text-[10px] uppercase block">Raw Bitrate</span>
                    <span className="font-bold text-[#00d9ff] text-sm tabular-nums block mt-0.5">
                      {Math.round(uncompressedBitrateKbps).toLocaleString()} kbps
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      ({(uncompressedBitrateKbps / 8 / 1024).toFixed(2)} MB/s)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-neutral-400 text-[10px] uppercase block">Storage Rate</span>
                    <span className="font-bold text-amber-400 text-sm tabular-nums block mt-0.5">
                      {(uncompressedSizeMB / (totalSeconds / 60)).toFixed(1)} MB/min
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      ~{(uncompressedSizeMB * (3600 / totalSeconds) / 1024).toFixed(2)} GB/hour
                    </span>
                  </div>
                </div>

                {/* Formula Callout */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-neutral-400 space-y-1">
                  <span className="text-neutral-300 font-bold block">Mathematical Proof:</span>
                  <code className="text-[#ff7733] block">
                    ({sampleRate.toLocaleString()} × {bitDepth} × {channels} × {totalSeconds}s) ÷ 8 = {uncompressedTotalBytes.toLocaleString()} Bytes
                  </code>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="pt-2">
                <Link
                  to="/transcribe"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#ff5500] hover:bg-[#ff7733] text-white text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(255,85,0,0.35)]"
                >
                  <FileAudio className="w-4 h-4" />
                  Transcribe This Audio Stream Free →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Full Audio Format Comparison Matrix */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-[#0d0f12] tracking-tight">
              Format Comparison Matrix ({hours > 0 ? `${hours}h ` : ""}{minutes}m {seconds}s)
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Comparing linear PCM uncompressed masters against lossless FLAC and standard streaming lossy codecs.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-neutral-50 border-b border-black/5 text-neutral-700 font-bold">
                  <th className="py-3 px-4">Format / Codec</th>
                  <th className="py-3 px-4">Encoding Type</th>
                  <th className="py-3 px-4">Effective Bitrate</th>
                  <th className="py-3 px-4">File Size</th>
                  <th className="py-3 px-4">Data Rate</th>
                  <th className="py-3 px-4">50Mbps Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-neutral-800">
                {comparisonResults.map((row) => (
                  <tr key={row.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#0d0f12] block">{row.name}</span>
                      <span className="text-[10px] text-neutral-500 font-sans block mt-0.5">
                        {row.description}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.type === "Uncompressed"
                            ? "bg-[#ff4d00]/10 text-[#ff4d00]"
                            : row.type === "Lossless"
                            ? "bg-emerald-500/10 text-emerald-700"
                            : "bg-blue-500/10 text-blue-700"
                        }`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 tabular-nums font-bold">
                      {Math.round(row.effectiveKbps)} kbps
                    </td>
                    <td className="py-3 px-4 tabular-nums font-bold text-[#0d0f12]">
                      {row.sizeMB >= 1024
                        ? `${(row.sizeMB / 1024).toFixed(2)} GB`
                        : `${row.sizeMB.toFixed(1)} MB`}
                    </td>
                    <td className="py-3 px-4 tabular-nums text-neutral-600">
                      {row.mbPerMin.toFixed(2)} MB/min
                    </td>
                    <td className="py-3 px-4 tabular-nums text-neutral-600">
                      {row.downloadSecs < 1 ? "< 1s" : `${row.downloadSecs.toFixed(1)}s`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Industry Production Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff4d00] uppercase">
              <Radio className="w-4 h-4" /> Broadcast & Video Standard
            </div>
            <h4 className="text-base font-bold text-[#0d0f12]">48 kHz / 24-bit PCM</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Required standard for Premiere Pro, Final Cut, and DaVinci Resolve. Exactly matches 24fps and 30fps video frames with zero jitter or phase cancellation.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase">
              <Zap className="w-4 h-4" /> Podcast Distribution
            </div>
            <h4 className="text-base font-bold text-[#0d0f12]">128k – 192k CBR MP3</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Optimal configuration for Apple Podcasts and Spotify RSS feeds. Keeps typical 45-minute episodes under 65MB for cellular streaming.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-black/10 bg-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0088a8] uppercase">
              <Activity className="w-4 h-4" /> ASR Machine Learning Ingestion
            </div>
            <h4 className="text-base font-bold text-[#0d0f12]">16 kHz – 48 kHz FLAC/WAV</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Speech-to-text engines like TranscriptG downsample internally to 16kHz mel-spectrograms. Providing uncompressed inputs prevents compression noise from causing missed words.
            </p>
          </div>
        </div>

        {/* Section 4: Deep Technical FAQs */}
        <div className="space-y-6 pt-6 border-t border-black/10">
          <div>
            <h3 className="text-xl font-black text-[#0d0f12] tracking-tight">
              Audio Bitrate & Storage Calculation FAQs
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Authoritative answers on acoustic bandwidth, container formats, and transcription file prep.
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
