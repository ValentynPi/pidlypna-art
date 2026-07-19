import { Link } from 'react-router-dom';
import { collections } from '../../data/collections';
import { ScrollReveal } from '../ui/ScrollReveal';
import { LazyImage } from '../ui/LazyImage';
import { SectionLabel } from '../ui/SectionLabel';

export function CollectionsStrip() {
  return (
    <section className="overflow-hidden bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16">
        <ScrollReveal>
          <SectionLabel light>Collections</SectionLabel>
          <h2 className="display-heading mt-6 text-3xl text-cream md:text-4xl">
            Nine chapters, one story
          </h2>
        </ScrollReveal>
      </div>

      <div className="mt-12 flex gap-4 overflow-x-auto px-6 pb-4 md:px-10 lg:px-16 scrollbar-none">
        {collections.map((collection, index) => (
          <ScrollReveal key={collection.id} delay={index * 0.08} className="shrink-0">
            <Link
              to={`/gallery/${collection.slug}`}
              className="group block w-72 md:w-80"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <LazyImage
                  src={collection.coverImage}
                  alt={collection.coverAlt}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/30 transition-colors group-hover:bg-ink/10" />
                <div className="absolute top-4 left-4 font-serif text-3xl text-cream/30">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="absolute right-0 bottom-0 left-0 p-5">
                  <p className="font-serif text-xl text-cream">{collection.name}</p>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
