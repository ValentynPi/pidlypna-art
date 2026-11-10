import { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminPhotoPreview } from './AdminPhotoPreview';
import { useAdminAuth } from './AdminAuthContext';
import { useAdminSiteContent } from './AdminSiteContentContext';
import { uploadRepoImage } from './github';
import { resolvePublicImage } from '../data/siteContent';
import {
  PAGE_COPY_FIELDS,
  addCharityEvent,
  addNotableEncounter,
  appendCharityPhotos,
  appendEncounterPhotos,
  encounterPhotosForEditor,
  getEditableCharityEvents,
  getNotableEncountersList,
  hidePageCopyBlock,
  removeCharityEvent,
  removeEncounterPhoto,
  pageCopyEditorValue,
  pageCopyOverrideState,
  removeCharityPhoto,
  removeNotableEncounter,
  resetPageCopyOverride,
  updateCharityInstagram,
  updateCharityLocalizedField,
  updateCharityPhotoAlt,
  updateEncounterLocalized,
  updateEncounterPhotoAlt,
  updateEncounterScalar,
  updatePageCopy,
  type EditablePageId,
} from './pageEditorUtils';

interface PageEditSheetProps {
  page: EditablePageId;
  onClose: () => void;
}

const LANGS = ['uk', 'en', 'es'] as const;

