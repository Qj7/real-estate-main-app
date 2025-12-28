'use client';

import { create } from 'zustand';
import { Object } from '@/types';

type Theme = 'light' | 'dark';

interface AppState {
  favorites: string[];
  theme: Theme;
  addFavorite: (objectId: string) => void;
  removeFavorite: (objectId: string) => void;
  isFavorite: (objectId: string) => boolean;
  toggleFavorite: (objectId: string) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Simple localStorage persistence
const STORAGE_KEY_FAVORITES = 'real-estate-favorites';
const STORAGE_KEY_THEME = 'real-estate-theme';

const loadFavorites = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: string[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
  } catch {
    // Ignore storage errors
  }
};

const loadTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(STORAGE_KEY_THEME) as Theme;
    return stored === 'dark' || stored === 'light' ? stored : 'light';
  } catch {
    return 'light';
  }
};

const saveTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch {
    // Ignore storage errors
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  favorites: loadFavorites(),
  theme: loadTheme(),
  addFavorite: (objectId: string) => {
    set((state) => {
      const newFavorites = [...state.favorites, objectId];
      saveFavorites(newFavorites);
      return { favorites: newFavorites };
    });
  },
  removeFavorite: (objectId: string) => {
    set((state) => {
      const newFavorites = state.favorites.filter((id) => id !== objectId);
      saveFavorites(newFavorites);
      return { favorites: newFavorites };
    });
  },
  isFavorite: (objectId: string) => get().favorites.includes(objectId),
  toggleFavorite: (objectId: string) => {
    const { isFavorite, addFavorite, removeFavorite } = get();
    if (isFavorite(objectId)) {
      removeFavorite(objectId);
    } else {
      addFavorite(objectId);
    }
  },
  setTheme: (theme: Theme) => {
    set({ theme });
    saveTheme(theme);
  },
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    set({ theme: newTheme });
    saveTheme(newTheme);
  },
}));

