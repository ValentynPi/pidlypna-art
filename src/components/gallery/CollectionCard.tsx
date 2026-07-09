import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Collection } from '../../types';
import { LazyImage } from '../ui/LazyImage';
import { ScrollReveal } from '../ui/ScrollReveal';

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <Link to={`/gallery/${collection.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
          <LazyImage
            src={collection.coverImage}
            alt={collection.coverAlt}
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
            <motion.h3
              className="font-serif text-2xl text-cream md:text-3xl"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {collection.name}
            </motion.h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
          {collection.intro}
        </p>
        <span className="mt-3 inline-block text-sm tracking-wide text-terracotta uppercase transition-colors group-hover:text-terracotta-light">
          View collection →
        </span>
      </Link>
    </ScrollReveal>
  );
}
