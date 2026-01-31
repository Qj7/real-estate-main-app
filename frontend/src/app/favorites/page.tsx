'use client';

import { useEffect, useState } from 'react';
import { ObjectCard } from '@/components/objects/ObjectCard';
import { Object } from '@/types';
import { objectsApi } from '@/lib/api';
import { useAppStore } from '@/store/useAppStore';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, getCachedObjects, setObjectsCache } = useAppStore();
  const [objects, setObjects] = useState<Object[]>(() => {
    if (favorites.length === 0) return [];
    const cached = getCachedObjects();
    return cached ? cached.filter((obj) => favorites.includes(obj.id)) : [];
  });
  const [loading, setLoading] = useState(favorites.length > 0 && !getCachedObjects());

  useEffect(() => {
    loadFavorites();
  }, [favorites]);

  const loadFavorites = async () => {
    if (favorites.length === 0) {
      setObjects([]);
      setLoading(false);
      return;
    }

    const cached = getCachedObjects();
    if (cached?.length) {
      const favoriteObjects = cached.filter((obj) => favorites.includes(obj.id));
      setObjects(favoriteObjects);
      setLoading(false);
    }

    try {
      if (!cached?.length) setLoading(true);
      const response = await objectsApi.getAll();
      const allObjects = response.data || [];
      setObjectsCache(allObjects);
      const favoriteObjects = allObjects.filter((obj: Object) => favorites.includes(obj.id));
      setObjects(favoriteObjects);
    } catch {
      if (!getCachedObjects()?.length) setObjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
          <span>Избранное</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {objects.length > 0
            ? `У вас ${objects.length} ${objects.length === 1 ? 'объект' : 'объектов'} в избранном`
            : 'Добавьте объекты в избранное, чтобы вернуться к ним позже'}
        </p>
      </div>

      {objects.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Нет избранных объектов</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Перейдите в каталог и добавьте объекты в избранное
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objects.map((object) => (
            <ObjectCard key={object.id} object={object} />
          ))}
        </div>
      )}
    </div>
  );
}

