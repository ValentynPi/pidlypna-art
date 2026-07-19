import { Link } from 'react-router-dom';
import type { Collection } from '../../types';
import { LazyImage } from '../ui/LazyImage';
import { ScrollReveal } from '../ui/ScrollReveal';

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  return (
    <ScrollReveal delay={index * 0.04}>
      <Link to={`/gallery/${collection.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink">
          <LazyImage
            src={collection.coverImage}
            alt={collection.coverAlt}
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ink/25 transition-colors duration-400 group-hover:bg-ink/45" />
          <div className="absolute top-2.5 left-2.5 font-serif text-lg text-cream/25 md:text-xl">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3 md:p-3.5">
            <h3 className="font-serif text-sm leading-snug text-cream md:text-base">
              {collection.name}
            </h3>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}
