'use client';

import Link from 'next/link';

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">Демо-страницы</h1>
        <ul className="space-y-3">
          <li>
            <Link
              href="/demo/roles"
              className="block rounded-lg border border-palette-orange-300 bg-white p-4 shadow-sm hover:bg-palette-orange-100"
            >
              <span className="font-medium text-gray-800">Роли и форма объекта</span>
              <p className="mt-1 text-sm text-gray-500">
                Переключение ролей и форма создания/редактирования недвижимости по правам доступа (ADMIN_PLAN).
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/demo/19nineteen"
              className="block rounded-lg border border-palette-orange-300 bg-white p-4 shadow-sm hover:bg-palette-orange-100"
            >
              <span className="font-medium text-gray-800">19Nineteen</span>
              <p className="mt-1 text-sm text-gray-500">Демо карточки объекта недвижимости.</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
