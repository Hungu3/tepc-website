'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application rendering error:', error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-16 dark:bg-gray-950">
      <section
        role="alert"
        className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900"
      >
        <h1 className="text-2xl font-extrabold text-primary-dark dark:text-green-300">
          This page could not be loaded
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Something went wrong while loading this page. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-dark"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
