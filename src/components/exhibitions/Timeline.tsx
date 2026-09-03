import type { Exhibition } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LazyImage } from '../ui/LazyImage';
import { SectionLabel } from '../ui/SectionLabel';
import { useLanguage } from '../../i18n/LanguageContext';

interface TimelineProps {
  exhibitions: Exhibition[];
}

export function Timeline({ exhibitions }: TimelineProps) {
  const { t } = useLanguage();
  const upcoming = exhibitions.filter((e) => e.status === 'upcoming');
  const past = exhibitions.filter((e) => e.status === 'past');

  return (
    <div className="space-y-24">
      {upcoming.length > 0 && (
        <div>
          <ScrollReveal>
            <SectionLabel>{t('exhibitions.upcoming')}</SectionLabel>
          </ScrollReveal>
          <div className="mt-10 space-y-16">
            {upcoming.map((item, index) => (
              <TimelineEntry key={item.id} exhibition={item} index={index} featured />
            ))}
          </div>
        </div>
      )}

      <div>
        <ScrollReveal>
            <SectionLabel>{t('exhibitions.past')}</SectionLabel>
        </ScrollReveal>
        <div className="mt-10 space-y-12">
          {past.map((item, index) => (
            <TimelineEntry key={item.id} exhibition={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineEntry({
  exhibition,
  index,
  featured = false,
}: {
  exhibition: Exhibition;
  index: number;
  featured?: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal delay={index * 0.08}>
      <article
        className={`grid items-center gap-8 md:gap-12 ${
          featured ? 'md:grid-cols-1' : 'md:grid-cols-2'
        } ${!featured && !isEven ? 'md:[&>*:first-child]:order-2' : ''}`}
      >
        <div
          className={`overflow-hidden bg-ink ${
            featured ? 'aspect-[21/9]' : 'aspect-[4/3]'
          }`}
        >
          <LazyImage
            src={exhibition.image}
            alt={exhibition.imageAlt}
            className="transition-transform duration-1000 hover:scale-105"
          />
        </div>
        <div className={featured ? 'max-w-2xl' : ''}>
          <p className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
            {exhibition.dates}
          </p>
          <h4 className="display-heading mt-3 text-2xl md:text-3xl lg:text-4xl">
            {exhibition.title}
          </h4>
          <p className="mt-2 text-sm text-sage">{exhibition.location}</p>
          <p className="mt-5 leading-relaxed text-ink-soft">{exhibition.description}</p>
        </div>
      </article>
    </ScrollReveal>
  );
}
