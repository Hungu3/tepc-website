import Link from 'next/link';
import ChangePasswordForm from '@/components/admin/ChangePasswordForm';
import { requireProfile } from '@/lib/admin-auth';

export default async function ChangePasswordPage() {
  await requireProfile(['admin']);
  return <div className="mx-auto max-w-3xl"><Link href="/admin/settings" className="text-sm font-semibold text-primary">← Settings</Link><h1 className="my-4 text-3xl font-extrabold text-gray-900 dark:text-white">Change Password</h1><ChangePasswordForm /></div>;
}
