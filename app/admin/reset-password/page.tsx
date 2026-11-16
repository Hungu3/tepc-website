'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data, error: sessionError } = await createClient().auth.getSession();
      if (sessionError || !data.session) {
        router.replace('/admin/login');
        return;
      }
      setReady(true);
    }
    void checkSession();
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const password = String(values.get('password') ?? '');
    if (password.length < 8 || password !== values.get('confirm')) {
      setError(password.length < 8 ? 'Password must be at least 8 characters.' : 'Passwords do not match.');
      return;
    }
    setBusy(true);
    setError('');
    const { error: updateError } = await createClient().auth.updateUser({ password });
    if (updateError) {
      setBusy(false);
      setError(`Unable to update password: ${updateError.message}`);
      return;
    }
    await createClient().auth.signOut();
    router.replace('/admin/login?password=updated');
  }

  if (!ready) return <main className="p-8">Verifying password reset link...</main>;
  return <main className="flex min-h-[70vh] items-center justify-center px-4 py-12"><form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-900"><h1 className="text-2xl font-extrabold">Set a new password</h1><div><label htmlFor="reset-password" className="mb-1 block text-sm font-semibold">New password</label><input id="reset-password" name="password" type="password" minLength={8} required autoComplete="new-password" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900" /></div><div><label htmlFor="reset-confirm" className="mb-1 block text-sm font-semibold">Confirm password</label><input id="reset-confirm" name="confirm" type="password" minLength={8} required autoComplete="new-password" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900" /></div>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<button disabled={busy} className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white disabled:opacity-60">{busy ? 'Updating...' : 'Update Password'}</button></form></main>;
}
