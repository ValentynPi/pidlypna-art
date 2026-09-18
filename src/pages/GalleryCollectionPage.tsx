import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { collections } from '../data/collections';
import { getArtworksByCollection } from '../data/artworks';
import { getArtworkBySlug, getArtworkPath } from '../data/artworkPaths';
import { listingDescription } from '../data/listing';
import { useLanguage } from '../i18n/LanguageContext';
import { getArtworkTitle } from '../i18n/artworkTitles';

export function GalleryCollectionPage() {
  const { slug, artworkSlug } = useParams<{ slug: string; artworkSlug?: string }>();
  const { t, language } = useLanguage();
  const collection = collections.find((c) => c.slug === slug);
  const artworks = collection ? getArtworksByCollection(collection.id) : [];
  const activeArtwork =
    collection && artworkSlug ? getArtworkBySlug(collection.slug, artworkSlug) : undefined;

  if (!collection) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28">
        <h1 className="display-heading text-3xl">{t('gallery.notFound')}</h1>
        <Link to="/gallery" className="mt-4 text-sm tracking-wider text-terracotta uppercase">
          ← {t('gallery.back')}
        </Link>
      </div>
    );
  }

  if (artworkSlug && !activeArtwork) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28">
        <h1 className="display-heading text-3xl">{t('gallery.artworkNotFound')}</h1>
        <Link
          to={`/gallery/${collection.slug}`}
          className="mt-4 text-sm tracking-wider text-terracotta uppercase"
        >
          ← {t(`collections.${collection.id}`)}
        </Link>
      </div>
    );
  }

  const name = t(`collections.${collection.id}`);
  const intro = t(`collectionIntros.${collection.id}`);
  const artworkTitle = activeArtwork
    ? getArtworkTitle(activeArtwork.id, language, activeArtwork.title)
    : name;
  const artworkDesc = activeArtwork ? listingDescription(activeArtwork, language) : intro;

  return (
    <>
      <PageMeta
        title={artworkTitle}
        description={artworkDesc}
        image={activeArtwork?.image}
        canonical={activeArtwork ? getArtworkPath(activeArtwork) : `/gallery/${collection.slug}`}
      />

      <PageHeader
        label={t('gallery.collectionLabel')}
        title={name}
        description={intro}
        backTo="/gallery"
        backLabel={t('gallery.back')}
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <GalleryGrid artworks={artworks} />
      </section>
    </>
  );
}
