import Link from 'next/link';
import { requireProfile } from '@/lib/admin-auth';

export default async function AdminSettingsPage() {
  const { user, role } = await requireProfile(['admin']);
  const name = typeof user.user_metadata.full_name === 'string' ? user.user_metadata.full_name : 'Administrator';
  return <div className="mx-auto max-w-3xl"><h1 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-white">Settings</h1><section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"><h2 className="mb-4 text-xl font-bold">Profile</h2><dl className="space-y-2 text-sm"><div><dt className="inline font-semibold">Name: </dt><dd className="inline">{name}</dd></div><div><dt className="inline font-semibold">Email: </dt><dd className="inline">{user.email}</dd></div><div><dt className="inline font-semibold">Role: </dt><dd className="inline">{role}</dd></div></dl></section><nav className="grid gap-3 sm:grid-cols-2"><Link href="/admin/settings/password" className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-primary hover:border-primary dark:border-gray-700 dark:bg-gray-900">Change Password →</Link><Link href="/admin/settings/users" className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-primary hover:border-primary dark:border-gray-700 dark:bg-gray-900">Manage Users →</Link></nav></div>;
}
