import React from 'react';
import { BookOpen } from 'lucide-react';
import type { Surah } from '../types/quran';

interface SurahListProps {
  surahs: Surah[];
  onSelect: (number: number) => void;
  selectedSurah?: number;
}

export default function SurahList({ surahs, onSelect, selectedSurah }: SurahListProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-emerald-600 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Daftar Surah
        </h2>
      </div>
      <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
        {surahs.map((surah) => (
          <button
            key={surah.number}
            onClick={() => onSelect(surah.number)}
            className={`w-full px-4 py-3 text-left transition-colors hover:bg-emerald-50 flex items-center gap-3
              ${selectedSurah === surah.number ? 'bg-emerald-50' : ''}`}
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-medium">
              {surah.number}
            </span>
            <div>
              <h3 className="font-medium text-gray-900">{surah.name.transliteration.id}</h3>
              <p className="text-sm text-gray-500">{surah.name.translation.id}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}