import { Analytics } from '@vercel/analytics/react';
import c from 'classnames';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useCallback, use, useEffect, useMemo, useState } from 'react';
import FadeIn from 'react-fade-in';
import { FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import Link from '~/components/link';
import Meta from '~/components/meta';
import useDebounce from '~/hooks/useDebounce';
import useRouterStatus from '~/hooks/useRouterStatus';
import useTheme from '~/hooks/useTheme';
import useLocale from '~/hooks/useLocale';
import layoutTranslations from '~/data/locale/layout';
import enIconLight from '~/public/icons/en_icon.svg';
import esIconLight from '~/public/icons/es_icon.svg';
import enIconDark from '~/public/icons/en_icon_dark.svg';
import esIconDark from '~/public/icons/es_icon_dark.svg';
import Image from 'next/image';


const Loader: FC = () => {
  // Only show the loading indicator if the navigation takes a while.
  // This prevents the indicator from flashing during faster navigation.
  const { value: isVisible } = useDebounce(useRouterStatus() === 'loading', 300);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      // Progress is not representative of anything, it's just used
      // to give a sense that something is happening.
      // The value is increased inverse-hyperbolically, so that it
      // gradually slows down and never actually reaches 100%.
      setProgress((progress) => progress + 0.1 * (0.95 - progress) ** 2);
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div
      className={c('h-1', {
        'bg-cyan-500': isVisible
      })}
      style={{
        width: `${progress * 100}%`,
        transitionProperty: 'width',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms'
      }}
    />
  );
};

type NavLinkProps = PropsWithChildren<{
  href: string;
}>;

const NavLink: FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const isActive = router.route === href || router.route.startsWith(href + '/');

  return (
    <div
      className={c(
        'px-2',
        'py-1',
        'border-2',
        {
          'border-transparent': !isActive,
          'border-cyan-500': isActive
        },
        'rounded',
        {
          'bg-cyan-100': isActive,
          'dark:bg-cyan-900': isActive
        },
        'transition-colors',
        'duration-300'
      )}
    >
      <Link variant="discreet" href={href}>
        {children}
      </Link>
    </div>
  );
};

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();
  const { locale } = useLocale();
  const t = layoutTranslations[locale];
  const isDark = theme === 'dark';

  return (
    <button
      aria-label={isDark ? t.themeToLight : t.themeToDark}
      className={c('text-blue-500', 'dark:text-yellow-500', 'cursor-pointer')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <FiMoon aria-hidden /> : <FiSun aria-hidden />}
    </button>
  );
};

const LanguageSwitcher: FC = () => {
  const { locale, setLocale, userPreferredLocale } = useLocale();
  const t = layoutTranslations[locale];
  const isDark = useTheme().theme === 'dark';
  const router = useRouter();

  const esIcon = isDark ? esIconDark : esIconLight;
  const enIcon = isDark ? enIconDark : enIconLight;

  const handleLocaleChange = useCallback(async () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    setLocale(newLocale);

    // Redirect to the equivalent post in the other locale
    const newPath = router.asPath.replace(`/blog/${locale}`, `/blog/${newLocale}`);
    if (newPath !== router.asPath) {
      router.push(newPath);
    }
  }, [locale, router, setLocale]);

  // Only align the URL with the user's *explicit* preference. First-time
  // visitors (no stored preference) are left on whatever locale URL they
  // landed on, so shared English links are stable.
  useEffect(() => {
    if (userPreferredLocale === null) {
      return;
    }

    const { pathname, asPath } = router;
    const pathLocale = pathname.startsWith('/blog/en')
      ? 'en'
      : pathname.startsWith('/blog/es')
        ? 'es'
        : null;

    if (pathLocale && pathLocale !== userPreferredLocale) {
      const newPath = asPath.replace(`/blog/${pathLocale}`, `/blog/${userPreferredLocale}`);
      if (newPath !== asPath) {
        router.push(newPath);
      }
    }
  }, [userPreferredLocale, router]);

  return (
    <button
      aria-label={locale === 'es' ? t.langToEnglish : t.langToSpanish}
      className={c(
        'flex',
        'items-center',
        'justify-center',
        'rounded', 'transition-colors',
        'duration-300')}
      onClick={handleLocaleChange}
    >

      {locale === 'es' ? <Image src={esIcon} alt="Castellano" width={28} height={28} /> :
        <Image src={enIcon} alt="English" width={28} height={28} />}

    </button >
  );
}

