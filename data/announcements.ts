// ============================================================
// TePC – Tanzania: all website announcements live in this file.
// Staff only need to edit this file to add or change content.
// ============================================================

export type Category =
  | 'News'
  | 'Event'
  | 'Announcement'
  | 'Matangazo'
  | 'Mafunzo'
  | 'Mikopo'
  | 'Matukio'
  | 'Fursa';
export type NewsCategory = 'News' | 'Event' | 'Announcement';

export interface Announcement {
  slug: string;
  title: string;
  category: Category;
  date: string; // YYYY-MM-DD
  excerpt: string;
  content: string; // HTML
  image: string;
  videoUrl?: string;
  pdfUrl?: string;
  author?: string;
  featured?: boolean;
}

export const categories: Category[] = [
  'Matangazo',
  'Mafunzo',
  'Mikopo',
  'Matukio',
  'Fursa',
];

export const adminCategories: Category[] = [
  'News',
  'Event',
  'Announcement',
  'Matangazo',
  'Mafunzo',
  'Mikopo',
  'Matukio',
  'Fursa',
];

export function toNewsCategory(category: Category): NewsCategory {
  if (category === 'Event' || category === 'Matukio') return 'Event';
  if (category === 'Announcement' || category === 'Matangazo') return 'Announcement';
  return 'News';
}

// Reusable contact block appended to every announcement
const contact = `<h3>Contact TePC</h3><p>For more information, email <strong>info@tepcc.org</strong> or <strong>info.tepctanzania@gmail.com</strong>, call <strong>+255 724 800 201</strong> / <strong>+255 724 800 207</strong>, or write to P.O. Box 475, 47332, Kasulu, Kigoma – Tanzania. TePC – Tanzania is a registered NGO (Reg. No. 00NGO/R/9866).</p>`;

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80`;

export const announcements: Announcement[] = [
  {
    slug: 'soap-petroleum-jelly-training-kasulu-2026',
    title: 'Practical Training: Soap and Petroleum Jelly Production – Kasulu',
    category: 'Mafunzo',
    date: '2026-01-20',
    excerpt:
      'TePC invites women and youth in Kasulu to a hands-on training on producing soap, petroleum jelly, and hygiene products for immediate income generation.',
    image: img('photo-1556742049-0cfed4f6a45d'),
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    author: 'TePC Programs Team',
    featured: true,
    content: `<p>Tanganyika Epistemological Promotion (TePC – Tanzania) is pleased to invite women and youth in Kasulu to a <strong>practical training on the production of soap, petroleum jelly, and other hygiene products</strong>. The training is built on our "learning by doing" approach, so every participant will make real products with their own hands.</p>
<h3>What You Will Learn</h3>
<ul>
<li>Production of bar and liquid soap using locally available materials</li>
<li>Making petroleum jelly and related skin-care products</li>
<li>Product safety, hygiene, packaging, and labeling basics</li>
<li>Costing, pricing, and simple record keeping</li>
<li>How to find customers and sell in local markets</li>
</ul>
<h3>Who Can Join</h3>
<p>The training is open to women, youth (in-school and out-of-school), people with disabilities, and members of community groups in Kasulu. No previous experience is needed. Our goal is that every participant leaves with a skill they can apply <strong>immediately</strong> to earn an income.</p>
<p>Since 2022, TePC has trained <strong>70 women</strong> and <strong>140 youth</strong>, and supported <strong>45 community groups</strong>. Many participants report improved household income stability and greater financial independence.</p>
${contact}`,
  },
  {
    slug: 'women-empowerment-program-kigoma-2026',
    title: 'Women Empowerment Program: 70 Women to Receive Starter Kits',
    category: 'Matangazo',
    date: '2026-02-10',
    excerpt:
      'TePC launches its 2026 women empowerment cohort in Kigoma, providing training, starter kits, and mentorship to 70 women.',
    image: img('photo-1521737711867-e3b97375f902'),
    pdfUrl: 'https://drive.google.com/file/d/1samplePDF/view',
    author: 'TePC Programs Team',
    content: `<p>TePC – Tanzania is proud to announce the launch of its <strong>2026 Women Empowerment Program</strong> in Kigoma. The program will support <strong>70 women</strong> with practical training, starter kits, and ongoing mentorship so they can start or strengthen small businesses.</p>
