import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations } from './translations';
import { LANGUAGE_STORAGE_KEY, type Language } from './types';
import { readInitialLanguage } from './detectLanguage';
import { getNested, interpolate } from './utils';
import { defaultPageCopy, resolvePageCopy } from '../data/pageContent';
import { AdminSiteContentContext } from '../admin/AdminSiteContentContext';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (path: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage);
  const adminContent = useContext(AdminSiteContentContext);
  const cmsContent = adminContent?.content;

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
  }, []);

  const t = useCallback(
    (path: string, params?: Record<string, string>) => {
      const resolved = resolvePageCopy(language, path, cmsContent?.pageCopy);
      const isMeta = path.includes('.meta');
      if (resolved === 'hidden') {
        if (isMeta) {
          const fallback = defaultPageCopy(language, path) || path;
          return interpolate(fallback, params);
        }
        return '';
      }
      if (resolved !== 'default') {
        return interpolate(resolved, params);
      }
      const value =
        getNested(translations[language], path) ??
        getNested(translations.en, path) ??
        path;
      return interpolate(value, params);
    },
    [language, cmsContent],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
