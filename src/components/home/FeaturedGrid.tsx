import { Link } from 'react-router-dom';
import type { Artwork } from '../../types';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LazyImage } from '../ui/LazyImage';
import { Button } from '../ui/Button';

interface FeaturedGridProps {
  artworks: Artwork[];
}

export function FeaturedGrid({ artworks }: FeaturedGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <ScrollReveal>
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs tracking-[0.3em] text-terracotta uppercase">
              Selected Works
            </p>
            <h2 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
              A glimpse into the studio
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
            A curated selection — each piece a conversation between memory and
            place, tradition and the present moment.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
        {artworks.slice(0, 8).map((artwork, index) => {
          const isLarge = index === 0 || index === 5;
          return (
            <ScrollReveal
              key={artwork.id}
              delay={index * 0.08}
              className={isLarge ? 'sm:col-span-2 sm:row-span-2' : ''}
            >
              <Link
                to="/gallery"
                className="group relative block aspect-[4/5] overflow-hidden bg-cream-dark sm:aspect-auto sm:h-full sm:min-h-[280px]"
              >
                <LazyImage
                  src={artwork.image}
                  alt={artwork.imageAlt}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                <div className="absolute right-0 bottom-0 left-0 p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="font-serif text-lg text-cream">{artwork.title}</p>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal className="mt-16 text-center">
        <Button to="/gallery" variant="ghost">
          Explore Full Gallery
        </Button>
      </ScrollReveal>
    </section>
  );
}
