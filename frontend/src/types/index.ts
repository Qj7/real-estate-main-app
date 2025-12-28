// Database entity types
export type ObjectType = 'apartment' | 'studio' | 'villa' | 'developer_tour';
export type ObjectStatus = 'for_sale' | 'for_rent' | 'under_construction' | 'planned';
export type PublishedStatus = 'draft' | 'moderation' | 'published' | 'archived';

export interface Location {
  lat?: number;
  lng?: number;
  address?: string;
}

export interface Object {
  id: string;
  title: string;
  location?: Location;
  city?: string;
  district?: string;
  type: ObjectType;
  rooms?: number;
  area?: number;
  price_min?: number;
  price_max?: number;
  status: ObjectStatus;
  partner_id?: string;
  developer_id?: string;
  matterport_link?: string;
  images?: string[];
  description?: string;
  added_date?: string;
  published_status: PublishedStatus;
  tags?: string[];
  meta?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
  partner?: Partner;
  developer?: Developer;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  contacts?: Record<string, any>;
  showroom_settings?: Record<string, any>;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Developer {
  id: string;
  name: string;
  logo_url?: string;
  contacts?: Record<string, any>;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

