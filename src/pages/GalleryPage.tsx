import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { CollectionCard } from '../components/gallery/CollectionCard';
import { collections } from '../data/collections';
import { useLanguage } from '../i18n/LanguageContext';

export function GalleryPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageMeta
        title={t('gallery.metaTitle')}
        description={t('gallery.metaDesc')}
      />

      <PageHeader
        label={t('gallery.label')}
        title={t('gallery.title')}
        description={t('gallery.description')}
      />

      <section className="mx-auto max-w-[90rem] px-5 pb-28 sm:px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