<h3>Program Components</h3>
<ul>
<li><strong>Practical skills training</strong> in production and entrepreneurship</li>
<li><strong>Starter kits</strong> to help participants begin producing right away</li>
<li><strong>Mentorship</strong> from experienced entrepreneurs and TePC staff</li>
<li><strong>Group formation</strong> support to build strong community microenterprise groups</li>
</ul>
<h3>Why This Matters</h3>
<p>Women are central to household welfare and local economies. By equipping them with skills and tools, we help families build stable incomes and independence. This work is part of our Gender &amp; Youth Programs and our Livelihood Support program.</p>
<p>A downloadable program brief is available on this page. Interested women's groups and individuals are encouraged to contact our Kasulu head office for registration details.</p>
${contact}`,
  },
  {
    slug: 'youth-entrepreneurship-training-katavi-2026',
    title: 'Youth Entrepreneurship Training – Katavi Region',
    category: 'Mafunzo',
    date: '2026-02-25',
    excerpt:
      'A five-day intensive program equipping 140 youth with entrepreneurship, financial literacy, and micro-enterprise skills.',
    image: img('photo-1552664730-d307ca884978'),
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    author: 'TePC Programs Team',
    content: `<p>TePC – Tanzania is running a <strong>five-day intensive entrepreneurship training</strong> for young people in the Katavi Region. The program equips youth with the practical knowledge needed to turn ideas into income-generating businesses.</p>
<h3>Training Topics</h3>
<ul>
<li>Identifying business opportunities in your community</li>
<li>Financial literacy: saving, budgeting, and managing cash flow</li>
<li>Micro-enterprise planning and customer service</li>
<li>Using local resources to start low-cost businesses</li>
<li>Group savings and working together in enterprise groups</li>
</ul>
<h3>Our Youth Impact</h3>
<p>Since 2022, TePC has equipped <strong>140 youth</strong> with entrepreneurship and income-generation skills. This program builds on that experience, with a strong focus on immediate economic application: participants practice what they learn during the training itself.</p>
<p>Both in-school and out-of-school youth are welcome. Please contact TePC to confirm your participation.</p>
${contact}`,
  },
  {
    slug: 'small-grants-cbo-members-2026',
    title: 'Small Grants for CBO Members: Apply for Up to TZS 5,000,000',
    category: 'Mikopo',
    date: '2026-03-05',
    excerpt:
      'TePC is offering small business grants to active CBO members to scale micro-enterprises and community income-generating activities.',
    image: img('photo-1554224155-6726b3ff858f'),
    pdfUrl: 'https://drive.google.com/file/d/1samplePDF/view',
    author: 'TePC Enterprise Support Unit',
    featured: true,
    content: `<p>TePC – Tanzania invites active members of Community-Based Organizations (CBOs) to apply for <strong>small business grants of up to TZS 5,000,000</strong>. The grants are designed to help community enterprises grow their production, reach new markets, and create lasting income.</p>
<h3>Who Can Apply</h3>
<ul>
<li>Active members of CBOs and Community Microenterprise Groups (CMGs)</li>
<li>Small entrepreneurs with an existing or planned micro-enterprise</li>
<li>Groups with a clear plan for how the funds will be used</li>
</ul>
<h3>How to Apply</h3>
<p>Download the application guidelines from this page, prepare a short business plan, and submit it to TePC by email or at our Kasulu head office. Applications are reviewed on transparency, feasibility, and community benefit, in line with our core value of <strong>Integrity &amp; Accountability</strong>.</p>
<p>TePC also offers mentorship to successful applicants to help them use funds well and build sustainable businesses.</p>
${contact}`,
  },
  {
    slug: 'cbo-capacity-building-conference-kigoma-2026',
    title: 'CBO Capacity Building Conference – Kigoma 2026',
    category: 'Matukio',
    date: '2026-03-20',
    excerpt:
      'A two-day conference bringing together 45 community-based organizations from Kigoma and Katavi to strengthen governance and sustainability.',
    image: img('photo-1540575467063-178a50c2df87'),
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    author: 'TePC Events Team',
    content: `<p>TePC – Tanzania will host a <strong>two-day Capacity Building Conference</strong> in Kigoma, bringing together <strong>45 community-based organizations</strong> from Kigoma and Katavi. The conference aims to strengthen CBOs so they can participate more effectively in sustainable development.</p>
