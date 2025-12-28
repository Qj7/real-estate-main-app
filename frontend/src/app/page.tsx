'use client';

import { useEffect, useState } from 'react';
import { ObjectCard } from '@/components/objects/ObjectCard';
import { Object } from '@/types';
import { objectsApi, eventsApi } from '@/lib/api';
import { usePlatform } from '@/hooks/useTelegram';

export default function Home() {
  const [objects, setObjects] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);
  const { isTelegram } = usePlatform();

  useEffect(() => {
    loadObjects();
    trackEvent('open_app');
  }, []);

  const loadObjects = async () => {
    try {
      setLoading(true);
      const response = await objectsApi.getAll({ limit: 12 });
      // Response format: { data: Object[], total, page, limit, totalPages }
      setObjects(response.data || []);
    } catch (error) {
      console.error('Failed to load objects:', error);
      // Show empty state if API is not available
      setObjects([]);
    } finally {
      setLoading(false);
    }
  };

  const trackEvent = async (eventType: string, objectId?: string) => {
    try {
      await eventsApi.track({
        event: eventType,
        object_id: objectId,
        source: isTelegram ? 'telegram' : 'web',
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
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
      ) : objects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">Объекты не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objects.map((object) => (
            <ObjectCard
              key={object.id}
              object={object}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
