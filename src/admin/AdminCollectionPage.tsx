import { useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { galleryCollections } from '../data/collections';
import { resolvePublicImage } from '../data/siteContent';
import type { ArtworkContentPatch } from '../data/siteContentTypes';
import { getArtworkTitle } from '../i18n/artworkTitles';
import { useAdminSiteContent } from './AdminSiteContentContext';
import { uploadRepoImage } from './github';
import { orderedArtworksForCollection } from './siteContentState';

function patchFor(
  artworks: Record<string, ArtworkContentPatch>,
  id: string,
): ArtworkContentPatch {
  return artworks[id] ?? {};
}

export function AdminCollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = galleryCollections.find((c) => c.slug === slug);
  const {
    content,
    setContent,
    loading,
    saving,
    dirty,
    setDirty,
    publish,
    lastSavedAt,
    error,
  } = useAdminSiteContent();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const dragId = useRef<string | null>(null);

  const artworks = useMemo(() => {
    if (!collection) return [];
    return orderedArtworksForCollection(collection.id, content);
  }, [collection, content]);

  if (!collection) {
    return (
      <p>
        Collection not found. <Link to="/admin">Back</Link>
      </p>
    );
  }

  const selected = selectedId ? artworks.find((a) => a.id === selectedId) : undefined;
  const selectedPatch = selected ? patchFor(content.artworks, selected.id) : undefined;

  function updateOrder(nextIds: string[]) {
    setContent((prev) => ({
      ...prev,
      galleryOrder: { ...prev.galleryOrder, [collection!.id]: nextIds },
    }));
    setDirty(true);
  }

  function moveArtwork(id: string, dir: -1 | 1) {
    const ids = artworks.map((a) => a.id);
    const index = ids.indexOf(id);
    const target = index + dir;
    if (index < 0 || target < 0 || target >= ids.length) return;
    const next = [...ids];
    [next[index], next[target]] = [next[target]!, next[index]!];
    updateOrder(next);
  }

  function onDrop(targetId: string) {
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
    updateOrder(next);
  }

  function updatePatch(id: string, patch: Partial<ArtworkContentPatch>) {
    setContent((prev) => ({
      ...prev,
      artworks: {
        ...prev.artworks,
        [id]: { ...patchFor(prev.artworks, id), ...patch },
      },
    }));
    setDirty(true);
  }

  function updateTitle(id: string, lang: 'en' | 'uk' | 'es', value: string) {
    setContent((prev) => ({
      ...prev,
      titles: {
        ...prev.titles,
        [lang]: { ...prev.titles[lang], [id]: value },
      },
    }));
    setDirty(true);
  }

  async function onPublish() {
    setStatus('');
    try {
      await publish();
      setStatus('Published. GitHub Pages will rebuild in a few minutes.');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Publish failed.');
    }
  }

  async function onUpload(file: File, artworkId: string) {
    const token = sessionStorage.getItem('viktoria-admin-github-token');
    if (!token) return;
    setUploading(true);
    setStatus('');
    try {
      const path = await uploadRepoImage(file, token);
      updatePatch(artworkId, { image: path });
      setStatus(`Uploaded ${path}. Publish to make it live on the site.`);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  const previewImage = selected
    ? resolvePublicImage(selectedPatch?.image ?? selected.image)
    : '';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link to="/admin" className="text-xs tracking-widest text-terracotta uppercase">
            ← Collections
          </Link>
          <h1 className="mt-2 font-serif text-3xl">{collection.name}</h1>
          <p className="mt-1 text-sm text-ink-soft">Drag to reorder · tap a work to edit</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!dirty || saving || loading}
            onClick={() => void onPublish()}
            className="rounded bg-terracotta px-4 py-2.5 text-xs font-semibold tracking-widest text-white uppercase disabled:opacity-50"
          >
            {saving ? 'Publishing…' : dirty ? 'Publish changes' : 'Up to date'}
          </button>
        </div>
      </div>

      {(error || status) && (
        <p className={`text-sm ${error ? 'text-red-700' : 'text-ink-soft'}`}>{error || status}</p>
      )}
      {lastSavedAt && !dirty && (
        <p className="text-xs text-ink-soft">Last published {lastSavedAt.toLocaleString()}</p>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <ul className="space-y-2">
          {loading && <li className="text-sm text-ink-soft">Loading from GitHub…</li>}
          {artworks.map((artwork, index) => {
            const hidden = content.artworks[artwork.id]?.hidden;
            const title = getArtworkTitle(artwork.id, 'en', artwork.title);
            return (
              <li
                key={artwork.id}
                draggable
                onDragStart={() => {
                  dragId.current = artwork.id;
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(artwork.id)}
                className={`flex items-center gap-3 rounded-lg border bg-white p-3 ${
                  selectedId === artwork.id ? 'border-terracotta' : 'border-ink/10'
                } ${hidden ? 'opacity-50' : ''}`}
              >
                <span className="cursor-grab text-ink-soft active:cursor-grabbing" title="Drag">
                  ⋮⋮
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedId(artwork.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                  <img
                    src={resolvePublicImage(
                      content.artworks[artwork.id]?.image ?? artwork.image,
                    )}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded object-cover"
                  />
                  <span>
                    <span className="block font-serif text-lg">{title}</span>
                    <span className="text-xs text-ink-soft">{artwork.id}</span>
                  </span>
                </button>
                <div className="flex shrink-0 flex-col gap-1">
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() => moveArtwork(artwork.id, -1)}
                    className="rounded border border-ink/10 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={index === artworks.length - 1}
                    onClick={() => moveArtwork(artwork.id, 1)}
                    className="rounded border border-ink/10 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {selected && selectedPatch && (
          <aside className="rounded-xl border border-ink/10 bg-white p-5 lg:sticky lg:top-6 lg:self-start">
            <h2 className="font-serif text-2xl">Edit work</h2>
            <img src={previewImage} alt="" className="mt-4 aspect-square w-full rounded object-contain bg-[#f4f1eb]" />

            <div className="mt-4 space-y-3">
              {(['uk', 'en', 'es'] as const).map((lang) => (
                <label key={lang} className="block text-xs uppercase tracking-widest text-ink-soft">
                  Title ({lang})
                  <input
                    value={content.titles[lang][selected.id] ?? ''}
                    onChange={(e) => updateTitle(selected.id, lang, e.target.value)}
                    className="mt-1 w-full rounded border border-ink/15 px-2 py-2 text-sm normal-case"
                  />
                </label>
              ))}

              <label className="block text-xs uppercase tracking-widest text-ink-soft">
                Image path
                <input
                  value={selectedPatch.image ?? ''}
                  placeholder="/images/…"
                  onChange={(e) => updatePatch(selected.id, { image: e.target.value || undefined })}
                  className="mt-1 w-full rounded border border-ink/15 px-2 py-2 font-mono text-xs normal-case"
                />
              </label>

              <label className="block text-xs uppercase tracking-widest text-ink-soft">
                Upload new photo
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  className="mt-1 block w-full text-sm normal-case"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void onUpload(file, selected.id);
                  }}
                />
              </label>

              <div className="grid grid-cols-2 gap-2">
                <label className="block text-xs uppercase tracking-widest text-ink-soft">
                  Width (cm)
                  <input
                    type="number"
                    min={0}
                    value={selectedPatch.sizeCm?.width ?? ''}
                    onChange={(e) => {
                      const width = Number(e.target.value);
                      updatePatch(selected.id, {
                        sizeCm: {
                          width,
                          height: selectedPatch.sizeCm?.height ?? width,
                        },
                      });
                    }}
                    className="mt-1 w-full rounded border border-ink/15 px-2 py-2 text-sm normal-case"
                  />
                </label>
                <label className="block text-xs uppercase tracking-widest text-ink-soft">
                  Height (cm)
                  <input
                    type="number"
                    min={0}
                    value={selectedPatch.sizeCm?.height ?? ''}
                    onChange={(e) => {
                      const height = Number(e.target.value);
                      updatePatch(selected.id, {
                        sizeCm: {
                          width: selectedPatch.sizeCm?.width ?? height,
                          height,
                        },
                      });
                    }}
                    className="mt-1 w-full rounded border border-ink/15 px-2 py-2 text-sm normal-case"
                  />
                </label>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedPatch.hidden ?? false}
                  onChange={(e) => updatePatch(selected.id, { hidden: e.target.checked })}
                />
                Hide from gallery
              </label>

              <label className="block text-xs uppercase tracking-widest text-ink-soft">
                Availability
                <select
                  value={selectedPatch.availability ?? selected.availability}
                  onChange={(e) =>
                    updatePatch(selected.id, {
                      availability: e.target.value as 'Available' | 'Sold',
                    })
                  }
                  className="mt-1 w-full rounded border border-ink/15 px-2 py-2 text-sm normal-case"
                >
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </label>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
