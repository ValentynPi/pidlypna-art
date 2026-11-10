import type { ArtworkAvailability, ArtworkFraming, ArtworkImage } from '../types';
import type { Language } from '../i18n/types';

export type LocalizedText = Partial<Record<Language, string>>;

export interface CharityEventPhoto {
  src: string;
  alt: string;
}

export interface CharityEventContent {
  id: string;
  date?: LocalizedText;
  title: LocalizedText;
  photos: CharityEventPhoto[];
  instagramUrl?: string;
}

export interface StoredNotableEncounter {
  id: string;
  title: LocalizedText;
  withWhom: LocalizedText;
  location?: LocalizedText;
  date: LocalizedText;
  description: LocalizedText;
  /** @deprecated use photos */
  image?: string;
  /** @deprecated use photos */
  imageAlt?: string;
  photos?: CharityEventPhoto[];
  link?: string;
}

export type PageCopyByLanguage = Partial<Record<Language, Record<string, string>>>;

export interface ArtworkSizeCm {
  width: number;
  height: number;
  /** e.g. diameter label for Spiral Garden */
  label?: 'diameter' | 'triptych';
}

export const LISTING_DETAIL_KEYS = [
  'medium',
  'technique',
  'authenticity',
  'certification',
  'materials',
  'width',
  'height',
] as const;

export type ListingDetailKey = (typeof LISTING_DETAIL_KEYS)[number];

/** Optional per-language overrides for lightbox “Details” rows. */
export type ArtworkListingOverrides = Partial<
  Record<ListingDetailKey, Partial<Record<Language, string>>>
>;

export interface ArtworkContentPatch {
  title?: string;
  image?: string;
  imageAlt?: string;
  images?: ArtworkImage[];
  dimensions?: string;
  sizeCm?: ArtworkSizeCm;
  availability?: ArtworkAvailability;
  hidden?: boolean;
  materials?: string;
  technique?: string;
  surface?: string;
  listing?: ArtworkListingOverrides;
}

export interface StoredArtwork {
  id: string;
  collectionId: string;
  title: string;
  year: number;
  dimensions: string;
  materials: string;
  technique: string;
  surface: string;
  framing: ArtworkFraming;
  signed: boolean;
  certificateOfAuthenticity: boolean;
  availability: ArtworkAvailability;
  description: string;
  image: string;
  imageAlt: string;
  images?: ArtworkImage[];
  featured?: boolean;
}

export interface SiteContent {
  version: number;
  titles: Record<Language, Record<string, string>>;
  descriptions: Record<Language, Record<string, string>>;
  galleryOrder: Record<string, string[]>;
  artworks: Record<string, ArtworkContentPatch>;
  customArtworks: StoredArtwork[];
  deletedArtworkIds: string[];
  /** Overrides for `t('about.p1')` etc. — keys use dot paths. */
  pageCopy?: PageCopyByLanguage;
  charityEvents?: CharityEventContent[];
  notableEncounters?: StoredNotableEncounter[];
}

export const SITE_CONTENT_PATH = 'src/data/site-content.json';

export const EMPTY_SITE_CONTENT: SiteContent = {
  version: 1,
  titles: { en: {}, uk: {}, es: {} },
  descriptions: { en: {}, uk: {}, es: {} },
  galleryOrder: {},
  artworks: {},
  customArtworks: [],
  deletedArtworkIds: [],
  pageCopy: { en: {}, uk: {}, es: {} },
  charityEvents: [],
  notableEncounters: [],
};