const Header: FC = () => {
  const { locale } = useLocale();
  const t = layoutTranslations[locale];
  const links = useMemo(
    () => [
      { href: '/', label: t.home },
      { href: '/projects', label: t.projects },
      { href: '/talks', label: t.talks },
      { href: '/blog', label: t.blog }
    ],
    [t.home, t.projects, t.talks, t.blog]
  );

  const router = useRouter();
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  // Hide the mobile nav when the page changes
  useEffect(() => {
    setIsMobileNavVisible(false);
  }, [router.pathname]);

  return (
    <header>
      <a
        href="#main"
        className={c(
          'sr-only',
          'focus:not-sr-only',
          'focus:absolute',
          'focus:z-50',
          'focus:top-2',
          'focus:left-2',
          'focus:px-3',
          'focus:py-1',
          'focus:rounded',
          'focus:bg-cyan-500',
          'focus:text-white'
        )}
      >
        {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <div
        className={c(
          'flex',
          'p-4',
          'border-b-2',
          'border-neutral-100',
          'dark:border-neutral-800',
          'items-center',
          'justify-between'
        )}
      >
        {/* Logo */}
        <div className={c('text-xl', 'font-mono', 'font-semibold', 'tracking-wide')}>
          <Link variant="hidden" href="/">
            <span>ezeluduena.dev.ar</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className={c('hidden', 'sm:flex', 'px-2', 'gap-x-2', 'text-lg', 'items-center')}>
          {links.map((link, i) => (
            <NavLink key={i} href={link.href}>
              {link.label}
            </NavLink>
          ))}

          {/* Theme switcher */}
          <div className={c('flex', 'ml-2', 'mt-0.5', 'text-3xl')}>
            <ThemeSwitcher />
          </div>

          {/* Language switcher */}
          <div className={c('flex', 'ml-2', 'mt-0.5', "w-10 h-10")}>
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile buttons */}
        <div className={c('sm:hidden', 'flex', 'gap-x-5', 'text-3xl')}>
          {/* Theme switcher */}
          <ThemeSwitcher />

          {/* Language switcher */}
          <div className={c('flex', "w-9 h-9")}>
            <LanguageSwitcher />
          </div>

          {/* Nav button */}
          <button
            aria-label={locale === 'es' ? 'Abrir menú' : 'Open menu'}
            aria-expanded={isMobileNavVisible}
            aria-controls="mobile-nav"
            className={c('sm:hidden', { 'text-cyan-500': isMobileNavVisible })}
            onClick={() => setIsMobileNavVisible((v) => !v)}
          >
            <FiMenu aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={c('sm:hidden', 'overflow-hidden')}>
        <nav
          id="mobile-nav"
          className={c(
            { '-mt-[100%]': !isMobileNavVisible },
            'p-2',
            'border-b-2',
            'border-neutral-100',
            'dark:border-neutral-800',
            'space-y-1',
            'text-lg',
            'transition-all',
            'duration-300'
          )}
        >
          {links.map((link, i) => (
            <NavLink key={i} href={link.href}>
              <div>{link.label}</div>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

const Main: FC<PropsWithChildren> = ({ children }) => {
  // Below is a hack to re-initialize the fade when the page changes
  const router = useRouter();
  const fadeKey = useMemo(() => Math.random().toString() + router.pathname, [router.pathname]);

  return (
    <main id="main" className={c('mx-4', 'mt-6', 'mb-20')}>
      <FadeIn key={fadeKey}>{children}</FadeIn>
    </main>
  );
};

const Page: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  const { locale } = useLocale();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.lang = locale;
  }, [theme, locale]);

  return (
    <div
      className={c(
        'flex',
        'flex-col',
        'min-h-screen',
        'dark:bg-neutral-900',
        'dark:text-neutral-200'
      )}
    >
      <Loader />
      <div className={c('container', 'max-w-4xl', 'mx-auto')}>
        <Header />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

type LayoutProps = PropsWithChildren;

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Meta />
      <Analytics />
      <Page>{children}</Page>
    </>
  );
};

export default Layout;
