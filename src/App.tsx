import React, { useEffect, useState } from 'react';
import { Book, Loader2 } from 'lucide-react';
import type { Surah, Ayah } from './types/quran';
import SurahList from './components/SurahList';
import AudioPlayer from './components/AudioPlayer';
import Settings from './components/Settings';

function App() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number>();
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [currentAyah, setCurrentAyah] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    fetch('https://api.quran.gading.dev/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      setLoading(true);
      fetch(`https://api.quran.gading.dev/surah/${selectedSurah}`)
        .then(res => res.json())
        .then(data => {
          setAyahs(data.data.verses);
          setCurrentAyah(0);
          setLoading(false);
        });
    }
  }, [selectedSurah]);

  const handleNext = () => {
    if (currentAyah < ayahs.length - 1) {
      setCurrentAyah(curr => curr + 1);
    }
  };

  const handlePrevious = () => {
    if (currentAyah > 0) {
      setCurrentAyah(curr => curr - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-emerald-600 text-white py-6 px-4 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Al-Qur'an Online</h1>
          </div>
          <Settings autoPlay={autoPlay} onAutoPlayChange={setAutoPlay} />
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      ) : (
        <main className="max-w-6xl mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-[350px,1fr] gap-8">
            <SurahList
              surahs={surahs}
              onSelect={setSelectedSurah}
              selectedSurah={selectedSurah}
            />

            {selectedSurah && ayahs.length > 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-8">
                  {ayahs.map((ayah, index) => (
                    <div
                      key={ayah.number.inSurah}
                      className={`space-y-4 p-4 rounded-lg cursor-pointer hover:bg-emerald-50/40 ${
                        index === currentAyah ? '!bg-emerald-50' : ''
                      }`}

                      onClick={() => setCurrentAyah(index)}
                    >
                      <p className="text-2xl leading-loose text-right font-arabic">
                        {ayah.text.arab}
                      </p>
                      <p className="text-gray-600">{ayah.text.transliteration.en}</p>
                      <p className="text-gray-800">{ayah.translation.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center h-[200px] text-gray-500">
                Silakan pilih surah untuk memulai
              </div>
            )}
          </div>
        </main>
      )}

      {selectedSurah && ayahs.length > 0 && (
        <AudioPlayer
          src={ayahs[currentAyah].audio.primary}
          onEnded={() => autoPlay && handleNext()}
          onNext={currentAyah < ayahs.length - 1 ? handleNext : undefined}
          onPrevious={currentAyah > 0 ? handlePrevious : undefined}
          autoPlay={autoPlay}
        />
      )}
    </div>
  );
}

export default App;