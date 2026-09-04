import { useState } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src?: string;
  alt?: string;
  className?: string;
  wrapperClassName?: string;
  /** cover = fill and crop; contain = show full image */
  objectFit?: 'cover' | 'contain';
}

export function LazyImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  objectFit = 'cover',
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const sizeClass =
    objectFit === 'contain' ? 'max-h-full max-w-full' : 'h-full w-full';
  const positionClass = wrapperClassName.includes('absolute')
    ? 'overflow-hidden'
    : 'relative overflow-hidden';

  return (
    <div className={`${positionClass} bg-cream-dark ${wrapperClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-cream-dark" />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.03 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`${sizeClass} ${fitClass} ${className}`}
      />
    </div>
  );
}
