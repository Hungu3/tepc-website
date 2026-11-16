'use server';

import { revalidatePath } from 'next/cache';
import { requireProfile } from '@/lib/admin-auth';
import { createClient } from '@/lib/supabase/server';

interface SiteSetting {
  value_en: string;
  value_sw: string;
}

const editableKeys = new Set([
  'hero_title',
  'hero_subtitle',
  'contact_phone',
  'contact_email',
  'contact_address',
]);

export async function getSiteSettings(): Promise<Record<string, SiteSetting>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('key,value_en,value_sw');

  if (error) {
    console.error('Unable to load site settings:', error.message);
    throw new Error('Unable to load site settings.');
  }

  return Object.fromEntries(
    (data ?? []).map((setting) => [
      setting.key,
      {
        value_en: setting.value_en ?? '',
        value_sw: setting.value_sw ?? '',
      },
    ]),
  );
}

export async function updateSiteSetting(
  key: string,
  value_en: string,
  value_sw: string,
): Promise<void> {
  'use server';

  if (!editableKeys.has(key)) {
    throw new Error('This site setting cannot be edited.');
  }
  if (typeof value_en !== 'string' || typeof value_sw !== 'string') {
    throw new Error('Site setting values must be text.');
  }

  const { supabase } = await requireProfile(['admin']);
  const { data, error } = await supabase
    .from('site_settings')
    .update({ value_en, value_sw })
    .eq('key', key)
    .select('key')
    .maybeSingle();

  if (error) {
    console.error(`Unable to update site setting "${key}":`, error.message);
    throw new Error('Unable to update site setting.');
  }
  if (!data) {
    throw new Error(`Site setting "${key}" was not found.`);
  }

  revalidatePath('/');
  revalidatePath('/', 'layout');
  revalidatePath('/wasiliana');
}
