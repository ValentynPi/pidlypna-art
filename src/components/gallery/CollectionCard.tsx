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
    <ScrollReveal delay={Math.min(index * 0.03, 0.18)}>
      <Link to={`/gallery/${collection.slug}`} className="group block touch-manipulation">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink">
          <LazyImage
            src={collection.coverImage}
            alt={collection.coverAlt}
            objectFit="contain"
            wrapperClassName="absolute inset-0 h-full w-full bg-ink"
            className="p-2 transition-transform duration-700 ease-out sm:p-0 sm:group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute top-2.5 left-2.5 font-serif text-lg text-cream/35 md:text-xl">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3 md:p-3.5">
            <h3 className="font-serif text-sm leading-snug text-cream md:text-base">
              {name}
            </h3>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}
