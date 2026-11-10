import type { Language } from '../i18n/types';
import { translations } from '../i18n/translations';
import { getNested } from '../i18n/utils';
import type { CharityEventContent, StoredNotableEncounter } from './siteContentTypes';
import type { PageCopyByLanguage } from './siteContentTypes';
import type { NotableEncounter } from '../types';
import { defaultCharityEvents } from './charityEvents';
import { activeSiteContent, resolvePublicImage } from './siteContent';

export type PageCopyResolution = 'default' | 'hidden' | string;

function pageCopyMap(
  language: Language,
  live?: PageCopyByLanguage,
): Record<string, string> | undefined {
  return live?.[language] ?? activeSiteContent().pageCopy?.[language];
}

export function resolvePageCopy(
  language: Language,
  path: string,
  live?: PageCopyByLanguage,
): PageCopyResolution {
  const map = pageCopyMap(language, live);
  if (!map || !Object.prototype.hasOwnProperty.call(map, path)) return 'default';
  const value = map[path];
  if (value === '' || (typeof value === 'string' && !value.trim())) return 'hidden';
  return value;
}

export function defaultPageCopy(language: Language, path: string): string {
  return (
    getNested(translations[language], path) ??
    getNested(translations.en, path) ??
    ''
  );
}

/** Text shown in admin inputs (CMS override or built-in translation). */
export function pageCopyEditorValue(
  live: PageCopyByLanguage | undefined,
  language: Language,
  path: string,
): string {
  const map = live?.[language];
  if (map && Object.prototype.hasOwnProperty.call(map, path)) {
    return map[path] ?? '';
  }
  return defaultPageCopy(language, path);
}

export type PageCopyOverrideState = 'default' | 'custom' | 'hidden';

export function pageCopyOverrideState(
  live: PageCopyByLanguage | undefined,
  language: Language,
  path: string,
): PageCopyOverrideState {
  const map = live?.[language];
  if (!map || !Object.prototype.hasOwnProperty.call(map, path)) return 'default';
  const value = map[path];
  if (value === '' || (typeof value === 'string' && !value.trim())) return 'hidden';
  return 'custom';
}

export function localizedText(
  map: Partial<Record<Language, string>> | undefined,
  language: Language,
  fallback = '',
): string {
  return (
    map?.[language]?.trim() ||
    map?.en?.trim() ||
    map?.uk?.trim() ||
    map?.es?.trim() ||
    fallback
  );
}

/** @deprecated Use resolvePageCopy — kept for callers that only need custom text. */
export function getPageCopyOverride(language: Language, path: string): string | undefined {
  const resolved = resolvePageCopy(language, path);
  if (resolved === 'default' || resolved === 'hidden') return undefined;
  return resolved;
}

const CHARITY_LEGACY_KEYS: Record<string, { dateKey?: string; titleKey: string }> = {
  'charity-pysanka-2025': {
    dateKey: 'charity.event1Date',
    titleKey: 'charity.event1Title',
  },
  'charity-childhood-without-war': { titleKey: 'charity.event2Title' },
  'charity-independence-ornaments': { titleKey: 'charity.event3Title' },
  'charity-petrykivka-2024': {
    dateKey: 'charity.event4Date',
    titleKey: 'charity.event4Title',
  },
};

export function charityEventsSource(): CharityEventContent[] {
  const fromCms = activeSiteContent().charityEvents;
  return fromCms?.length ? fromCms : defaultCharityEvents;
}

export function getCharityEventsForPage(
  language: Language,
  t: (path: string) => string,
): Array<{
  id: string;
  date?: string;
  title: string;
  photos: CharityEventContent['photos'];
  instagramUrl?: string;
}> {
  return charityEventsSource().map((event) => {
    const legacy = CHARITY_LEGACY_KEYS[event.id];
    const title =
      localizedText(event.title, language) ||
      (legacy?.titleKey ? t(legacy.titleKey) : '');
    const date =
      localizedText(event.date, language) ||
      (legacy?.dateKey ? t(legacy.dateKey) : undefined);
    return {
      id: event.id,
      date: date || undefined,
      title,
      photos: event.photos.map((p) => ({
        src: resolvePublicImage(p.src.startsWith('/') ? p.src : `/images/${p.src}`),
        alt: p.alt,
      })),
      instagramUrl: event.instagramUrl,
    };
  });
}

function encounterPhotoList(
  item: StoredNotableEncounter,
): { src: string; alt: string }[] {
  if (item.photos?.length) {
    return item.photos.map((p) => ({
      src: resolvePublicImage(p.src.startsWith('/') ? p.src : `/images/${p.src}`),
      alt: p.alt,
    }));
  }
  if (item.image) {
    return [
      {
        src: resolvePublicImage(item.image),
        alt: item.imageAlt ?? '',
      },
    ];
  }
  return [];
}

export function getNotableEncounters(language: Language): NotableEncounter[] {
  const stored = activeSiteContent().notableEncounters ?? [];
  return stored.map((item) => {
    const photos = encounterPhotoList(item);
    return {
      id: item.id,
      title: localizedText(item.title, language),
      withWhom: localizedText(item.withWhom, language),
      location: item.location ? localizedText(item.location, language) : undefined,
      date: localizedText(item.date, language),
      description: localizedText(item.description, language),
      photos,
      image: photos[0]?.src,
      imageAlt: photos[0]?.alt,
      link: item.link,
    };
  });
}

export type { StoredNotableEncounter };
