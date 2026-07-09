import { PageMeta } from '../components/ui/PageMeta';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { CollectionCard } from '../components/gallery/CollectionCard';
import { collections } from '../data/collections';

export function GalleryPage() {
  return (
    <>
      <PageMeta
        title="Gallery"
        description="Explore Viktoria Pidlypna's painting collections — Floral, Ukrainian Motifs, Mediterranean, Petrykivka, Abstract, and more."
      />

      <section className="pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-terracotta uppercase">
              Gallery
            </p>
            <h1 className="mt-3 font-serif text-4xl text-ink md:text-6xl">
              Collections
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Paintings organized by series — each collection a chapter in an
              ongoing visual story. Select a collection to explore the works
              within.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
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
