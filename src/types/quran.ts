export interface Surah {
  number: number;
  name: {
    short: string;
    transliteration: {
      id: string;
    };
    translation: {
      id: string;
    };
  };
  numberOfVerses: number;
}

export interface Ayah {
  number: {
    inSurah: number;
  };
  text: {
    arab: string;
    transliteration: {
      en: string;
    };
  };
  translation: {
    id: string;
  };
  audio: {
    primary: string;
  };
}