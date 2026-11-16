'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { portalNavigation } from '@/data/portal';
import { useLanguage } from '@/lib/LanguageContext';
import { CloseIcon, MenuIcon } from './Icons';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
    >
      <path
        fillRule="evenodd"
        d="M5.22 7.47a.75.75 0 0 1 1.06 0L10 11.19l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { language, t } = useLanguage();

  const label = (text: { en: string; sw: string }) => text[language];
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0].split('?')[0]);
  const closeMenus = () => {
    setOpenMenu(null);
    setOpenMobileMenu(null);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" onClick={closeMenus} aria-label={`${t('nav.home')} — TePC – Tanzania`}>
          <Image
            src="/logo.png"
            alt="TePC Logo"
            width={60}
            height={60}
            className="h-[60px] w-[60px] object-contain"
          />
        </Link>

        <nav className="hidden flex-1 xl:block" aria-label={t('copy.mainNavigation')}>
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {portalNavigation.map((item) => {
              const expanded = openMenu === item.id;
              return (
                <li
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenMenu(item.id)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className={`rounded-md px-2 py-2 text-xs font-semibold transition-colors hover:bg-green-50 hover:text-primary dark:hover:bg-gray-800 ${
                        isActive(item.href) ? 'text-primary' : 'text-gray-700 dark:text-gray-100'
                      }`}
                    >
                      {label(item.label)}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`${label(item.label)} menu`}
                        aria-expanded={expanded}
                        onClick={() => setOpenMenu(expanded ? null : item.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Escape') setOpenMenu(null);
                        }}
                        className="rounded-md p-1 text-gray-600 hover:bg-green-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        <Chevron expanded={expanded} />
                      </button>
                    )}
                  </div>
                  {item.children && expanded && (
                    <div className="absolute left-1/2 top-full z-50 mt-1 w-[min(90vw,56rem)] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                      <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.href}
                              onClick={() => setOpenMenu(null)}
                              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                              {label(child.label)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700 xl:hidden"
          aria-label={mobileOpen ? t('copy.closeMenu') : t('copy.openMenu')}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 xl:hidden"
          aria-label={t('copy.mobileNavigation')}
        >
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {portalNavigation.map((item) => {
              const expanded = openMobileMenu === item.id;
              return (
                <li key={item.id} className="border-b border-gray-100 last:border-0 dark:border-gray-800">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={closeMenus}
                      className={`flex-1 rounded-md px-3 py-3 text-sm font-semibold ${
                        isActive(item.href)
                          ? 'text-primary'
                          : 'text-gray-800 dark:text-gray-100'
                      }`}
                    >
                      {label(item.label)}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`${label(item.label)} menu`}
                        aria-expanded={expanded}
                        onClick={() => setOpenMobileMenu(expanded ? null : item.id)}
                        className="rounded-md p-3 text-gray-600 hover:bg-green-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        <Chevron expanded={expanded} />
                      </button>
                    )}
                  </div>
                  {item.children && expanded && (
                    <ul className="mb-2 ml-3 border-l-2 border-gold pl-3">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            onClick={closeMenus}
                            className="block rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-primary dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            {label(child.label)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-7 pb-4 sm:px-9">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
