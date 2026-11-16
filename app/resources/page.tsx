import type { Metadata } from 'next';
import PortalContentPage from '@/components/PortalContentPage';
import { getPageContent } from '@/lib/page-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Find TePC – Tanzania organisational documents, plans, policies, and resources.',
};

export default async function ResourcesPage() {
  const cmsContent = await getPageContent('resources');
  return <PortalContentPage page="resources" cmsContent={cmsContent} />;
}
