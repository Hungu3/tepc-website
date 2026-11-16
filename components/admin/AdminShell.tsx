'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import SignOutButton from './SignOutButton';

type Role = 'admin' | 'IT';

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [profile, setProfile] = useState<{ email: string; role: Role } | null>(null);
  const [profileError, setProfileError] = useState('');
  const publicRoute = ['/admin/login', '/admin/forgot-password', '/admin/reset-password'].includes(pathname);

  useEffect(() => {
    if (publicRoute) return;
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        setProfileError('Your session has expired. Please sign in again.');
        return;
      }
      const { data, error } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (error || (data?.role !== 'admin' && data?.role !== 'IT')) {
        setProfileError(error?.message ?? 'Your account does not have an administrator role.');
        return;
      }
      setProfile({ email: user.email ?? '', role: data.role });
    }
    void loadProfile();
  }, [publicRoute]);

  if (publicRoute) return children;
  if (profileError) {
    return <main className="p-8"><p role="alert" className="text-red-700">{profileError}</p><Link href="/admin/login" className="font-semibold text-primary">Sign in</Link></main>;
  }
  if (!profile) return <main className="p-8" aria-busy="true">Loading admin area...</main>;
  const links = [
    { href: '/admin', label: 'Dashboard', visible: true },
    { href: '/admin/announcements', label: 'News & Updates', visible: profile.role === 'admin' },
    { href: '/admin/events', label: 'Events', visible: true },
    { href: '/admin/settings', label: 'Settings', visible: profile.role === 'admin' },
    { href: '/admin/settings/site', label: 'Site Content', visible: profile.role === 'admin' },
    { href: '/admin/settings/pages', label: 'Page Content', visible: profile.role === 'admin' },
  ];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 md:flex">
      <aside className="w-full border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <Link href="/admin" className="mb-1 block text-xl font-extrabold text-primary">TePC Admin</Link>
        <p className="mb-6 break-all text-xs text-gray-500">{profile.email} · {profile.role}</p>
        <nav aria-label="Admin navigation" className="space-y-1">
          {links.filter((link) => link.visible).map((link) => <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-primary dark:text-gray-200 dark:hover:bg-gray-800">{link.label}</Link>)}
          <SignOutButton />
        </nav>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-8">{children}</main>
    </div>
  );
}
