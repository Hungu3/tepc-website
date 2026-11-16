import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

interface CreateUserInput {
  email: string;
  password: string;
  role: 'admin' | 'IT';
}

function isCreateUserInput(value: unknown): value is CreateUserInput {
  if (typeof value !== 'object' || value === null || !('email' in value) || !('password' in value) || !('role' in value)) return false;
  return typeof value.email === 'string' && value.email.includes('@') && typeof value.password === 'string' && value.password.length >= 8 && (value.role === 'admin' || value.role === 'IT');
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  const { data: profile, error: roleError } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (roleError || profile?.role !== 'admin') return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 });

  const input: unknown = await request.json();
  if (!isCreateUserInput(input)) return NextResponse.json({ error: 'Provide a valid email, password (8+ characters), and role.' }, { status: 400 });
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.createUser({ email: input.email, password: input.password, email_confirm: true });
  if (error || !data.user) return NextResponse.json({ error: error?.message ?? 'Unable to create auth user.' }, { status: 400 });
  const { error: profileError } = await admin.from('profiles').upsert({ id: data.user.id, role: input.role }, { onConflict: 'id' });
  if (profileError) {
    const { error: rollbackError } = await admin.auth.admin.deleteUser(data.user.id);
    if (rollbackError) console.error('Unable to roll back created auth user:', rollbackError.message);
    return NextResponse.json({ error: `User was created but the profile role could not be saved: ${profileError.message}` }, { status: 500 });
  }
  return NextResponse.json({ id: data.user.id }, { status: 201 });
}
