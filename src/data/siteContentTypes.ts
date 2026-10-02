import type { ArtworkAvailability, ArtworkImage } from '../types';
import type { Language } from '../i18n/types';

export interface ArtworkSizeCm {
  width: number;
  height: number;
  /** e.g. diameter label for Spiral Garden */
  label?: 'diameter' | 'triptych';
}

export interface ArtworkContentPatch {
  title?: string;
  image?: string;
  imageAlt?: string;
  images?: ArtworkImage[];
  dimensions?: string;
  sizeCm?: ArtworkSizeCm;
  availability?: ArtworkAvailability;
  hidden?: boolean;
}

export interface SiteContent {
  version: number;
  titles: Record<Language, Record<string, string>>;
  galleryOrder: Record<string, string[]>;
  artworks: Record<string, ArtworkContentPatch>;
}

export const SITE_CONTENT_PATH = 'src/data/site-content.json';

export const EMPTY_SITE_CONTENT: SiteContent = {
  version: 1,
  titles: { en: {}, uk: {}, es: {} },
  galleryOrder: {},
  artworks: {},
};
