import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  autoPlay: boolean;
  onAutoPlayChange: (value: boolean) => void;
}

export default function Settings({ autoPlay, onAutoPlayChange }: SettingsProps) {
  return (
    <div className="flex items-center gap-2">
      <SettingsIcon className="w-5 h-5 text-gray-500" />
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={autoPlay}
            onChange={(e) => onAutoPlayChange(e.target.checked)}
          />
          <div className={`block w-10 h-6 rounded-full ${autoPlay ? 'bg-emerald-500' : 'bg-gray-300'}`} />
          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${autoPlay ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
        <span className="ml-2 text-sm text-gray-600">Auto-play Audio</span>
      </label>
    </div>
  );
}