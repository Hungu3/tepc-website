import type { Metadata } from 'next';
import PortalContentPage from '@/components/PortalContentPage';
import { getPageContent } from '@/lib/page-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about TePC – Tanzania, our history, vision, mission, values, and governance.',
};

export default async function AboutPage() {
  const cmsContent = await getPageContent('about');
  return <PortalContentPage page="about" cmsContent={cmsContent} />;
}
