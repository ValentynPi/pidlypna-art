import type { Language } from './types';

/** Localized artwork titles. Falls back to English entry, then artwork.title. */
export const artworkTitles: Record<Language, Record<string, string>> = {
  en: {
    'abstract-art-02': 'Beyond Visibility',
    'abstract-art-03': 'Separated by a metropolis',
    'abstract-art-04': 'Roots in Two Worlds',
    'abstract-art-05': 'Between Time and Depth',
    'abstract-art-06': 'Soft Flow',
    'ukrainian-symbolism-01': 'Heritage',
    'female-portraits-01': 'Blooming Silence',
    'female-portraits-02': 'Ocean Dream',
    'female-portraits-03': 'The Fierce and the Tender',
    'pop-art-01': 'Vibrant Tina',
  },
  es: {
    'abstract-art-02': 'Más allá de la visibilidad',
    'abstract-art-03': 'Separados por una metrópolis',
    'abstract-art-04': 'Raíces en dos mundos',
    'abstract-art-05': 'Entre el tiempo y la profundidad',
    'abstract-art-06': 'Flujo suave',
    'ukrainian-symbolism-01': 'Herencia',
    'female-portraits-01': 'Silencio en flor',
    'female-portraits-02': 'Sueño oceánico',
    'female-portraits-03': 'La fiereza y la ternura',
    'pop-art-01': 'Tina vibrante',
  },
  uk: {
    'abstract-art-02': 'За межею видимості',
    'abstract-art-03': 'Розділені мегаполісом',
    'abstract-art-04': 'Коріння в двох світах',
    'abstract-art-05': 'Між часом та глибиною',
    'abstract-art-06': "М'який плин",
    'ukrainian-symbolism-01': 'Спадщина',
    'female-portraits-01': 'Квітуча тиша',
    'female-portraits-02': 'Сон океану',
    'female-portraits-03': 'Сила ніжності',
    'pop-art-01': 'Яскрава Тіна',
  },
};

export function getArtworkTitle(
  artworkId: string,
  language: Language,
  fallback = '',
): string {
  return (
    artworkTitles[language][artworkId] ??
    artworkTitles.en[artworkId] ??
    fallback
  );
}
