import { useState } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src?: string;
  alt?: string;
  className?: string;
  wrapperClassName?: string;
  /** cover = fill and crop; contain = show full image */
  objectFit?: 'cover' | 'contain';
  /** No load animation or pulse — for gallery artwork */
  plain?: boolean;
}

export function LazyImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  objectFit = 'cover',
  plain = false,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const sizeClass =
    objectFit === 'contain' ? 'max-h-full max-w-full' : 'h-full w-full max-w-none';
  const positionClass = wrapperClassName.includes('absolute')
    ? 'overflow-hidden'
    : 'relative overflow-hidden';
  const alignClass = objectFit === 'contain' ? 'flex items-center justify-center' : '';

  const imgClass = `${sizeClass} ${fitClass} ${className}`;

  return (
    <div className={`${positionClass} ${alignClass} bg-cream-dark ${wrapperClassName}`}>
      {!plain && !loaded && (
        <div className="absolute inset-0 animate-pulse bg-cream-dark" />
      )}
      {plain ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={imgClass}
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.03 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={imgClass}
        />
      )}
    </div>
  );
}
