import { useEffect, useCallback, useState, useRef } from 'react';
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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < artworks.length - 1;
  const hasMultipleViews = views.length > 1;

  useEffect(() => {
    setViewIndex(0);
    setDetailsOpen(false);
  }, [currentIndex]);

  const cycleView = useCallback(
    (dir: 1 | -1) => {
      if (views.length < 2) return;
      setViewIndex((i) => (i + dir + views.length) % views.length);
    },
    [views.length],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1);
      if (e.key === 'ArrowUp' && hasMultipleViews) {
        e.preventDefault();
        cycleView(-1);
      }
      if (e.key === 'ArrowDown' && hasMultipleViews) {
        e.preventDefault();
        cycleView(1);
      }
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext, hasMultipleViews, cycleView],
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

  const primarySpecs = [
    { label: 'Materials', value: artwork.materials },
    { label: 'Dimensions', value: artwork.dimensions },
    { label: 'Availability', value: artwork.availability },
  ];

  const moreSpecs = [
    { label: 'Year', value: String(artwork.year) },
    { label: 'Technique', value: artwork.technique },
    { label: 'Surface', value: artwork.surface },
    { label: 'Framing', value: artwork.framing },
    { label: 'Signed', value: artwork.signed ? 'Yes' : 'No' },
    {
      label: 'Certificate',
      value: artwork.certificateOfAuthenticity ? 'Yes' : 'No',
    },
  ];

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 40 && Math.abs(dy) < 40) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        if (hasMultipleViews) cycleView(1);
        else if (hasNext) onNavigate(currentIndex + 1);
      } else if (hasMultipleViews) cycleView(-1);
      else if (hasPrev) onNavigate(currentIndex - 1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-ink"
        onClick={onClose}
      >
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative flex h-[100dvh] w-full flex-col md:mx-auto md:h-[min(92vh,900px)] md:max-w-6xl md:flex-row md:overflow-hidden md:bg-ink md:shadow-2xl"
          style={{ marginTop: 'max(0px, env(safe-area-inset-top))' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-20 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur-sm md:top-5 md:right-5 md:bg-transparent"
            aria-label="Close lightbox"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Image stage */}
          <div
            className="relative flex min-h-0 flex-[1.15] flex-col bg-ink md:flex-1"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${artwork.id}-${viewIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex min-h-0 flex-1 items-center justify-center px-3 pt-14 pb-2 md:p-6"
              >
                <LazyImage
                  src={activeView.src}
                  alt={activeView.alt}
                  objectFit="contain"
                  className="max-h-[min(52svh,420px)] w-auto md:max-h-[82vh]"
                  wrapperClassName="flex h-full w-full items-center justify-center bg-transparent"
                />
              </motion.div>
            </AnimatePresence>

            {hasMultipleViews && (
              <div className="flex items-center gap-2 px-3 pb-2 md:hidden">
                <button
                  type="button"
                  onClick={() => cycleView(-1)}
                  className="flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center border border-cream/25 text-cream/80"
                  aria-label="Previous angle"
                >
                  ‹
                </button>
                <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1">
                  {views.map((view, i) => (
                    <button
                      key={view.src}
                      type="button"
                      onClick={() => setViewIndex(i)}
                      className={`relative h-14 w-12 shrink-0 touch-manipulation overflow-hidden border ${
                        i === viewIndex ? 'border-gold' : 'border-cream/20 opacity-55'
                      }`}
                      aria-label={`Angle ${i + 1} of ${views.length}`}
                      aria-current={i === viewIndex}
                    >
                      <img src={view.src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => cycleView(1)}
                  className="flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center border border-cream/25 text-cream/80"
                  aria-label="Next angle"
                >
                  ›
                </button>
              </div>
            )}

            {hasMultipleViews && (
              <p className="px-4 pb-2 text-center text-[0.65rem] tracking-[0.18em] text-gold/80 uppercase md:hidden">
                Angle {viewIndex + 1} / {views.length} · swipe to change
              </p>
            )}

            {/* Desktop alternate thumbs */}
            {hasMultipleViews && (
              <div className="hidden gap-2 overflow-x-auto border-t border-cream/10 p-3 md:flex">
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
                    <img src={view.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex min-h-0 flex-1 flex-col border-t border-cream/10 md:w-[26rem] md:flex-none md:border-t-0 md:border-l">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-3 md:p-10">
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

              <h3 className="display-heading mt-3 text-2xl text-cream sm:text-3xl md:mt-4 md:text-4xl">
                {artwork.title}
              </h3>

              {collection && (
                <Link
                  to={`/gallery/${collection.slug}`}
                  onClick={onClose}
                  className="mt-2 inline-block text-xs tracking-[0.2em] text-cream/45 uppercase transition-colors hover:text-gold"
                >
                  {collection.name}
                </Link>
              )}

              <dl className="mt-5 space-y-2.5 border-t border-cream/10 pt-4 md:mt-8 md:space-y-3 md:pt-6">
                {primarySpecs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[1fr_auto] gap-4 text-sm">
                    <dt className="text-cream/40">{spec.label}</dt>
                    <dd className="text-right text-cream/75">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-sm leading-relaxed text-cream/60 md:mt-6">
                {artwork.description}
              </p>

              <button
                type="button"
                onClick={() => setDetailsOpen((o) => !o)}
                className="mt-4 flex w-full touch-manipulation items-center justify-between border border-cream/15 px-3 py-3 text-left text-[0.65rem] tracking-[0.2em] text-cream/70 uppercase md:mt-6"
                aria-expanded={detailsOpen}
              >
                {detailsOpen ? 'Hide details' : 'More details'}
                <span aria-hidden>{detailsOpen ? '−' : '+'}</span>
              </button>

              {detailsOpen && (
                <div className="mt-4 space-y-5 border-t border-cream/10 pt-4">
                  <dl className="space-y-2.5">
                    {moreSpecs.map((spec) => (
                      <div key={spec.label} className="grid grid-cols-[1fr_auto] gap-4 text-sm">
                        <dt className="text-cream/40">{spec.label}</dt>
                        <dd className="text-right text-cream/75">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div>
                    <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                      Shipping
                    </p>
                    <p className="mt-2 text-sm text-cream/55">{SHIPPING_NOTE}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                      Care Instructions
                    </p>
                    <p className="mt-2 text-sm text-cream/55">{CARE_INSTRUCTIONS}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 border-t border-cream/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:p-6">
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                disabled={!hasPrev}
                className="flex h-12 flex-1 touch-manipulation items-center justify-center border border-cream/20 text-sm text-cream/70 transition-colors active:scale-[0.98] hover:border-gold hover:text-gold disabled:opacity-20"
                aria-label="Previous artwork"
              >
                ← Prev
              </button>
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={!hasNext}
                className="flex h-12 flex-1 touch-manipulation items-center justify-center border border-cream/20 text-sm text-cream/70 transition-colors active:scale-[0.98] hover:border-gold hover:text-gold disabled:opacity-20"
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
