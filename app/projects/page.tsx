import type { Metadata } from 'next';
import PortalContentPage from '@/components/PortalContentPage';
import { getPageContent } from '@/lib/page-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Discover TePC – Tanzania projects, locations, achievements, and stories.',
};

export default async function ProjectsPage() {
  const cmsContent = await getPageContent('projects');
  return <PortalContentPage page="projects" cmsContent={cmsContent} />;
}
