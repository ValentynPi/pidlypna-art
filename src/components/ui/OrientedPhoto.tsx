import { useState, type ImgHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

export type PhotoOrientation = 'portrait' | 'landscape' | 'square';

interface OrientedPhotoProps {
  src: string;
  alt: string;
  /** Span two columns on sm+ when the image is wide. */
  wideSpansColumns?: boolean;
  onOrient?: (orientation: PhotoOrientation) => void;
  className?: string;
  imgClassName?: string;
}

function orientationFromSize(width: number, height: number): PhotoOrientation {
  if (height > width * 1.08) return 'portrait';
  if (width > height * 1.08) return 'landscape';
  return 'square';
}

export function OrientedPhoto({
  src,
  alt,
  wideSpansColumns = true,
  onOrient,
  className = '',
  imgClassName = '',
}: OrientedPhotoProps) {
  const [orientation, setOrientation] = useState<PhotoOrientation | null>(null);
  const [loaded, setLoaded] = useState(false);

  const onLoad: ImgHTMLAttributes<HTMLImageElement>['onLoad'] = (event) => {
    const img = event.currentTarget;
    const next = orientationFromSize(img.naturalWidth, img.naturalHeight);
    setOrientation(next);
    onOrient?.(next);
    setLoaded(true);
  };

  const wide = wideSpansColumns && orientation === 'landscape';

  return (
    <motion.div
      layout
      className={`relative flex min-h-[10rem] justify-center bg-cream-dark/90 p-2 sm:p-3 ${wide ? 'sm:col-span-2' : ''} ${className}`}
    >
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-cream-dark" aria-hidden />
      ) : null}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={onLoad}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`relative z-[1] h-auto max-h-[min(85vh,52rem)] w-auto max-w-full object-contain ${
          orientation === 'landscape' ? 'sm:max-w-full sm:w-full' : 'mx-auto'
        } ${imgClassName}`}
      />
    </motion.div>
  );
}
