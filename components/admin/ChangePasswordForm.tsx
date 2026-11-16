'use client';

import { useState, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ChangePasswordForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setError('');
    const form = event.currentTarget;
    const data = new FormData(form);
    const currentPassword = String(data.get('current') ?? '');
    const password = String(data.get('password') ?? '');
    if (password !== data.get('confirm')) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (password.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    setBusy(true);
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.email) {
      setBusy(false);
      setError('Unable to verify your signed-in account. Please sign in again.');
      return;
    }
    const { error: verifyError } = await supabase.auth.signInWithPassword({ email: user.email, password: currentPassword });
    if (verifyError) {
      setBusy(false);
      setError('Current password is incorrect.');
      return;
    }
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError(`Unable to update password: ${updateError.message}`);
      return;
    }
    form.reset();
    setMessage('Password updated successfully.');
  }

  return <form onSubmit={submit} className="max-w-xl space-y-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
    <PasswordField id="current" name="current" label="Current password" autoComplete="current-password" />
    <PasswordField id="new-password" name="password" label="New password" autoComplete="new-password" />
    <PasswordField id="confirm-password" name="confirm" label="Confirm new password" autoComplete="new-password" />
    {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
    {message && <p role="status" className="text-sm text-primary">{message}</p>}
    <button disabled={busy} className="rounded-lg bg-primary px-5 py-3 font-semibold text-white disabled:opacity-60">{busy ? 'Updating...' : 'Update Password'}</button>
  </form>;
}

function PasswordField({ id, name, label, autoComplete }: { id: string; name: string; label: string; autoComplete: string }) {
  return <div><label htmlFor={id} className="mb-1 block text-sm font-semibold">{label}</label><input id={id} name={name} type="password" autoComplete={autoComplete} required className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white" /></div>;
}
