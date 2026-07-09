import type { Exhibition } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LazyImage } from '../ui/LazyImage';

interface TimelineProps {
  exhibitions: Exhibition[];
  showFilter?: boolean;
}

export function Timeline({ exhibitions }: TimelineProps) {
  const upcoming = exhibitions.filter((e) => e.status === 'upcoming');
  const past = exhibitions.filter((e) => e.status === 'past');

  return (
    <div className="space-y-20">
      {upcoming.length > 0 && (
        <div>
          <ScrollReveal>
            <h3 className="mb-10 font-serif text-2xl text-ink md:text-3xl">
              Upcoming
            </h3>
          </ScrollReveal>
          <div className="space-y-12">
            {upcoming.map((item, index) => (
              <TimelineEntry key={item.id} exhibition={item} index={index} />
            ))}
          </div>
        </div>
      )}

      <div>
        <ScrollReveal>
          <h3 className="mb-10 font-serif text-2xl text-ink md:text-3xl">Past</h3>
        </ScrollReveal>
        <div className="space-y-12">
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
}: {
  exhibition: Exhibition;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
          isEven ? '' : 'md:[&>*:first-child]:order-2'
        }`}
      >
        <div className="aspect-[3/2] overflow-hidden bg-cream-dark">
          <LazyImage
            src={exhibition.image}
            alt={exhibition.imageAlt}
            className="transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div>
          <p className="text-xs tracking-widest text-terracotta uppercase">
            {exhibition.dates}
          </p>
          <h4 className="mt-2 font-serif text-2xl text-ink md:text-3xl">
            {exhibition.title}
          </h4>
          <p className="mt-1 text-sm text-sage">{exhibition.location}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {exhibition.description}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}
