import type { JourneyEntry as JourneyEntryType } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LazyImage } from '../ui/LazyImage';
import { HandLine } from '../ui/HandLine';

interface JourneyEntryProps {
  entry: JourneyEntryType;
  index: number;
}

export function JourneyEntry({ entry, index }: JourneyEntryProps) {
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal>
      <article className={`relative ${index > 0 ? 'mt-20 md:mt-28' : ''}`}>
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div
            className={`md:col-span-5 ${
              isEven ? 'md:col-start-1' : 'md:col-start-8 md:row-start-1'
            }`}
          >
            <p className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
              {entry.date} · {entry.location}
            </p>
            <h3 className="display-heading mt-4 text-3xl md:text-4xl">{entry.title}</h3>
            <HandLine variant="underline" className="mt-4 w-24 text-gold" />
            <p className="mt-6 leading-[1.8] text-ink-soft">{entry.narrative}</p>
          </div>

          <div
            className={`md:col-span-6 ${
              isEven ? 'md:col-start-7' : 'md:col-start-1'
            }`}
          >
            <div
              className={`grid gap-2 ${
                entry.images.length >= 3 ? 'grid-cols-2' : 'grid-cols-2'
              }`}
            >
              {entry.images.map((img, imgIndex) => (
                <div
                  key={img.alt}
                  className={`overflow-hidden bg-ink ${
                    imgIndex === 0 && entry.images.length >= 3
                      ? 'col-span-2 aspect-[16/9]'
                      : 'aspect-[4/3]'
                  }`}
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
        </div>

        <div className="mt-12 h-px w-full bg-ink/8" />
      </article>
    </ScrollReveal>
  );
}
