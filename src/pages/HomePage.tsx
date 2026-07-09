import { PageMeta } from '../components/ui/PageMeta';
import { Hero } from '../components/home/Hero';
import { FeaturedGrid } from '../components/home/FeaturedGrid';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { featuredArtworks } from '../data/artworks';

export function HomePage() {
  return (
    <>
      <PageMeta
        title="Home"
        description="Viktoria Pidlypna — Contemporary Ukrainian artist living and creating in Spain. Explore paintings, workshops, and exhibitions."
      />
      <Hero />
      <FeaturedGrid artworks={featuredArtworks} />

      <section className="bg-cream-dark">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-serif text-2xl leading-relaxed text-ink italic md:text-3xl">
                &ldquo;I paint the distance between where I come from and where I
                stand now — every canvas a bridge, every color a word in a
                language I am still learning to speak.&rdquo;
              </p>
              <p className="mt-6 text-sm tracking-wide text-terracotta">
                — Viktoria Pidlypna
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              title: 'Gallery',
              desc: 'Six collections spanning floral, folk, Mediterranean, and abstract works.',
              to: '/gallery',
            },
            {
              title: 'Workshops',
              desc: 'Join intimate painting sessions in Castellón — all levels welcome.',
              to: '/workshops',
            },
            {
              title: 'Creative Journey',
              desc: 'A visual diary of the places and experiences that shape her art.',
              to: '/journey',
            },
          ].map((item, i) => (
            <ScrollReveal key={item.to} delay={i * 0.1}>
              <div className="group border border-ink/10 p-8 transition-colors hover:border-terracotta/30">
                <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {item.desc}
                </p>
                <Button to={item.to} variant="ghost" className="mt-6 px-0 border-0">
                  Discover →
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
