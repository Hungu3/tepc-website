'use client';

import { videos } from '@/data/announcements';
import LazyYouTube from './LazyYouTube';
import { useLanguage } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/translations';

export default function VideoGrid() {
  const { t } = useLanguage();
  const videoKeys: { title: TranslationKey; description: TranslationKey }[] = [
    { title: 'copy.videoWelcomeTitle', description: 'copy.videoWelcomeDescription' },
    { title: 'copy.videoSkillsTitle', description: 'copy.videoSkillsDescription' },
    { title: 'copy.videoVoicesTitle', description: 'copy.videoVoicesDescription' },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {videos.map((video, index) => {
        const keys = videoKeys[index];
        if (!keys) return null;
        const title = t(keys.title);
        return (
          <div
            key={video.id + index}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <LazyYouTube videoId={video.id} title={title} />
            <div className="p-4">
              <h3 className="mb-1 font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{t(keys.description)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
