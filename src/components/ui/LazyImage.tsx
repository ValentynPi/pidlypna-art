import { useState } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src?: string;
  alt?: string;
  className?: string;
  wrapperClassName?: string;
}

export function LazyImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-cream-dark ${wrapperClassName}`}>
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
        className={`h-full w-full object-cover ${className}`}
      />
    </div>
  );
}
