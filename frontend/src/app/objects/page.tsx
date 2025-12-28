'use client';

import { useEffect, useState } from 'react';
import { ObjectCard } from '@/components/objects/ObjectCard';
import { Object } from '@/types';
import { objectsApi, eventsApi } from '@/lib/api';
import { usePlatform } from '@/hooks/useTelegram';
import { Search, Filter } from 'lucide-react';

export default function ObjectsPage() {
  const [objects, setObjects] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    status: '',
  });
  const { isTelegram } = usePlatform();

  useEffect(() => {
    loadObjects();
  }, [filters, search]);

  const loadObjects = async () => {
    try {
      setLoading(true);
      const response = await objectsApi.getAll({
        search: search || undefined,
        city: filters.city || undefined,
        type: filters.type || undefined,
        status: filters.status || undefined,
      });
      // Response format: { data: Object[], total, page, limit, totalPages }
      setObjects(response.data || []);
    } catch (error) {
      console.error('Failed to load objects:', error);
      setObjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (objectId: string) => {
    eventsApi.track({
      event: 'favorite_add',
      object_id: objectId,
      source: isTelegram ? 'telegram' : 'web',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Все объекты
        </h1>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Все города</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Все типы</option>
              <option value="apartment">Квартира</option>
              <option value="studio">Студия</option>
              <option value="villa">Вилла</option>
              <option value="developer_tour">Тур застройщика</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Все статусы</option>
              <option value="for_sale">Продажа</option>
              <option value="for_rent">Аренда</option>
              <option value="under_construction">Строительство</option>
              <option value="planned">Планируется</option>
            </select>
          </div>
        </div>
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

