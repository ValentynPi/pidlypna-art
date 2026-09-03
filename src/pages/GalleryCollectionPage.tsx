import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { collections } from '../data/collections';
import { getArtworksByCollection } from '../data/artworks';
import { useLanguage } from '../i18n/LanguageContext';

export function GalleryCollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const collection = collections.find((c) => c.slug === slug);
  const artworks = collection ? getArtworksByCollection(collection.id) : [];

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

  const name = t(`collections.${collection.id}`);

  return (
    <>
      <PageMeta title={name} description={collection.intro} />

      <PageHeader
        label={t('gallery.collectionLabel')}
        title={name}
        description={collection.intro}
        backTo="/gallery"
        backLabel={t('gallery.back')}
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <GalleryGrid artworks={artworks} />
      </section>
    </>
  );
}
