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
  const isWide = index === 0 || index === 3;

  return (
    <ScrollReveal delay={index * 0.08} className={isWide ? 'md:col-span-2' : ''}>
      <Link to={`/gallery/${collection.slug}`} className="group block">
        <div
          className={`relative overflow-hidden bg-ink ${
            isWide ? 'aspect-[21/9]' : 'aspect-[4/5]'
          }`}
        >
          <LazyImage
            src={collection.coverImage}
            alt={collection.coverAlt}
            className="transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ink/20 transition-colors duration-500 group-hover:bg-ink/40" />
          <div className="absolute top-6 left-6 font-serif text-5xl text-cream/20">
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
            <motion.h3
              className="font-serif text-2xl text-cream md:text-3xl lg:text-4xl"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.3 }}
            >
              {collection.name}
            </motion.h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {collection.intro}
            </p>
          </div>
        </div>
        {!isWide && (
          <p className="mt-4 text-sm leading-relaxed text-ink-soft line-clamp-2 md:hidden">
            {collection.intro}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-terracotta uppercase transition-colors group-hover:text-gold">
          View collection
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </ScrollReveal>
  );
}
