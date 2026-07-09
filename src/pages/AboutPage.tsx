import { PageMeta } from '../components/ui/PageMeta';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { LazyImage } from '../components/ui/LazyImage';
import { photos } from '../data/images';

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About"
        description="The story of Viktoria Pidlypna — a contemporary Ukrainian artist bridging tradition and Mediterranean life in Spain."
      />

      <section className="pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ScrollReveal>
            <p className="text-xs tracking-[0.3em] text-terracotta uppercase">
              About the Artist
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl text-ink md:text-6xl">
              A story written in color
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -top-4 -right-4 h-full w-full bg-terracotta/10" />
              <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
                <LazyImage
                  src={photos.floralHeadOutdoor}
                  alt="Viktoria Pidlypna's floral portrait painting in outdoor studio"
                />
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-6 text-base leading-relaxed text-ink-soft md:text-lg md:leading-relaxed">
            <ScrollReveal delay={0.1}>
              <p>
                She learned to see color before she learned to read. Growing up in
                Ukraine, Viktoria Pidlypna spent childhood afternoons watching her
                grandmother embroider vyshyvanka patterns by lamplight — each
                stitch a story, each motif a prayer. The walls of their home held
                Petrykivka paintings passed down through generations, and somewhere
                between those intricate florals and the golden wheat fields outside
                her window, a painter was born.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p>
                When she arrived in Spain, she carried everything in her
                suitcase and nothing that could be unpacked. Castellón became
                home slowly — first through the language of markets and olive
                groves, then through the particular quality of Mediterranean
                light that transforms how you mix every color on your palette.
                The sea taught her blue. The sun taught her patience.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <blockquote className="border-l-2 border-terracotta py-2 pl-6 font-serif text-2xl text-ink italic md:text-3xl">
                &ldquo;I don&apos;t paint to remember Ukraine — I paint to keep
                the conversation alive between who I was and who I am
                becoming.&rdquo;
              </blockquote>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p>
                Her work lives in the space between worlds. Ukrainian folk motifs
                curl through contemporary compositions like handwritten notes in
                the margins of a new chapter. Mediterranean landscapes breathe
                with the same luminous atmosphere she once associated only with
                summer visits to her grandmother&apos;s garden. Floral still lifes
                carry the scent of two countries — roses from Castellón, wildflowers
                from memory.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p>
                Today, Viktoria works from her studio in Castellón, exhibiting
                across Spain and France, teaching workshops that welcome everyone
                from curious beginners to experienced painters, and continuing a
                visual diary of the journeys — literal and interior — that feed
                her practice. Her paintings hang in homes and galleries from Madrid
                to Provence, each one an invitation to look closer, feel deeper,
                and find the extraordinary in what grows between roots and horizon.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <ScrollReveal>
            <div className="grid gap-10 md:grid-cols-3 md:gap-16">
              {[
                { label: 'Based in', value: 'Castellón, Spain' },
                { label: 'Mediums', value: 'Oil, acrylic, gouache, mixed media' },
                { label: 'Focus', value: 'Ukrainian heritage · Mediterranean life · Contemporary painting' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs tracking-widest text-terracotta-light uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 font-serif text-xl md:text-2xl">{item.value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
