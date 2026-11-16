import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAnnouncementBySlug } from '@/lib/announcements-db';
import LazyYouTube from '@/components/LazyYouTube';
import ShareButtons from '@/components/ShareButtons';
import { DownloadIcon } from '@/components/Icons';
import { SITE_URL, getYouTubeId } from '@/lib/utils';
import Translation from '@/components/Translation';
import LocalizedDate from '@/components/LocalizedDate';
import TranslatedCategory from '@/components/TranslatedCategory';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = await getAnnouncementBySlug(params.slug);
  if (!item) return { title: 'Not Found' };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.image }],
      type: 'article',
      locale: 'en_TZ',
    },
  };
}

export default async function AnnouncementPage({ params }: PageProps) {
  const item = await getAnnouncementBySlug(params.slug);
  if (!item) notFound();

  const videoId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
  const url = `${SITE_URL}/matangazo/${item.slug}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/matangazo" className="text-sm font-semibold text-primary hover:underline">
        ← <Translation translationKey="copy.backToAnnouncements" />
      </Link>

      <div className="mb-3 mt-6 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-900">
          <TranslatedCategory category={item.category} />
        </span>
        <time dateTime={item.date} className="text-gray-500">
          <LocalizedDate value={item.date} />
        </time>
        {item.author && <span className="text-gray-500"><Translation translationKey="copy.by" /> {item.author}</span>}
      </div>

      <h1 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900">{item.title}</h1>

      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-96">
        <Image
          src={item.image?.trim() || '/logo.png'}
          alt={item.title}
          fill
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>

      <div
        className="article-content text-gray-800 dark:text-gray-200"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />

      {videoId && (
        <div className="my-8">
          <h2 className="mb-3 text-xl font-bold text-primary-dark"><Translation translationKey="copy.watchVideo" /></h2>
          <LazyYouTube videoId={videoId} title={item.title} />
        </div>
      )}

      {item.pdfUrl && (
        <div className="my-8">
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-dark"
          >
            <DownloadIcon className="h-5 w-5" /> <Translation translationKey="buttons.download" />
          </a>
        </div>
      )}

      <div className="mt-10 border-t border-gray-200 pt-6">
        <ShareButtons title={item.title} url={url} />
      </div>
    </article>
  );
}
