export type LocalizedText = { en: string; sw: string };

export interface PortalLink {
  id: string;
  label: LocalizedText;
  href: string;
  children?: PortalLink[];
}

const link = (id: string, en: string, sw: string, href: string): PortalLink => ({
  id,
  label: { en, sw },
  href,
});

export const portalNavigation: PortalLink[] = [
  link('home', 'Home', 'Nyumbani', '/'),
  {
    ...link('about', 'About Us', 'Kuhusu Sisi', '/about'),
    children: [
      link('who-we-are', 'Who We Are', 'Sisi ni Nani', '/about#who-we-are'),
      link('history', 'Our History', 'Historia Yetu', '/about#history'),
      link('vision-and-mission', 'Vision and Mission', 'Dira na Dhamira', '/about#vision-and-mission'),
      link('core-values', 'Core Values', 'Maadili Yetu', '/about#core-values'),
      link('objectives', 'Our Objectives', 'Malengo Yetu', '/about#objectives'),
      link('leadership-and-governance', 'Leadership and Governance', 'Uongozi na Utawala', '/about#leadership-and-governance'),
      link('organisational-structure', 'Organisational Structure', 'Muundo wa Shirika', '/about#organisational-structure'),
    ],
  },
  {
    ...link('our-work', 'Our Work', 'Kazi Zetu', '/our-work'),
    children: [
      link('community-development', 'Community Development', 'Maendeleo ya Jamii', '/our-work#community-development'),
      link('youth-development', 'Youth Development', 'Maendeleo ya Vijana', '/our-work#youth-development'),
      link('women-empowerment', 'Women Empowerment', 'Uwezeshaji wa Wanawake', '/our-work#women-empowerment'),
      link('vocational-skills-development', 'Vocational Skills Development', 'Ukuzaji wa Stadi za Ufundi', '/our-work#vocational-skills-development'),
      link('entrepreneurship-development', 'Entrepreneurship Development', 'Maendeleo ya Ujasiriamali', '/our-work#entrepreneurship-development'),
      link('community-health', 'Community Health', 'Afya ya Jamii', '/our-work#community-health'),
      link('research-and-knowledge', 'Research and Knowledge', 'Utafiti na Maarifa', '/our-work#research-and-knowledge'),
      link('sustainable-livelihoods', 'Sustainable Livelihoods', 'Maisha Endelevu', '/our-work#sustainable-livelihoods'),
    ],
  },
  {
    ...link('projects', 'Our Projects', 'Miradi Yetu', '/projects'),
    children: [
      link('current-projects', 'Current Projects', 'Miradi Inayoendelea', '/projects#current-projects'),
      link('completed-projects', 'Completed Projects', 'Miradi Iliyokamilika', '/projects#completed-projects'),
      link('project-locations', 'Project Locations', 'Maeneo ya Miradi', '/projects#project-locations'),
      link('project-achievements', 'Project Achievements', 'Mafanikio ya Miradi', '/projects#project-achievements'),
      link('project-success-stories', 'Success Stories', 'Hadithi za Mafanikio', '/projects#success-stories'),
    ],
  },
  {
    ...link('impact', 'Our Impact', 'Matokeo Yetu', '/impact'),
    children: [
      link('impact-at-a-glance', 'Impact at a Glance', 'Matokeo kwa Muhtasari', '/impact#impact-at-a-glance'),
      link('beneficiaries-reached', 'Beneficiaries Reached', 'Wanufaika Waliofikiwa', '/impact#beneficiaries-reached'),
      link('community-impact', 'Community Impact', 'Matokeo kwa Jamii', '/impact#community-impact'),
      link('impact-success-stories', 'Success Stories', 'Hadithi za Mafanikio', '/impact#success-stories'),
      link('testimonials', 'Testimonials', 'Shuhuda', '/impact#testimonials'),
    ],
  },
  {
    ...link('get-involved', 'Get Involved', 'Shiriki Nasi', '/get-involved'),
    children: [
      link('become-a-member', 'Become a Member', 'Jiunge Kama Mwanachama', '/get-involved#membership'),
      link('volunteer-with-us', 'Volunteer With Us', 'Jitolee Nasi', '/get-involved#volunteering'),
      link('partner-with-us', 'Partner With Us', 'Shirikiana Nasi', '/get-involved#partnership'),
      link('support-our-work', 'Support Our Work', 'Saidia Kazi Zetu', '/get-involved#support'),
      link('donate', 'Donate', 'Changia', '/get-involved#donate'),
    ],
  },
  link('publications', 'Publications', 'Machapisho', '/publications'),
  {
    ...link('news', 'News & Updates', 'Habari na Taarifa', '/news'),
    children: [
      link('latest-news', 'Latest News', 'Habari za Hivi Karibuni', '/news?type=News'),
      link('events', 'Events', 'Matukio', '/news?type=Event'),
      link('announcements', 'Announcements', 'Matangazo', '/news?type=Announcement'),
      link('photo-gallery', 'Photo Gallery', 'Picha', '/news#photo-gallery'),
      link('videos', 'Videos', 'Video', '/news#videos'),
    ],
  },
  {
    ...link('resources', 'Resources', 'Rasilimali', '/resources'),
    children: [
      link('organisational-documents', 'Organisational Documents', 'Nyaraka za Shirika', '/resources#organisational-documents'),
      link('strategic-plan', 'Strategic Plan', 'Mpango Mkakati', '/resources#strategic-plan'),
      link('policies-and-guidelines', 'Policies and Guidelines', 'Sera na Miongozo', '/resources#policies-and-guidelines'),
      link('downloads', 'Downloads', 'Vipakuliwa', '/resources#downloads'),
      link('faqs', 'FAQs', 'Maswali Yanayoulizwa Mara kwa Mara', '/resources#faqs'),
    ],
  },
  link('contact', 'Contact Us', 'Wasiliana Nasi', '/wasiliana'),
];

