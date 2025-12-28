import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
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

// Events API (analytics)
export const eventsApi = {
  track: async (event: {
    event: string;
    object_id?: string;
    source?: string;
    campaign?: string;
    session_id?: string;
    duration_ms?: number;
    meta?: Record<string, any>;
  }) => {
    const response = await api.post('/events', event);
    return response.data;
  },
};

