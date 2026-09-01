import { PageMeta } from '../components/ui/PageMeta';
import { PageHeader } from '../components/ui/PageHeader';
import { Timeline } from '../components/exhibitions/Timeline';
import { exhibitions } from '../data/exhibitions';

export function ExhibitionsPage() {
  return (
    <>
      <PageMeta
        title="Exhibitions"
        description="Past and upcoming exhibitions by Viktoria Paladios — Castellón, Madrid, Provence, Valencia, and beyond."
      />

      <PageHeader
        label="Exhibitions"
        title="On the wall"
      />

      <section className="mx-auto max-w-[90rem] px-6 pb-24 md:px-10 lg:px-16">
        <Timeline exhibitions={exhibitions} />
      </section>
    </>
  );
}
