'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ForgotPasswordModal from './ForgotPasswordModal';

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const values = new FormData(event.currentTarget);
    const { error: authError } = await createClient().auth.signInWithPassword({
      email: String(values.get('email') ?? ''),
      password: String(values.get('password') ?? ''),
    });
    setLoading(false);
    if (authError) {
      setError('Email or password is incorrect.');
      return;
    }
    router.replace('/admin');
    router.refresh();
  }

  return (
    <>
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm font-semibold">Email</label>
          <input id="login-email" name="email" type="email" autoComplete="email" required className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900" />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1 block text-sm font-semibold">Password</label>
          <input id="login-password" name="password" type="password" autoComplete="current-password" required className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900" />
        </div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white disabled:opacity-60">{loading ? 'Signing in...' : 'Sign In'}</button>
        <button type="button" onClick={() => setForgotOpen(true)} className="text-sm font-semibold text-primary hover:underline">Forgot password?</button>
      </form>
      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
}
