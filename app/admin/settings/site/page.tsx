import { requireProfile } from '@/lib/admin-auth';
import { getSiteSettings } from '@/lib/site-settings';
import SiteSettingsForm from '@/components/admin/SiteSettingsForm';
import { org } from '@/lib/utils';
import { translate } from '@/lib/translations';

const settingKeys = [
  'hero_title',
  'hero_subtitle',
  'contact_phone',
  'contact_email',
  'contact_address',
] as const;

export default async function SiteContentPage() {
  await requireProfile(['admin']);
  const settings = await getSiteSettings();

  const defaults = {
    hero_title: {
      value_en: translate('en', 'copy.homeTagline'),
      value_sw: translate('sw', 'copy.homeTagline'),
    },
    hero_subtitle: {
      value_en: translate('en', 'copy.homeIntro'),
      value_sw: translate('sw', 'copy.homeIntro'),
    },
    contact_phone: { value_en: org.phones.join(' / '), value_sw: org.phones.join(' / ') },
    contact_email: { value_en: org.emails.join(' | '), value_sw: org.emails.join(' | ') },
    contact_address: { value_en: org.address, value_sw: org.address },
  };

  const initialValues = Object.fromEntries(
    settingKeys.map((key) => [
      key,
      {
        value_en: settings[key]?.value_en || defaults[key].value_en,
        value_sw: settings[key]?.value_sw || defaults[key].value_sw,
      },
    ]),
  ) as typeof defaults;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">Site Content</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">Edit the homepage hero and contact information shown on the public website.</p>
      <SiteSettingsForm initialValues={initialValues} />
    </div>
  );
}
