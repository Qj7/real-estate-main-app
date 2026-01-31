'use client';

import { useEffect, useState } from 'react';
import { ObjectCard } from '@/components/objects/ObjectCard';
import { Object } from '@/types';
import { objectsApi, eventsApi } from '@/lib/api';
import { usePlatform } from '@/hooks/useTelegram';
import { useAppStore } from '@/store/useAppStore';

/** Демо-объект 19Nineteen Promenade — ведёт на страницу с моковыми данными */
const DEMO_19NINETEEN: Object = {
  id: 'demo-19nineteen',
  title: '19Nineteen Promenade',
  city: 'Union',
  district: 'KY 41091',
  type: 'apartment',
  rooms: 3,
  area: 1471,
  price_min: 1395,
  price_max: 2650,
  status: 'for_rent',
  published_status: 'published',
  images: [
    'https://images1.apartments.com/i2/05WJYEYt7la5fpgq8Mna_gQiLNByo3PvOi3GT0ZZMF0/111/19nineteen-promenade-union-ky-primary-photo.jpg',
  ],
  description: 'Luxury apartments and townhomes in Union, Kentucky. Quartz countertops, stainless appliances, pool, fitness, pickleball.',
};

export default function Home() {
  const { getCachedObjects, setObjectsCache } = useAppStore();
  const [objects, setObjects] = useState<Object[]>(() => getCachedObjects() ?? []);
  const [loading, setLoading] = useState(!getCachedObjects());
  const { isTelegram } = usePlatform();

  useEffect(() => {
    trackEvent('open_app');
    loadObjects();
  }, []);

  const loadObjects = async () => {
    const cached = getCachedObjects();
    if (cached?.length) {
      setObjects(cached);
      setLoading(false);
    }
    try {
      if (!cached?.length) setLoading(true);
      const response = await objectsApi.getAll({ limit: 12 });
      const data = response.data || [];
      setObjectsCache(data, response.total);
      setObjects(data);
    } catch {
      if (!cached?.length) setObjects([]);
    } finally {
      setLoading(false);
    }
  };

  /** Демо-объект первым, остальные из API (без дубликата по id) */
  const displayObjects = [
    DEMO_19NINETEEN,
    ...(objects.filter((o) => o.id !== DEMO_19NINETEEN.id)),
  ];

  const trackEvent = (eventType: string, objectId?: string) => {
    eventsApi.track({
      event: eventType,
      object_id: objectId,
      source: isTelegram ? 'telegram' : 'web',
    });
  };

  const handleFavoriteToggle = (objectId: string) => {
    trackEvent('favorite_add', objectId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Недвижимость
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Найдите свой идеальный дом с виртуальными турами
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-80 animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : displayObjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Объекты не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayObjects.map((object) => (
            <ObjectCard
              key={object.id}
              object={object}
              onFavoriteToggle={handleFavoriteToggle}
              detailHref={object.id === DEMO_19NINETEEN.id ? '/demo/19nineteen/' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
