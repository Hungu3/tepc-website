import type { Metadata } from 'next';
import PublicationsGrid from '@/components/PublicationsGrid';

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Download TePC – Tanzania annual reports, research, policy briefs, and guides.',
};

export default function PublicationsPage() {
  return <PublicationsGrid />;
}
