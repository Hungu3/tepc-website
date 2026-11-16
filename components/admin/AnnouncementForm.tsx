'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { adminCategories, type Announcement } from '@/data/announcements';
import { createClient } from '@/lib/supabase/client';

type Props = { initial?: Announcement; eventOnly?: boolean; returnTo?: string };

export default function AnnouncementForm({ initial, eventOnly = false, returnTo }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = event.currentTarget;
    const values = new FormData(form);
    const slug = String(values.get('slug') ?? '').trim().toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError('Use a unique slug containing lowercase letters, numbers, and hyphens.');
      setBusy(false);
      return;
    }

    const supabase = createClient();
    let image = String(values.get('existingImage') ?? '');
    const file = values.get('imageFile');
    if (file instanceof File && file.size > 0) {
      const extension = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'image';
      const path = `${slug}/${Date.now()}.${extension}`;
      const { error: uploadError } = await supabase.storage.from('tepc-images').upload(path, file, { upsert: false });
      if (uploadError) {
        setError(`Image upload failed: ${uploadError.message}`);
        setBusy(false);
        return;
      }
      image = supabase.storage.from('tepc-images').getPublicUrl(path).data.publicUrl;
    }
    const selectedCategory = values.get('category');
    const category = eventOnly
      ? 'Event'
      : typeof selectedCategory === 'string'
        ? adminCategories.find((option) => option === selectedCategory)
        : undefined;
    if (!category) {
      setError('Choose a valid news category.');
      setBusy(false);
      return;
    }
    const row = {
      slug,
      title: String(values.get('title') ?? '').trim(),
      category,
      date: String(values.get('date') ?? ''),
      excerpt: String(values.get('excerpt') ?? '').trim(),
      content: String(values.get('content') ?? '').trim(),
      image,
      videoUrl: String(values.get('videoUrl') ?? '').trim() || null,
      pdfUrl: String(values.get('pdfUrl') ?? '').trim() || null,
      author: String(values.get('author') ?? '').trim() || null,
      featured: values.get('featured') === 'on',
    };
    const query = initial
      ? supabase.from('announcements').update(row).eq('slug', initial.slug)
      : supabase.from('announcements').insert(row);
    const { error: saveError } = await query;
    setBusy(false);
    if (saveError) {
      setError(`Unable to save announcement: ${saveError.message}`);
      return;
    }
    router.push(returnTo ?? (eventOnly ? '/admin/events' : '/admin/announcements'));
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <input type="hidden" name="existingImage" value={initial?.image ?? ''} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="slug" label="Slug" defaultValue={initial?.slug} required />
        <Field name="title" label="Title" defaultValue={initial?.title} required />
        {!eventOnly && <div><label htmlFor="announcement-category" className="mb-1 block text-sm font-semibold">Category</label><select id="announcement-category" name="category" defaultValue={initial?.category ?? 'Announcement'} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">{adminCategories.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>}
        {eventOnly && <input type="hidden" name="category" value="Event" />}
        <Field name="date" label="Date" type="date" defaultValue={initial?.date} required />
        <Field name="author" label="Author" defaultValue={initial?.author} />
        <Field name="videoUrl" label="Video URL" defaultValue={initial?.videoUrl} type="url" />
        <Field name="pdfUrl" label="PDF URL" defaultValue={initial?.pdfUrl} type="url" />
        <div className="md:col-span-2"><label htmlFor="announcement-excerpt" className="mb-1 block text-sm font-semibold">Excerpt</label><textarea id="announcement-excerpt" name="excerpt" defaultValue={initial?.excerpt} required rows={3} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white" /></div>
        <div className="md:col-span-2"><label htmlFor="announcement-content" className="mb-1 block text-sm font-semibold">Content (HTML)</label><textarea id="announcement-content" name="content" defaultValue={initial?.content} required rows={12} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-mono text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white" /></div>
        <div className="md:col-span-2"><label htmlFor="announcement-image" className="mb-1 block text-sm font-semibold">Image</label><input id="announcement-image" name="imageFile" type="file" accept="image/*" className="block w-full text-sm" />{initial?.image && <p className="mt-1 break-all text-xs text-gray-500">Current image: {initial.image}</p>}</div>
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold"><input name="featured" type="checkbox" defaultChecked={initial?.featured} className="h-4 w-4 accent-primary" /> Featured on home page</label>
      {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
      <button disabled={busy} className="rounded-lg bg-primary px-5 py-3 font-semibold text-white disabled:opacity-60">{busy ? 'Saving...' : initial ? 'Save Changes' : 'Create Announcement'}</button>
    </form>
  );
}

function Field({ name, label, defaultValue, type = 'text', required = false }: { name: string; label: string; defaultValue?: string; type?: string; required?: boolean }) {
  return <div><label htmlFor={`announcement-${name}`} className="mb-1 block text-sm font-semibold">{label}</label><input id={`announcement-${name}`} name={name} type={type} defaultValue={defaultValue} required={required} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white" /></div>;
}
