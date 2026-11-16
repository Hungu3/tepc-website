import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageContentForm from '@/components/admin/PageContentForm';
import { getPageContent } from '@/lib/page-content';
import { requireProfile } from '@/lib/admin-auth';
import { portalPages } from '@/data/portal';

const pages = [
  { slug: 'about', title: 'About' },
  { slug: 'our-work', title: 'Our Work' },
  { slug: 'projects', title: 'Projects' },
  { slug: 'impact', title: 'Impact' },
  { slug: 'get-involved', title: 'Get Involved' },
  { slug: 'resources', title: 'Resources' },
];

type LocalizedContent = { en: string; sw: string };

function getDefaultContent(slug: string): Record<string, LocalizedContent> {
  const english = portalPages.en[slug];
  const swahili = portalPages.sw[slug];
  if (!english || !swahili) return {};

  const content: Record<string, LocalizedContent> = {
    title: { en: english.title, sw: swahili.title },
    intro: { en: english.intro, sw: swahili.intro },
  };

  english.sections.forEach((section, index) => {
    const translatedSection = swahili.sections[index];
    if (!translatedSection) return;
    content[`${section.id}.heading`] = { en: section.heading, sw: translatedSection.heading };
    content[`${section.id}.body`] = { en: section.body, sw: translatedSection.body };
    section.bullets?.forEach((bullet, bulletIndex) => {
      const translatedBullet = translatedSection.bullets?.[bulletIndex];
      if (translatedBullet) {
        content[`${section.id}.bullet.${bulletIndex + 1}`] = { en: bullet, sw: translatedBullet };
      }
    });
  });

  return content;
}

export default async function EditPageContentPage({
  params,
}: {
  params: { slug: string };
}) {
  await requireProfile(['admin']);
  const page = pages.find((item) => item.slug === params.slug);
  if (!page) notFound();

  const savedContent = await getPageContent(page.slug);
  const initialContent = { ...getDefaultContent(page.slug), ...savedContent };

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/admin/settings/pages" className="text-sm font-semibold text-primary hover:underline">
        ← Page Content
      </Link>
      <h1 className="my-4 text-3xl font-extrabold text-gray-900 dark:text-white">{page.title}</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Built-in keys such as <code>title</code>, <code>intro</code>, and <code>section-id.body</code> update the matching page text.
        New keys are shown as additional content blocks on the public page.
      </p>
      <PageContentForm pageSlug={page.slug} initialContent={initialContent} />
    </div>
  );
}
