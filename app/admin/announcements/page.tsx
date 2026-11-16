import Link from 'next/link';
import { requireProfile } from '@/lib/admin-auth';
import { toNewsCategory, type Category } from '@/data/announcements';

export default async function AdminAnnouncementsPage() {
  const { supabase } = await requireProfile(['admin']);
  const { data, error } = await supabase.from('announcements').select('slug,title,category,date,featured').order('date', { ascending: false });
  if (error) throw new Error(`Unable to load announcements: ${error.message}`);
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">News &amp; Updates</h1><Link href="/admin/announcements/new" className="rounded-lg bg-primary px-4 py-2.5 font-semibold text-white">New Update</Link></div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-200"><tr><th className="p-4">Title</th><th className="p-4">Category</th><th className="p-4">Date</th><th className="p-4">Featured</th><th className="p-4">Actions</th></tr></thead><tbody className="divide-y divide-gray-200 dark:divide-gray-700">{(data ?? []).map((item) => <tr key={item.slug}><td className="p-4 font-semibold text-gray-900 dark:text-white">{item.title}</td><td className="p-4">{toNewsCategory(item.category as Category)}</td><td className="p-4">{item.date}</td><td className="p-4">{item.featured ? 'Yes' : 'No'}</td><td className="p-4"><Link className="font-semibold text-primary hover:underline" href={`/admin/announcements/${encodeURIComponent(item.slug)}/edit`}>Edit</Link></td></tr>)}</tbody></table>
        {!data?.length && <p className="p-6 text-gray-500">No announcements found.</p>}
      </div>
    </div>
  );
}
