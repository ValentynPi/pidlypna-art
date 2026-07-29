import { CollectionCard } from '../gallery/CollectionCard';
import { collections } from '../../data/collections';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionLabel } from '../ui/SectionLabel';

export function CollectionsStrip() {
  return (
    <section className="section-padding mx-auto max-w-[90rem]">
      <ScrollReveal>
        <SectionLabel>Collections</SectionLabel>
        <h2 className="display-heading mt-6 text-3xl md:text-4xl">
          Nine chapters, one story
        </h2>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
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
