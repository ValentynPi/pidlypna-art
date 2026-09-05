import { useEffect, useCallback, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Artwork } from '../../types';
import { getArtworkImages } from '../../data/artworks';
import {
  listingDescription,
  listingDetails,
  madeToOrderText,
} from '../../data/listing';
import { getCollectionById } from '../../data/collections';
import { LazyImage } from '../ui/LazyImage';
import { useLanguage } from '../../i18n/LanguageContext';
import { getArtworkTitle } from '../../i18n/artworkTitles';

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
  const { language, t } = useLanguage();
  const artwork = artworks[currentIndex];
  const views = artwork ? getArtworkImages(artwork) : [];
  const collection = artwork ? getCollectionById(artwork.collectionId) : undefined;
  const [viewIndex, setViewIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < artworks.length - 1;
  const hasMultipleViews = views.length > 1;

  useEffect(() => {
    setViewIndex(0);
    setDetailsOpen(false);
    setExpanded(false);
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
      if (e.key === 'Escape') {
        if (expanded) {
          setExpanded(false);
          return;
        }
        onClose();
      }
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
    [onClose, onNavigate, currentIndex, hasPrev, hasNext, hasMultipleViews, cycleView, expanded],
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
  const details = listingDetails(artwork, t, language);

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
          className="relative flex h-[100dvh] w-full flex-col md:flex-row md:overflow-hidden"
          style={{ marginTop: 'max(0px, env(safe-area-inset-top))' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-20 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-ink/60 text-cream backdrop-blur-sm md:top-5 md:right-5 md:bg-transparent"
            aria-label={t('lightbox.close')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Image stage */}
          <div
            className="relative flex min-h-0 flex-[1.4] flex-col bg-ink md:flex-[1.7]"
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
                className="flex min-h-0 flex-1 cursor-zoom-in items-center justify-center px-2 pt-12 pb-2 md:p-4"
                onClick={() => setExpanded(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpanded(true);
                  }
                }}
                aria-label={t('lightbox.viewLarger')}
              >
                <LazyImage
                  src={activeView.src}
                  alt={activeView.alt}
                  objectFit="contain"
                  className="max-h-[72svh] w-auto md:max-h-[94vh]"
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
                {t('lightbox.angle', {
                  current: String(viewIndex + 1),
                  total: String(views.length),
                })}
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
          <div className="flex min-h-0 flex-1 flex-col border-t border-cream/10 md:w-[22rem] md:flex-none md:border-t-0 md:border-l lg:w-[26rem]">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-3 md:p-10">
              <div>
                <p className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                  {String(currentIndex + 1).padStart(2, '0')} /{' '}
                  {String(artworks.length).padStart(2, '0')}
                </p>
              </div>

              <h3 className="display-heading mt-3 text-2xl text-cream sm:text-3xl md:mt-4 md:text-4xl">
                {getArtworkTitle(artwork.id, language, artwork.title)}
              </h3>

              {collection && (
                <Link
                  to={`/gallery/${collection.slug}`}
                  onClick={onClose}
                  className="mt-2 inline-block text-xs tracking-[0.2em] text-cream/45 uppercase transition-colors hover:text-gold"
                >
                  {t(`collections.${collection.id}`)}
                </Link>
              )}

              <p className="mt-5 text-sm leading-relaxed text-cream/70 md:mt-6">
                {listingDescription(artwork, language)}
              </p>

              <div className="mt-6 border-t border-cream/10 pt-5">
                <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                  {t('lightbox.details')}
                </p>
                <dl className="mt-4 space-y-2.5">
                  {details.map((spec) => (
                    <div key={spec.labelKey} className="grid grid-cols-[7.5rem_1fr] gap-3 text-sm">
                      <dt className="text-cream/40">{t(spec.labelKey)}</dt>
                      <dd className="text-cream/80">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 border-t border-cream/10 pt-5">
                <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                  {t('lightbox.madeToOrder')}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  {madeToOrderText(artwork, t, language)}
                </p>
              </div>

              <div className="mt-6 border-t border-cream/10 pt-5">
                <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                  {t('lightbox.customizations')}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">
                  {t('lightbox.customizationsText')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDetailsOpen((o) => !o)}
                className="mt-6 flex w-full touch-manipulation items-center justify-between border border-cream/15 px-3 py-3 text-left text-[0.65rem] tracking-[0.2em] text-cream/70 uppercase"
                aria-expanded={detailsOpen}
              >
                {detailsOpen ? t('lightbox.hideShippingCare') : t('lightbox.shippingCare')}
                <span aria-hidden>{detailsOpen ? '−' : '+'}</span>
              </button>

              {detailsOpen && (
                <div className="mt-4 space-y-5">
                  <div>
                    <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                      {t('lightbox.shipping')}
                    </p>
                    <p className="mt-2 text-sm text-cream/55">{t('lightbox.shippingNote')}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                      {t('lightbox.care')}
                    </p>
                    <p className="mt-2 text-sm text-cream/55">{t('lightbox.careNote')}</p>
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
                {t('lightbox.prev')}
              </button>
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={!hasNext}
                className="flex h-12 flex-1 touch-manipulation items-center justify-center border border-cream/20 text-sm text-cream/70 transition-colors active:scale-[0.98] hover:border-gold hover:text-gold disabled:opacity-20"
                aria-label="Next artwork"
              >
                {t('lightbox.next')}
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-30 flex cursor-zoom-out items-center justify-center bg-ink p-2 sm:p-4"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-40 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full bg-ink/60 text-cream"
                aria-label={t('lightbox.closeLarge')}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <img
                src={activeView.src}
                alt={activeView.alt}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
