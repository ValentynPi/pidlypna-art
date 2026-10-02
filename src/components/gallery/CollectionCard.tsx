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
        <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
          <LazyImage
            src={collection.coverImage}
            alt={collection.coverAlt}
            objectFit="contain"
            plain
            wrapperClassName="h-full w-full"
            className="h-full w-full"
          />
        </div>
        <h3 className="mt-2.5 font-serif text-sm leading-snug text-ink group-hover:text-terracotta md:text-base">
          {name}
        </h3>
      </Link>
    </ScrollReveal>
  );
}
