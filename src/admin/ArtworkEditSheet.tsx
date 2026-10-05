import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Artwork } from '../types';
import { AdminPhotoPreview } from './AdminPhotoPreview';
import { useAdminAuth } from './AdminAuthContext';
import { useAdminSiteContent } from './AdminSiteContentContext';
import { uploadRepoImage } from './github';
import { listingDetails } from '../data/listing';
import { LISTING_DETAIL_KEYS, type ListingDetailKey } from '../data/siteContentTypes';
import { useLanguage } from '../i18n/LanguageContext';
import {
  buildPhotoPatch,
  getArtworkPhotosForEditor,
  isCustomArtwork,
  patchFor,
  removeArtworkFromSite,
  updateArtworkDescription,
  updateArtworkListingField,
  updateArtworkPatch,
  updateArtworkTitle,
} from './artworkEditorUtils';

const LISTING_FIELD_LABELS: Record<ListingDetailKey, string> = {
  medium: 'Medium',
  technique: 'Technique',
  authenticity: 'Authenticity',
  certification: 'Certification',
  materials: 'Materials (full line)',
  width: 'Width',
  height: 'Height',
};

interface ArtworkEditSheetProps {
  artwork: Artwork;
  onClose: () => void;
}

export function ArtworkEditSheet({ artwork, onClose }: ArtworkEditSheetProps) {
  const { t } = useLanguage();
  const { token } = useAdminAuth();
  const { content, setContent, setDirty, publish, getContentSnapshot, saving } =
    useAdminSiteContent();
  const [savingToSite, setSavingToSite] = useState(false);
  const patch = patchFor(content.artworks, artwork.id);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});

  const photoSet = getArtworkPhotosForEditor(artwork, patch);
  const allPhotos = (
    photoSet.cover
      ? [
          { src: photoSet.cover, alt: patch.imageAlt ?? artwork.imageAlt },
          ...photoSet.extras,
        ]
      : photoSet.extras
  ).filter((p) => p.src.trim());

  const isCustom = isCustomArtwork(content, artwork.id);

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

  function applyListingField(key: ListingDetailKey, lang: 'en' | 'uk' | 'es', value: string) {
    setContent((prev) => updateArtworkListingField(prev, artwork.id, key, lang, value));
    setDirty(true);
  }

  function defaultListingValue(lang: 'en' | 'uk' | 'es', key: ListingDetailKey): string {
    const rows = listingDetails(artwork, t, lang);
    const index = LISTING_DETAIL_KEYS.indexOf(key) + 1;
    return rows[index]?.value ?? '';
  }

  function applyPhotos(cover: string, extras: typeof photoSet.extras) {
    applyPatch(buildPhotoPatch(cover, extras));
  }

  async function onUploadFiles(fileList: FileList | null) {
    if (!token || !fileList?.length) return;
    setUploading(true);
    setMessage('');
    try {
      let { cover, extras } = getArtworkPhotosForEditor(artwork, patchFor(content.artworks, artwork.id));
      for (const file of Array.from(fileList)) {
        const path = await uploadRepoImage(file, token);
        const blobUrl = URL.createObjectURL(file);
        setLocalPreviews((prev) => ({ ...prev, [path]: blobUrl }));
        if (!cover) {
          cover = path;
        } else {
          extras = [...extras, { src: path, alt: artwork.imageAlt || 'Detail' }];
        }
      }
      applyPhotos(cover, extras);
      setMessage('Photos uploaded — tap Save to website (wait until upload finishes).');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  function setCoverPhoto(index: number) {
    if (index <= 0 || index >= allPhotos.length) return;
    const nextCover = allPhotos[index]!;
    const nextExtras = allPhotos
      .filter((_, i) => i !== index)
      .map((p) => ({ src: p.src, alt: p.alt }));
    applyPhotos(nextCover.src, nextExtras);
  }

  function removePhoto(index: number) {
    if (index < 0 || index >= allPhotos.length) return;
    if (allPhotos.length === 1) {
      applyPhotos('', []);
      return;
    }
    if (index === 0) {
      const rest = allPhotos.slice(1).map((p) => ({ src: p.src, alt: p.alt }));
      applyPhotos(rest[0]?.src ?? '', rest.slice(1));
      return;
    }
    applyPhotos(
      photoSet.cover,
      photoSet.extras.filter((_, i) => i !== index - 1),
    );
  }

  async function onSaveToWebsite() {
    if (!token) return;
    const hasPhoto = allPhotos.some((p) => p.src.trim());
    if (isCustom && !hasPhoto) {
      setMessage('Upload a photo before saving to the website.');
      return;
    }
    setSavingToSite(true);
    setMessage('Saving to live website…');
    try {
      await publish(getContentSnapshot());
      setMessage('Saved — wait 2–3 minutes, then refresh the gallery (Ctrl+F5).');
      if (isCustom) {
        setTimeout(() => onClose(), 1200);
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not save. Try Publish at the bottom.');
    } finally {
      setSavingToSite(false);
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
          <p className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
            {isCustom ? 'New artwork' : 'Edit artwork'}
          </p>
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
          <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-cream-dark">
            {photoSet.cover ? (
              <AdminPhotoPreview
                storagePath={photoSet.cover}
                localSrc={localPreviews[photoSet.cover]}
                className="h-full w-full object-contain"
              />
            ) : (
              <p className="px-4 text-center text-sm text-ink-soft">Upload a photo below</p>
            )}
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

            <div className="block">
              <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                Photos ({allPhotos.length}) · first is gallery cover
              </span>
              {allPhotos.length > 0 ? (
                <ul className="mt-3 space-y-3">
                  {allPhotos.map((photo, index) => (
                    <li
                      key={`${photo.src}-${index}`}
                      className="flex gap-3 rounded border border-ink/10 bg-white/50 p-2"
                    >
                      <AdminPhotoPreview
                        storagePath={photo.src}
                        localSrc={localPreviews[photo.src]}
                        className="h-20 w-16 shrink-0 object-contain bg-cream-dark"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-mono text-[0.65rem] text-ink-soft">{photo.src}</p>
                        <p className="mt-1 text-xs text-ink">
                          {index === 0 ? 'Cover (grid)' : `Angle ${index + 1}`}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => setCoverPhoto(index)}
                              className="rounded border border-ink/15 px-2 py-1 text-[0.6rem] tracking-wider uppercase"
                            >
                              Set cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="rounded border border-red-200 px-2 py-1 text-[0.6rem] tracking-wider text-red-800 uppercase"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-ink-soft">No photos yet — upload below.</p>
              )}
            </div>

            <label className="block">
              <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                Add photos
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={uploading}
                className="mt-2 block w-full text-sm text-ink-soft file:mr-3 file:rounded file:border file:border-ink/15 file:bg-white file:px-3 file:py-1.5 file:text-xs file:tracking-wider file:uppercase"
                onChange={(e) => {
                  void onUploadFiles(e.target.files);
                  e.target.value = '';
                }}
              />
            </label>

            <div className="space-y-3 border-t border-ink/10 pt-4">
              <p className="text-[0.65rem] tracking-[0.25em] text-terracotta uppercase">
                Artwork data (affects details when no override)
              </p>
              <label className="block">
                <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                  Materials (short)
                </span>
                <input
                  value={patch.materials ?? artwork.materials}
                  onChange={(e) => applyPatch({ materials: e.target.value })}
                  className="mt-1.5 w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                />
              </label>
              <label className="block">
                <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                  Technique (short)
                </span>
                <input
                  value={patch.technique ?? artwork.technique}
                  onChange={(e) => applyPatch({ technique: e.target.value })}
                  className="mt-1.5 w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                />
              </label>
              <label className="block">
                <span className="text-[0.65rem] tracking-[0.25em] text-ink-soft uppercase">
                  Surface
                </span>
                <input
                  value={patch.surface ?? artwork.surface}
                  onChange={(e) => applyPatch({ surface: e.target.value })}
                  placeholder="Canvas, Paper, Wood…"
                  className="mt-1.5 w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                />
              </label>
            </div>

            <div className="space-y-4 border-t border-ink/10 pt-4">
              <p className="text-[0.65rem] tracking-[0.25em] text-terracotta uppercase">
                Details panel (lightbox) · leave blank for automatic text
              </p>
              {(['uk', 'en', 'es'] as const).map((lang) => (
                <div key={`listing-${lang}`} className="space-y-3 rounded border border-ink/10 bg-white/40 p-3">
                  <p className="text-xs font-medium tracking-wider text-ink uppercase">{lang}</p>
                  {LISTING_DETAIL_KEYS.map((key) => (
                    <label key={`${lang}-${key}`} className="block">
                      <span className="text-[0.6rem] tracking-[0.2em] text-ink-soft uppercase">
                        {LISTING_FIELD_LABELS[key]}
                      </span>
                      <input
                        value={patch.listing?.[key]?.[lang] ?? ''}
                        placeholder={defaultListingValue(lang, key)}
                        onChange={(e) => applyListingField(key, lang, e.target.value)}
                        className="mt-1 w-full border-b border-ink/15 bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-ink-soft/50 focus:border-terracotta"
                      />
                    </label>
                  ))}
                </div>
              ))}
            </div>

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

            <button
              type="button"
              disabled={saving || savingToSite || uploading}
              onClick={() => void onSaveToWebsite()}
              className="mt-2 w-full bg-terracotta py-3 text-xs font-semibold tracking-widest text-white uppercase disabled:opacity-45"
            >
              {savingToSite || saving ? 'Saving…' : 'Save to website'}
            </button>

            <button
              type="button"
              disabled={saving || savingToSite}
              onClick={() => {
                void (async () => {
                  if (
                    !window.confirm(
                      'Remove this painting from the live website? It may take a few minutes to update everywhere.',
                    )
                  ) {
                    return;
                  }
                  setMessage('Removing and saving…');
                  const next = removeArtworkFromSite(
                    content,
                    artwork.id,
                    artwork.collectionId,
                  );
                  setDirty(true);
                  try {
                    await publish(next);
                    setMessage('');
                    onClose();
                  } catch {
                    setContent(next);
                    setMessage(
                      'Removed here, but saving failed. Tap Publish at the bottom of the page.',
                    );
                  }
                })();
              }}
              className="mt-4 w-full border border-red-200 py-3 text-xs tracking-widest text-red-800 uppercase disabled:opacity-45"
            >
              {saving ? 'Saving…' : 'Delete painting'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
