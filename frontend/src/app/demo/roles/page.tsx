'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ALL_ROLES,
  ROLE_LABELS,
  getFieldAccess,
  canSubmitForm,
  type AdminRole,
  type ObjectFormField,
} from '@/lib/adminFormPermissions';

const FIELD_LABELS: Record<ObjectFormField, string> = {
  title: 'Название',
  location: 'Координаты (JSON)',
  city: 'Город',
  district: 'Район',
  type: 'Тип объекта',
  rooms: 'Комнат',
  area: 'Площадь (м²)',
  price_min: 'Цена от',
  price_max: 'Цена до',
  status: 'Статус',
  partner_id: 'Партнёр',
  developer_id: 'Застройщик',
  matterport_link: 'Ссылка Matterport',
  images: 'Фото (URL через запятую)',
  description: 'Описание',
  published_status: 'Публикация',
  tags: 'Теги (через запятую)',
  meta: 'Мета (JSON)',
};

const TYPE_OPTIONS = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'studio', label: 'Студия' },
  { value: 'villa', label: 'Вилла' },
  { value: 'developer_tour', label: 'Тур застройщика' },
];

const STATUS_OPTIONS = [
  { value: 'for_sale', label: 'Продажа' },
  { value: 'for_rent', label: 'Аренда' },
  { value: 'under_construction', label: 'В строительстве' },
  { value: 'planned', label: 'Планируется' },
];

const PUBLISHED_OPTIONS = [
  { value: 'draft', label: 'Черновик' },
  { value: 'moderation', label: 'На модерации' },
  { value: 'published', label: 'Опубликовано' },
  { value: 'archived', label: 'В архиве' },
];

type FormState = Record<string, string | number>;

const initialForm: FormState = {
  title: '',
  location: '{}',
  city: '',
  district: '',
  type: 'apartment',
  rooms: '',
  area: '',
  price_min: '',
  price_max: '',
  status: 'for_sale',
  partner_id: '',
  developer_id: '',
  matterport_link: '',
  images: '',
  description: '',
  published_status: 'draft',
  tags: '',
  meta: '{}',
};

