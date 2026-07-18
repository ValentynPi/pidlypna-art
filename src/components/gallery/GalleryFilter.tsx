import { collections } from '../../data/collections';

export type GalleryFilterValue = 'all' | string;

interface GalleryFilterProps {
  value: GalleryFilterValue;
  onChange: (value: GalleryFilterValue) => void;
  counts: Record<string, number>;
  totalCount: number;
}

export function GalleryFilter({
  value,
  onChange,
  counts,
  totalCount,
}: GalleryFilterProps) {
  const options: { id: GalleryFilterValue; label: string; count: number }[] = [
    { id: 'all', label: 'All paintings', count: totalCount },
    ...collections.map((c) => ({
      id: c.id,
      label: c.name,
      count: counts[c.id] ?? 0,
    })),
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[0.65rem] tracking-[0.3em] text-ink-soft uppercase">
        View
      </p>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none">
        {options.map((option) => {
          const active = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`shrink-0 border px-4 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors ${
                active
                  ? 'border-ink bg-ink text-cream'
                  : 'border-ink/15 text-ink-soft hover:border-terracotta hover:text-terracotta'
              }`}
            >
              {option.label}
              <span className={`ml-2 ${active ? 'text-gold' : 'text-ink/30'}`}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