export function PageEditSheet({ page, onClose }: PageEditSheetProps) {
  const { token } = useAdminAuth();
  const { content, setContent, setDirty, publish, getContentSnapshot, saving } =
    useAdminSiteContent();
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});

  const copyFields = PAGE_COPY_FIELDS[page];
  const charityEvents = getEditableCharityEvents(content);
  const encounters = getNotableEncountersList(content);

  function applyCopy(lang: (typeof LANGS)[number], path: string, value: string) {
    setContent((prev) => updatePageCopy(prev, lang, path, value));
    setDirty(true);
  }

  async function onUploadCharityPhotos(eventId: string, fileList: FileList | null) {
    if (!token || !fileList?.length) return;
    setUploading(true);
    setMessage('');
    try {
      const paths: string[] = [];
      for (const file of Array.from(fileList)) {
        const path = await uploadRepoImage(file, token);
        paths.push(path);
        setLocalPreviews((prev) => ({ ...prev, [path]: URL.createObjectURL(file) }));
      }
      setContent((prev) => appendCharityPhotos(prev, eventId, paths, 'Charity event photo'));
      setDirty(true);
      setMessage('Photos added — publish when ready.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function onUploadEncounterPhotos(id: string, fileList: FileList | null) {
    if (!token || !fileList?.length) return;
    setUploading(true);
    setMessage('');
    try {
      const paths: string[] = [];
      for (const file of Array.from(fileList)) {
        const path = await uploadRepoImage(file, token);
        paths.push(path);
        setLocalPreviews((prev) => ({ ...prev, [path]: URL.createObjectURL(file) }));
      }
      setContent((prev) =>
        appendEncounterPhotos(prev, id, paths, 'Notable encounter photo'),
      );
      setDirty(true);
      setMessage('Photos added — publish when ready.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function onSaveToWebsite() {
    if (!token) return;
    setMessage('Saving to live website…');
    try {
      await publish(getContentSnapshot());
      setMessage('Saved — wait 2–3 minutes, then hard-refresh the page.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not save.');
    }
  }

  const pageTitle =
    page === 'home'
      ? 'Home page'
      : page === 'about'
        ? 'About page'
        : page === 'charity'
          ? 'Charity page'
          : 'Notable encounters';

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
        className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-cream shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-cream/95 px-5 py-4 backdrop-blur">
          <p className="text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">Edit {pageTitle}</p>
          <button
            type="button"
            onClick={onClose}
            className="font-serif text-2xl leading-none text-ink-soft hover:text-ink"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="space-y-10 px-5 py-6">
          <section>
            <h3 className="font-serif text-lg text-ink">Page text</h3>
            <p className="mt-1 text-xs text-ink-soft">
              You see the current site text below. Clear a field and publish to remove that block, or
              use <strong>Hide on page</strong>. <strong>Restore default</strong> brings back the
              built-in translation.
            </p>
            <div className="mt-4 space-y-6">
              {copyFields.map((field) => (
                <div key={field.path} className="rounded-lg border border-ink/10 p-4">
                  <p className="text-[0.65rem] tracking-[0.2em] text-terracotta uppercase">
                    {field.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.65rem] text-ink-soft">{field.path}</p>
                  <div className="mt-3 space-y-3">
                    {LANGS.map((lang) => {
                      const state = pageCopyOverrideState(content.pageCopy, lang, field.path);
                      return (
                        <motion.div layout key={lang} className="rounded-md bg-white/40 p-3">
                          <motion.div
                            layout
                            className="mb-2 flex flex-wrap items-center justify-between gap-2"
                          >
                            <span className="text-[0.65rem] tracking-[0.2em] text-ink-soft uppercase">
                              {lang}
                            </span>
                            <span
                              className={`text-[0.6rem] tracking-wide uppercase ${
                                state === 'hidden'
                                  ? 'text-terracotta'
                                  : state === 'custom'
                                    ? 'text-gold'
                                    : 'text-ink-soft'
                              }`}
                            >
                              {state === 'hidden'
                                ? 'Hidden on page'
                                : state === 'custom'
                                  ? 'Custom text'
                                  : 'Default text'}
                            </span>
                          </motion.div>
                          {field.multiline ? (
                            <textarea
                              rows={4}
                              value={pageCopyEditorValue(content.pageCopy, lang, field.path)}
                              onChange={(e) => applyCopy(lang, field.path, e.target.value)}
                              className="w-full rounded border border-ink/15 bg-white/50 px-3 py-2 text-sm text-ink outline-none focus:border-terracotta"
                            />
                          ) : (
                            <input
                              value={pageCopyEditorValue(content.pageCopy, lang, field.path)}
                              onChange={(e) => applyCopy(lang, field.path, e.target.value)}
                              className="w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                            />
                          )}
                          <motion.div
                            layout
                            className="mt-2 flex flex-wrap gap-2"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setContent((prev) =>
                                  hidePageCopyBlock(prev, lang, field.path),
                                );
                                setDirty(true);
                              }}
                              className="text-[0.6rem] tracking-wide text-terracotta uppercase"
                            >
                              Hide on page
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setContent((prev) =>
                                  resetPageCopyOverride(prev, lang, field.path),
                                );
                                setDirty(true);
                              }}
                              className="text-[0.6rem] tracking-wide text-ink-soft uppercase"
                            >
                              Restore default
                            </button>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {page === 'charity' && (
            <section>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-lg text-ink">Charity events</h3>
                <button
                  type="button"
                  onClick={() => {
                    setContent((prev) => addCharityEvent(prev));
                    setDirty(true);
                  }}
                  className="rounded bg-terracotta px-3 py-2 text-[0.65rem] font-semibold tracking-widest text-white uppercase"
                >
                  + Add event
                </button>
              </div>
              <div className="mt-4 space-y-8">
                {charityEvents.map((event) => (
                  <motion.div
                    layout
                    key={event.id}
                    className="rounded-lg border border-ink/10 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="font-mono text-xs text-ink-soft">{event.id}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setContent((prev) => removeCharityEvent(prev, event.id));
                          setDirty(true);
                        }}
                        className="text-[0.65rem] tracking-wide text-terracotta uppercase"
                      >
                        Delete event
                      </button>
                    </div>
                    {LANGS.map((lang) => (
                      <div key={lang} className="mt-3 space-y-2">
                        <label className="block">
                          <span className="text-[0.65rem] tracking-[0.2em] text-ink-soft uppercase">
                            Title · {lang}
                          </span>
                          <input
                            value={event.title[lang] ?? ''}
                            onChange={(e) => {
                              setContent((prev) =>
                                updateCharityLocalizedField(
                                  prev,
                                  event.id,
                                  'title',
                                  lang,
                                  e.target.value,
                                ),
                              );
                              setDirty(true);
                            }}
                            className="mt-1 w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                          />
                        </label>
                        <label className="block">
                          <span className="text-[0.65rem] tracking-[0.2em] text-ink-soft uppercase">
                            Date · {lang}
                          </span>
                          <input
                            value={event.date?.[lang] ?? ''}
                            onChange={(e) => {
                              setContent((prev) =>
                                updateCharityLocalizedField(
                                  prev,
                                  event.id,
                                  'date',
                                  lang,
                                  e.target.value,
                                ),
                              );
                              setDirty(true);
                            }}
                            className="mt-1 w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                          />
                        </label>
                      </div>
                    ))}
                    <label className="mt-3 block">
                      <span className="text-[0.65rem] tracking-[0.2em] text-ink-soft uppercase">
                        Instagram URL (optional)
                      </span>
                      <input
                        value={event.instagramUrl ?? ''}
                        onChange={(e) => {
                          setContent((prev) => updateCharityInstagram(prev, event.id, e.target.value));
                          setDirty(true);
                        }}
                        className="mt-1 w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                      />
                    </label>
                    <motion.div layout className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {event.photos.map((photo, index) => (
                        <div key={`${photo.src}-${index}`} className="space-y-1">
                          <AdminPhotoPreview
                            storagePath={photo.src}
                            localSrc={
                              localPreviews[photo.src] ?? resolvePublicImage(photo.src)
                            }
                            className="mx-auto max-h-52 w-full object-contain"
                          />
                          <input
                            value={photo.alt}
                            onChange={(e) => {
                              setContent((prev) =>
                                updateCharityPhotoAlt(prev, event.id, index, e.target.value),
                              );
                              setDirty(true);
                            }}
                            className="w-full text-[0.65rem] text-ink-soft outline-none"
                            placeholder="Alt text"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setContent((prev) => removeCharityPhoto(prev, event.id, index));
                              setDirty(true);
                            }}
                            className="text-[0.65rem] tracking-wide text-terracotta uppercase"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </motion.div>
                    <label className="mt-3 inline-block cursor-pointer rounded border border-ink/15 px-3 py-2 text-[0.65rem] tracking-widest text-ink uppercase">
                      Add photos
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => void onUploadCharityPhotos(event.id, e.target.files)}
                      />
                    </label>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {page === 'encounters' && (
            <section>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-lg text-ink">Encounters</h3>
                <button
                  type="button"
                  onClick={() => {
                    setContent((prev) => addNotableEncounter(prev));
                    setDirty(true);
                  }}
                  className="rounded bg-terracotta px-3 py-2 text-[0.65rem] font-semibold tracking-widest text-white uppercase"
                >
                  + Add encounter
                </button>
              </div>
              <div className="mt-4 space-y-8">
                {encounters.length === 0 ? (
                  <p className="text-sm text-ink-soft">No encounters yet — add one above.</p>
                ) : null}
                {encounters.map((item) => (
                  <div key={item.id} className="rounded-lg border border-ink/10 p-4">
                    <motion.div
                      layout
                      className="flex flex-wrap items-start justify-between gap-2"
                    >
                      <p className="font-mono text-xs text-ink-soft">{item.id}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setContent((prev) => removeNotableEncounter(prev, item.id));
                          setDirty(true);
                        }}
                        className="text-[0.65rem] tracking-wide text-terracotta uppercase"
                      >
                        Delete
                      </button>
                    </motion.div>
                    <motion.div
                      layout
                      className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3"
                    >
                      {encounterPhotosForEditor(item).map((photo, photoIndex) => (
                        <div key={`${photo.src}-${photoIndex}`} className="space-y-1">
                          <AdminPhotoPreview
                            storagePath={photo.src}
                            localSrc={
                              localPreviews[photo.src] ?? resolvePublicImage(photo.src)
                            }
                            className="mx-auto max-h-52 w-full object-contain"
                          />
                          <input
                            value={photo.alt}
                            onChange={(e) => {
                              setContent((prev) =>
                                updateEncounterPhotoAlt(
                                  prev,
                                  item.id,
                                  photoIndex,
                                  e.target.value,
                                ),
                              );
                              setDirty(true);
                            }}
                            className="w-full text-[0.65rem] text-ink-soft outline-none"
                            placeholder="Alt text"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setContent((prev) =>
                                removeEncounterPhoto(prev, item.id, photoIndex),
                              );
                              setDirty(true);
                            }}
                            className="text-[0.65rem] tracking-wide text-terracotta uppercase"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </motion.div>
                    <label className="mt-2 inline-block cursor-pointer rounded border border-ink/15 px-3 py-2 text-[0.65rem] tracking-widest text-ink uppercase">
                      Add photos
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        disabled={uploading}
                        onChange={(e) => void onUploadEncounterPhotos(item.id, e.target.files)}
                      />
                    </label>
                    <label className="mt-2 block">
                      <span className="text-[0.65rem] tracking-[0.2em] text-ink-soft uppercase">
                        Link (optional)
                      </span>
                      <input
                        value={item.link ?? ''}
                        onChange={(e) => {
                          setContent((prev) =>
                            updateEncounterScalar(prev, item.id, 'link', e.target.value),
                          );
                          setDirty(true);
                        }}
                        className="mt-1 w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none"
                      />
                    </label>
                    {(
                      [
                        ['title', 'Title'],
                        ['withWhom', 'With whom'],
                        ['location', 'Location'],
                        ['date', 'Date'],
                        ['description', 'Description'],
                      ] as const
                    ).map(([field, label]) => (
                      <div key={field} className="mt-3 space-y-2">
                        <p className="text-[0.65rem] tracking-[0.2em] text-terracotta uppercase">
                          {label}
                        </p>
                        {LANGS.map((lang) => (
                          <label key={lang} className="block">
                            <span className="text-[0.65rem] text-ink-soft uppercase">{lang}</span>
                            {field === 'description' ? (
                              <textarea
                                rows={3}
                                value={item[field]?.[lang] ?? ''}
                                onChange={(e) => {
                                  setContent((prev) =>
                                    updateEncounterLocalized(
                                      prev,
                                      item.id,
                                      field,
                                      lang,
                                      e.target.value,
                                    ),
                                  );
                                  setDirty(true);
                                }}
                                className="mt-1 w-full rounded border border-ink/15 px-3 py-2 text-sm text-ink outline-none"
                              />
                            ) : (
                              <input
                                value={item[field]?.[lang] ?? ''}
                                onChange={(e) => {
                                  setContent((prev) =>
                                    updateEncounterLocalized(
                                      prev,
                                      item.id,
                                      field,
                                      lang,
                                      e.target.value,
                                    ),
                                  );
                                  setDirty(true);
                                }}
                                className="mt-1 w-full border-b border-ink/15 bg-transparent py-2 text-sm text-ink outline-none"
                              />
                            )}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}

          {message && <p className="text-sm text-terracotta">{message}</p>}

          <div className="flex flex-wrap gap-2 border-t border-ink/10 pt-4">
            <button
              type="button"
              disabled={saving}
              onClick={() => void onSaveToWebsite()}
              className="rounded bg-terracotta px-4 py-2 text-[0.65rem] font-semibold tracking-widest text-white uppercase disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save to website'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-ink/15 px-4 py-2 text-[0.65rem] tracking-widest text-ink uppercase"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