export default function DemoRolesPage() {
  const [role, setRole] = useState<AdminRole>('Partner');
  const [form, setForm] = useState<FormState>(initialForm);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitForm(role)) return;
    alert('Демо: форма отправлена (данные не сохраняются).\n' + JSON.stringify(form, null, 2));
  };

  const renderField = (field: ObjectFormField) => {
    const access = getFieldAccess(role, field);
    if (access === 'hidden') return null;

    const label = FIELD_LABELS[field];
    const value = form[field] ?? '';
    const isReadOnly = access === 'readonly' || access === 'fixed';
    const isFixed = access === 'fixed';

    const inputClass =
      'w-full rounded-md border bg-white px-3 py-2 text-sm ' +
      (isReadOnly
        ? 'border-palette-neutral-medium bg-palette-neutral-lightest/50 text-gray-600 cursor-not-allowed'
        : 'border-palette-orange-300 focus:border-palette-orange-500 focus:ring-1 focus:ring-palette-orange-400');

    if (field === 'type') {
      return (
        <div key={field} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {isFixed && <span className="ml-2 text-xs text-amber-600">(фикс.)</span>}
          </label>
          <select
            value={String(value)}
            onChange={(e) => handleChange(field, e.target.value)}
            disabled={isReadOnly}
            className={inputClass}
          >
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field === 'status') {
      return (
        <div key={field} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {isFixed && <span className="ml-2 text-xs text-amber-600">(фикс.)</span>}
          </label>
          <select
            value={String(value)}
            onChange={(e) => handleChange(field, e.target.value)}
            disabled={isReadOnly}
            className={inputClass}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field === 'published_status') {
      return (
        <div key={field} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {isFixed && <span className="ml-2 text-xs text-amber-600">(фикс.)</span>}
          </label>
          <select
            value={String(value)}
            onChange={(e) => handleChange(field, e.target.value)}
            disabled={isReadOnly}
            className={inputClass}
          >
            {PUBLISHED_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field === 'description') {
      return (
        <div key={field} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {isFixed && <span className="ml-2 text-xs text-amber-600">(фикс.)</span>}
          </label>
          <textarea
            value={String(value)}
            onChange={(e) => handleChange(field, e.target.value)}
            readOnly={isReadOnly}
            disabled={isReadOnly}
            rows={3}
            className={inputClass}
          />
        </div>
      );
    }

    if (field === 'partner_id' && isFixed) {
      return (
        <div key={field} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {label} <span className="text-xs text-amber-600">(подставляется свой)</span>
          </label>
          <div className="rounded-md border border-palette-neutral-medium bg-palette-neutral-lightest/50 px-3 py-2 text-sm text-gray-600">
            Текущий партнёр (id подставится при сохранении)
          </div>
        </div>
      );
    }

    if (field === 'developer_id' && isFixed) {
      return (
        <div key={field} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            {label} <span className="text-xs text-amber-600">(подставляется свой)</span>
          </label>
          <div className="rounded-md border border-palette-neutral-medium bg-palette-neutral-lightest/50 px-3 py-2 text-sm text-gray-600">
            Текущий застройщик (id подставится при сохранении)
          </div>
        </div>
      );
    }

    const inputType = field.startsWith('price_') || field === 'rooms' || field === 'area' ? 'number' : 'text';
    return (
      <div key={field} className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {isFixed && <span className="ml-2 text-xs text-amber-600">(фикс.)</span>}
          {access === 'readonly' && <span className="ml-2 text-xs text-gray-500">(только чтение)</span>}
        </label>
        <input
          type={inputType}
          value={String(value)}
          onChange={(e) =>
            handleChange(field, inputType === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)
          }
          readOnly={isReadOnly}
          disabled={isReadOnly}
          className={inputClass}
        />
      </div>
    );
  };

  const fieldsOrder: ObjectFormField[] = [
    'title',
    'city',
    'district',
    'location',
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
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/demo"
            className="rounded-md border border-palette-orange-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-palette-orange-100"
          >
            ← Демо
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">
            Демо: форма объекта по ролям (docs/ADMIN_PLAN)
          </h1>
        </div>

        <div className="flex gap-6">
          {/* Левая панель: выбор роли */}
          <aside className="w-56 shrink-0 rounded-xl border border-palette-orange-300 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-gray-700">Роль</h2>
            <ul className="space-y-1">
              {ALL_ROLES.map((r) => (
                <li key={r}>
                  <button
                    type="button"
                    onClick={() => setRole(r)}
                    className={
                      'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ' +
                      (role === r
                        ? 'bg-palette-orange-500 text-white'
                        : 'bg-palette-neutral-lightest/50 text-gray-700 hover:bg-palette-orange-200')
                    }
                  >
                    {ROLE_LABELS[r]}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              Выберите роль — справа форма покажет, какие поля редактируемые, только чтение или скрыты.
            </p>
          </aside>

          {/* Правая панель: форма */}
          <section className="min-w-0 flex-1 rounded-xl border border-palette-orange-300 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Создание / редактирование объекта ({ROLE_LABELS[role]})
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {fieldsOrder.map((field) => renderField(field))}
              </div>

              <div className="flex gap-3 border-t border-palette-orange-300 pt-4">
                <button
                  type="submit"
                  disabled={!canSubmitForm(role)}
                  className={
                    'rounded-lg px-4 py-2 text-sm font-medium ' +
                    (canSubmitForm(role)
                      ? 'bg-palette-orange-500 text-white hover:bg-palette-orange-600'
                      : 'cursor-not-allowed bg-gray-300 text-gray-500')
                  }
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => setForm(initialForm)}
                  className="rounded-lg border border-palette-orange-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-palette-orange-100"
                >
                  Сбросить
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
