import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-10 lg:px-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-cream/20 font-serif text-sm">
                VP
              </span>
              <h3 className="font-serif text-2xl">Pidlypna Art</h3>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/50">
              Contemporary Ukrainian art living and creating in Castellón,
              Spain. Paintings that bridge two worlds.
            </p>
            <p className="mt-8 font-serif text-lg italic text-gold/80">
              Art bridges what words cannot.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-4 md:col-start-7">
            <div>
              <h4 className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                Explore
              </h4>
              <ul className="mt-5 space-y-3">
                {[
                  { to: '/gallery', label: 'Gallery' },
                  { to: '/about', label: 'About' },
                  { to: '/workshops', label: 'Workshops' },
                  { to: '/exhibitions', label: 'Exhibitions' },
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
                More
              </h4>
              <ul className="mt-5 space-y-3">
                {[
                  { to: '/journey', label: 'Creative Journey' },
                  { to: '/press', label: 'Press' },
                  { to: '/contact', label: 'Contact' },
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
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
              Connect
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/50">
              <li>Castellón, Spain</li>
              <li>
                <a
                  href="mailto:hello@pidlypna.art"
                  className="transition-colors hover:text-cream"
                >
                  hello@pidlypna.art
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/30 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Pidlypna Art</p>
          <p className="tracking-wider uppercase">Ukraine · Spain · Everywhere between</p>
        </div>
      </div>
    </footer>
  );
}
