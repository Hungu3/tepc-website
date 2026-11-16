import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import SiteFrame from '@/components/SiteFrame';

const description =
  'Tanganyika Epistemological Promotion (TePC – Tanzania) is a registered NGO empowering youth, women, and marginalized communities through entrepreneurship, skills development, and sustainable livelihoods.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tepcc.org'),
  title: {
    default: 'TePC – Tanzania | Building Capacity. Empowering Communities.',
    template: '%s | TePC – Tanzania',
  },
  description,
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'TePC – Tanzania',
    description,
    url: 'https://www.tepcc.org',
    siteName: 'TePC – Tanzania',
    locale: 'en_TZ',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var t=localStorage.getItem('tepc_theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');",
          }}
        />
      </head>
      <body className="bg-white font-sans antialiased text-gray-800 dark:bg-gray-950 dark:text-gray-100">
        <Providers>
          <SiteFrame>{children}</SiteFrame>
        </Providers>
      </body>
    </html>
  );
}
