import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Artwork } from '../../types';
import { getArtworkImages } from '../../data/artworks';
import { getArtworkPath, getArtworkSlug } from '../../data/artworkPaths';
import { listingMedium } from '../../data/listing';
import { useLanguage } from '../../i18n/LanguageContext';
import { getArtworkTitle } from '../../i18n/artworkTitles';
import { LazyImage } from '../ui/LazyImage';
import { Lightbox } from './Lightbox';

interface GalleryGridProps {
  artworks: Artwork[];
  columns?: 2 | 3;
}

export function GalleryGrid({ artworks, columns = 3 }: GalleryGridProps) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { slug, artworkSlug } = useParams<{ slug: string; artworkSlug?: string }>();

  const lightboxIndex = artworkSlug
    ? artworks.findIndex(
        (artwork) => getArtworkSlug(artwork) === artworkSlug || artwork.id === artworkSlug,
      )
    : -1;

  const gridClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <>
      <div className={`grid ${gridClass} gap-3 md:gap-4`}>
        {artworks.map((artwork, index) => {
          const viewCount = getArtworkImages(artwork).length;
          const href = getArtworkPath(artwork);
          return (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="relative aspect-[4/5] overflow-hidden bg-ink"
            >
              <Link
                to={href}
                className="group absolute inset-0 cursor-pointer text-left touch-manipulation"
              >
                <LazyImage
                  src={artwork.image}
                  alt={artwork.imageAlt}
                  wrapperClassName="absolute inset-0 h-full w-full"
                  className="transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/25 transition-all duration-500 sm:bg-ink/0 sm:group-hover:bg-ink/35" />
                <div className="absolute top-3 left-3 font-serif text-2xl text-cream/25 sm:top-4 sm:left-4 sm:text-3xl sm:text-cream/20">
                  {String(index + 1).padStart(2, '0')}
                </div>
                {viewCount > 1 && (
                  <div className="absolute top-3 right-3 border border-cream/30 bg-ink/70 px-2 py-1 text-[0.6rem] tracking-[0.15em] text-cream/80 uppercase backdrop-blur-sm sm:top-4 sm:right-4">
                    {viewCount} views
                  </div>
                )}
                <div className="absolute right-0 bottom-0 left-0 translate-y-0 bg-ink/80 p-4 backdrop-blur-sm transition-transform duration-500 sm:translate-y-full sm:p-5 sm:group-hover:translate-y-0">
                  <p className="font-serif text-lg text-cream sm:text-xl">
                    {getArtworkTitle(artwork.id, language, artwork.title)}
                  </p>
                  <p className="mt-1 text-[0.65rem] tracking-wider text-cream/50 uppercase sm:text-xs">
                    {listingMedium(artwork, t)}
                    {viewCount > 1 ? ` · ${viewCount} angles` : ''}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {lightboxIndex >= 0 && (
        <Lightbox
          artworks={artworks}
          currentIndex={lightboxIndex}
          onClose={() => navigate(slug ? `/gallery/${slug}` : '/gallery')}
          onNavigate={(index) => {
            const next = artworks[index];
            if (next) navigate(getArtworkPath(next), { replace: true });
          }}
        />
      )}
    </>
  );
}
