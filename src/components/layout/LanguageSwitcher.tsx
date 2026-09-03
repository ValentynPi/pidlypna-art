import { LANGUAGES, type Language } from '../../i18n/types';
import { useLanguage } from '../../i18n/LanguageContext';

interface LanguageSwitcherProps {
  onDark?: boolean;
  compact?: boolean;
}

export function LanguageSwitcher({ onDark = false, compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className={`flex items-center gap-1 ${compact ? '' : ''}`}
      role="group"
      aria-label={t('nav.language')}
    >
      {LANGUAGES.map((item) => {
        const active = language === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code as Language)}
            className={`px-1.5 py-1 text-[0.65rem] tracking-[0.16em] uppercase transition-colors ${
              active
                ? onDark
                  ? 'text-gold'
                  : 'text-terracotta'
                : onDark
                  ? 'text-cream/50 hover:text-cream'
                  : 'text-ink-soft hover:text-ink'
            }`}
            aria-pressed={active}
            lang={item.code}
          >
            {item.code === 'uk' ? 'UA' : item.code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
