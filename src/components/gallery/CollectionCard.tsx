import { Link } from 'react-router-dom';
import type { Collection } from '../../types';
import { LazyImage } from '../ui/LazyImage';
import { ScrollReveal } from '../ui/ScrollReveal';
import { useLanguage } from '../../i18n/LanguageContext';

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  const { t } = useLanguage();
  const name = t(`collections.${collection.id}`);
  return (
    <ScrollReveal delay={index * 0.05}>
      <Link to={`/gallery/${collection.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink">
          <LazyImage
            src={collection.coverImage}
            alt={collection.coverAlt}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-ink/20 transition-colors duration-500 group-hover:bg-ink/40" />
          <div className="absolute top-4 left-4 font-serif text-xl text-cream/30 md:text-2xl">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 via-ink/35 to-transparent p-5 pt-16 md:p-6">
            <h3 className="font-serif text-lg leading-snug text-cream md:text-xl">
              {name}
            </h3>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}