<h3>Conference Highlights</h3>
<ul>
<li>Good governance and leadership for community organizations</li>
<li>Financial management and accountability</li>
<li>Resource mobilization and partnership building</li>
<li>Sharing success stories and lessons learned between CBOs</li>
</ul>
<h3>Who Should Attend</h3>
<p>Leaders and members of CBOs, Community Microenterprise Groups, and community development partners. Strong community organizations are the foundation of lasting change, and this event is an opportunity to learn, network, and plan together.</p>
${contact}`,
  },
  {
    slug: 'skills-training-people-with-disabilities-2026',
    title: 'Inclusive Skills Training for People with Disabilities',
    category: 'Mafunzo',
    date: '2026-04-08',
    excerpt:
      "TePC's inclusive program provides accessible, practical skills training to persons with hearing and physical impairments.",
    image: img('photo-1517245386807-bb43f82c33c4'),
    author: 'TePC Inclusion Team',
    content: `<p>TePC – Tanzania is committed to making sure that no one is left behind. Our <strong>Inclusive Support for Vulnerable Groups</strong> program offers accessible, practical skills training to <strong>persons with hearing and physical impairments</strong>.</p>
<h3>Our Inclusive Approach</h3>
<ul>
<li>Accessible training sessions designed with participants' needs in mind</li>
<li>Practical, hands-on learning that leads to real income opportunities</li>
<li>Support to form groups and start small enterprises</li>
<li>Mentorship and follow-up after training</li>
</ul>
<h3>Join Us</h3>
<p>Persons with disabilities, their families, and supporting organizations are invited to contact TePC to learn more and register. Inclusion and accessibility are central principles of how we implement all of our programs.</p>
${contact}`,
  },
  {
    slug: 'international-partnership-opportunities-2026',
    title: 'Partnership Opportunities: Collaborate with TePC on Development',
    category: 'Fursa',
    date: '2026-04-22',
    excerpt:
      'TePC welcomes development partners, donors, and international organizations to co-design scalable livelihood interventions.',
    image: img('photo-1521791136064-7986c2920216'),
    pdfUrl: 'https://drive.google.com/file/d/1samplePDF/view',
    author: 'TePC Executive Office',
    content: `<p>TePC – Tanzania welcomes <strong>development partners, donors, and international organizations</strong> interested in co-designing scalable livelihood interventions in Tanzania. We have delivered many community training sessions without external funding, and we are now ready to grow with trusted partners.</p>
<h3>Areas for Collaboration</h3>
<ul>
<li>Vocational and practical skills training</li>
<li>Entrepreneurship and microenterprise development</li>
<li>Community capacity building for CBOs</li>
<li>Applied research and policy advocacy</li>
<li>Regional vocational training centers and community enterprise incubation hubs</li>
</ul>
<h3>Our Long-Term Vision</h3>
<p>TePC aims to become a nationally recognized platform for community-based economic transformation through regional vocational training centers, community enterprise incubation hubs, research-informed programming, and scalable livelihood models.</p>
<p>Download our partnership overview from this page and contact us to start a conversation.</p>
${contact}`,
  },
  {
    slug: 'cbo-members-general-meeting-kasulu-2026',
    title: 'Annual CBO Members General Meeting – Kasulu',
    category: 'Matukio',
    date: '2026-05-15',
    excerpt:
      'All TePC member CBOs are invited to the 2026 annual meeting for governance updates, financial reports, and 2027 planning.',
    image: img('photo-1521737604893-d14cc237f11d'),
    author: 'TePC Events Team',
    content: `<p>All member CBOs of TePC – Tanzania are invited to the <strong>2026 Annual General Meeting</strong> in Kasulu. This is the key moment of the year for members to review progress and shape the future of the organization.</p>
