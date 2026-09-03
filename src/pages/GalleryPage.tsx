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

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
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
