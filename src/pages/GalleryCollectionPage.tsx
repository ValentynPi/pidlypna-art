import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
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
        <h1 className="display-heading text-3xl">Collection not found</h1>
        <Link to="/gallery" className="mt-4 text-sm tracking-wider text-terracotta uppercase">
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageMeta title={collection.name} description={collection.intro} />

      <PageHeader
        label="Collection"
        title={collection.name}
        description={collection.intro}
        backTo="/gallery"
        backLabel="Back to Gallery"
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <GalleryGrid artworks={artworks} />
      </section>
    </>
  );
}
