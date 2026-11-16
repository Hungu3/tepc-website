import type { Metadata } from 'next';
import PortalContentPage from '@/components/PortalContentPage';
import { getPageContent } from '@/lib/page-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Explore TePC – Tanzania programmes and community development focus areas.',
};

export default async function OurWorkPage() {
  const cmsContent = await getPageContent('our-work');
  return <PortalContentPage page="our-work" cmsContent={cmsContent} />;
}