<h3>Meeting Agenda</h3>
<ul>
<li>Governance updates from the Board and Executive Director</li>
<li>Presentation of financial reports</li>
<li>Review of 2026 program results</li>
<li>Planning priorities for 2027</li>
</ul>
<p>The meeting reflects our values of <strong>Integrity &amp; Accountability</strong> and <strong>Collaboration &amp; Partnership</strong>. Member CBOs should confirm their delegates by contacting the Kasulu head office.</p>
${contact}`,
  },
  {
    slug: 'rural-economy-research-kigoma-katavi-2026',
    title: 'New Research: Rural Economies of Kigoma and Katavi',
    category: 'Matangazo',
    date: '2026-06-01',
    excerpt:
      "TePC's research unit is launching an applied study on rural survival economies, informal businesses, and skills gaps.",
    image: img('photo-1460925895917-afdab827c52f'),
    pdfUrl: 'https://drive.google.com/file/d/1samplePDF/view',
    author: 'TePC Research Unit',
    content: `<p>As a policy-oriented think-tank, TePC – Tanzania is launching an <strong>applied research study on the rural economies of Kigoma and Katavi</strong>. The study will examine how households survive and earn income, how informal businesses operate, and where important skills gaps exist.</p>
<h3>Research Focus</h3>
<ul>
<li>Rural survival economies and household income sources</li>
<li>Informal and small-scale businesses</li>
<li>Skills gaps among youth, women, and vulnerable groups</li>
<li>Practical, locally grounded solutions and policy recommendations</li>
</ul>
<h3>Why Research Matters</h3>
<p>Good programs start with good evidence. Findings will guide TePC's training and enterprise support, and will be shared with communities, partners, and decision makers through our Research &amp; Advocacy program.</p>
<p>A research concept note is available for download on this page. Researchers and partners interested in collaborating are welcome to get in touch.</p>
${contact}`,
  },
  {
    slug: 'agribusiness-youth-program-2026',
    title: 'Youth Agribusiness & Livestock Program 2026',
    category: 'Fursa',
    date: '2026-06-20',
    excerpt:
      'A new program supporting young farmers and livestock keepers with training, market linkages, and small startup capital.',
    image: img('photo-1625246333195-78d9c38ad449'),
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    author: 'TePC Programs Team',
    content: `<p>TePC – Tanzania is opening a new opportunity for young farmers and livestock keepers: the <strong>Youth Agribusiness &amp; Livestock Program 2026</strong>. The program helps young people turn farming into a profitable, sustainable business.</p>
<h3>What the Program Offers</h3>
<ul>
<li><strong>Training</strong> in modern agribusiness and livestock management</li>
<li><strong>Market linkages</strong> to help participants sell their products</li>
<li><strong>Small startup capital</strong> to launch or expand activities</li>
<li><strong>Mentorship</strong> and group support</li>
</ul>
<h3>Who Can Apply</h3>
<p>Young farmers and livestock keepers in Kigoma and Katavi who are ready to apply what they learn right away. We use local resources and focus on sustainability so that results last beyond the program.</p>
${contact}`,
  },
];

export function getAnnouncementBySlug(slug: string): Announcement | undefined {
  return announcements.find((a) => a.slug === slug);
}

export function getLatestAnnouncements(count: number): Announcement[] {
  return [...announcements]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}

export function getFeaturedAnnouncement(): Announcement {
  const sorted = [...announcements].sort((a, b) => b.date.localeCompare(a.date));
  return sorted.find((a) => a.featured) ?? sorted[0];
}

export function getAnnouncementsByCategory(category: Category): Announcement[] {
  return announcements
    .filter((a) => a.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
}

export const videos: VideoItem[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Welcome to TePC – Tanzania',
    description: 'An introduction to our mission, programs, and the communities we serve.',
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Skills Training in Action',
    description: 'See how learning by doing helps participants gain practical skills.',
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Voices of Our Beneficiaries',
    description: 'Participants share how training has improved their livelihoods.',
  },
];

export interface GalleryImage {
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  { src: img('photo-1521737711867-e3b97375f902'), alt: "Women's empowerment workshop in Kigoma" },
  { src: img('photo-1552664730-d307ca884978'), alt: 'Youth training session' },
  { src: img('photo-1556742049-0cfed4f6a45d'), alt: 'Hands-on soap and hygiene products training' },
  { src: img('photo-1540575467063-178a50c2df87'), alt: 'Community-based organizations conference' },
  { src: img('photo-1517245386807-bb43f82c33c4'), alt: 'Inclusive skills training for people with disabilities' },
  { src: img('photo-1625246333195-78d9c38ad449'), alt: 'Youth agribusiness and livestock program' },
];
