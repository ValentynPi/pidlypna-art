import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 lg:px-16">
        <div className="grid gap-16 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span
                translate="no"
                className="notranslate flex h-10 w-10 items-center justify-center border border-cream/20 font-serif text-sm"
              >
                VP
              </span>
              <h3 className="font-serif text-2xl">Viktoria Paladios Art</h3>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/50">
              {t('footer.blurb')}
            </p>
            <p className="mt-8 font-serif text-lg italic text-gold/80">
              {t('footer.quote')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 md:col-span-7 md:items-start">
            <div>
              <h4 className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                {t('footer.explore')}
              </h4>
              <ul className="mt-5 space-y-3">
                {[
                  { to: '/gallery', label: t('nav.gallery') },
                  { to: '/about', label: t('nav.about') },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-cream/50 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                {t('footer.more')}
              </h4>
              <ul className="mt-5 space-y-3">
                {[
                  { to: '/contact', label: t('nav.contact') },
                  { to: '/charity', label: t('nav.charity') },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-cream/50 transition-colors hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                {t('footer.connect')}
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-cream/50">
                <li>{t('footer.location')}</li>
                <li>
                  <a
                    href="mailto:hello@viktoria-p.art"
                    className="transition-colors hover:text-cream"
                  >
                    hello@viktoria-p.art
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/viktoria.paladios.art"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-cream"
                  >
                    @viktoria.paladios.art
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/30 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Viktoria Paladios</p>
          <p className="tracking-wider uppercase">{t('footer.between')}</p>
        </div>
      </div>
    </footer>
  );
}
