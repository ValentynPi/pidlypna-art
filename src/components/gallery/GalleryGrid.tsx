import { Link, useNavigate, useParams } from 'react-router-dom';
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
      <div className={`grid ${gridClass} gap-6 md:gap-8`}>
        {artworks.map((artwork) => {
          const viewCount = getArtworkImages(artwork).length;
          const href = getArtworkPath(artwork);
          const title = getArtworkTitle(artwork.id, language, artwork.title);
          return (
            <Link
              key={artwork.id}
              to={href}
              className="group block touch-manipulation text-left"
            >
              <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
                <LazyImage
                  src={artwork.image}
                  alt={artwork.imageAlt}
                  objectFit="contain"
                  plain
                  wrapperClassName="h-full w-full"
                  className="h-full w-full"
                />
              </div>
              <div className="mt-3">
                <p className="font-serif text-lg text-ink group-hover:text-terracotta md:text-xl">
                  {title}
                </p>
                <p className="mt-1 text-[0.65rem] tracking-wider text-ink-soft uppercase sm:text-xs">
                  {listingMedium(artwork, t)}
                  {viewCount > 1 ? ` · ${viewCount} angles` : ''}
                </p>
              </div>
            </Link>
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
