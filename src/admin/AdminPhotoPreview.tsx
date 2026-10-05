import { useEffect, useState } from 'react';
import { editorImageCandidates } from './editorImageUrl';

interface AdminPhotoPreviewProps {
  storagePath: string;
  localSrc?: string;
  className?: string;
}

/** Tries CDN → GitHub raw → live site so uploads preview before GitHub Pages finishes. */
export function AdminPhotoPreview({ storagePath, localSrc, className }: AdminPhotoPreviewProps) {
  const candidates = localSrc
    ? [localSrc, ...editorImageCandidates(storagePath)]
    : editorImageCandidates(storagePath);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [storagePath, localSrc]);

  const src = candidates[index];

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-cream-dark text-[0.6rem] text-ink-soft ${className ?? ''}`}
      >
        No preview
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className={className}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        setIndex((i) => (i + 1 < candidates.length ? i + 1 : i));
      }}
    />
  );
}
