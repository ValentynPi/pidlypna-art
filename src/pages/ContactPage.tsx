import { PageMeta } from '../components/ui/PageMeta';
import { ContactSection } from '../components/contact/ContactSection';
import { useLanguage } from '../i18n/LanguageContext';

export function ContactPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageMeta
        title={t('contact.metaTitle')}
        description={t('contact.metaDesc')}
      />
      <div className="pt-16 md:pt-20">
        <ContactSection />
      </div>
    </>
  );
}
