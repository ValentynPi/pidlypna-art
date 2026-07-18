import { Link, useParams } from 'react-router-dom';
import { PageMeta } from '../components/ui/PageMeta';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { LazyImage } from '../components/ui/LazyImage';
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

      <section className="relative pt-28 md:pt-32">
        <div className="relative h-[40vh] min-h-[280px] overflow-hidden md:h-[50vh]">
          <LazyImage
            src={collection.coverImage}
            alt={collection.coverAlt}
            wrapperClassName="h-full w-full"
          />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-10 lg:px-16">
            <ScrollReveal>
              <Link
                to="/gallery"
                className="text-[0.65rem] tracking-[0.3em] text-gold uppercase transition-colors hover:text-cream"
              >
                ← Back to Gallery
              </Link>
              <h1 className="display-heading mt-4 text-4xl text-cream md:text-6xl lg:text-7xl">
                {collection.name}
              </h1>
              <p className="mt-4 max-w-xl text-cream/60">{collection.intro}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-6 py-16 md:px-10 lg:px-16 md:py-24">
        <GalleryGrid artworks={artworks} />
      </section>
    </>
  );
}
