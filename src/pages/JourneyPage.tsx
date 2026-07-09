import { PageMeta } from '../components/ui/PageMeta';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { JourneyEntry } from '../components/journey/JourneyEntry';
import { journeyEntries } from '../data/journey';

export function JourneyPage() {
  return (
    <>
      <PageMeta
        title="Creative Journey"
        description="A visual diary of the places and experiences that inspire Viktoria Pidlypna — from Provence lavender fields to Madrid gardens."
      />

      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="absolute top-20 right-0 h-64 w-64 rounded-full bg-lavender/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-terracotta/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-terracotta uppercase">
              Creative Journey
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl text-ink md:text-6xl">
              Pages from a visual diary
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              Not a blog — a scrapbook. The places I&apos;ve stood, the light
              I&apos;ve chased, the festivals and workshops and quiet mornings
              that find their way onto canvas. Open any page and walk beside me
              for a while.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-terracotta/10 md:block" />

        {journeyEntries.map((entry, index) => (
          <JourneyEntry key={entry.id} entry={entry} index={index} />
        ))}
      </section>

      <section className="bg-cream-dark">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-serif text-2xl text-ink italic md:text-3xl">
                &ldquo;Every journey I take ends up on the canvas — sometimes as
                landscape, sometimes as color, sometimes as a single line that
                remembers the wind.&rdquo;
              </p>
              <p className="mt-4 text-sm text-terracotta">— Viktoria</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
