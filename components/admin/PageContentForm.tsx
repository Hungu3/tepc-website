'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { updatePageContent } from '@/lib/page-content';

interface ContentValue {
  en: string;
  sw: string;
}

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

export default function PageContentForm({
  pageSlug,
  initialContent,
}: {
  pageSlug: string;
  initialContent: Record<string, ContentValue>;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initialContent);
  const [newKey, setNewKey] = useState('');
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function updateValue(key: string, language: keyof ContentValue, value: string) {
    setValues((current) => ({
      ...current,
      [key]: { ...current[key], [language]: value },
    }));
    setStatus('idle');
    setErrorMessage('');
  }

  function addBlock() {
    const key = newKey.trim();
    if (!key || Object.prototype.hasOwnProperty.call(values, key)) return;
    setValues((current) => ({ ...current, [key]: { en: '', sw: '' } }));
    setNewKey('');
    setStatus('idle');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('saving');
    setErrorMessage('');

    try {
      for (const [key, value] of Object.entries(values)) {
        await updatePageContent(pageSlug, key, value.en, value.sw);
      }
      setStatus('success');
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save page content.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="new-content-key" className="mb-1 block text-sm font-semibold">New content key</label>
          <input
            id="new-content-key"
            value={newKey}
            onChange={(event) => setNewKey(event.target.value)}
            placeholder="e.g. community-story"
            className={inputClass}
          />
        </div>
        <button
          type="button"
          onClick={addBlock}
          disabled={!newKey.trim() || Object.prototype.hasOwnProperty.call(values, newKey.trim())}
          className="self-end rounded-lg border border-primary px-4 py-2.5 font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Block
        </button>
      </div>

      {Object.entries(values).map(([key, value]) => (
        <fieldset key={key} className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 sm:grid-cols-2">
          <legend className="max-w-full break-all px-2 font-semibold">{key}</legend>
          <div>
            <label htmlFor={`${key}-en`} className="mb-1 block text-sm font-medium">English</label>
            <textarea
              id={`${key}-en`}
              rows={3}
              value={value.en}
              onChange={(event) => updateValue(key, 'en', event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={`${key}-sw`} className="mb-1 block text-sm font-medium">Swahili</label>
            <textarea
              id={`${key}-sw`}
              rows={3}
              value={value.sw}
              onChange={(event) => updateValue(key, 'sw', event.target.value)}
              className={inputClass}
            />
          </div>
        </fieldset>
      ))}

      {!Object.keys(values).length && (
        <p className="rounded-xl border border-gray-200 bg-white p-5 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
          No content blocks yet. Add a key above to create the first block.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'saving' || !Object.keys(values).length}
        className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'saving' ? 'Saving…' : 'Save Changes'}
      </button>
      {status === 'success' && <p role="status" className="font-semibold text-green-700">Page content saved successfully.</p>}
      {status === 'error' && <p role="alert" className="font-semibold text-red-700">{errorMessage}</p>}
    </form>
  );
}
