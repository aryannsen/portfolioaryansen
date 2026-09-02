import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variable retrieval adhering to Vite conventions
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verify validity of credentials (avoid initializing if missing or default placeholder)
const isValidUrl =
  typeof supabaseUrl === 'string' &&
  supabaseUrl.trim().length > 0 &&
  !supabaseUrl.includes('PASTE_') &&
  (supabaseUrl.startsWith('https://') || supabaseUrl.startsWith('http://'));

const isValidAnonKey =
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.trim().length > 0 &&
  !supabaseAnonKey.includes('PASTE_');

export const isSupabaseConfigured = Boolean(isValidUrl && isValidAnonKey);

// Reusable Supabase client instance (singleton)
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export const BUCKET_NAME = 'admin-profile';
export const FILE_PATH = 'profile.jpg';

/**
 * Retrieves the public URL for the admin profile image in Supabase Storage.
 */
export function getProfileImagePublicUrl(): string | null {
  if (!supabase) return null;
  try {
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(FILE_PATH);
    return data?.publicUrl || null;
  } catch (error) {
    console.warn('Failed to retrieve public URL from Supabase Storage:', error);
    return null;
  }
}

/**
 * Retrieves a signed URL for private bucket access (valid for 1 hour).
 */
export async function getProfileImageSignedUrl(): Promise<string | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(FILE_PATH, 3600);

    if (error || !data?.signedUrl) {
      return null;
    }
    return data.signedUrl;
  } catch (error) {
    console.warn('Failed to retrieve signed URL from Supabase Storage:', error);
    return null;
  }
}
