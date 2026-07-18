import { ScrollReveal } from './ScrollReveal';
import { SectionLabel } from './SectionLabel';
import { HandLine } from './HandLine';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
}

export function PageHeader({ label, title, description, light = false }: PageHeaderProps) {
  return (
    <section className={`pt-32 pb-16 md:pt-40 md:pb-20 ${light ? 'bg-ink text-cream' : ''}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <ScrollReveal>
          <SectionLabel light={light}>{label}</SectionLabel>
          <h1
            className={`display-heading mt-8 max-w-4xl text-5xl leading-[1.05] md:text-7xl lg:text-8xl ${
              light ? 'text-cream' : 'text-ink'
            }`}
          >
            {title}
          </h1>
          <HandLine
            variant="swirl"
            className={`mt-6 w-48 ${light ? 'text-gold' : 'text-terracotta'}`}
          />
          {description && (
            <p
              className={`mt-8 max-w-xl text-lg leading-relaxed md:text-xl ${
                light ? 'text-cream/70' : 'text-ink-soft'
              }`}
            >
              {description}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
