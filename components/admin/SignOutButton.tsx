'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    const { error } = await createClient().auth.signOut();
    if (error) {
      window.alert(`Unable to sign out: ${error.message}`);
      return;
    }
    router.replace('/admin/login');
    router.refresh();
  }
  return <button type="button" onClick={signOut} className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-700 hover:bg-red-50">Sign Out</button>;
}
