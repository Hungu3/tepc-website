'use client';

import { useState } from 'react';
import { ShareIcon, WhatsAppIcon } from './Icons';
import { useLanguage } from '@/lib/LanguageContext';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <ShareIcon className="h-4 w-4" /> {t('buttons.share')}:
      </span>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
      >
        <WhatsAppIcon className="h-4 w-4" /> {t('buttons.whatsapp')}
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary"
      >
        {copied ? t('buttons.copied') : t('buttons.copyLink')}
      </button>
    </div>
  );
}
