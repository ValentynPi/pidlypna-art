import { LANGUAGE_STORAGE_KEY, type Language } from './types';

/** Map browser language tags to a supported site language. */
export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';

  const candidates = [...(navigator.languages ?? []), navigator.language].filter(
    Boolean,
  ) as string[];

  for (const raw of candidates) {
    const tag = raw.toLowerCase();
    if (tag.startsWith('uk')) return 'uk';
    if (tag.startsWith('es')) return 'es';
    if (tag.startsWith('en')) return 'en';
  }

  return 'en';
}

/** Stored preference, or first-visit detection from the browser (then saved). */
export function readInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === 'en' || stored === 'es' || stored === 'uk') return stored;

  const detected = detectBrowserLanguage();
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, detected);
  } catch {
    /* private mode / blocked storage */
  }
  return detected;
}
