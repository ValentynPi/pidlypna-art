import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import {
  GalleryFilter,
  type GalleryFilterValue,
} from '../components/gallery/GalleryFilter';
import { collections } from '../data/collections';
import { artworks, getArtworksByCollection } from '../data/artworks';

export function GalleryPage() {
  const [filter, setFilter] = useState<GalleryFilterValue>('all');

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of collections) {
      map[c.id] = getArtworksByCollection(c.id).length;
    }
    return map;
  }, []);

  const visibleArtworks = useMemo(() => {
    if (filter === 'all') return artworks;
    return getArtworksByCollection(filter);
  }, [filter]);

  const activeCollection =
    filter === 'all' ? null : collections.find((c) => c.id === filter);

  return (
    <>
      <PageMeta
        title="Gallery"
        description="Explore Pidlypna Art paintings — still life, portraits, Petrykivka, seascapes, landscapes, and abstract works."
      />

      <PageHeader
        label="Gallery"
        title="The works"
        description="Browse every painting, or filter by series — still life, portraits, Ukrainian heritage, Petrykivka, sea, landscape, and abstract."
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-8 md:px-10 lg:px-16">
        <GalleryFilter
          value={filter}
          onChange={setFilter}
          counts={counts}
          totalCount={artworks.length}
        />

        <AnimatePresence mode="wait">
          {activeCollection && (
            <motion.p
              key={activeCollection.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base"
            >
              {activeCollection.intro}
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-6 text-sm text-ink-soft">
              Showing{' '}
              <span className="text-ink">
                {visibleArtworks.length}{' '}
                {visibleArtworks.length === 1 ? 'painting' : 'paintings'}
              </span>
              {activeCollection ? (
                <>
                  {' '}
                  in <span className="text-ink">{activeCollection.name}</span>
                </>
              ) : (
                <> across all collections</>
              )}
            </p>
            <GalleryGrid artworks={visibleArtworks} />
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
