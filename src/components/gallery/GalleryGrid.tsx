import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Artwork } from '../../types';
import { LazyImage } from '../ui/LazyImage';
import { Lightbox } from './Lightbox';

interface GalleryGridProps {
  artworks: Artwork[];
  columns?: 2 | 3;
}

export function GalleryGrid({ artworks, columns = 3 }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gridClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <>
      <div className={`grid ${gridClass} gap-4 md:gap-6`}>
        {artworks.map((artwork, index) => (
          <motion.button
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/5] cursor-pointer overflow-hidden bg-cream-dark text-left"
          >
            <LazyImage
              src={artwork.image}
              alt={artwork.imageAlt}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
            <div className="absolute right-0 bottom-0 left-0 translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0">
              <p className="font-serif text-xl text-cream">{artwork.title}</p>
              <p className="mt-1 text-sm text-cream/70">{artwork.medium}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          artworks={artworks}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