export const portalFooter = {
  en: {
    about: 'About TePC',
    tagline: 'Building Capacity. Empowering Communities.',
    description:
      'Tanganyika Epistemological Promotion (TePC – Tanzania) is a registered NGO working with communities through skills development, entrepreneurship, and sustainable livelihoods.',
    quickLinksTitle: 'Quick Links',
    programs: 'Our Programs',
    contact: 'Contact Information',
    registration: 'Registration No.',
    privacy: 'Privacy Policy',
    terms: 'Terms and Conditions',
    copyright: '© 2026 TePC – Tanzania. All rights reserved.',
    programLinks: [
      { label: 'Vocational Skills Development', href: '/our-work#vocational-skills-development' },
      { label: 'Youth Development', href: '/our-work#youth-development' },
      { label: 'Women Empowerment', href: '/our-work#women-empowerment' },
      { label: 'Entrepreneurship Development', href: '/our-work#entrepreneurship-development' },
      { label: 'Community Development', href: '/our-work#community-development' },
    ],
    quickLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Work', href: '/our-work' },
      { label: 'Our Projects', href: '/projects' },
      { label: 'News & Updates', href: '/news' },
      { label: 'Contact Us', href: '/wasiliana' },
    ],
  },
  sw: {
    about: 'Kuhusu TePC',
    tagline: 'Building Capacity. Empowering Communities.',
    description:
      'Tanganyika Epistemological Promotion (TePC – Tanzania) ni NGO iliyosajiliwa inayoshirikiana na jamii kupitia ukuzaji wa stadi, ujasiriamali na maisha endelevu.',
    quickLinksTitle: 'Viungo vya Haraka',
    programs: 'Programu Zetu',
    contact: 'Taarifa za Mawasiliano',
    registration: 'Namba ya Usajili',
    privacy: 'Sera ya Faragha',
    terms: 'Vigezo na Masharti',
    copyright: '© 2026 TePC – Tanzania. Haki zote zimehifadhiwa.',
    programLinks: [
      { label: 'Ukuzaji wa Stadi za Ufundi', href: '/our-work#vocational-skills-development' },
      { label: 'Maendeleo ya Vijana', href: '/our-work#youth-development' },
      { label: 'Uwezeshaji wa Wanawake', href: '/our-work#women-empowerment' },
      { label: 'Maendeleo ya Ujasiriamali', href: '/our-work#entrepreneurship-development' },
      { label: 'Maendeleo ya Jamii', href: '/our-work#community-development' },
    ],
    quickLinks: [
      { label: 'Kuhusu Sisi', href: '/about' },
      { label: 'Kazi Zetu', href: '/our-work' },
      { label: 'Miradi Yetu', href: '/projects' },
      { label: 'Habari na Taarifa', href: '/news' },
      { label: 'Wasiliana Nasi', href: '/wasiliana' },
    ],
  },
} as const;

