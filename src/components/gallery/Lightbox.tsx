import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Artwork } from '../../types';
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
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < artworks.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1);
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext],
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden bg-cream md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center text-ink/60 transition-colors hover:text-ink"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="flex-1 bg-cream-dark">
            <LazyImage
              src={artwork.image}
              alt={artwork.imageAlt}
              className="max-h-[60vh] object-contain md:max-h-[90vh]"
              wrapperClassName="h-full min-h-[300px] md:min-h-[500px]"
            />
          </div>

          <div className="flex w-full flex-col justify-center p-8 md:w-80 md:p-10">
            <p className="mb-2 text-xs tracking-widest text-terracotta uppercase">
              {currentIndex + 1} / {artworks.length}
            </p>
            <h3 className="font-serif text-3xl text-ink">{artwork.title}</h3>
            <div className="mt-4 space-y-1 text-sm text-ink-soft">
              <p>{artwork.medium}</p>
              <p>{artwork.size}</p>
            </div>
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                disabled={!hasPrev}
                className="flex h-11 w-11 items-center justify-center border border-ink/20 transition-colors hover:border-terracotta disabled:opacity-30"
                aria-label="Previous artwork"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={!hasNext}
                className="flex h-11 w-11 items-center justify-center border border-ink/20 transition-colors hover:border-terracotta disabled:opacity-30"
                aria-label="Next artwork"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
