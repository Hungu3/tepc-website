import Link from 'next/link';
import ForgotPasswordPageForm from '@/components/admin/ForgotPasswordPageForm';

export default function AdminForgotPasswordPage() {
  return <main className="flex min-h-[70vh] items-center justify-center px-4 py-12"><section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-900"><h1 className="mb-4 text-2xl font-extrabold">Reset your password</h1><ForgotPasswordPageForm /><Link href="/admin/login" className="mt-5 inline-block text-sm font-semibold text-primary">Back to sign in</Link></section></main>;
}
