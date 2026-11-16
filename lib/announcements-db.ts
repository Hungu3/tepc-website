import 'server-only';
import { announcements, type Announcement, type Category } from '@/data/announcements';
import { createClient } from '@/lib/supabase/server';

interface AnnouncementRow {
  slug: string;
  title: string;
  category: Category;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  videoUrl: string | null;
  pdfUrl: string | null;
  author: string | null;
  featured: boolean | null;
}

function fromRow(row: AnnouncementRow): Announcement {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    date: row.date,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image,
    videoUrl: row.videoUrl ?? undefined,
    pdfUrl: row.pdfUrl ?? undefined,
    author: row.author ?? undefined,
    featured: row.featured ?? false,
  };
}

async function fetchAnnouncements(): Promise<Announcement[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('announcements')
    .select('slug,title,category,date,excerpt,content,image,videoUrl,pdfUrl,author,featured')
    .order('date', { ascending: false });
  if (error) {
    console.error('Unable to load announcements from Supabase:', error.message);
    throw new Error('Unable to load announcements.');
  }
  return (data as AnnouncementRow[] | null)?.map(fromRow) ?? [];
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
  const rows = await fetchAnnouncements();
  return rows.length > 0 ? rows : [...announcements].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getLatestAnnouncements(limit = 6): Promise<Announcement[]> {
  return (await getAllAnnouncements()).slice(0, limit);
}

export async function getFeaturedAnnouncement(): Promise<Announcement> {
  const items = await getAllAnnouncements();
  return items.find((item) => item.featured) ?? items[0] ?? announcements[0];
}

export async function getAnnouncementBySlug(slug: string): Promise<Announcement | undefined> {
  const rows = await fetchAnnouncements();
  return rows.length > 0
    ? rows.find((item) => item.slug === slug)
    : announcements.find((item) => item.slug === slug);
}

export async function getByCategory(category: Category): Promise<Announcement[]> {
  return (await getAllAnnouncements())
    .filter((item) => item.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));
}
