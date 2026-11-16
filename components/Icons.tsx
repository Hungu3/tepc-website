// Inline SVG icons (no external icon packages).
import type { ReactNode } from 'react';

interface IconProps {
  className?: string;
}

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? 'h-5 w-5'}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const MenuIcon = ({ className }: IconProps) => (
  <Svg className={className}><path d="M3 6h18M3 12h18M3 18h18" /></Svg>
);
export const CloseIcon = ({ className }: IconProps) => (
  <Svg className={className}><path d="M6 6l12 12M18 6L6 18" /></Svg>
);
export const SearchIcon = ({ className }: IconProps) => (
  <Svg className={className}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></Svg>
);
export const PlayIcon = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className ?? 'h-5 w-5'} aria-hidden="true" focusable="false">
    <path d="M8 5v14l11-7z" />
  </svg>
);
export const DownloadIcon = ({ className }: IconProps) => (
  <Svg className={className}><path d="M12 3v12M7 10l5 5 5-5M4 21h16" /></Svg>
);
export const ShareIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
  </Svg>
);
export const ChevronDownIcon = ({ className }: IconProps) => (
  <Svg className={className}><path d="M6 9l6 6 6-6" /></Svg>
);
export const PhoneIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </Svg>
);
export const MailIcon = ({ className }: IconProps) => (
  <Svg className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Svg>
);
export const MapPinIcon = ({ className }: IconProps) => (
  <Svg className={className}><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></Svg>
);
export const CheckIcon = ({ className }: IconProps) => (
  <Svg className={className}><path d="M5 13l4 4L19 7" /></Svg>
);
export const ArrowRightIcon = ({ className }: IconProps) => (
  <Svg className={className}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);
export const ExternalLinkIcon = ({ className }: IconProps) => (
  <Svg className={className}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></Svg>
);
export const WhatsAppIcon = ({ className }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className ?? 'h-5 w-5'} aria-hidden="true" focusable="false">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31A8.2 8.2 0 1 1 12.04 20.1zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.29z" />
  </svg>
);
