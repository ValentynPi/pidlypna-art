import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Artwork } from '../types';
import { resolvePublicImage } from '../data/siteContent';
import { useAdminAuth } from './AdminAuthContext';
import { useAdminSiteContent } from './AdminSiteContentContext';
import { uploadRepoImage } from './github';
import {
  patchFor,
  updateArtworkDescription,
  updateArtworkPatch,
  updateArtworkTitle,
} from './artworkEditorUtils';

interface ArtworkEditSheetProps {
  artwork: Artwork;
  onClose: () => void;
}

export function ArtworkEditSheet({ artwork, onClose }: ArtworkEditSheetProps) {
  const { token } = useAdminAuth();
  const { content, setContent, setDirty } = useAdminSiteContent();
  const patch = patchFor(content.artworks, artwork.id);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const preview = resolvePublicImage(patch.image ?? artwork.image);

  function applyPatch(partial: Parameters<typeof updateArtworkPatch>[2]) {
    setContent((prev) => updateArtworkPatch(prev, artwork.id, partial));
    setDirty(true);
  }

  function applyTitle(lang: 'en' | 'uk' | 'es', value: string) {
    setContent((prev) => updateArtworkTitle(prev, artwork.id, lang, value));
    setDirty(true);
  }

  function applyDescription(lang: 'en' | 'uk' | 'es', value: string) {
    setContent((prev) => updateArtworkDescription(prev, artwork.id, lang, value));
    setDirty(true);
  }

  async function onUpload(file: File) {
    if (!token) return;
    setUploading(true);
    setMessage('');
    try {
      const path = await uploadRepoImage(file, token);
      applyPatch({ image: path });
      setMessage('Photo uploaded — tap Publish when you are ready.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-cream shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-ink/10 bg-cream/95 px-5 py-4 backdrop-blur">
          <p className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">Edit artwork</p>
          <button
            type="button"
            onClick={onClose}
            className="font-serif text-2xl leading-none text-ink-soft hover:text-ink"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-5">
          <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
            <img src={preview} alt="" className="h-full w-full object-contain" />
          </div>

          <div className="mt-5 space-y-4">
            {(['uk', 'en', 'es'] as const).map((lang) => (
              <label key={lang} className="block">
                <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                  Title · {lang}
                </span>
                <input
                  value={content.titles[lang][artwork.id] ?? ''}
                  onChange={(e) => applyTitle(lang, e.target.value)}
                  className="mt-1.5 w-full border-b border-ink/15 bg-transparent py-2 font-serif text-xl text-ink outline-none focus:border-terracotta"
                />
              </label>
            ))}

            {(['uk', 'en', 'es'] as const).map((lang) => (
              <label key={`desc-${lang}`} className="block">
                <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                  Description · {lang}
                </span>
                <textarea
                  rows={5}
                  value={content.descriptions[lang][artwork.id] ?? ''}
                  onChange={(e) => applyDescription(lang, e.target.value)}
                  className="mt-1.5 w-full resize-y rounded border border-ink/10 bg-white/60 px-3 py-2 text-sm leading-relaxed text-ink outline-none focus:border-terracotta"
                />
              </label>
            ))}

            <label className="block">
              <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                Photo path
              </span>
              <input
                value={patch.image ?? ''}
                placeholder="/images/your-photo.jpg"
                onChange={(e) => applyPatch({ image: e.target.value || undefined })}
                className="mt-1.5 w-full border-b border-ink/15 bg-transparent py-2 font-mono text-xs text-ink outline-none focus:border-terracotta"
              />
            </label>

            <label className="block">
              <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                Replace photo
              </span>
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                className="mt-2 block w-full text-sm text-ink-soft file:mr-3 file:rounded file:border file:border-ink/15 file:bg-white file:px-3 file:py-1.5 file:text-xs file:tracking-wider file:uppercase"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void onUpload(file);
                }}
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                  Width cm
                </span>
                <input
                  type="number"
                  min={0}
                  value={patch.sizeCm?.width ?? ''}
                  onChange={(e) => {
                    const width = Number(e.target.value);
                    applyPatch({
                      sizeCm: { width, height: patch.sizeCm?.height ?? width },
                    });
                  }}
                  className="mt-1.5 w-full border-b border-ink/15 bg-transparent py-2 text-ink outline-none focus:border-terracotta"
                />
              </label>
              <label className="block">
                <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                  Height cm
                </span>
                <input
                  type="number"
                  min={0}
                  value={patch.sizeCm?.height ?? ''}
                  onChange={(e) => {
                    const height = Number(e.target.value);
                    applyPatch({
                      sizeCm: { width: patch.sizeCm?.width ?? height, height },
                    });
                  }}
                  className="mt-1.5 w-full border-b border-ink/15 bg-transparent py-2 text-ink outline-none focus:border-terracotta"
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={patch.hidden ?? false}
                onChange={(e) => applyPatch({ hidden: e.target.checked })}
              />
              Hide from gallery
            </label>

            <label className="block">
              <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                Availability
              </span>
              <select
                value={patch.availability ?? artwork.availability}
                onChange={(e) =>
                  applyPatch({ availability: e.target.value as 'Available' | 'Sold' })
                }
                className="mt-1.5 w-full border-b border-ink/15 bg-transparent py-2 text-ink outline-none focus:border-terracotta"
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </label>

            {message && <p className="text-sm text-ink-soft">{message}</p>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
