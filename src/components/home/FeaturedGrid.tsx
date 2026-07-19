import { Link } from 'react-router-dom';
import type { Artwork } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LazyImage } from '../ui/LazyImage';
import { Button } from '../ui/Button';
import { SectionLabel } from '../ui/SectionLabel';

interface FeaturedGridProps {
  artworks: Artwork[];
}

const layoutClasses = [
  'lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-6',
  'lg:col-span-6',
];

export function FeaturedGrid({ artworks }: FeaturedGridProps) {
  return (
    <section className="section-padding mx-auto max-w-[90rem]">
      <ScrollReveal>
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>Selected Works</SectionLabel>
            <h2 className="display-heading mt-6 text-4xl md:text-5xl lg:text-6xl">
              Into the studio
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft lg:text-right">
            Each piece a conversation between memory and place — tradition
            held gently in the present moment.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[repeat(3,auto)] lg:gap-4">
        {artworks.slice(0, 8).map((artwork, index) => (
          <ScrollReveal
            key={artwork.id}
            delay={index * 0.06}
            className={layoutClasses[index] ?? ''}
          >
            <Link
              to="/gallery"
              className="group relative block overflow-hidden bg-ink"
              style={{ aspectRatio: index === 0 ? '4/5' : index < 3 ? '3/4' : '1/1' }}
            >
              <LazyImage
                src={artwork.image}
                alt={artwork.imageAlt}
                className="h-full transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 transition-all duration-500 group-hover:bg-ink/30" />
              <div className="absolute top-4 left-4 font-serif text-5xl text-cream/20 transition-colors group-hover:text-gold/40">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="absolute right-0 bottom-0 left-0 translate-y-full bg-ink/80 p-5 backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
                <p className="font-serif text-xl text-cream">{artwork.title}</p>
                <p className="mt-1 text-xs tracking-wider text-cream/50 uppercase">
                  {artwork.materials} · {artwork.dimensions}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-16 flex justify-center">
        <Button to="/gallery" variant="ghost">
          Explore Full Gallery
        </Button>
      </ScrollReveal>
    </section>
  );
}
