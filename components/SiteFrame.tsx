'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ChatWidget from '@/components/ChatWidget';
import { useLanguage } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/translations';
import { portalPages } from '@/data/portal';

export default function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { language, t } = useLanguage();
  const titleKeys: Record<string, TranslationKey> = {
    '/': 'copy.homeTagline',
    '/matangazo': 'nav.announcements',
    '/matukio': 'nav.events',
    '/fursa': 'nav.opportunities',
    '/pakua': 'nav.downloads',
    '/kuhusu': 'nav.about',
    '/wasiliana': 'nav.contact',
  };
  const portalPageIds: Record<string, string> = {
    '/about': 'about',
    '/our-work': 'our-work',
    '/projects': 'projects',
    '/impact': 'impact',
    '/get-involved': 'get-involved',
    '/resources': 'resources',
    '/news': 'news',
    '/publications': 'publications',
  };

  useEffect(() => {
    const titleKey = titleKeys[pathname];
    const portalPage = portalPageIds[pathname];
    const title = titleKey
      ? t(titleKey)
      : portalPage
        ? portalPages[language][portalPage]?.title
        : undefined;
    if (title) document.title = `${title} | TePC – Tanzania`;
  }, [language, pathname, t]);

  if (pathname.startsWith('/admin')) return children;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
