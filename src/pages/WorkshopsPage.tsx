import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { LazyImage } from '../components/ui/LazyImage';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { workshops, workshopPhotos } from '../data/workshops';

export function WorkshopsPage() {
  return (
    <>
      <PageMeta
        title="Workshops"
        description="Join Pidlypna_Art for painting workshops in Castellón, Spain — floral oils, Petrykivka, plein air, and more."
      />

      <PageHeader
        label="Workshops"
        title="Paint together"
        description="Intimate, hands-on painting sessions in Castellón and along the coast — all levels welcome at the easel."
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-16 md:px-10 lg:px-16">
        <ScrollReveal>
          <SectionLabel>The studio experience</SectionLabel>
        </ScrollReveal>
        <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {workshopPhotos.map((photo, index) => (
            <ScrollReveal
              key={photo.id}
              delay={index * 0.06}
              className={index === 0 ? 'col-span-2 row-span-2 md:col-span-1 md:row-span-1' : ''}
            >
              <div className="group relative aspect-square overflow-hidden bg-ink">
                <LazyImage
                  src={photo.image}
                  alt={photo.imageAlt}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/40" />
                <div className="absolute right-0 bottom-0 left-0 translate-y-full bg-ink/80 p-4 transition-transform group-hover:translate-y-0">
                  <p className="text-xs text-cream/70">{photo.caption}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 lg:px-16 md:py-28">
          <ScrollReveal>
            <SectionLabel light>Upcoming dates</SectionLabel>
            <p className="mt-6 max-w-xl text-cream/50">
              All materials provided. Small groups for personal attention.
            </p>
          </ScrollReveal>

          <div className="mt-12 space-y-px bg-cream/10">
            {workshops.map((workshop, index) => (
              <ScrollReveal key={workshop.id} delay={index * 0.08}>
                <div className="grid gap-6 bg-ink p-6 md:grid-cols-12 md:gap-8 md:p-8">
                  <div className="md:col-span-3">
                    <p className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                      {workshop.date}
                    </p>
                    <p className="mt-2 text-sm text-cream/40">{workshop.location}</p>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-serif text-xl text-cream md:text-2xl">
                      {workshop.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/50">
                      {workshop.description}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between md:col-span-3 md:items-end">
                    <span className="text-[0.65rem] tracking-[0.2em] text-cream/30 uppercase">
                      {workshop.level}
                    </span>
                    <Button to="/contact" variant="gold" className="mt-4 md:mt-0">
                      Book
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="display-heading text-3xl">What to expect</h2>
          <p className="mt-6 leading-relaxed text-ink-soft">
            Each workshop begins with a demonstration, followed by guided painting
            with individual feedback. You leave with a finished piece and techniques
            to explore at home.
          </p>
          <Button to="/contact" variant="ghost" className="mt-10">
            Get in Touch
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
}
