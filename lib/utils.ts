// Shared constants and helper functions.

export const SITE_URL = 'https://www.tepcc.org';

export const org = {
  fullName: 'Tanganyika Epistemological Promotion',
  shortName: 'TePC – Tanzania',
  tagline: 'Building Capacity. Empowering Communities.',
  regNo: '00NGO/R/9866',
  address: 'P.O. Box 475, 47332, Kasulu, Kigoma – Tanzania',
  headOffice: 'Kasulu, Kigoma – Tanzania',
  phones: ['+255 724 800 201', '+255 724 800 207'],
  emails: ['info@tepcc.org', 'info.tepctanzania@gmail.com'],
  website: 'www.tepcc.org',
  whatsapp: 'https://wa.me/255724800201?text=Hello%20TePC',
} as const;

/** Formats a YYYY-MM-DD string as "January 20, 2026" (timezone-safe). */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Extracts the video ID from common YouTube URL formats. */
export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}
