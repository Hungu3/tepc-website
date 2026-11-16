'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PlayIcon } from './Icons';
import { useLanguage } from '@/lib/LanguageContext';

interface LazyYouTubeProps {
  videoId: string;
  title: string;
}

/** Shows a thumbnail first; loads the YouTube iframe only after a click. */
export default function LazyYouTube({ videoId, title }: LazyYouTubeProps) {
  const [playing, setPlaying] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`${t('copy.playVideo')}: ${title}`}
        >
          <Image
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-opacity group-hover:opacity-80"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform group-hover:scale-110">
              <PlayIcon className="ml-1 h-7 w-7" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
