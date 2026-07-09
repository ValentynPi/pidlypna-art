import { PageMeta } from '../components/ui/PageMeta';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { pressItems } from '../data/press';

export function PressPage() {
  return (
    <>
      <PageMeta
        title="Press"
        description="Press mentions and features about Viktoria Pidlypna — contemporary Ukrainian artist in Spain."
      />

      <section className="pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-terracotta uppercase">
              Press
            </p>
            <h1 className="mt-3 font-serif text-4xl text-ink md:text-6xl">
              In the press
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Features, reviews, and mentions from publications across Spain,
              France, and the Ukrainian art community abroad.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {pressItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <article className="group flex h-full flex-col border border-ink/10 p-8 transition-colors hover:border-terracotta/30">
                <div className="mb-6 flex h-12 items-center">
                  <div className="flex h-10 w-32 items-center justify-center border border-ink/10 bg-cream-dark px-3">
                    <span className="text-xs tracking-wide text-ink-soft uppercase">
                      [{item.logoAlt.replace('[PLACEHOLDER] ', '').replace(' logo', '')}]
                    </span>
                  </div>
                </div>
                <p className="text-xs tracking-widest text-terracotta uppercase">
                  {item.publication} · {item.date}
                </p>
                <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-ink italic md:text-xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                {item.link && (
                  <a
                    href={item.link}
                    className="mt-6 text-sm tracking-wide text-terracotta uppercase transition-colors group-hover:text-terracotta-light"
                  >
                    Read article →
                  </a>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
