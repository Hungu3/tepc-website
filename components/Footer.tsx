'use client';

import Image from 'next/image';
import Link from 'next/link';
import { portalFooter } from '@/data/portal';
import { org } from '@/lib/utils';
import { MailIcon, MapPinIcon, PhoneIcon } from './Icons';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const copy = portalFooter[language];

  return (
    <footer className="mt-16 bg-primary-dark text-green-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/logo.png"
            alt="TePC Logo"
            width={80}
            height={80}
            className="mb-4 h-16 w-16 object-contain"
          />
          <h2 className="mb-3 text-lg font-bold text-gold">{copy.about}</h2>
          <p className="text-sm leading-relaxed">{copy.description}</p>
          <p className="mt-3 font-semibold text-gold">{copy.tagline}</p>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-gold">{copy.quickLinksTitle}</h2>
          <ul className="space-y-2 text-sm">
            {copy.quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-gold">{copy.programs}</h2>
          <ul className="space-y-2 text-sm">
            {copy.programLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-gold">{copy.contact}</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{org.address}</span>
            </li>
            <li className="flex gap-2">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{org.phones.join(' / ')}</span>
            </li>
            <li className="flex gap-2">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span className="break-all">{org.emails.join(' | ')}</span>
            </li>
            <li className="pt-1">
              <span className="font-semibold">{copy.registration}: </span>
              {org.regNo}
            </li>
            <li className="flex flex-wrap gap-x-3 gap-y-1">
              <Link href="/resources#privacy-policy" className="hover:text-gold hover:underline">
                {copy.privacy}
              </Link>
              <Link href="/resources#terms-and-conditions" className="hover:text-gold hover:underline">
                {copy.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-green-800 px-4 py-4 text-center text-xs text-green-100">
        {copy.copyright}
      </div>
    </footer>
  );
}
