import { useState, useEffect } from 'react';
import {
  isSupabaseConfigured,
  getBackgroundMusicPublicUrl,
  getBackgroundMusicSignedUrl,
} from './supabase';

const STORAGE_KEY = 'portfolio_music_enabled';
const DEFAULT_VOLUME = 0.18; // 18% (15-20% range)

type AudioStateListener = (isPlaying: boolean) => void;

class BackgroundAudioManager {
  private static instance: BackgroundAudioManager | null = null;
  private audio: HTMLAudioElement | null = null;
  private isInitialized: boolean = false;
  private triedSignedFallback: boolean = false;
  private listeners: Set<AudioStateListener> = new Set();
  private interactionListenersAttached: boolean = false;
  private currentSourceUrl: string | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      // Single global HTMLAudioElement instance
      const audio = new Audio();
      audio.loop = true;
      audio.volume = DEFAULT_VOLUME;
      audio.preload = 'auto';

      // Real audio element event listeners to keep state 100% synchronized
      audio.addEventListener('play', () => {
        if (import.meta.env.DEV) {
          console.log('[AudioManager] Audio play event fired (playing = true)');
        }
        this.notify(true);
      });

      audio.addEventListener('pause', () => {
        if (import.meta.env.DEV) {
          console.log('[AudioManager] Audio pause event fired (playing = false)');
        }
        this.notify(false);
      });

      audio.addEventListener('ended', () => {
        // Redundant safeguard for looping
        if (this.isPreferenceEnabled()) {
          audio.play().catch(() => {});
        } else {
          this.notify(false);
        }
      });

      audio.addEventListener('error', (e) => {
        if (import.meta.env.DEV) {
          console.warn('[AudioManager] Audio element error encountered:', e);
        }
        this.handleAudioError();
      });

