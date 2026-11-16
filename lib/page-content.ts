'use server';

import { revalidatePath } from 'next/cache';
import { requireProfile } from '@/lib/admin-auth';
import { createClient } from '@/lib/supabase/server';

interface LocalizedContent {
  en: string;
  sw: string;
}

const editablePageSlugs = new Set([
  'about',
  'our-work',
  'projects',
  'impact',
  'get-involved',
  'resources',
]);

export async function getPageContent(
  pageSlug: string,
): Promise<Record<string, LocalizedContent>> {
  if (!editablePageSlugs.has(pageSlug)) {
    throw new Error('This page does not support editable content.');
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('page_contents')
    .select('section_key,content_en,content_sw')
    .eq('page_slug', pageSlug);

  if (error) {
    console.error(`Unable to load content for "${pageSlug}":`, error.message);
    throw new Error('Unable to load page content.');
  }

  return Object.fromEntries(
    (data ?? []).map((row) => [
      row.section_key,
      { en: row.content_en ?? '', sw: row.content_sw ?? '' },
    ]),
  );
}

export async function updatePageContent(
  pageSlug: string,
  sectionKey: string,
  contentEn: string,
  contentSw: string,
): Promise<void> {
  if (!editablePageSlugs.has(pageSlug)) {
    throw new Error('This page does not support editable content.');
  }
  if (
    typeof sectionKey !== 'string' ||
    !sectionKey.trim() ||
    sectionKey.length > 100 ||
    typeof contentEn !== 'string' ||
    typeof contentSw !== 'string'
  ) {
    throw new Error('Enter a valid content key and text values.');
  }

  const { supabase } = await requireProfile(['admin']);
  const values = {
    content_en: contentEn,
    content_sw: contentSw,
  };
  const { data, error } = await supabase
    .from('page_contents')
    .update(values)
    .eq('page_slug', pageSlug)
    .eq('section_key', sectionKey.trim())
    .select('page_slug')
    .maybeSingle();

  if (error) {
    console.error(`Unable to update "${pageSlug}/${sectionKey}":`, error.message);
    throw new Error('Unable to save page content.');
  }

  if (!data) {
    const { error: insertError } = await supabase.from('page_contents').insert({
      page_slug: pageSlug,
      section_key: sectionKey.trim(),
      ...values,
    });
    if (insertError) {
      console.error(`Unable to create "${pageSlug}/${sectionKey}":`, insertError.message);
      throw new Error('Unable to save page content.');
    }
  }

  revalidatePath(`/${pageSlug}`, 'page');
  revalidatePath('/', 'layout');
}
