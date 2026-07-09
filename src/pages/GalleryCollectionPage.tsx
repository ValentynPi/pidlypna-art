import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '../components/ui/PageMeta';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { collections } from '../data/collections';
import { getArtworksByCollection } from '../data/artworks';

export function GalleryCollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find((c) => c.slug === slug);
  const artworks = collection ? getArtworksByCollection(collection.id) : [];

  if (!collection) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28">
        <h1 className="font-serif text-3xl text-ink">Collection not found</h1>
        <Link to="/gallery" className="mt-4 text-terracotta hover:underline">
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title={collection.name}
        description={collection.intro}
      />

      <section className="pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ScrollReveal>
            <Link
              to="/gallery"
              className="text-sm tracking-wide text-terracotta uppercase transition-colors hover:text-terracotta-light"
            >
              ← All Collections
            </Link>
            <h1 className="mt-6 font-serif text-4xl text-ink md:text-6xl">
              {collection.name}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {collection.intro}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <GalleryGrid artworks={artworks} />
      </section>
    </>
  );
}
