import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnnouncementForm from '@/components/admin/AnnouncementForm';
import DeleteAnnouncementButton from '@/components/admin/DeleteAnnouncementButton';
import { requireProfile } from '@/lib/admin-auth';
import type { Announcement } from '@/data/announcements';

export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const { supabase } = await requireProfile(['admin']);
  const { data, error } = await supabase.from('announcements').select('slug,title,category,date,excerpt,content,image,videoUrl,pdfUrl,author,featured').eq('slug', params.id).maybeSingle();
  if (error) throw new Error(`Unable to load announcement: ${error.message}`);
  if (!data) notFound();
  const item: Announcement = {
    slug: data.slug, title: data.title, category: data.category, date: data.date, excerpt: data.excerpt,
    content: data.content, image: data.image, videoUrl: data.videoUrl ?? undefined,
    pdfUrl: data.pdfUrl ?? undefined, author: data.author ?? undefined, featured: data.featured ?? false,
  };
  return <div className="mx-auto max-w-4xl"><Link href="/admin/announcements" className="text-sm font-semibold text-primary">← News &amp; Updates</Link><h1 className="my-4 text-3xl font-extrabold text-gray-900 dark:text-white">Edit Update</h1><AnnouncementForm initial={item} /><div className="mt-4"><DeleteAnnouncementButton slug={item.slug} /></div></div>;
}
