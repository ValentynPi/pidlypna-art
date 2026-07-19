import { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Artwork } from '../../types';
import { getArtworkImages, SHIPPING_NOTE, CARE_INSTRUCTIONS } from '../../data/artworks';
import { getCollectionById } from '../../data/collections';
import { LazyImage } from '../ui/LazyImage';

interface LightboxProps {
  artworks: Artwork[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  artworks,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const artwork = artworks[currentIndex];
  const views = artwork ? getArtworkImages(artwork) : [];
  const collection = artwork ? getCollectionById(artwork.collectionId) : undefined;
  const [viewIndex, setViewIndex] = useState(0);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < artworks.length - 1;
  const hasMultipleViews = views.length > 1;

  useEffect(() => {
    setViewIndex(0);
  }, [currentIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1);
      if (e.key === 'ArrowUp' && hasMultipleViews) {
        e.preventDefault();
        setViewIndex((i) => (i > 0 ? i - 1 : views.length - 1));
      }
      if (e.key === 'ArrowDown' && hasMultipleViews) {
        e.preventDefault();
        setViewIndex((i) => (i < views.length - 1 ? i + 1 : 0));
      }
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext, hasMultipleViews, views.length],
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!artwork) return null;

  const activeView = views[viewIndex] ?? views[0];
  const isAvailable = artwork.availability === 'Available';

  const specs: { label: string; value: string }[] = [
    { label: 'Year', value: String(artwork.year) },
    { label: 'Dimensions', value: artwork.dimensions },
    { label: 'Materials', value: artwork.materials },
    { label: 'Technique', value: artwork.technique },
    { label: 'Surface', value: artwork.surface },
    { label: 'Framing', value: artwork.framing },
    { label: 'Signed', value: artwork.signed ? 'Yes' : 'No' },
    {
      label: 'Certificate of Authenticity',
      value: artwork.certificateOfAuthenticity ? 'Yes' : 'No',
    },
    { label: 'Availability', value: artwork.availability },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden bg-ink md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center text-cream/50 transition-colors hover:text-cream"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-1 flex-col bg-ink">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${artwork.id}-${viewIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-1"
              >
                <LazyImage
                  src={activeView.src}
                  alt={activeView.alt}
                  className="max-h-[40vh] object-contain md:max-h-[78vh]"
                  wrapperClassName="h-full min-h-[240px] md:min-h-[480px]"
                />
              </motion.div>
            </AnimatePresence>

            {hasMultipleViews && (
              <div className="flex gap-2 overflow-x-auto border-t border-cream/10 p-3">
                {views.map((view, i) => (
                  <button
                    key={view.src}
                    type="button"
                    onClick={() => setViewIndex(i)}
                    className={`relative h-16 w-14 shrink-0 overflow-hidden border transition-colors ${
                      i === viewIndex
                        ? 'border-gold'
                        : 'border-cream/20 opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`View ${i + 1} of ${views.length}`}
                  >
                    <img
                      src={view.src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex w-full flex-col border-t border-cream/10 md:w-[26rem] md:border-t-0 md:border-l">
            <div className="flex-1 overflow-y-auto p-8 md:p-10">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                  {String(currentIndex + 1).padStart(2, '0')} /{' '}
                  {String(artworks.length).padStart(2, '0')}
                </p>
                <span
                  className={`text-[0.65rem] tracking-[0.2em] uppercase ${
                    isAvailable ? 'text-gold' : 'text-cream/40'
                  }`}
                >
                  {artwork.availability}
                </span>
              </div>

              <h3 className="display-heading mt-4 text-3xl text-cream md:text-4xl">
                {artwork.title}
              </h3>

              {collection && (
                <Link
                  to={`/gallery/${collection.slug}`}
                  onClick={onClose}
                  className="mt-3 inline-block text-xs tracking-[0.2em] text-cream/45 uppercase transition-colors hover:text-gold"
                >
                  {collection.name}
                </Link>
              )}

              <dl className="mt-8 space-y-3 border-t border-cream/10 pt-6">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="grid grid-cols-[1fr_auto] gap-4 text-sm"
                  >
                    <dt className="text-cream/40">{spec.label}</dt>
                    <dd className="text-right text-cream/75">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 border-t border-cream/10 pt-6">
                <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                  Description
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  {artwork.description}
                </p>
              </div>

              <div className="mt-8 space-y-4 border-t border-cream/10 pt-6 text-sm">
                <div>
                  <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                    Shipping
                  </p>
                  <p className="mt-2 text-cream/55">{SHIPPING_NOTE}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                    Care Instructions
                  </p>
                  <p className="mt-2 text-cream/55">{CARE_INSTRUCTIONS}</p>
                </div>
              </div>

              {hasMultipleViews && (
                <p className="mt-6 text-xs text-gold/70">
                  View {viewIndex + 1} of {views.length} — same painting, different angle
                </p>
              )}
            </div>

            <div className="flex gap-2 border-t border-cream/10 p-4 md:p-6">
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                disabled={!hasPrev}
                className="flex h-12 flex-1 items-center justify-center border border-cream/20 text-cream/70 transition-colors hover:border-gold hover:text-gold disabled:opacity-20"
                aria-label="Previous artwork"
              >
                ← Prev
              </button>
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={!hasNext}
                className="flex h-12 flex-1 items-center justify-center border border-cream/20 text-cream/70 transition-colors hover:border-gold hover:text-gold disabled:opacity-20"
                aria-label="Next artwork"
              >
                Next →
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