      this.audio = audio;
    }
  }

  public static getInstance(): BackgroundAudioManager {
    if (!BackgroundAudioManager.instance) {
      BackgroundAudioManager.instance = new BackgroundAudioManager();
    }
    return BackgroundAudioManager.instance;
  }

  /**
   * Check if music is enabled based on localStorage.
   * If there is NO localStorage value yet (null), treat music as ENABLED by default.
   */
  public isPreferenceEnabled(): boolean {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(STORAGE_KEY);
    // Explicit 'false' means disabled; null or 'true' means enabled
    return saved !== 'false';
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined' || !this.audio) return;
    this.isInitialized = true;

    if (!isSupabaseConfigured) {
      if (import.meta.env.DEV) {
        console.warn('[AudioManager] Supabase is not configured; background music inactive.');
      }
      return;
    }

    this.resolveAndLoadSource();
  }

  private async resolveAndLoadSource() {
    if (!this.audio) return;

    try {
      // 1. Attempt public URL first
      const publicUrl = getBackgroundMusicPublicUrl();
      if (publicUrl) {
        if (import.meta.env.DEV) {
          console.log('[AudioManager] Supabase public audio URL retrieved:', publicUrl);
        }
        this.setAudioSource(publicUrl);
        return;
      }

      // 2. If public URL could not be retrieved, attempt signed URL
      const signedUrl = await getBackgroundMusicSignedUrl();
      if (signedUrl) {
        if (import.meta.env.DEV) {
          console.log('[AudioManager] Supabase signed audio URL retrieved');
        }
        this.setAudioSource(signedUrl);
        return;
      }

      if (import.meta.env.DEV) {
        console.warn('[AudioManager] Could not resolve audio URL from Supabase Storage.');
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[AudioManager] Error resolving audio source:', err);
      }
    }
  }

  private setAudioSource(src: string) {
    if (!this.audio || !src) return;

    this.currentSourceUrl = src;
    this.audio.src = src;

    if (import.meta.env.DEV) {
      console.log('[AudioManager] Audio source assigned. Calling audio.load()');
    }
    this.audio.load();

    // If user preference is enabled, attempt autoplay
    if (this.isPreferenceEnabled()) {
      this.attemptAutoplay();
    }
  }

  private handleAudioError() {
    // If public URL fails to load (e.g. private bucket RLS), try signed URL once as fallback
    if (!this.triedSignedFallback && isSupabaseConfigured) {
      this.triedSignedFallback = true;
      if (import.meta.env.DEV) {
        console.log('[AudioManager] Attempting signed URL fallback after audio error...');
      }
      getBackgroundMusicSignedUrl()
        .then((signedUrl) => {
          if (signedUrl && this.audio) {
            this.setAudioSource(signedUrl);
          } else {
            this.notify(false);
          }
        })
        .catch(() => {
          this.notify(false);
        });
    } else {
      this.notify(false);
    }
  }

  private attemptAutoplay() {
    if (!this.audio || !this.isPreferenceEnabled()) return;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (import.meta.env.DEV) {
            console.log('[AudioManager] Autoplay succeeded on page open');
          }
          this.removeInteractionListeners();
        })
        .catch((error) => {
          // Browser autoplay policy blocked audible playback
          if (import.meta.env.DEV) {
            console.log(
              '[AudioManager] Autoplay blocked by browser policy (awaiting user interaction):',
              error?.name || error
            );
          }
          this.attachInteractionListeners();
        });
    }
  }

  private attachInteractionListeners() {
    if (this.interactionListenersAttached || typeof window === 'undefined') return;
    this.interactionListenersAttached = true;

    const events = ['pointerdown', 'touchstart', 'click', 'keydown'];
    events.forEach((evt) => {
      window.addEventListener(evt, this.onUserInteraction, {
        once: true,
        passive: true,
      });
    });
  }

  private removeInteractionListeners() {
    if (!this.interactionListenersAttached || typeof window === 'undefined') return;
    this.interactionListenersAttached = false;

    const events = ['pointerdown', 'touchstart', 'click', 'keydown'];
    events.forEach((evt) => {
      window.removeEventListener(evt, this.onUserInteraction);
    });
  }

  private onUserInteraction = () => {
    this.removeInteractionListeners();

    // Check if user still wants music and audio is paused
    if (this.audio && this.isPreferenceEnabled() && this.audio.paused) {
      if (import.meta.env.DEV) {
        console.log('[AudioManager] User interaction detected; starting playback');
      }
      this.audio.play().catch((err) => {
        if (import.meta.env.DEV) {
          console.warn('[AudioManager] Play after interaction failed:', err);
        }
      });
    }
  };

  /**
   * Main toggle function invoked by Header / Mobile Drawer music buttons.
   * Controls the single global HTMLAudioElement.
   */
  public toggleMusic() {
    if (!this.audio || typeof window === 'undefined') return;

    // Check REAL audio state
    const isCurrentlyPlaying = !this.audio.paused && !this.audio.ended && this.audio.readyState > 0;

    if (isCurrentlyPlaying) {
      // IF music is currently playing: PAUSE
      if (import.meta.env.DEV) {
        console.log('[AudioManager] User clicked toggle -> PAUSING music');
      }
      localStorage.setItem(STORAGE_KEY, 'false');
      this.removeInteractionListeners();
      this.audio.pause();
    } else {
      // IF music is currently paused: PLAY
      if (import.meta.env.DEV) {
        console.log('[AudioManager] User clicked toggle -> PLAYING music');
      }
      localStorage.setItem(STORAGE_KEY, 'true');
      this.removeInteractionListeners();

      // If source URL wasn't assigned or needs re-loading
      if (!this.audio.src && this.currentSourceUrl) {
        this.audio.src = this.currentSourceUrl;
        this.audio.load();
      } else if (!this.audio.src && isSupabaseConfigured) {
        this.resolveAndLoadSource();
      }

      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (import.meta.env.DEV) {
              console.log('[AudioManager] Audio play succeeded via toggle');
            }
          })
          .catch((err) => {
            if (import.meta.env.DEV) {
              console.warn('[AudioManager] Play via toggle rejected:', err);
            }
          });
      }
    }
  }

  public isPlaying(): boolean {
    if (!this.audio) return false;
    return !this.audio.paused && !this.audio.ended && this.audio.readyState > 0;
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    // Immediately emit current state
    listener(this.isPlaying());

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(playing: boolean) {
    this.listeners.forEach((listener) => {
      try {
        listener(playing);
      } catch (err) {
        console.error('[AudioManager] Listener notification error:', err);
      }
    });
  }
}

// Global Singleton Instance
export const audioManager = BackgroundAudioManager.getInstance();

/**
 * Custom React Hook for background music controls.
 * Completely synchronized across Desktop Header, Mobile Header, and Mobile Drawer.
 */
export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => audioManager.isPlaying());

  useEffect(() => {
    // Initialize audio manager
    audioManager.init();

    // Subscribe to real audio events
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const toggle = () => {
    audioManager.toggleMusic();
  };

  return {
    isPlaying,
    toggle,
  };
}
