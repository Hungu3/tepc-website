'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application rendering error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '24px',
          background: '#f9fafb',
          color: '#111827',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <main
          role="alert"
          style={{
            width: '100%',
            maxWidth: '480px',
            padding: '32px',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            background: '#fff',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgb(0 0 0 / 8%)',
          }}
        >
          <h1 style={{ marginTop: 0, color: '#065f33' }}>TePC is temporarily unavailable</h1>
          <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
            An unexpected error prevented the website from loading. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '12px',
              padding: '12px 20px',
              border: 0,
              borderRadius: '8px',
              background: '#0a7a42',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}