import Link from 'next/link';
import { requireProfile } from '@/lib/admin-auth';

export default async function AdminDashboard() {
  const { supabase, role } = await requireProfile();
  const [{ count: announcementCount, error: announcementsError }, { data: recent, error: recentError }] = await Promise.all([
    supabase.from('announcements').select('*', { count: 'exact', head: true }),
    supabase.from('announcements').select('slug,title,date,category').order('date', { ascending: false }).limit(5),
  ]);
  if (announcementsError || recentError) throw new Error(`Unable to load dashboard: ${announcementsError?.message ?? recentError?.message}`);
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Dashboard</h1><p className="mt-1 text-gray-600 dark:text-gray-300">Manage TePC website content.</p></div>
        {role === 'admin' && <form action="/api/seed" method="post"><button className="rounded-lg bg-gold px-4 py-2.5 font-semibold text-gray-900">Import Default News &amp; Updates</button></form>}
      </div>
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <p className="text-sm font-semibold text-gray-500">Total news &amp; updates</p>
        <p className="mt-2 text-4xl font-extrabold text-primary">{announcementCount ?? 0}</p>
      </section>
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Recent updates</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {(recent ?? []).map((item) => (
            <li key={item.slug} className="flex flex-wrap justify-between gap-2 py-3">
              <span className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</span>
              <span className="text-sm text-gray-500">{item.category} · {item.date}</span>
            </li>
          ))}
          {!recent?.length && <li className="py-3 text-gray-500">No news or updates have been added.</li>}
        </ul>
        {role === 'admin' && <Link href="/admin/announcements/new" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">Create update</Link>}
      </section>
    </div>
  );
}
