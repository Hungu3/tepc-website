import Link from 'next/link';
import { requireProfile } from '@/lib/admin-auth';

const pages = [
  { slug: 'about', title: 'About' },
  { slug: 'our-work', title: 'Our Work' },
  { slug: 'projects', title: 'Projects' },
  { slug: 'impact', title: 'Impact' },
  { slug: 'get-involved', title: 'Get Involved' },
  { slug: 'resources', title: 'Resources' },
];

export default async function PageContentListPage() {
  await requireProfile(['admin']);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">Page Content</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">Choose a public page to edit its English and Swahili content.</p>
      <nav aria-label="Pages to edit" className="grid gap-3 sm:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/settings/pages/${page.slug}`}
            className="rounded-xl border border-gray-200 bg-white p-5 font-semibold text-primary hover:border-primary dark:border-gray-700 dark:bg-gray-900"
          >
            {page.title} →
          </Link>
        ))}
      </nav>
    </div>
  );
}
