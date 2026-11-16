'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DeleteAnnouncementButton({ slug, returnTo = '/admin/announcements' }: { slug: string; returnTo?: string }) {
  const router = useRouter();
  async function remove() {
    if (!window.confirm('Delete this announcement? This action cannot be undone.')) return;
    const { error } = await createClient().from('announcements').delete().eq('slug', slug);
    if (error) {
      window.alert(`Unable to delete announcement: ${error.message}`);
      return;
    }
    router.push(returnTo);
    router.refresh();
  }
  return <button type="button" onClick={remove} className="rounded-lg border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-50">Delete</button>;
}
