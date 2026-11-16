import Link from 'next/link';
import AnnouncementForm from '@/components/admin/AnnouncementForm';
import { requireProfile } from '@/lib/admin-auth';

export default async function NewAnnouncementPage() {
  await requireProfile(['admin']);
  return <div className="mx-auto max-w-4xl"><Link href="/admin/announcements" className="text-sm font-semibold text-primary">← News &amp; Updates</Link><h1 className="my-4 text-3xl font-extrabold text-gray-900 dark:text-white">New Update</h1><AnnouncementForm /></div>;
}
