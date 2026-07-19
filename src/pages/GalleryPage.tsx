import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { CollectionCard } from '../components/gallery/CollectionCard';
import { collections } from '../data/collections';

export function GalleryPage() {
  return (
    <>
      <PageMeta
        title="Gallery"
        description="Explore Pidlypna Art collections — Petrykivka, Abstract, Pop Art, Female Portraits, Affirmation Art, and more."
      />

      <PageHeader
        label="Gallery"
        title="Collections"
        description="Open a collection to explore the paintings inside."
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
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
