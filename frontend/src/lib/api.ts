import axios, { AxiosError } from 'axios';

// В браузере: /api (dev — Next.js проксирует) или NEXT_PUBLIC_API_URL (прод — бэкенд на другом хосте).
// Для Mini App на GitHub Pages нужен полный URL бэкенда.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_URL =
  typeof window !== 'undefined'
    ? (API_BASE.startsWith('http') ? API_BASE : '/api')
    : API_BASE;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// В Telegram Mini App добавляем initData для валидации на бэкенде
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initData) {
    config.headers['X-Telegram-Init-Data'] = (window as any).Telegram.WebApp.initData;
  }
  return config;
});

// Не логируем ошибки API в консоль (Network Error, CORS и т.д.)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
);

// Objects API
export const objectsApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    city?: string;
    type?: string;
    status?: string;
    search?: string;
  }) => {
    const response = await api.get('/objects', { params });
    // Backend returns { data, total, page, limit, totalPages }
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/objects/${id}`);
    // Backend returns the object directly
    return { data: response.data };
  },
  getFavorites: async () => {
    // This endpoint doesn't exist yet, will be implemented later
    const response = await api.get('/objects/favorites');
    return response.data;
  },
  toggleFavorite: async (objectId: string) => {
    // This endpoint doesn't exist yet, will be implemented later
    const response = await api.post(`/objects/${objectId}/favorite`);
    return response.data;
  },
};

// Partners API
export const partnersApi = {
  getAll: async () => {
    const response = await api.get('/partners');
    return response.data;
  },
  getBySlug: async (slug: string) => {
    const response = await api.get(`/partners/${slug}`);
    return response.data;
  },
};

// Events API (analytics) — fire-and-forget, no console spam on CORS/network errors
export const eventsApi = {
  track: (event: {
    event: string;
    object_id?: string;
    source?: string;
    campaign?: string;
    session_id?: string;
    duration_ms?: number;
    meta?: Record<string, any>;
  }) => {
    api.post('/events', event).catch(() => {
      // Silently ignore (e.g. CORS, backend down)
    });
  },
};

