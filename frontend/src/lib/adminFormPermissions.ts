/**
 * Конфигурация доступа к полям формы объекта недвижимости по ролям.
 * Соответствует docs/ADMIN_PLAN.md (матрица роль × поле).
 */

export type AdminRole =
  | 'Partner'
  | 'Developer'
  | 'Support'
  | 'Viewer'
  | 'Admin'
  | 'SuperAdmin';

export type FieldAccess = 'edit' | 'readonly' | 'hidden' | 'fixed';

export const OBJECT_FORM_FIELDS = [
  'title',
  'location',
  'city',
  'district',
  'type',
  'rooms',
  'area',
  'price_min',
  'price_max',
  'status',
  'partner_id',
  'developer_id',
  'matterport_link',
  'images',
  'description',
  'published_status',
  'tags',
  'meta',
] as const;

export type ObjectFormField = (typeof OBJECT_FORM_FIELDS)[number];

/** Матрица: роль → поле → тип доступа */
export const FIELD_ACCESS_BY_ROLE: Record<AdminRole, Record<ObjectFormField, FieldAccess>> = {
  Partner: {
    title: 'edit',
    location: 'edit',
    city: 'edit',
    district: 'edit',
    type: 'edit',
    rooms: 'edit',
    area: 'edit',
    price_min: 'edit',
    price_max: 'edit',
    status: 'edit',
    partner_id: 'fixed',
    developer_id: 'edit',
    matterport_link: 'edit',
    images: 'edit',
    description: 'edit',
    published_status: 'edit',
    tags: 'edit',
    meta: 'edit',
  },
  Developer: {
    title: 'edit',
    location: 'edit',
    city: 'edit',
    district: 'edit',
    type: 'edit',
    rooms: 'edit',
    area: 'edit',
    price_min: 'edit',
    price_max: 'edit',
    status: 'edit',
    partner_id: 'hidden',
    developer_id: 'fixed',
    matterport_link: 'edit',
    images: 'edit',
    description: 'edit',
    published_status: 'edit',
    tags: 'edit',
    meta: 'edit',
  },
  Support: {
    title: 'edit',
    location: 'edit',
    city: 'edit',
    district: 'edit',
    type: 'edit',
    rooms: 'edit',
    area: 'edit',
    price_min: 'readonly',
    price_max: 'readonly',
    status: 'edit',
    partner_id: 'readonly',
    developer_id: 'edit',
    matterport_link: 'edit',
    images: 'edit',
    description: 'edit',
    published_status: 'edit',
    tags: 'edit',
    meta: 'edit',
  },
  Viewer: {
    title: 'readonly',
    location: 'readonly',
    city: 'readonly',
    district: 'readonly',
    type: 'readonly',
    rooms: 'readonly',
    area: 'readonly',
    price_min: 'readonly',
    price_max: 'readonly',
    status: 'readonly',
    partner_id: 'readonly',
    developer_id: 'readonly',
    matterport_link: 'readonly',
    images: 'readonly',
    description: 'readonly',
    published_status: 'readonly',
    tags: 'readonly',
    meta: 'readonly',
  },
  Admin: {
    title: 'edit',
    location: 'edit',
    city: 'edit',
    district: 'edit',
    type: 'edit',
    rooms: 'edit',
    area: 'edit',
    price_min: 'edit',
    price_max: 'edit',
    status: 'edit',
    partner_id: 'edit',
    developer_id: 'edit',
    matterport_link: 'edit',
    images: 'edit',
    description: 'edit',
    published_status: 'edit',
    tags: 'edit',
    meta: 'edit',
  },
  SuperAdmin: {
    title: 'edit',
    location: 'edit',
    city: 'edit',
    district: 'edit',
    type: 'edit',
    rooms: 'edit',
    area: 'edit',
    price_min: 'edit',
    price_max: 'edit',
    status: 'edit',
    partner_id: 'edit',
    developer_id: 'edit',
    matterport_link: 'edit',
    images: 'edit',
    description: 'edit',
    published_status: 'edit',
    tags: 'edit',
    meta: 'edit',
  },
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  Partner: 'Партнёр',
  Developer: 'Застройщик',
  Support: 'Техподдержка',
  Viewer: 'Пользователь',
  Admin: 'Админ',
  SuperAdmin: 'Суперадмин',
};

export const ALL_ROLES: AdminRole[] = [
  'Partner',
  'Developer',
  'Support',
  'Admin',
  'SuperAdmin',
];

export function getFieldAccess(role: AdminRole, field: ObjectFormField): FieldAccess {
  return FIELD_ACCESS_BY_ROLE[role][field];
}

export function canSubmitForm(role: AdminRole): boolean {
  return role !== 'Viewer';
}
