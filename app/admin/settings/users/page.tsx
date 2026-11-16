import CreateUserForm from '@/components/admin/CreateUserForm';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireProfile } from '@/lib/admin-auth';

export default async function UsersPage() {
  await requireProfile(['admin']);
  const { data, error } = await createAdminClient().auth.admin.listUsers({ page: 1, perPage: 100 });
  if (error) throw new Error(`Unable to load users: ${error.message}`);
  const profilesClient = await import('@/lib/supabase/server').then((module) => module.createClient());
  const { data: profiles, error: profilesError } = await profilesClient.from('profiles').select('id,role');
  if (profilesError) throw new Error(`Unable to load user roles: ${profilesError.message}`);
  const roles = new Map((profiles ?? []).map((profile) => [profile.id, profile.role]));
  return <div className="mx-auto max-w-5xl"><h1 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-white">Manage Users</h1><section className="mb-8"><h2 className="mb-3 text-xl font-bold">Create User</h2><CreateUserForm /></section><section><h2 className="mb-3 text-xl font-bold">Existing Users</h2><div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"><table className="w-full min-w-[560px] text-left text-sm"><thead className="bg-gray-50 dark:bg-gray-800"><tr><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Created</th></tr></thead><tbody className="divide-y divide-gray-200 dark:divide-gray-700">{data.users.map((user) => <tr key={user.id}><td className="p-4">{user.email}</td><td className="p-4">{roles.get(user.id) ?? 'No profile'}</td><td className="p-4">{user.created_at.slice(0, 10)}</td></tr>)}</tbody></table></div></section></div>;
}
