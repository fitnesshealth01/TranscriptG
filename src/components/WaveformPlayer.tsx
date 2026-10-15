import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Gauge,
  Sliders,
  Repeat,
  Radio,
  Zap,
  FastForward,
} from "lucide-react";

interface WaveformPlayerProps {
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  audioFreq?: number; // Base frequency for synthesized speech tone
  audioUrl?: string; // Optional real audio URL if available
  trackTitle?: string;
  speakerLabel?: string;
  onSpeedChange?: (speed: number) => void;
  silenceTrimmerActive?: boolean;
  onToggleSilenceTrimmer?: () => void;
  showVuMeter?: boolean;
}

export const WaveformPlayer: React.FC<WaveformPlayerProps> = ({
  duration,
  currentTime,
  isPlaying,
  onPlayPause,
  onSeek,
  audioFreq = 440,
  audioUrl,
  trackTitle = "Acoustic Stream Master",
  speakerLabel,
  onSpeedChange,
  silenceTrimmerActive = false,
  onToggleSilenceTrimmer,
  showVuMeter = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isHoveringWave, setIsHoveringWave] = useState<boolean>(false);
  const [hoverTime, setHoverTime] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // VU Peak meter simulation states
  const [vuLeft, setVuLeft] = useState<number>(0);
  const [vuRight, setVuRight] = useState<number>(0);

  // Web Audio synth tone for demo / playback sound feedback
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const pannerNodeRef = useRef<StereoPannerNode | null>(null);

  // Deterministic waveform seed data generated once per track duration
  const waveformPeaksRef = useRef<number[]>([]);
  useEffect(() => {
    const barsCount = 120;
    const peaks: number[] = [];
    for (let i = 0; i < barsCount; i++) {
      // Natural speech envelope with varying amplitude pauses and cadences
      const progress = i / barsCount;
      const speechCadence = Math.sin(progress * Math.PI * 8) * 0.3 + 0.5;
      const noise = (Math.sin(i * 13.37) * 43758.5453) % 1;
      const amplitude = Math.max(0.12, Math.min(0.98, speechCadence * 0.7 + Math.abs(noise) * 0.35));
      peaks.push(amplitude);
    }
    waveformPeaksRef.current = peaks;
  }, [duration, trackTitle]);

  // Audio tone generation for tactile audio feedback
  const startAudioFeedback = useCallback(() => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {}
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft harmonic triangle wave that simulates human vocal formant
      osc.type = "triangle";
      osc.frequency.setValueAtTime(audioFreq, ctx.currentTime);

      // Mild vibrato LFO for realistic vocal inflection
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 5.2; // 5Hz vocal vibrato
      lfoGain.gain.value = 12;
      lfo.connect(osc.frequency);
      lfo.start();

      const targetGain = isMuted ? 0 : volume * 0.12;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, targetGain), ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainNodeRef.current = gain;
    } catch {
      // AudioContext policy handled gracefully
    }
  }, [audioFreq, isMuted, volume]);

  const stopAudioFeedback = useCallback(() => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.04);
      }
      setTimeout(() => {
        if (oscRef.current) {
          try {
            oscRef.current.stop();
            oscRef.current.disconnect();
          } catch {}
          oscRef.current = null;
        }
      }, 50);
    } catch {}
  }, []);

  // Sync tone with play/pause
  useEffect(() => {
    if (isPlaying) {
      startAudioFeedback();
    } else {
      stopAudioFeedback();
    }
    return () => {
      stopAudioFeedback();
    };
  }, [isPlaying, startAudioFeedback, stopAudioFeedback]);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : volume * 0.12;
      gainNodeRef.current.gain.setValueAtTime(targetGain, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // VU meter animation
  useEffect(() => {
    if (!isPlaying) {
      setVuLeft(0);
      setVuRight(0);
      return;
    }

    const interval = setInterval(() => {
      const leftRand = Math.min(100, Math.floor(45 + Math.random() * 45));
      const rightRand = Math.min(100, Math.floor(40 + Math.random() * 50));
      setVuLeft(leftRand);
      setVuRight(rightRand);
    }, 80);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Draw Canvas Waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const peaks = waveformPeaksRef.current;
    const barCount = peaks.length;
    const barWidth = width / barCount;
    const progressRatio = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;
    const playheadX = progressRatio * width;

    // Draw baseline center guide
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Draw audio frequency bars
    for (let i = 0; i < barCount; i++) {
      const x = i * barWidth;
      const barHeight = Math.max(4, peaks[i] * (height * 0.82));
      const y = (height - barHeight) / 2;
      const isPast = x <= playheadX;

      if (isPast) {
        // Active played section: glowing studio amber & gold
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, "#ff7733");
        gradient.addColorStop(0.5, "#ff4d00");
        gradient.addColorStop(1, "#f59e0b");
        ctx.fillStyle = gradient;
      } else {
        // Future unplayed section: subtle titanium metallic slate
        ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
      }

      // Rounded bar top and bottom
      ctx.beginPath();
      ctx.roundRect(x + 1, y, Math.max(1.5, barWidth - 1.5), barHeight, 2);
      ctx.fill();
    }

    // Draw playhead laser line
    ctx.shadowColor = "#ff4d00";
    ctx.shadowBlur = 12;
    ctx.strokeStyle = "#ff5500";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(playheadX, 0);
    ctx.lineTo(playheadX, height);
    ctx.stroke();

    // Draw playhead top diamond indicator
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(playheadX, 6, 4, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw hover guide line if user is scrubbing
    if (isHoveringWave && hoverTime > 0) {
      const hoverX = (hoverTime / duration) * width;
      ctx.strokeStyle = "rgba(0, 217, 255, 0.65)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(hoverX, 0);
      ctx.lineTo(hoverX, height);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [currentTime, duration, isHoveringWave, hoverTime]);

  // Handle Scrubbing Interaction
  const handleSeekFromEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || duration <= 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const targetTime = (clickX / rect.width) * duration;
    onSeek(targetTime);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || duration <= 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const targetTime = (clickX / rect.width) * duration;
    setHoverTime(targetTime);
    if (isDragging) {
      onSeek(targetTime);
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (onSpeedChange) {
      onSpeedChange(speed);
    }
  };

  const skipSeconds = (seconds: number) => {
    const next = Math.max(0, Math.min(duration, currentTime + seconds));
    onSeek(next);
  };

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${ms}`;
  };

  return (
    <div className="w-full rounded-2xl bg-[#090b10] border border-white/10 shadow-2xl p-4 sm:p-6 text-white font-sans overflow-hidden relative">
      {/* Subtle Studio Glow Backdrop */}
      <div className="absolute top-0 right-0 w-80 h-32 bg-[#ff5500]/10 blur-[80px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-32 bg-[#00d9ff]/5 blur-[70px] pointer-events-none rounded-full" />

      {/* Top Console Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5500] animate-pulse shadow-[0_0_8px_#ff5500]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
                Studio Player Engine
              </span>
              {speakerLabel && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  {speakerLabel}
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              {trackTitle}
            </h4>
          </div>
        </div>

        {/* Status Indicators & Speed Selector */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Silence Skip Mode Toggle */}
          {onToggleSilenceTrimmer && (
            <button
              type="button"
              onClick={onToggleSilenceTrimmer}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 border ${
                silenceTrimmerActive
                  ? "bg-[#ff5500]/20 border-[#ff5500] text-[#ff7733] shadow-[0_0_12px_rgba(255,85,0,0.3)]"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
              }`}
              title="Automatically skip pauses longer than 1.5 seconds"
            >
              <Zap className="w-3 h-3 text-[#ff5500]" />
              Trim Silence
            </button>
          )}

          {/* Speed Pills */}
          <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10 text-xs font-mono">
            {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => changeSpeed(s)}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  playbackSpeed === s
                    ? "bg-[#ff5500] text-white font-bold shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Waveform Canvas Scrubber */}
      <div className="py-5 space-y-2">
        <div
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleSeekFromEvent(e);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseEnter={() => setIsHoveringWave(true)}
          onMouseLeave={() => {
            setIsHoveringWave(false);
            setIsDragging(false);
          }}
          onMouseMove={handleMouseMove}
          className="relative h-20 sm:h-24 w-full cursor-pointer bg-black/40 rounded-xl border border-white/10 overflow-hidden flex items-center select-none group"
        >
          <canvas
            ref={canvasRef}
            width={720}
            height={96}
            className="w-full h-full block"
          />

          {/* Hover Time Tooltip */}
          {isHoveringWave && (
            <div
              className="absolute top-1 pointer-events-none -translate-x-1/2 bg-neutral-900 text-[#00d9ff] border border-[#00d9ff]/30 text-[10px] font-mono px-2 py-0.5 rounded shadow-lg"
              style={{
                left: `${Math.max(6, Math.min(94, (hoverTime / duration) * 100))}%`,
              }}
            >
              {formatTimecode(hoverTime)}
            </div>
          )}
        </div>

        {/* Timecode Indicators */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
          <div className="flex items-center gap-1.5 text-white font-bold tabular-nums">
            <span className="text-[#ff5500]">▶</span> {formatTimecode(currentTime)}
          </div>
          <div className="text-neutral-500 text-[11px] tracking-wide">
            SCRUB WAVEFORM TO JUMP
          </div>
          <div className="tabular-nums">{formatTimecode(duration)}</div>
        </div>
      </div>

      {/* Hardware Transport & Level Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10">
        {/* Playback Transport Buttons */}
        <div className="flex items-center gap-2">
          {/* Rewind 5s */}
          <button
            type="button"
            onClick={() => skipSeconds(-5)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all border border-white/5"
            title="Rewind 5 seconds"
            aria-label="Rewind 5 seconds"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Master Play/Pause */}
          <button
            type="button"
            onClick={onPlayPause}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff7733] to-[#ff4d00] hover:brightness-110 active:scale-95 text-white shadow-[0_0_24px_rgba(255,77,0,0.45)] transition-all cursor-pointer"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-white text-white" />
            ) : (
              <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
            )}
          </button>

          {/* Forward 5s */}
          <button
            type="button"
            onClick={() => skipSeconds(5)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-all border border-white/5"
            title="Forward 5 seconds"
            aria-label="Forward 5 seconds"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Loop toggle */}
          <button
            type="button"
            onClick={() => setIsLooping(!isLooping)}
            className={`p-2.5 rounded-xl transition-all border ${
              isLooping
                ? "bg-[#ff5500]/20 border-[#ff5500] text-[#ff7733]"
                : "bg-white/5 border-white/5 text-neutral-400 hover:text-white"
            }`}
            title="Loop playback"
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Volume & Studio VU Peak Meter */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          {/* Hardware VU Peak Meter */}
          {showVuMeter && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[10px]">
              <span className="text-neutral-500 uppercase tracking-tighter">VU CH-L</span>
              <div className="w-16 h-2 bg-neutral-900 rounded-sm overflow-hidden flex gap-0.5 p-0.5">
                <div
                  className="h-full bg-emerald-500 rounded-xs transition-all duration-75"
                  style={{ width: `${Math.min(70, vuLeft)}%` }}
                />
                <div
                  className="h-full bg-amber-400 rounded-xs transition-all duration-75"
                  style={{ width: `${Math.max(0, Math.min(20, vuLeft - 70)) * 5}%` }}
                />
                <div
                  className="h-full bg-red-500 rounded-xs transition-all duration-75"
                  style={{ width: `${Math.max(0, vuLeft - 90) * 10}%` }}
                />
              </div>

              <span className="text-neutral-500 uppercase tracking-tighter ml-1">CH-R</span>
              <div className="w-16 h-2 bg-neutral-900 rounded-sm overflow-hidden flex gap-0.5 p-0.5">
                <div
                  className="h-full bg-emerald-500 rounded-xs transition-all duration-75"
                  style={{ width: `${Math.min(70, vuRight)}%` }}
                />
                <div
                  className="h-full bg-amber-400 rounded-xs transition-all duration-75"
                  style={{ width: `${Math.max(0, Math.min(20, vuRight - 70)) * 5}%` }}
                />
                <div
                  className="h-full bg-red-500 rounded-xs transition-all duration-75"
                  style={{ width: `${Math.max(0, vuRight - 90) * 10}%` }}
                />
              </div>
            </div>
          )}

          {/* Volume Slider & Mute */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-20 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#ff5500]"
              aria-label="Audio playback volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
