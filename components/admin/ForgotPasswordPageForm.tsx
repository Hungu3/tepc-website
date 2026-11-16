'use client';

import { useState, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPageForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const { error: requestError } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin/reset-password` });
    if (requestError) {
      setError('Unable to process the request right now. Please try again later.');
      return;
    }
    setSent(true);
  }
  if (sent) return <p role="status" className="text-sm text-gray-700 dark:text-gray-300">If an account exists for that email, a password reset link has been sent.</p>;
  return <form onSubmit={submit} className="space-y-4"><label htmlFor="reset-email" className="block text-sm font-semibold">Email</label><input id="reset-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900" />{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<button className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white">Send reset link</button></form>;
}
