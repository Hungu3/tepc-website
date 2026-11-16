'use client';

import Image from 'next/image';
import { galleryImages } from '@/data/announcements';
import { useLanguage } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/translations';

export default function Gallery() {
  const { t } = useLanguage();
  const altKeys: TranslationKey[] = [
    'copy.galleryWomen',
    'copy.galleryYouth',
    'copy.gallerySoap',
    'copy.galleryConference',
    'copy.galleryInclusive',
    'copy.galleryAgribusiness',
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {galleryImages.map((img, index) => (
        <figure
          key={img.src}
          className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100"
        >
          <Image
            src={img.src}
            alt={t(altKeys[index])}
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </figure>
      ))}
    </div>
  );
}
