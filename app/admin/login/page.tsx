import type { Metadata } from 'next';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata: Metadata = { title: 'Admin Login' };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h1 className="mb-2 text-2xl font-extrabold text-primary-dark">TePC Admin</h1>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">Sign in with your registered account.</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
