import { CollectionCard } from '../gallery/CollectionCard';
import { collections } from '../../data/collections';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';
import { useLanguage } from '../../i18n/LanguageContext';

export function CollectionsStrip() {
  const { t } = useLanguage();
  return (
    <section className="section-padding mx-auto max-w-[90rem]">
      <ScrollReveal>
        <SectionLabel>{t('home.collectionsLabel')}</SectionLabel>
        <h2 className="display-heading mt-6 text-3xl md:text-4xl">
          {t('home.collectionsTitle')}
        </h2>
      </ScrollReveal>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:mt-16 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {collections.map((collection, index) => (
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
