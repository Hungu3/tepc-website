import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import ContactInformation from '@/components/ContactInformation';
import Translation from '@/components/Translation';
import { getSiteSettings } from '@/lib/site-settings';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with TePC – Tanzania. Address, phone numbers, emails, and a contact form.',
};

export default async function WasilianaPage() {
  const siteSettings = await getSiteSettings();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-extrabold text-primary-dark"><Translation translationKey="headings.contact" /></h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        <Translation translationKey="copy.contactIntro" />
      </p>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="space-y-5 rounded-xl bg-green-50 p-6 dark:bg-gray-900" aria-labelledby="contact-information-heading">
          <ContactInformation
            phone={siteSettings.contact_phone ?? { value_en: '', value_sw: '' }}
            email={siteSettings.contact_email ?? { value_en: '', value_sw: '' }}
            address={siteSettings.contact_address ?? { value_en: '', value_sw: '' }}
          />
        </aside>
      </div>
    </div>
  );
}
