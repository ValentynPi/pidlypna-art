export type Language = 'en' | 'es' | 'uk';

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'uk', label: 'Ukrainian', native: 'Українська' },
];

export const LANGUAGE_STORAGE_KEY = 'vp-art-lang';

export type TranslationTree = {
  [key: string]: string | TranslationTree;
};
