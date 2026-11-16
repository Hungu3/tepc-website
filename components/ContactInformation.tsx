'use client';

import { MailIcon, MapPinIcon, PhoneIcon } from '@/components/Icons';
import Translation from '@/components/Translation';
import { useLanguage } from '@/lib/LanguageContext';
import { org } from '@/lib/utils';

interface ContactInformationProps {
  phone: { value_en: string; value_sw: string };
  email: { value_en: string; value_sw: string };
  address: { value_en: string; value_sw: string };
}

export default function ContactInformation({ phone, email, address }: ContactInformationProps) {
  const { language } = useLanguage();
  const localizedPhone = language === 'en' ? phone.value_en : phone.value_sw;
  const localizedEmail = language === 'en' ? email.value_en : email.value_sw;
  const localizedAddress = language === 'en' ? address.value_en : address.value_sw;
  return (
    <>
      <h2 id="contact-information-heading" className="text-xl font-bold text-primary-dark">
        <Translation translationKey="headings.contactInformation" />
      </h2>
      <div className="flex gap-3">
        <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold"><Translation translationKey="headings.address" /></p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{localizedAddress || org.address}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold"><Translation translationKey="copy.phoneLabel" /></p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{localizedPhone || org.phones.join(' / ')}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <MailIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-semibold"><Translation translationKey="copy.emailLabel" /></p>
          <p className="break-all text-sm text-gray-700 dark:text-gray-200">{localizedEmail || org.emails.join(' | ')}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold"><Translation translationKey="copy.website" /></p>
        <p className="text-sm text-gray-700 dark:text-gray-200">{org.website}</p>
      </div>
      <div>
        <p className="font-semibold"><Translation translationKey="copy.regNo" /></p>
        <p className="text-sm text-gray-700 dark:text-gray-200">{org.regNo}</p>
      </div>
      <a href="https://www.linkedin.com/in/tepc-tanzania-499609417" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline" aria-label="LinkedIn">
        <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-xs font-bold text-white">in</span>
        LinkedIn
      </a>
    </>
  );
}
