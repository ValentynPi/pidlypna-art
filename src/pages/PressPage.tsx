import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { pressItems } from '../data/press';

export function PressPage() {
  return (
    <>
      <PageMeta
        title="Press"
        description="Press mentions and features about Viktoria Pidlypna — contemporary Ukrainian artist in Spain."
      />

      <PageHeader
        label="Press"
        title="In the press"
        description="Features, reviews, and mentions from publications across Spain, France, and the Ukrainian art community."
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <div className="space-y-px bg-ink/10">
          {pressItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.06}>
              <article className="grid gap-6 bg-cream p-8 md:grid-cols-12 md:gap-10 md:p-10">
                <div className="md:col-span-3">
                  <p className="font-serif text-lg text-ink">{item.publication}</p>
                  <p className="mt-1 text-[0.65rem] tracking-[0.2em] text-terracotta uppercase">
                    {item.date}
                  </p>
                </div>
                <blockquote className="font-serif text-lg leading-relaxed text-ink italic md:col-span-7 md:text-xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                {item.link && (
                  <div className="flex items-end md:col-span-2 md:justify-end">
                    <a
                      href={item.link}
                      className="text-xs tracking-[0.2em] text-terracotta uppercase transition-colors hover:text-gold"
                    >
                      Read →
                    </a>
                  </div>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
