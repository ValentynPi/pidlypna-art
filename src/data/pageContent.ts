import type { Language } from '../i18n/types';
import type { CharityEventContent, StoredNotableEncounter } from './siteContentTypes';
import type { NotableEncounter } from '../types';
import { defaultCharityEvents } from './charityEvents';
import { activeSiteContent, resolvePublicImage } from './siteContent';

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

export function getPageCopyOverride(language: Language, path: string): string | undefined {
  const value = activeSiteContent().pageCopy?.[language]?.[path];
  return value?.trim() ? value : undefined;
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

export function getNotableEncounters(language: Language): NotableEncounter[] {
  const stored = activeSiteContent().notableEncounters ?? [];
  return stored.map((item) => ({
    id: item.id,
    title: localizedText(item.title, language),
    withWhom: localizedText(item.withWhom, language),
    location: item.location ? localizedText(item.location, language) : undefined,
    date: localizedText(item.date, language),
    description: localizedText(item.description, language),
    image: item.image ? resolvePublicImage(item.image) : undefined,
    imageAlt: item.imageAlt,
    link: item.link,
  }));
}

export type { StoredNotableEncounter };
