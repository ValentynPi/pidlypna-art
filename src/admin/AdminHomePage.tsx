import { Link } from 'react-router-dom';
import { galleryCollections } from '../data/collections';

export function AdminHomePage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Collections</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        Choose a collection to reorder works, edit Ukrainian / English / Spanish titles, change
        photos, sizes, and visibility. Publish saves to GitHub and triggers a site deploy.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {galleryCollections.map((collection) => (
          <li key={collection.id}>
            <Link
              to={`/admin/collection/${collection.slug}`}
              className="block rounded-lg border border-ink/10 bg-white px-5 py-4 transition hover:border-terracotta/40 hover:shadow-sm"
            >
              <span className="font-serif text-xl">{collection.name}</span>
              <span className="mt-1 block text-xs tracking-widest text-ink-soft uppercase">
                {collection.slug}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
