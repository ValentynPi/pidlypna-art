import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/workshops', label: 'Workshops' },
  { to: '/exhibitions', label: 'Exhibitions' },
  { to: '/journey', label: 'Journey' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, location.pathname]);

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(path));

  const onDarkHero = isHome && !scrolled;

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <nav
        className={`mx-auto flex max-w-[90rem] items-center justify-between px-6 py-6 transition-all duration-500 md:px-10 lg:px-16 ${
          scrolled
            ? 'bg-cream/90 py-4 backdrop-blur-lg'
            : onDarkHero
              ? ''
              : 'bg-cream/90 backdrop-blur-lg'
        }`}
      >
        <Link to="/" className="group flex items-center gap-3">
          <span
            className={`flex h-9 w-9 items-center justify-center border font-serif text-sm transition-colors ${
              onDarkHero && !scrolled
                ? 'border-cream/30 text-cream group-hover:border-gold group-hover:text-gold'
                : 'border-ink/20 text-ink group-hover:border-terracotta group-hover:text-terracotta'
            }`}
          >
            VP
          </span>
          <span
            className={`hidden font-serif text-lg tracking-wide transition-colors sm:block ${
              onDarkHero && !scrolled ? 'text-cream' : 'text-ink'
            }`}
          >
            Pidlypna_Art
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors ${
                  isActive(link.to)
                    ? onDarkHero && !scrolled
                      ? 'text-gold'
                      : 'text-terracotta'
                    : onDarkHero && !scrolled
                      ? 'text-cream/70 hover:text-cream'
                      : 'text-ink-soft hover:text-ink'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className={`absolute bottom-0 left-4 right-4 h-px ${
                      onDarkHero && !scrolled ? 'bg-gold' : 'bg-terracotta'
                    }`}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/gallery"
          className={`hidden text-xs tracking-[0.15em] uppercase transition-colors lg:block ${
            onDarkHero && !scrolled
              ? 'bg-cream/95 px-4 py-2 text-ink hover:bg-cream hover:text-ink/80'
              : 'text-ink hover:text-ink/70'
          }`}
        >
          View Art
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden ${
            isOpen ? 'text-ink' : onDarkHero && !scrolled ? 'text-cream' : 'text-ink'
          }`}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-current"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block h-px w-6 bg-current"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-current"
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-cream lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center px-10">
              <ul className="space-y-2">
                {[{ to: '/', label: 'Home' }, ...navLinks].map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={link.to}
                      className={`block py-3 font-serif text-4xl transition-colors ${
                        isActive(link.to) ? 'text-terracotta' : 'text-ink hover:text-terracotta'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="border-t border-ink/10 px-10 py-8">
              <p className="text-xs tracking-widest text-ink-soft uppercase">
                Castellón, Spain
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
