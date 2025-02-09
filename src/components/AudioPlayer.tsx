import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  onEnded: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  autoPlay?: boolean;
}

export default function AudioPlayer({ src, onEnded, onPrevious, onNext, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play when src changes
  useEffect(() => {
    if (audioRef.current) {
      if (autoPlay) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [src, autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onEnded();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-4xl mx-auto space-y-2">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm text-gray-500 w-12 text-right">
            {formatTime(progress)}
          </span>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
          <span className="text-sm text-gray-500 w-12">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onPrevious}
            disabled={!onPrevious}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          <button
            onClick={onNext}
            disabled={!onNext}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <SkipForward className="w-6 h-6" />
          </button>

          <audio
            ref={audioRef}
            src={src}
            onEnded={handleEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        </div>
      </div>
    </div>
  );
}