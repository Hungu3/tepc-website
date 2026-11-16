import type { Metadata } from 'next';
import PortalContentPage from '@/components/PortalContentPage';
import { getPageContent } from '@/lib/page-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Impact',
  description: 'See the community impact and beneficiaries reached by TePC – Tanzania.',
};

export default async function ImpactPage() {
  const cmsContent = await getPageContent('impact');
  return <PortalContentPage page="impact" cmsContent={cmsContent} />;
}
