import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { JourneyEntry } from '../components/journey/JourneyEntry';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { HandLine } from '../components/ui/HandLine';
import { journeyEntries } from '../data/journey';

export function JourneyPage() {
  return (
    <>
      <PageMeta
        title="Creative Journey"
        description="A visual diary of the places and experiences that inspire Pidlypna Art — from Provence lavender fields to Madrid gardens."
      />

      <PageHeader
        label="Creative Journey"
        title="Pages from a visual diary"
        description="Not a blog — a scrapbook. The places I've stood, the light I've chased, and the quiet mornings that find their way onto canvas."
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-16 md:px-10 lg:px-16">
        {journeyEntries.map((entry, index) => (
          <JourneyEntry key={entry.id} entry={entry} index={index} />
        ))}
      </section>

      <section className="bg-blush">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-10 md:py-28">
          <ScrollReveal>
            <HandLine variant="circle" className="mx-auto mb-8 h-12 w-12 text-gold" />
            <p className="font-serif text-2xl leading-relaxed text-ink italic md:text-3xl">
              &ldquo;Every journey I take ends up on the canvas — sometimes as
              landscape, sometimes as color, sometimes as a single line that
              remembers the wind.&rdquo;
            </p>
            <p className="mt-6 text-[0.65rem] tracking-[0.3em] text-terracotta uppercase">
              Pidlypna Art
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
