import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variable retrieval adhering to Vite conventions
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Clean URL: strip trailing slashes if present
const supabaseUrl =
  typeof rawSupabaseUrl === 'string'
    ? rawSupabaseUrl.trim().replace(/\/+$/, '')
    : '';

// Verify validity of credentials (avoid initializing if missing or default placeholder)
const isValidUrl =
  supabaseUrl.length > 0 &&
  !supabaseUrl.includes('PASTE_') &&
  (supabaseUrl.startsWith('https://') || supabaseUrl.startsWith('http://'));

const isValidAnonKey =
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.trim().length > 0 &&
  !supabaseAnonKey.includes('PASTE_');

export const isSupabaseConfigured = Boolean(isValidUrl && isValidAnonKey);

// Reusable Supabase client instance (singleton)
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const BUCKET_NAME = 'admin-profile';
export const FILE_PATH = 'profile.jpg';

export const MUSIC_BUCKET_NAME = 'portfolio.music';
export const MUSIC_FILE_PATH = 'background.mp3';

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

/**
 * Retrieves the public URL for the background music in Supabase Storage.
 */
export function getBackgroundMusicPublicUrl(): string | null {
  if (!supabase) return null;
  try {
    const { data } = supabase.storage.from(MUSIC_BUCKET_NAME).getPublicUrl(MUSIC_FILE_PATH);
    return data?.publicUrl || null;
  } catch (error) {
    console.warn('Failed to retrieve public music URL from Supabase Storage:', error);
    return null;
  }
}

/**
 * Retrieves a signed URL for private bucket access for background music (valid for 2 hours).
 */
export async function getBackgroundMusicSignedUrl(): Promise<string | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.storage
      .from(MUSIC_BUCKET_NAME)
      .createSignedUrl(MUSIC_FILE_PATH, 7200);

    if (error || !data?.signedUrl) {
      return null;
    }
    return data.signedUrl;
  } catch (error) {
    console.warn('Failed to retrieve signed music URL from Supabase Storage:', error);
    return null;
  }
}
