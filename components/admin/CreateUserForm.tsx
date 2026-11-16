'use client';

import { useState, type FormEvent } from 'react';

export default function CreateUserForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setError('');
    setBusy(true);
    const form = event.currentTarget;
    const values = new FormData(form);
    try {
      const response = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.get('email'),
          password: values.get('password'),
          role: values.get('role'),
        }),
      });
      const result: unknown = await response.json();
      if (!response.ok) {
        const detail = typeof result === 'object' && result !== null && 'error' in result && typeof result.error === 'string' ? result.error : 'Unable to create user.';
        throw new Error(detail);
      }
      form.reset();
      setMessage('User created successfully.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to create user.');
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={submit} className="grid gap-4 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-2 dark:border-gray-700 dark:bg-gray-900">
    <div><label htmlFor="create-user-email" className="mb-1 block text-sm font-semibold">Email</label><input id="create-user-email" name="email" type="email" required autoComplete="email" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white" /></div>
    <div><label htmlFor="create-user-password" className="mb-1 block text-sm font-semibold">Password (minimum 8 characters)</label><input id="create-user-password" name="password" type="password" required minLength={8} autoComplete="new-password" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white" /></div>
    <div><label htmlFor="create-user-role" className="mb-1 block text-sm font-semibold">Role</label><select id="create-user-role" name="role" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"><option value="IT">IT</option><option value="admin">Admin</option></select></div>
    <div className="flex items-end"><button disabled={busy} className="rounded-lg bg-primary px-5 py-3 font-semibold text-white disabled:opacity-60">{busy ? 'Creating...' : 'Create User'}</button></div>
    {error && <p role="alert" className="text-sm text-red-700 md:col-span-2">{error}</p>}
    {message && <p role="status" className="text-sm text-primary md:col-span-2">{message}</p>}
  </form>;
}
