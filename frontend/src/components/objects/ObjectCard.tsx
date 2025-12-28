'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Bed, Square, Heart } from 'lucide-react';
import { Object } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { formatPrice } from '@/lib/utils';

interface ObjectCardProps {
  object: Object;
  onFavoriteToggle?: (objectId: string) => void;
}

export function ObjectCard({ object, onFavoriteToggle }: ObjectCardProps) {
  const { isFavorite, toggleFavorite } = useAppStore();
  const favorite = isFavorite(object.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(object.id);
    onFavoriteToggle?.(object.id);
  };

  const mainImage = object.images?.[0] || 'https://via.placeholder.com/800x600?text=Property+Image';

  return (
    <Link href={`/objects/${object.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={mainImage}
            alt={object.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-colors ${
              favorite
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
          {object.status && (
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary-500 text-white text-xs rounded">
              {object.status === 'for_sale' ? 'Продажа' :
               object.status === 'for_rent' ? 'Аренда' :
               object.status === 'under_construction' ? 'Строительство' : 'Планируется'}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">{object.title}</h3>

          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {object.city && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {object.city}
                  {object.district && `, ${object.district}`}
                </span>
              </div>
            )}

            <div className="flex items-center space-x-4">
              {object.rooms && (
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4" />
                  <span>{object.rooms} комн.</span>
                </div>
              )}
              {object.area && (
                <div className="flex items-center space-x-1">
                  <Square className="h-4 w-4" />
                  <span>{object.area} м²</span>
                </div>
              )}
            </div>

            {(object.price_min || object.price_max) && (
              <div className="font-semibold text-primary-600 text-base">
                {formatPrice(object.price_min, object.price_max)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

