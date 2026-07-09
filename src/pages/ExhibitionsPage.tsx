import { PageMeta } from '../components/ui/PageMeta';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Timeline } from '../components/exhibitions/Timeline';
import { exhibitions } from '../data/exhibitions';

export function ExhibitionsPage() {
  return (
    <>
      <PageMeta
        title="Exhibitions"
        description="Past and upcoming exhibitions by Viktoria Pidlypna — Castellón, Madrid, Provence, Valencia, and beyond."
      />

      <section className="pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-terracotta uppercase">
              Exhibitions
            </p>
            <h1 className="mt-3 font-serif text-4xl text-ink md:text-6xl">
              On the wall
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              From intimate gallery shows in Castellón to exhibitions in Madrid
              and Provence — a timeline of where the work has traveled and where
              it&apos;s headed next.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <Timeline exhibitions={exhibitions} />
      </section>
    </>
  );
}
