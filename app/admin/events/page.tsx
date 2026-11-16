import Link from 'next/link';
import { requireProfile } from '@/lib/admin-auth';

export default async function AdminEventsPage() {
  const { supabase } = await requireProfile(['admin', 'IT']);
  const { data, error } = await supabase.from('announcements').select('slug,title,date').in('category', ['Event', 'Matukio']).order('date', { ascending: false });
  if (error) throw new Error(`Unable to load events: ${error.message}`);
  return <div className="mx-auto max-w-6xl"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Events</h1><Link href="/admin/events/new" className="rounded-lg bg-primary px-4 py-2.5 font-semibold text-white">New Event</Link></div><div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"><table className="w-full min-w-[560px] text-left text-sm"><thead className="bg-gray-50 dark:bg-gray-800"><tr><th className="p-4">Title</th><th className="p-4">Date</th><th className="p-4">Actions</th></tr></thead><tbody className="divide-y divide-gray-200 dark:divide-gray-700">{(data ?? []).map((item) => <tr key={item.slug}><td className="p-4 font-semibold">{item.title}</td><td className="p-4">{item.date}</td><td className="p-4"><Link href={`/admin/events/${encodeURIComponent(item.slug)}/edit`} className="font-semibold text-primary hover:underline">Edit</Link></td></tr>)}</tbody></table>{!data?.length && <p className="p-6 text-gray-500">No events found.</p>}</div></div>;
}
