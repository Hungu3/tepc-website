import { NextResponse } from 'next/server';
import { announcements, toNewsCategory } from '@/data/announcements';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  const { data: profile, error: roleError } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (roleError || profile?.role !== 'admin') return NextResponse.json({ error: 'Administrator access required.' }, { status: 403 });

  const rows = announcements.map((item) => ({
    slug: item.slug, title: item.title, category: toNewsCategory(item.category), date: item.date,
    excerpt: item.excerpt, content: item.content, image: item.image,
    videoUrl: item.videoUrl ?? null, pdfUrl: item.pdfUrl ?? null,
    author: item.author ?? null, featured: item.featured ?? false,
  }));
  const { error } = await createAdminClient().from('announcements').upsert(rows, { onConflict: 'slug', ignoreDuplicates: true });
  if (error) {
    console.error('Unable to import default announcements:', error.message);
    return NextResponse.json({ error: 'Unable to import default announcements.' }, { status: 500 });
  }
  return NextResponse.redirect(new URL('/admin', request.url), { status: 303 });
}
