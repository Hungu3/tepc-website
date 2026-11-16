'use client';

import { useState, type FormEvent } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Failure = 'copy.contactConfigError' | 'copy.contactGenericError' | 'copy.contactNetworkError';

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState<Failure>('copy.contactGenericError');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!key || key === 'your_key_here') {
      setFailure('copy.contactConfigError');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setFailure('copy.contactGenericError');

    const formData = new FormData(form);
    formData.append('access_key', key);
    formData.append('subject', 'New message from the TePC website');
    formData.append('from_name', 'TePC Website');

    let response: Response;
    try {
      response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
    } catch {
      setFailure('copy.contactNetworkError');
      setStatus('error');
      return;
    }

    let result: { success?: unknown };
    try {
      result = (await response.json()) as { success?: unknown };
    } catch {
      setFailure('copy.contactGenericError');
      setStatus('error');
      return;
    }

    if (response.ok && result.success === true) {
      setStatus('success');
      form.reset();
    } else {
      setFailure('copy.contactGenericError');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-primary dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100';

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot field to reduce spam */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="cf-name" className="mb-1 block text-sm font-semibold">
          {t('forms.name')}
        </label>
        <input id="cf-name" name="name" type="text" required className={inputClass} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className="mb-1 block text-sm font-semibold">
            {t('forms.email')}
          </label>
          <input id="cf-email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1 block text-sm font-semibold">
            {t('forms.phone')}
          </label>
          <input id="cf-phone" name="phone" type="tel" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1 block text-sm font-semibold">
          {t('forms.message')}
        </label>
        <textarea id="cf-message" name="message" rows={6} required className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'loading' ? t('buttons.sending') : t('buttons.send')}
      </button>

      {status === 'success' && (
        <p role="status" className="rounded-lg bg-green-50 p-4 font-semibold text-primary">
          {t('copy.contactSuccess')}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 font-semibold text-red-700">
          {t(failure)}
        </p>
      )}
    </form>
  );
}
