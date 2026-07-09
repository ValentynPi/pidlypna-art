import type { JourneyEntry as JourneyEntryType } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LazyImage } from '../ui/LazyImage';

interface JourneyEntryProps {
  entry: JourneyEntryType;
  index: number;
}

export function JourneyEntry({ entry, index }: JourneyEntryProps) {
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal>
      <article
        className={`relative grid gap-8 md:grid-cols-12 md:gap-10 ${
          index > 0 ? 'mt-24 md:mt-32' : ''
        }`}
      >
        <div
          className={`md:col-span-5 ${isEven ? 'md:col-start-1' : 'md:col-start-8'}`}
        >
          <div className="relative">
            <div className="absolute -top-3 -left-3 h-full w-full border border-terracotta/20" />
            <div className="relative bg-cream p-6 md:p-8">
              <p className="text-xs tracking-widest text-terracotta uppercase">
                {entry.date} · {entry.location}
              </p>
              <h3 className="mt-3 font-serif text-3xl text-ink md:text-4xl">
                {entry.title}
              </h3>
              <p className="mt-5 leading-relaxed text-ink-soft">
                {entry.narrative}
              </p>
            </div>
          </div>
        </div>

        <div
          className={`md:col-span-6 ${
            isEven ? 'md:col-start-7' : 'md:col-start-1 md:row-start-1'
          }`}
        >
          <div
            className={`grid gap-3 ${
              entry.images.length >= 3
                ? 'grid-cols-2'
                : entry.images.length === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-1'
            }`}
          >
            {entry.images.map((img, imgIndex) => (
              <div
                key={img.alt}
                className={`overflow-hidden bg-cream-dark ${
                  imgIndex === 0 && entry.images.length >= 3
                    ? 'col-span-2 aspect-[16/9]'
                    : 'aspect-[4/3]'
                } ${imgIndex === 1 && entry.images.length === 2 ? '' : ''}`}
              >
                <LazyImage
                  src={img.src}
                  alt={img.alt}
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {index < 5 && (
          <div className="absolute -bottom-12 left-1/2 hidden h-12 w-px -translate-x-1/2 bg-terracotta/20 md:block" />
        )}
      </article>
    </ScrollReveal>
  );
}
