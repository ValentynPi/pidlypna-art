import { PageMeta } from '../components/ui/PageMeta';
import { ContactSection } from '../components/contact/ContactSection';

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact"
        description="Contact Viktoria Paladios — contemporary artist based in Castellón, Spain. Email, Instagram, WhatsApp."
      />
      <div className="pt-16 md:pt-20">
        <ContactSection />
      </div>
    </>
  );
}
