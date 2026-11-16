'use client';

import { useState, type FormEvent } from 'react';
import { org } from '@/lib/utils';
import { WhatsAppIcon } from './Icons';
import { useLanguage } from '@/lib/LanguageContext';

const STORAGE_KEY = 'tepc_subscribers';

export default function SubscribeSidebar() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const entry = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      date: new Date().toISOString(),
    };
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list: unknown = raw ? JSON.parse(raw) : [];
      const next = Array.isArray(list) ? [...list, entry] : [entry];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 focus:border-primary';

  return (
    <aside className="space-y-6" aria-label={t('buttons.subscribe')}>
      <div className="rounded-xl border border-gray-200 bg-green-50 p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-1 text-xl font-bold text-primary-dark dark:text-green-300">{t('copy.stayUpdated')}</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          {t('copy.subscribeIntro')}
        </p>

        {status === 'success' ? (
          <p
            role="status"
            className="rounded-lg bg-white p-4 text-sm font-semibold text-primary dark:bg-gray-800"
          >
            {t('copy.subscribeSuccess')}
          </p>
        ) : (
          <>
            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <label htmlFor="sub-name" className="mb-1 block text-sm font-medium">
                  {t('forms.name')}
                </label>
                <input id="sub-name" name="name" type="text" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="sub-phone" className="mb-1 block text-sm font-medium">
                  {t('forms.phone')}
                </label>
                <input id="sub-phone" name="phone" type="tel" className={inputClass} />
              </div>
              <div>
                <label htmlFor="sub-email" className="mb-1 block text-sm font-medium">
                  {t('forms.email')}
                </label>
                <input id="sub-email" name="email" type="email" required className={inputClass} />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                {t('buttons.subscribe')}
              </button>
            </form>
            {status === 'error' && (
              <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
                {t('copy.subscribeError')}{' '}
                <a
                  href="https://wa.me/255724800201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  WhatsApp
                </a>
                .
              </p>
            )}
          </>
        )}
      </div>

      <a
        href={org.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90"
      >
        <WhatsAppIcon className="h-5 w-5" /> {t('copy.chatWhatsApp')}
      </a>
    </aside>
  );
}
