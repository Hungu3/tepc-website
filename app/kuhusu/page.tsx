import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CheckIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/Icons';
import { org } from '@/lib/utils';
import Translation from '@/components/Translation';
import type { TranslationKey } from '@/lib/translations';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about TePC – Tanzania: our vision, mission, programs, values, impact, approach, and leadership.',
};

const objectives: TranslationKey[] = ['about.objective1', 'about.objective2', 'about.objective3'];

const programs: TranslationKey[] = [
  'about.program1', 'about.program2', 'about.program3', 'about.program4',
  'about.program5', 'about.program6', 'about.program7', 'about.program8',
];

const targetGroups: TranslationKey[] = [
  'about.group1', 'about.group2', 'about.group3', 'about.group4', 'about.group5',
  'about.group6', 'about.group7', 'about.group8', 'about.group9',
];

const values: { title: TranslationKey; text: TranslationKey }[] = [
  { title: 'about.value1Title', text: 'about.value1Text' },
  { title: 'about.value2Title', text: 'about.value2Text' },
  { title: 'about.value3Title', text: 'about.value3Text' },
  { title: 'about.value4Title', text: 'about.value4Text' },
  {
    title: 'about.value5Title',
    text: 'about.value5Text',
  },
];

const impact: { value: string; text: TranslationKey }[] = [
  { value: '70', text: 'about.impact1' },
  { value: '140', text: 'about.impact2' },
  { value: '45', text: 'about.impact3' },
  {
    value: '2022',
    text: 'about.impact4',
  },
];

const approach: TranslationKey[] = [
  'about.approach1', 'about.approach2', 'about.approach3', 'about.approach4', 'about.approach5',
];

function Section({
  title,
  tinted,
  children,
}: {
  title: TranslationKey;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={tinted ? 'bg-green-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-950'}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 border-l-4 border-gold pl-4 text-2xl font-extrabold text-primary-dark dark:text-green-300">
          <Translation translationKey={title} />
        </h2>
        {children}
      </div>
    </section>
  );
}

export default function KuhusuPage() {
  return (
    <>
      <section className="bg-primary-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl"><Translation translationKey="headings.about" /></h1>
          <p className="mt-3 max-w-2xl text-green-100"><Translation translationKey="copy.homeTagline" /></p>
        </div>
      </section>

      <Section title="headings.aboutTePC">
        <p className="max-w-4xl leading-relaxed text-gray-700 dark:text-gray-200">
          <Translation translationKey="about.description" values={{ regNo: org.regNo }} />
        </p>
      </Section>

      <Section title="headings.visionMission" tinted>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-bold text-primary"><Translation translationKey="headings.vision" /></h3>
            <p className="text-gray-700 dark:text-gray-200">
              <Translation translationKey="about.visionText" />
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-2 text-lg font-bold text-primary"><Translation translationKey="headings.mission" /></h3>
            <p className="text-gray-700 dark:text-gray-200">
              <Translation translationKey="about.missionText" />
            </p>
          </div>
        </div>
      </Section>

      <Section title="headings.objectives">
        <div className="grid gap-6 md:grid-cols-3">
          {objectives.map((text, i) => (
            <div key={text} className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">
                {i + 1}
              </span>
              <p className="text-gray-700"><Translation translationKey={text} /></p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="headings.programs" tinted>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((name, i) => (
            <div key={name} className="rounded-xl bg-white p-5 shadow-sm">
              <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gold font-bold text-gray-900">
                {i + 1}
              </span>
              <h3 className="font-bold text-gray-900"><Translation translationKey={name} /></h3>
            </div>
          ))}
        </div>
      </Section>

      <Section title="headings.whoWeServe">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {targetGroups.map((g) => (
            <li key={g} className="flex items-start gap-3 rounded-lg border border-gray-200 p-4">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-gray-700"><Translation translationKey={g} /></span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="headings.values" tinted>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border-t-4 border-gold bg-white p-5 shadow-sm">
              <h3 className="mb-1 font-bold text-primary-dark"><Translation translationKey={v.title} /></h3>
              <p className="text-sm text-gray-700"><Translation translationKey={v.text} /></p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="headings.impact">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((s) => (
            <div key={s.value} className="rounded-xl bg-primary p-6 text-center text-white">
              <div className="text-5xl font-extrabold text-gold">{s.value}</div>
              <p className="mt-2 text-sm text-green-50"><Translation translationKey={s.text} /></p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-gray-700">
          <Translation translationKey="copy.participantImpact" />
        </p>
      </Section>

      <Section title="headings.approach" tinted>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {approach.map((a, i) => (
            <li key={a} className="rounded-xl bg-white p-5 text-center shadow-sm">
              <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">
                {i + 1}
              </span>
              <span className="font-semibold text-gray-900"><Translation translationKey={a} /></span>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-4xl text-gray-700">
          <strong><Translation translationKey="copy.longTermVision" /></strong>{' '}
          <Translation translationKey="about.longTermVision" />
        </p>
      </Section>

      <Section title="headings.leadership">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">Francis Mathius Haramba</h3>
            <p className="text-primary"><Translation translationKey="copy.founderRole" /></p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">Gabriel Zacharia Milombetse</h3>
            <p className="text-primary"><Translation translationKey="copy.chairRole" /></p>
          </div>
        </div>
      </Section>

      <Section title="footer.contact" tinted>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex gap-3 rounded-xl bg-white p-5 shadow-sm">
            <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-gray-700">{org.address}</p>
          </div>
          <div className="flex gap-3 rounded-xl bg-white p-5 shadow-sm">
            <PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-gray-700">{org.phones.join(' / ')}</p>
          </div>
          <div className="flex gap-3 rounded-xl bg-white p-5 shadow-sm">
            <MailIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <p className="break-all text-sm text-gray-700">{org.emails.join(' | ')}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          <Translation translationKey="copy.website" />: {org.website} · <Translation translationKey="copy.regNo" />: {org.regNo}
        </p>
      </Section>
    </>
  );
}
