import {
  defaultPageCopy,
  pageCopyEditorValue,
  pageCopyOverrideState,
} from '../data/pageContent';
import { defaultCharityEvents } from '../data/charityEvents';
import type {
  CharityEventContent,
  LocalizedText,
  SiteContent,
  StoredNotableEncounter,
} from '../data/siteContentTypes';
import type { Language } from '../i18n/types';

export { pageCopyEditorValue, pageCopyOverrideState, defaultPageCopy };

export type EditablePageId = 'about' | 'charity' | 'encounters';

export type PageCopyField = {
  path: string;
  label: string;
  multiline?: boolean;
};

export const PAGE_COPY_FIELDS: Record<EditablePageId, PageCopyField[]> = {
  about: [
    { path: 'about.metaTitle', label: 'SEO title' },
    { path: 'about.metaDesc', label: 'SEO description', multiline: true },
    { path: 'about.label', label: 'Page label' },
    { path: 'about.title', label: 'Page title' },
    { path: 'about.p1', label: 'Opening paragraph', multiline: true },
    { path: 'about.p2', label: 'Paragraph 2', multiline: true },
    { path: 'about.pTechnique', label: 'Technique paragraph', multiline: true },
    { path: 'about.quote', label: 'Quote', multiline: true },
    { path: 'about.p3', label: 'Paragraph 3', multiline: true },
    { path: 'about.p4', label: 'Paragraph 4', multiline: true },
    { path: 'about.socialCta', label: 'Social CTA' },
    { path: 'about.based', label: 'Fact label: Based in' },
    { path: 'about.basedValue', label: 'Fact value: Based in' },
    { path: 'about.mediums', label: 'Fact label: Mediums' },
    { path: 'about.mediumsValue', label: 'Fact value: Mediums' },
    { path: 'about.focus', label: 'Fact label: Focus' },
    { path: 'about.focusValue', label: 'Fact value: Focus' },
  ],
  charity: [
    { path: 'charity.metaTitle', label: 'SEO title' },
    { path: 'charity.label', label: 'Page label' },
    { path: 'charity.title', label: 'Page title' },
    { path: 'charity.watchOnInstagram', label: 'Instagram link label' },
  ],
  encounters: [
    { path: 'encounters.metaTitle', label: 'SEO title' },
    { path: 'encounters.metaDesc', label: 'SEO description', multiline: true },
    { path: 'encounters.label', label: 'Page label' },
    { path: 'encounters.title', label: 'Page title' },
    { path: 'encounters.description', label: 'Introduction', multiline: true },
    { path: 'encounters.empty', label: 'Empty state message', multiline: true },
    { path: 'encounters.readMore', label: 'Read more link text' },
  ],
};

export function updatePageCopy(
  content: SiteContent,
  lang: Language,
  path: string,
  value: string,
): SiteContent {
  const pageCopy = {
    en: { ...content.pageCopy?.en },
    uk: { ...content.pageCopy?.uk },
    es: { ...content.pageCopy?.es },
  };
  pageCopy[lang] = { ...pageCopy[lang], [path]: value };
  return { ...content, pageCopy };
}

/** Remove CMS override — built-in translation shows again. */
export function resetPageCopyOverride(
  content: SiteContent,
  lang: Language,
  path: string,
): SiteContent {
  const pageCopy = {
    en: { ...content.pageCopy?.en },
    uk: { ...content.pageCopy?.uk },
    es: { ...content.pageCopy?.es },
  };
  delete pageCopy[lang][path];
  return { ...content, pageCopy };
}

/** Hide this block on the live page for one language. */
export function hidePageCopyBlock(
  content: SiteContent,
  lang: Language,
  path: string,
): SiteContent {
  return updatePageCopy(content, lang, path, '');
}

export function getEditableCharityEvents(content: SiteContent): CharityEventContent[] {
  return content.charityEvents?.length ? content.charityEvents : defaultCharityEvents;
}

export function setCharityEvents(
  content: SiteContent,
  events: CharityEventContent[],
): SiteContent {
  return { ...content, charityEvents: events };
}

