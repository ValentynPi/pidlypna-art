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
      className={`flex items-center rounded-sm p-0.5 ${
        onDark ? 'bg-cream/10 ring-1 ring-cream/15' : 'bg-ink/5 ring-1 ring-ink/8'
      }`}
      role="group"
      aria-label={t('nav.language')}
    >
      {LANGUAGES.map((item) => {
        const active = language === item.code;
        const label = item.code === 'uk' ? 'UA' : item.code.toUpperCase();
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code as Language)}
            title={item.native}
            className={`${compact ? 'min-w-[2.25rem] px-1.5' : 'min-w-[2.5rem] px-2'} py-1.5 text-[0.7rem] tracking-[0.14em] uppercase transition-colors ${
              active
                ? onDark
                  ? 'bg-gold font-semibold text-ink shadow-sm'
                  : 'bg-terracotta font-semibold text-cream shadow-sm'
                : onDark
                  ? 'font-medium text-cream/45 hover:text-cream'
                  : 'font-medium text-ink-soft hover:text-ink'
            }`}
            aria-pressed={active}
            aria-current={active ? 'true' : undefined}
            lang={item.code}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
