import { useEffect, useState, type ImgHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

export type PhotoOrientation = 'portrait' | 'landscape' | 'square';

interface OrientedPhotoProps {
  src: string;
  alt: string;
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
  onOrient,
  className = '',
  imgClassName = '',
}: OrientedPhotoProps) {
  const [orientation, setOrientation] = useState<PhotoOrientation | null>(null);

  function applyDimensions(width: number, height: number) {
    const next = orientationFromSize(width, height);
    setOrientation(next);
    onOrient?.(next);
  }

  const onLoad: ImgHTMLAttributes<HTMLImageElement>['onLoad'] = (event) => {
    const img = event.currentTarget;
    applyDimensions(img.naturalWidth, img.naturalHeight);
  };

  useEffect(() => {
    setOrientation(null);
  }, [src]);

  return (
    <motion.div
      layout
      className={`relative flex min-h-[8rem] justify-center bg-cream-dark/90 p-2 sm:p-3 ${className}`}
    >
      <img
        key={src}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={onLoad}
        className={`h-auto max-h-[min(85vh,52rem)] w-auto max-w-full object-contain ${
          orientation === 'landscape' ? 'sm:max-w-full sm:w-full' : 'mx-auto'
        } ${imgClassName}`}
      />
    </motion.div>
  );
}