export function updateCharityEvent(
  content: SiteContent,
  eventId: string,
  updater: (event: CharityEventContent) => CharityEventContent,
): SiteContent {
  const events = getEditableCharityEvents(content).map((event) =>
    event.id === eventId ? updater(event) : event,
  );
  return setCharityEvents(content, events);
}

export function updateCharityLocalizedField(
  content: SiteContent,
  eventId: string,
  field: 'title' | 'date',
  lang: Language,
  value: string,
): SiteContent {
  return updateCharityEvent(content, eventId, (event) => {
    const next: LocalizedText = { ...event[field], [lang]: value };
    if (!value.trim()) delete next[lang];
    return { ...event, [field]: next };
  });
}

export function updateCharityPhotoAlt(
  content: SiteContent,
  eventId: string,
  photoIndex: number,
  alt: string,
): SiteContent {
  return updateCharityEvent(content, eventId, (event) => ({
    ...event,
    photos: event.photos.map((photo, i) => (i === photoIndex ? { ...photo, alt } : photo)),
  }));
}

export function appendCharityPhotos(
  content: SiteContent,
  eventId: string,
  paths: string[],
  defaultAlt: string,
): SiteContent {
  return updateCharityEvent(content, eventId, (event) => ({
    ...event,
    photos: [
      ...event.photos,
      ...paths.map((src) => ({ src, alt: defaultAlt })),
    ],
  }));
}

export function removeCharityPhoto(
  content: SiteContent,
  eventId: string,
  photoIndex: number,
): SiteContent {
  return updateCharityEvent(content, eventId, (event) => ({
    ...event,
    photos: event.photos.filter((_, i) => i !== photoIndex),
  }));
}

export function updateCharityInstagram(
  content: SiteContent,
  eventId: string,
  url: string,
): SiteContent {
  return updateCharityEvent(content, eventId, (event) => ({
    ...event,
    instagramUrl: url.trim() || undefined,
  }));
}

export function getNotableEncountersList(content: SiteContent): StoredNotableEncounter[] {
  return content.notableEncounters ?? [];
}

export function setNotableEncounters(
  content: SiteContent,
  list: StoredNotableEncounter[],
): SiteContent {
  return { ...content, notableEncounters: list };
}

function newEncounterId(): string {
  return `encounter-${Date.now().toString(36)}`;
}

export function addNotableEncounter(content: SiteContent): SiteContent {
  const list = [...getNotableEncountersList(content)];
  list.push({
    id: newEncounterId(),
    title: { en: 'New encounter' },
    withWhom: { en: '' },
    date: { en: '' },
    description: { en: '' },
  });
  return setNotableEncounters(content, list);
}

export function removeNotableEncounter(content: SiteContent, id: string): SiteContent {
  return setNotableEncounters(
    content,
    getNotableEncountersList(content).filter((item) => item.id !== id),
  );
}

export function updateNotableEncounter(
  content: SiteContent,
  id: string,
  updater: (item: StoredNotableEncounter) => StoredNotableEncounter,
): SiteContent {
  const list = getNotableEncountersList(content).map((item) =>
    item.id === id ? updater(item) : item,
  );
  return setNotableEncounters(content, list);
}

export function updateEncounterLocalized(
  content: SiteContent,
  id: string,
  field: keyof Pick<
    StoredNotableEncounter,
    'title' | 'withWhom' | 'location' | 'date' | 'description'
  >,
  lang: Language,
  value: string,
): SiteContent {
  return updateNotableEncounter(content, id, (item) => {
    const prev = item[field];
    const next: LocalizedText =
      typeof prev === 'object' && prev !== null ? { ...prev, [lang]: value } : { [lang]: value };
    if (!value.trim()) delete next[lang];
    return { ...item, [field]: next };
  });
}

export function updateEncounterScalar(
  content: SiteContent,
  id: string,
  field: 'image' | 'imageAlt' | 'link',
  value: string,
): SiteContent {
  return updateNotableEncounter(content, id, (item) => ({
    ...item,
    [field]: value.trim() || undefined,
  }));
}
