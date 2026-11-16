import type { LocalizedText } from './portal';

export interface Publication {
  slug: string;
  title: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  year: number;
  pdfUrl: string;
}

export const publicationsPageCopy: LocalizedText = {
  en: 'Browse reports, research, policy briefs, and practical guides from TePC. These sample publications are placeholders and can be replaced with approved documents.',
  sw: 'Tazama ripoti, tafiti, muhtasari wa sera na miongozo ya vitendo kutoka TePC. Machapisho haya ya mfano yanaweza kubadilishwa na nyaraka zilizoidhinishwa.',
};

export const publications: Publication[] = [
  {
    slug: 'annual-report-2025',
    title: { en: 'Annual Report 2025', sw: 'Ripoti ya Mwaka 2025' },
    category: { en: 'Annual Report', sw: 'Ripoti ya Mwaka' },
    description: {
      en: 'A sample report listing TePC programme highlights and community outcomes.',
      sw: 'Mfano wa ripoti wenye muhtasari wa programu na matokeo ya jamii ya TePC.',
    },
    year: 2025,
    pdfUrl: '/publications/annual-report-2025.pdf',
  },
  {
    slug: 'youth-skills-brief',
    title: { en: 'Youth Skills and Enterprise Brief', sw: 'Muhtasari wa Stadi na Biashara kwa Vijana' },
    category: { en: 'Research Brief', sw: 'Muhtasari wa Utafiti' },
    description: {
      en: 'A sample brief on practical skills and enterprise opportunities for young people.',
      sw: 'Mfano wa muhtasari kuhusu stadi za vitendo na fursa za biashara kwa vijana.',
    },
    year: 2025,
    pdfUrl: '/publications/youth-skills-brief.pdf',
  },
  {
    slug: 'women-enterprise-policy-brief',
    title: { en: 'Women’s Enterprise Policy Brief', sw: 'Muhtasari wa Sera ya Biashara za Wanawake' },
    category: { en: 'Policy Brief', sw: 'Muhtasari wa Sera' },
    description: {
      en: 'A sample policy brief on inclusive enterprise support and livelihoods.',
      sw: 'Mfano wa muhtasari wa sera kuhusu msaada jumuishi wa biashara na maisha.',
    },
    year: 2024,
    pdfUrl: '/publications/women-enterprise-policy-brief.pdf',
  },
  {
    slug: 'community-capacity-guide',
    title: { en: 'Community Capacity Building Guide', sw: 'Mwongozo wa Kujenga Uwezo wa Jamii' },
    category: { en: 'Guideline', sw: 'Mwongozo' },
    description: {
      en: 'A sample guide for community groups and local development partners.',
      sw: 'Mfano wa mwongozo kwa vikundi vya jamii na washirika wa maendeleo wa eneo.',
    },
    year: 2024,
    pdfUrl: '/publications/community-capacity-guide.pdf',
  },
];
