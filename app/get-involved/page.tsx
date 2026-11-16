import type { Metadata } from 'next';
import PortalContentPage from '@/components/PortalContentPage';
import { getPageContent } from '@/lib/page-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Become a member, volunteer, partner, or support TePC – Tanzania.',
};

export default async function GetInvolvedPage() {
  const cmsContent = await getPageContent('get-involved');
  return <PortalContentPage page="get-involved" cmsContent={cmsContent} />;
}