export interface PortalSection {
  id: string;
  heading: string;
  body: string;
  bullets?: string[];
}

export interface PortalPageContent {
  title: string;
  intro: string;
  sections: PortalSection[];
}

export const portalPages: Record<'en' | 'sw', Record<string, PortalPageContent>> = {
  en: {
    publications: {
      title: 'Publications',
      intro: 'Reports, research, policy briefs, and practical guides from TePC.',
      sections: [],
    },
    news: {
      title: 'News & Updates',
      intro: 'Read the latest TePC news, announcements, and event updates from our communities.',
      sections: [],
    },
    about: {
      title: 'About Us',
      intro: 'Learn about our organisation, our roots, and the values that guide our work with communities.',
      sections: [
        { id: 'who-we-are', heading: 'Who We Are', body: 'Tanganyika Epistemological Promotion (TePC – Tanzania) is a non-governmental, non-profit organisation based in Kasulu, Kigoma. We work alongside communities to expand access to practical skills, entrepreneurship, and sustainable livelihood opportunities.' },
        { id: 'history', heading: 'Our History', body: 'TePC began its community work in 2022 and was officially registered in 2026. Since then, the organisation has delivered community training and supported local groups using a practical, learning-by-doing approach.' },
        { id: 'vision-and-mission', heading: 'Vision and Mission', body: 'Our vision is healthier communities strengthened through entrepreneurship, skills development, and sustainable livelihoods. Our mission is to empower youth, women, and marginalised communities through innovative training, enterprise support, and inclusive development initiatives.' },
        { id: 'core-values', heading: 'Core Values', body: 'Our work is guided by principles that support trust, inclusion, and lasting progress.', bullets: ['Integrity and accountability', 'Innovation and creativity', 'Empowerment and inclusivity', 'Sustainability', 'Collaboration and partnership'] },
        { id: 'objectives', heading: 'Our Objectives', body: 'We focus on practical, community-led pathways to social and economic development.', bullets: ['Promote inclusive entrepreneurship, practical skills, and agribusiness.', 'Strengthen community-based organisations and participation in sustainable development.', 'Conduct applied research and develop solutions to priority social and economic challenges.'] },
        { id: 'leadership-and-governance', heading: 'Leadership and Governance', body: 'TePC is guided by its Board and led by an Executive Director. Our leadership promotes responsible oversight, transparent decision-making, and accountability to the communities and partners we serve.' },
        { id: 'organisational-structure', heading: 'Organisational Structure', body: 'Our structure connects governance with delivery: the Board provides oversight, the Executive Office coordinates operations, programme teams implement activities, and community groups and partners help shape local priorities.' },
      ],
    },
    'our-work': {
      title: 'Our Work',
      intro: 'We work with communities to build practical capabilities and inclusive, sustainable opportunities.',
      sections: [
        { id: 'community-development', heading: 'Community Development', body: 'We strengthen community-based organisations and local groups through capacity building, mentoring, and participation in community-led development.' },
        { id: 'youth-development', heading: 'Youth Development', body: 'We equip young people with practical, entrepreneurial, and income-generation skills that can be applied in their communities.' },
        { id: 'women-empowerment', heading: 'Women Empowerment', body: 'We support women with skills, enterprise opportunities, mentorship, and access to supportive community networks.' },
        { id: 'vocational-skills-development', heading: 'Vocational Skills Development', body: 'Hands-on vocational training helps participants learn useful production and service skills with local materials and tools.' },
        { id: 'entrepreneurship-development', heading: 'Entrepreneurship Development', body: 'We help aspiring and small entrepreneurs develop business ideas, understand markets, and strengthen the skills needed to grow.' },
        { id: 'community-health', heading: 'Community Health', body: 'Our community-focused approach promotes practical knowledge and inclusive wellbeing alongside livelihoods and skills initiatives.' },
        { id: 'research-and-knowledge', heading: 'Research and Knowledge', body: 'Applied research and community knowledge help identify local priorities and inform responsive programmes and advocacy.' },
        { id: 'sustainable-livelihoods', heading: 'Sustainable Livelihoods', body: 'We promote resilient ways to earn a living by building skills, supporting enterprise, and making effective use of local resources.' },
      ],
    },
    projects: {
      title: 'Our Projects',
      intro: 'Explore the projects and community initiatives that advance TePC’s mission. Project details will be updated as activities are confirmed.',
      sections: [
        { id: 'current-projects', heading: 'Current Projects', body: 'Current initiatives focus on practical skills, youth and women’s empowerment, community capacity, and sustainable enterprise.' },
        { id: 'completed-projects', heading: 'Completed Projects', body: 'This section will share completed project summaries, lessons learned, and the communities reached.' },
        { id: 'project-locations', heading: 'Project Locations', body: 'TePC is based in Kasulu, Kigoma, and works with communities in Kigoma and neighbouring regions as programmes allow.' },
        { id: 'project-achievements', heading: 'Project Achievements', body: 'Reported achievements include training 70 women, equipping 140 youth with entrepreneurship and income-generation skills, and engaging 45 community groups in capacity building.' },
        { id: 'success-stories', heading: 'Success Stories', body: 'Stories from participants and local groups will be added here to show how skills and community partnerships create lasting change.' },
      ],
    },
    impact: {
      title: 'Our Impact',
      intro: 'We measure progress through skills gained, groups strengthened, and opportunities created with communities.',
      sections: [
        { id: 'impact-at-a-glance', heading: 'Impact at a Glance', body: 'Our community work has trained 70 women, equipped 140 youth with entrepreneurship and income-generation skills, and engaged 45 community groups in capacity building.' },
        { id: 'beneficiaries-reached', heading: 'Beneficiaries Reached', body: 'Our programmes serve youth, women, people with disabilities, farmers, community organisations, and other groups seeking practical livelihood opportunities.' },
        { id: 'community-impact', heading: 'Community Impact', body: 'Participants apply practical learning in their communities, strengthening household income opportunities, local enterprise, and community participation.' },
        { id: 'success-stories', heading: 'Success Stories', body: 'Participant and community success stories will be shared here as they are collected and approved.' },
        { id: 'testimonials', heading: 'Testimonials', body: 'Testimonials from programme participants and partners will be published here with their consent.' },
      ],
    },
    'get-involved': {
      title: 'Get Involved',
      intro: 'Join us in strengthening communities through practical skills, enterprise, and sustainable livelihoods.',
      sections: [
        { id: 'membership', heading: 'Become a Member', body: 'Community-based organisations and individuals who share our mission can contact TePC to learn about membership and participation.' },
        { id: 'volunteering', heading: 'Volunteer With Us', body: 'Share your time and skills to support community training, mentoring, research, and outreach.' },
        { id: 'partnership', heading: 'Partner With Us', body: 'We welcome development organisations, institutions, and responsible businesses interested in building effective community partnerships.' },
        { id: 'support', heading: 'Support Our Work', body: 'Technical expertise, learning resources, and in-kind contributions can help strengthen community initiatives.' },
        { id: 'donate', heading: 'Donate', body: 'To discuss responsible support for TePC programmes, contact our team directly. We will provide verified giving details before any contribution is made.' },
      ],
    },
    resources: {
      title: 'Resources',
      intro: 'Find organisational information, guidance, and useful downloads. Documents will be added as they are approved for publication.',
      sections: [
        { id: 'organisational-documents', heading: 'Organisational Documents', body: 'Registration and organisational profile documents will be made available here when cleared for public release.' },
        { id: 'strategic-plan', heading: 'Strategic Plan', body: 'TePC’s current strategic plan and related planning resources will be published here when available.' },
        { id: 'policies-and-guidelines', heading: 'Policies and Guidelines', body: 'Approved policies and implementation guidelines will be shared here to support transparency and good practice.' },
        { id: 'downloads', heading: 'Downloads', body: 'Browse reports, programme briefs, and other documents in the Publications section.', bullets: ['Annual reports', 'Research and policy briefs', 'Programme and application guides'] },
        { id: 'faqs', heading: 'Frequently Asked Questions', body: 'How can I participate? Contact TePC and tell us about your community, organisation, or area of interest. How can my organisation partner with TePC? Send us a short introduction and the kind of collaboration you have in mind.' },
        { id: 'privacy-policy', heading: 'Privacy Policy', body: 'TePC respects the privacy of people who contact us. Information submitted through this website is used to respond to enquiries and is not sold. Contact us if you have questions about your information.' },
        { id: 'terms-and-conditions', heading: 'Terms and Conditions', body: 'Website information is provided for general reference and may be updated. Please contact TePC to verify programme dates, eligibility, or other time-sensitive details.' },
      ],
    },
  },
  sw: {
    publications: {
      title: 'Machapisho',
      intro: 'Ripoti, tafiti, muhtasari wa sera na miongozo ya vitendo kutoka TePC.',
      sections: [],
    },
    news: {
      title: 'Habari na Taarifa',
      intro: 'Soma habari, matangazo na taarifa za matukio za hivi karibuni kutoka TePC na jamii.',
      sections: [],
    },
    about: {
      title: 'Kuhusu Sisi',
      intro: 'Fahamu shirika letu, historia yetu na maadili yanayoongoza kazi zetu na jamii.',
      sections: [
        { id: 'who-we-are', heading: 'Sisi ni Nani', body: 'Tanganyika Epistemological Promotion (TePC – Tanzania) ni shirika lisilo la kiserikali na lisilo la faida lenye makao yake Kasulu, Kigoma. Tunashirikiana na jamii kupanua upatikanaji wa stadi za vitendo, ujasiriamali na fursa endelevu za kujipatia kipato.' },
        { id: 'history', heading: 'Historia Yetu', body: 'TePC ilianza kazi zake za kijamii mwaka 2022 na kusajiliwa rasmi mwaka 2026. Tangu wakati huo, shirika limeendesha mafunzo ya jamii na kusaidia vikundi vya eneo kwa kutumia mbinu ya kujifunza kwa vitendo.' },
        { id: 'vision-and-mission', heading: 'Dira na Dhamira', body: 'Dira yetu ni jamii zenye afya na ustawi kupitia ujasiriamali, ukuzaji wa stadi na maisha endelevu. Dhamira yetu ni kuwawezesha vijana, wanawake na jamii zilizo pembezoni kupitia mafunzo bunifu, msaada wa biashara na mipango jumuishi ya maendeleo.' },
        { id: 'core-values', heading: 'Maadili Yetu', body: 'Kazi zetu zinaongozwa na misingi inayojenga uaminifu, ujumuishi na maendeleo ya kudumu.', bullets: ['Uadilifu na uwajibikaji', 'Ubunifu na ugunduzi', 'Uwezeshaji na ujumuishi', 'Uendelevu', 'Ushirikiano na ubia'] },
        { id: 'objectives', heading: 'Malengo Yetu', body: 'Tunazingatia njia za vitendo zinazoongozwa na jamii kwa maendeleo ya kijamii na kiuchumi.', bullets: ['Kukuza ujasiriamali jumuishi, stadi za vitendo na kilimo-biashara.', 'Kuimarisha mashirika ya kijamii na ushiriki katika maendeleo endelevu.', 'Kufanya tafiti za vitendo na kubuni suluhisho kwa changamoto muhimu za kijamii na kiuchumi.'] },
        { id: 'leadership-and-governance', heading: 'Uongozi na Utawala', body: 'TePC inaongozwa na Bodi na kusimamiwa na Mkurugenzi Mtendaji. Uongozi wetu unakuza usimamizi unaowajibika, maamuzi ya wazi na uwajibikaji kwa jamii na washirika tunaowahudumia.' },
        { id: 'organisational-structure', heading: 'Muundo wa Shirika', body: 'Muundo wetu unaunganisha utawala na utekelezaji: Bodi hutoa usimamizi, Ofisi ya Mtendaji huratibu shughuli, timu za programu hutekeleza shughuli, na vikundi vya jamii pamoja na washirika husaidia kuweka vipaumbele vya eneo.' },
      ],
    },
    'our-work': {
      title: 'Kazi Zetu',
      intro: 'Tunashirikiana na jamii kujenga uwezo wa vitendo na fursa jumuishi na endelevu.',
      sections: [
        { id: 'community-development', heading: 'Maendeleo ya Jamii', body: 'Tunaimarisha mashirika ya kijamii na vikundi vya eneo kupitia kujenga uwezo, ushauri na ushiriki katika maendeleo yanayoongozwa na jamii.' },
        { id: 'youth-development', heading: 'Maendeleo ya Vijana', body: 'Tunawawezesha vijana kwa stadi za vitendo, ujasiriamali na uzalishaji kipato zinazoweza kutumika katika jamii zao.' },
        { id: 'women-empowerment', heading: 'Uwezeshaji wa Wanawake', body: 'Tunawaunga mkono wanawake kwa stadi, fursa za biashara, ushauri na mitandao ya jamii inayowasaidia.' },
        { id: 'vocational-skills-development', heading: 'Ukuzaji wa Stadi za Ufundi', body: 'Mafunzo ya ufundi kwa vitendo huwasaidia washiriki kujifunza stadi za uzalishaji na huduma kwa kutumia vifaa na zana za eneo.' },
        { id: 'entrepreneurship-development', heading: 'Maendeleo ya Ujasiriamali', body: 'Tunawasaidia wajasiriamali kubuni mawazo ya biashara, kuelewa masoko na kuimarisha stadi zinazohitajika kukuza biashara.' },
        { id: 'community-health', heading: 'Afya ya Jamii', body: 'Mbinu yetu inayolenga jamii inakuza maarifa ya vitendo na ustawi jumuishi sambamba na mipango ya maisha na stadi.' },
        { id: 'research-and-knowledge', heading: 'Utafiti na Maarifa', body: 'Utafiti wa vitendo na maarifa ya jamii husaidia kutambua vipaumbele vya eneo na kuongoza programu pamoja na utetezi.' },
        { id: 'sustainable-livelihoods', heading: 'Maisha Endelevu', body: 'Tunakuza njia imara za kujipatia kipato kwa kujenga stadi, kusaidia biashara na kutumia rasilimali za eneo ipasavyo.' },
      ],
    },
    projects: {
      title: 'Miradi Yetu',
      intro: 'Fahamu miradi na mipango ya jamii inayotekeleza dhamira ya TePC. Taarifa zitaongezwa kadri shughuli zinavyothibitishwa.',
      sections: [
        { id: 'current-projects', heading: 'Miradi Inayoendelea', body: 'Mipango ya sasa inalenga stadi za vitendo, uwezeshaji wa vijana na wanawake, uwezo wa jamii na biashara endelevu.' },
        { id: 'completed-projects', heading: 'Miradi Iliyokamilika', body: 'Sehemu hii itatoa muhtasari wa miradi iliyokamilika, mafunzo yaliyopatikana na jamii zilizofikiwa.' },
        { id: 'project-locations', heading: 'Maeneo ya Miradi', body: 'TePC ina makao Kasulu, Kigoma, na hushirikiana na jamii za Kigoma na mikoa jirani kulingana na programu.' },
        { id: 'project-achievements', heading: 'Mafanikio ya Miradi', body: 'Mafanikio yaliyoripotiwa ni kuwafundisha wanawake 70, kuwawezesha vijana 140 kwa stadi za ujasiriamali na uzalishaji kipato, na kushirikisha vikundi 45 katika kujenga uwezo.' },
        { id: 'success-stories', heading: 'Hadithi za Mafanikio', body: 'Hadithi za washiriki na vikundi vya eneo zitaongezwa hapa kuonyesha jinsi stadi na ushirikiano unavyoleta mabadiliko ya kudumu.' },
      ],
    },
    impact: {
      title: 'Matokeo Yetu',
      intro: 'Tunapima maendeleo kupitia stadi zilizopatikana, vikundi vilivyoimarishwa na fursa zilizoundwa pamoja na jamii.',
      sections: [
        { id: 'impact-at-a-glance', heading: 'Matokeo kwa Muhtasari', body: 'Kazi zetu za jamii zimewafunza wanawake 70, kuwawezesha vijana 140 kwa stadi za ujasiriamali na uzalishaji kipato, na kushirikisha vikundi 45 katika kujenga uwezo.' },
        { id: 'beneficiaries-reached', heading: 'Wanufaika Waliofikiwa', body: 'Programu zetu zinahudumia vijana, wanawake, watu wenye ulemavu, wakulima, mashirika ya kijamii na makundi mengine yanayotafuta fursa za maisha.' },
        { id: 'community-impact', heading: 'Matokeo kwa Jamii', body: 'Washiriki hutumia mafunzo ya vitendo katika jamii zao, kuimarisha fursa za kipato cha kaya, biashara za eneo na ushiriki wa jamii.' },
        { id: 'success-stories', heading: 'Hadithi za Mafanikio', body: 'Hadithi za mafanikio za washiriki na jamii zitawekwa hapa zitakapokusanywa na kuidhinishwa.' },
        { id: 'testimonials', heading: 'Shuhuda', body: 'Shuhuda za washiriki wa programu na washirika zitachapishwa hapa kwa ridhaa yao.' },
      ],
    },
    'get-involved': {
      title: 'Shiriki Nasi',
      intro: 'Jiunge nasi kuimarisha jamii kupitia stadi za vitendo, biashara na maisha endelevu.',
      sections: [
        { id: 'membership', heading: 'Jiunge Kama Mwanachama', body: 'Mashirika ya kijamii na watu wanaoshiriki dhamira yetu wanaweza kuwasiliana na TePC kujifunza kuhusu uanachama na ushiriki.' },
        { id: 'volunteering', heading: 'Jitolee Nasi', body: 'Toa muda na stadi zako kusaidia mafunzo ya jamii, ushauri, utafiti na uhamasishaji.' },
        { id: 'partnership', heading: 'Shirikiana Nasi', body: 'Tunakaribisha mashirika ya maendeleo, taasisi na biashara zinazowajibika zinazotaka kujenga ushirikiano imara na jamii.' },
        { id: 'support', heading: 'Saidia Kazi Zetu', body: 'Utaalamu wa kitaalamu, rasilimali za kujifunzia na michango ya vifaa inaweza kuimarisha mipango ya jamii.' },
        { id: 'donate', heading: 'Changia', body: 'Ili kujadili msaada kwa programu za TePC, wasiliana na timu yetu moja kwa moja. Tutatoa taarifa za uhakika za uchangiaji kabla ya kupokea mchango wowote.' },
      ],
    },
    resources: {
      title: 'Rasilimali',
      intro: 'Pata taarifa za shirika, miongozo na vipakuliwa muhimu. Nyaraka zitawekwa baada ya kuidhinishwa kuchapishwa.',
      sections: [
        { id: 'organisational-documents', heading: 'Nyaraka za Shirika', body: 'Nyaraka za usajili na wasifu wa shirika zitawekwa hapa baada ya kuruhusiwa kutolewa kwa umma.' },
        { id: 'strategic-plan', heading: 'Mpango Mkakati', body: 'Mpango mkakati wa sasa wa TePC na nyenzo za mipango zitawekwa hapa zitakapopatikana.' },
        { id: 'policies-and-guidelines', heading: 'Sera na Miongozo', body: 'Sera zilizoidhinishwa na miongozo ya utekelezaji zitashirikishwa hapa kukuza uwazi na utendaji bora.' },
        { id: 'downloads', heading: 'Vipakuliwa', body: 'Tazama ripoti, muhtasari wa programu na nyaraka nyingine katika sehemu ya Machapisho.', bullets: ['Ripoti za mwaka', 'Muhtasari wa utafiti na sera', 'Miongozo ya programu na maombi'] },
        { id: 'faqs', heading: 'Maswali Yanayoulizwa Mara kwa Mara', body: 'Ninawezaje kushiriki? Wasiliana na TePC na utueleze kuhusu jamii, shirika au eneo lako la kuvutiwa. Shirika langu linawezaje kushirikiana na TePC? Tutumie utangulizi mfupi na aina ya ushirikiano unaopendekeza.' },
        { id: 'privacy-policy', heading: 'Sera ya Faragha', body: 'TePC inaheshimu faragha ya watu wanaowasiliana nasi. Taarifa zinazotumwa kupitia tovuti hii hutumika kujibu maswali na haziuzwi. Wasiliana nasi ukiwa na maswali kuhusu taarifa zako.' },
        { id: 'terms-and-conditions', heading: 'Vigezo na Masharti', body: 'Taarifa za tovuti ni kwa marejeo ya jumla na zinaweza kusasishwa. Wasiliana na TePC kuthibitisha tarehe za programu, vigezo vya kushiriki au taarifa nyingine zinazobadilika.' },
      ],
    },
  },
};
