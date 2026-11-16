import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type AdminRole = 'admin' | 'IT';

export async function requireProfile(allowedRoles?: AdminRole[]) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect('/admin/login');

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (error || !profile || (profile.role !== 'admin' && profile.role !== 'IT')) {
    console.error('Unable to verify admin profile:', error?.message ?? 'Profile role is missing.');
    redirect('/admin/login?error=profile');
  }
  const role = profile.role as AdminRole;
  if (allowedRoles && !allowedRoles.includes(role)) redirect('/admin');
  return { supabase, user, role };
}
