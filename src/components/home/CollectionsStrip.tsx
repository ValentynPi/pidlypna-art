import { CollectionCard } from '../gallery/CollectionCard';
import { galleryCollections } from '../../data/collections';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';
import { useLanguage } from '../../i18n/LanguageContext';

export function CollectionsStrip() {
  const { t } = useLanguage();
  const collectionsLabel = t('home.collectionsLabel');
  const collectionsTitle = t('home.collectionsTitle');
  return (
    <section className="section-padding mx-auto max-w-[90rem]">
      <ScrollReveal>
        {collectionsLabel ? <SectionLabel>{collectionsLabel}</SectionLabel> : null}
        {collectionsTitle ? (
          <h2 className="display-heading mt-6 text-3xl md:text-4xl">{collectionsTitle}</h2>
        ) : null}
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {galleryCollections.map((collection, index) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
