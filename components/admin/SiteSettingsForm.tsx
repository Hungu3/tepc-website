'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { updateSiteSetting } from '@/lib/site-settings';

type SettingKey =
  | 'hero_title'
  | 'hero_subtitle'
  | 'contact_phone'
  | 'contact_email'
  | 'contact_address';

interface EditableSetting {
  key: SettingKey;
  label: string;
  multiline?: boolean;
}

const settings: EditableSetting[] = [
  { key: 'hero_title', label: 'Hero Title' },
  { key: 'hero_subtitle', label: 'Hero Subtitle', multiline: true },
  { key: 'contact_phone', label: 'Contact Phone' },
  { key: 'contact_email', label: 'Contact Email' },
  { key: 'contact_address', label: 'Contact Address', multiline: true },
];

type FormValues = Record<SettingKey, { value_en: string; value_sw: string }>;
type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

export default function SiteSettingsForm({ initialValues }: { initialValues: FormValues }) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function updateValue(key: SettingKey, language: 'value_en' | 'value_sw', value: string) {
    setValues((current) => ({
      ...current,
      [key]: { ...current[key], [language]: value },
    }));
    setStatus('idle');
    setErrorMessage('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('saving');
    setErrorMessage('');

    try {
      for (const setting of settings) {
        const value = values[setting.key];
        await updateSiteSetting(setting.key, value.value_en, value.value_sw);
      }
      setStatus('success');
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save site content.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {settings.map((setting) => (
        <fieldset key={setting.key} className="grid gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700 sm:grid-cols-2">
          <legend className="px-2 font-semibold">{setting.label}</legend>
          {(['value_en', 'value_sw'] as const).map((language) => {
            const label = language === 'value_en' ? 'English' : 'Swahili';
            const id = `${setting.key}-${language}`;
            return (
              <div key={language}>
                <label htmlFor={id} className="mb-1 block text-sm font-medium">{label}</label>
                {setting.multiline ? (
                  <textarea
                    id={id}
                    rows={3}
                    value={values[setting.key][language]}
                    onChange={(event) => updateValue(setting.key, language, event.target.value)}
                    className={inputClass}
                  />
                ) : (
                  <input
                    id={id}
                    value={values[setting.key][language]}
                    onChange={(event) => updateValue(setting.key, language, event.target.value)}
                    className={inputClass}
                  />
                )}
              </div>
            );
          })}
        </fieldset>
      ))}

      <button
        type="submit"
        disabled={status === 'saving'}
        className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'saving' ? 'Saving…' : 'Save Changes'}
      </button>
      {status === 'success' && <p role="status" className="font-semibold text-green-700">Site content saved successfully.</p>}
      {status === 'error' && <p role="alert" className="font-semibold text-red-700">{errorMessage}</p>}
    </form>
  );
}
