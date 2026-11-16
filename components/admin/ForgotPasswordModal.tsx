'use client';

import { useState, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  if (!open) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const { error: requestError } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    if (requestError) {
      setError('Unable to process the request right now. Please try again later.');
      return;
    }
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="forgot-heading" className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 id="forgot-heading" className="mb-4 text-xl font-bold">Reset your password</h2>
        {sent ? (
          <p role="status" className="mb-4 text-sm text-gray-700">If an account exists for that email, a password reset link has been sent.</p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <label htmlFor="forgot-email" className="block text-sm font-semibold">Email</label>
            <input id="forgot-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900" />
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <button className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white">Send reset link</button>
          </form>
        )}
        <button type="button" onClick={onClose} className="mt-4 text-sm font-semibold text-primary">Close</button>
      </section>
    </div>
  );
}
