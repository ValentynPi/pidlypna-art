import { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import type { Artwork } from '../../types';
import { getArtworkImages } from '../../data/artworks';
import { getArtworkPath, getArtworkSlug } from '../../data/artworkPaths';
import { listingMedium } from '../../data/listing';
import { useLanguage } from '../../i18n/LanguageContext';
import { getArtworkTitle } from '../../i18n/artworkTitles';
import { useAdminAuth } from '../../admin/AdminAuthContext';
import { useAdminSiteContent } from '../../admin/AdminSiteContentContext';
import { ArtworkEditSheet } from '../../admin/ArtworkEditSheet';
import { addArtworkToCollection, updateGalleryOrder } from '../../admin/artworkEditorUtils';
import { storedToArtwork } from '../../data/storedArtwork';
import { LazyImage } from '../ui/LazyImage';
import { Lightbox } from './Lightbox';

interface GalleryGridProps {
  artworks: Artwork[];
  collectionId?: string;
  columns?: 2 | 3;
}

export function GalleryGrid({ artworks, collectionId, columns = 3 }: GalleryGridProps) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { slug, artworkSlug } = useParams<{ slug: string; artworkSlug?: string }>();
  const { token } = useAdminAuth();
  const { content, setContent, setDirty } = useAdminSiteContent();
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const dragId = useRef<string | null>(null);

  const canEdit = Boolean(token && collectionId);
  const lightboxIndex = artworkSlug
    ? artworks.findIndex(
        (artwork) => getArtworkSlug(artwork) === artworkSlug || artwork.id === artworkSlug,
      )
    : -1;

  const gridClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  function moveArtwork(id: string, dir: -1 | 1) {
    if (!collectionId) return;
    const ids = artworks.map((a) => a.id);
    const index = ids.indexOf(id);
    const target = index + dir;
    if (index < 0 || target < 0 || target >= ids.length) return;
    const next = [...ids];
    [next[index], next[target]] = [next[target]!, next[index]!];
    setContent((prev) => updateGalleryOrder(prev, collectionId, next));
    setDirty(true);
  }

  function onDrop(targetId: string) {
    if (!collectionId) return;
    const from = dragId.current;
    dragId.current = null;
    if (!from || from === targetId) return;
    const ids = artworks.map((a) => a.id);
    const fromIndex = ids.indexOf(from);
    const toIndex = ids.indexOf(targetId);
    if (fromIndex < 0 || toIndex < 0) return;
    const next = [...ids];
    next.splice(fromIndex, 1);
    next.splice(toIndex, 0, from);
    setContent((prev) => updateGalleryOrder(prev, collectionId, next));
    setDirty(true);
  }

  return (
    <>
      {canEdit && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-soft">
            Drag to reorder · Edit titles &amp; photos · Publish saves other edits · Delete saves immediately
          </p>
          <button
            type="button"
            onClick={() => {
              if (!collectionId) return;
              const next = addArtworkToCollection(content, collectionId);
              const stored = next.customArtworks[next.customArtworks.length - 1];
              setContent(next);
              setDirty(true);
              if (stored) setEditingArtwork(storedToArtwork(stored));
            }}
            className="rounded border border-terracotta/40 bg-white px-4 py-2 text-[0.65rem] tracking-widest text-terracotta uppercase"
          >
            + Add painting
          </button>
        </div>
      )}

      <div className={`grid ${gridClass} gap-6 md:gap-8`}>
        {artworks.map((artwork, index) => {
          const viewCount = getArtworkImages(artwork).length;
          const href = getArtworkPath(artwork);
          const title = getArtworkTitle(artwork.id, language, artwork.title);
          return (
            <div
              key={artwork.id}
              draggable={canEdit}
              onDragStart={() => {
                dragId.current = artwork.id;
              }}
              onDragOver={(e) => canEdit && e.preventDefault()}
              onDrop={() => onDrop(artwork.id)}
              className={`group relative text-left ${canEdit ? 'rounded-lg ring-1 ring-ink/10 ring-offset-2 ring-offset-cream' : ''}`}
            >
              {canEdit && (
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  <button
                    type="button"
                    onClick={() => setEditingArtwork(artwork)}
                    className="rounded-full bg-cream/95 px-3 py-1.5 text-[0.6rem] tracking-widest text-ink uppercase shadow-sm backdrop-blur"
                  >
                    Edit
                  </button>
                </div>
              )}

              <Link to={href} className="block touch-manipulation">
                <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
                <LazyImage
                  src={artwork.image || undefined}
                  alt={artwork.imageAlt}
                    objectFit="contain"
                    plain
                    wrapperClassName="h-full w-full"
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-3">
                  <p className="font-serif text-lg text-ink group-hover:text-terracotta md:text-xl">
                    {title}
                  </p>
                  <p className="mt-1 text-[0.65rem] tracking-wider text-ink-soft uppercase sm:text-xs">
                    {listingMedium(artwork, t)}
                    {viewCount > 1 ? ` · ${viewCount} angles` : ''}
                  </p>
                </div>
              </Link>

              {canEdit && (
                <div className="mt-2 flex justify-end gap-1 pb-2 pr-1">
                  <button
                    type="button"
                    aria-label="Move earlier"
                    disabled={index === 0}
                    onClick={() => moveArtwork(artwork.id, -1)}
                    className="rounded border border-ink/10 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label="Move later"
                    disabled={index === artworks.length - 1}
                    onClick={() => moveArtwork(artwork.id, 1)}
                    className="rounded border border-ink/10 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {editingArtwork && (
          <ArtworkEditSheet artwork={editingArtwork} onClose={() => setEditingArtwork(null)} />
        )}
      </AnimatePresence>

      {lightboxIndex >= 0 && (
        <Lightbox
          artworks={artworks}
          currentIndex={lightboxIndex}
          onClose={() =>
            navigate(slug ? `/gallery/${slug}` : '/gallery', { replace: true })
          }
          onNavigate={(index) => {
            const next = artworks[index];
            if (next) navigate(getArtworkPath(next), { replace: true });
          }}
        />
      )}
    </>
  );
}
