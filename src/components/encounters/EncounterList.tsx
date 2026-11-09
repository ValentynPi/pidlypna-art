import type { NotableEncounter } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LazyImage } from '../ui/LazyImage';
import { useLanguage } from '../../i18n/LanguageContext';

interface EncounterListProps {
  encounters: NotableEncounter[];
}

export function EncounterList({ encounters }: EncounterListProps) {
  const { t } = useLanguage();

  if (encounters.length === 0) {
    return (
      <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-ink-soft">
        {t('encounters.empty')}
      </p>
    );
  }

  return (
    <div className="space-y-px bg-ink/10">
      {encounters.map((item, index) => (
        <ScrollReveal key={item.id} delay={index * 0.06}>
          <article className="grid gap-8 bg-cream p-8 md:grid-cols-12 md:gap-10 md:p-10">
            {item.image && (
              <div className="md:col-span-4">
                <LazyImage
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  className="aspect-[4/3] w-full object-cover"
                  wrapperClassName="w-full"
                />
              </div>
            )}
            <div
              className={
                item.image ? 'flex flex-col justify-center md:col-span-8' : 'md:col-span-12'
              }
            >
              <p className="text-[0.65rem] tracking-[0.2em] text-terracotta uppercase">
                {item.date}
                {item.location ? ` · ${item.location}` : ''}
              </p>
              <h2 className="mt-2 font-serif text-2xl text-ink md:text-3xl">{item.title}</h2>
              <p className="mt-1 text-sm text-ink-soft">{item.withWhom}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink md:text-base">
                {item.description}
              </p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs tracking-[0.2em] text-terracotta uppercase transition-colors hover:text-gold"
                >
                  {t('encounters.readMore')}
                </a>
              )}
            </div>
          </article>
        </ScrollReveal>
      ))}
    </div>
  );
}
