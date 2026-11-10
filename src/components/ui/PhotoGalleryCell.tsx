import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { OrientedPhoto, type PhotoOrientation } from './OrientedPhoto';

interface PhotoGalleryCellProps {
  src: string;
  alt: string;
  delay?: number;
}

export function PhotoGalleryCell({ src, alt, delay = 0 }: PhotoGalleryCellProps) {
  const [orientation, setOrientation] = useState<PhotoOrientation | null>(null);
  const wide = orientation === 'landscape';

  return (
    <ScrollReveal delay={delay} className={wide ? 'sm:col-span-2' : undefined}>
      <OrientedPhoto src={src} alt={alt} onOrient={setOrientation} />
    </ScrollReveal>
  );
}
