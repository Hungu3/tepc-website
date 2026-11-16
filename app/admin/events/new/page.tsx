import Link from 'next/link';
import AnnouncementForm from '@/components/admin/AnnouncementForm';
import { requireProfile } from '@/lib/admin-auth';

export default async function NewEventPage() {
  await requireProfile(['admin', 'IT']);
  return <div className="mx-auto max-w-4xl"><Link href="/admin/events" className="text-sm font-semibold text-primary">← Events</Link><h1 className="my-4 text-3xl font-extrabold text-gray-900 dark:text-white">New Event</h1><AnnouncementForm eventOnly /></div>;
}
