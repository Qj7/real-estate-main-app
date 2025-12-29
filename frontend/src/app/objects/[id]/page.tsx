'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Bed, Square, Heart, ArrowLeft, Phone, Mail } from 'lucide-react';
import { Object } from '@/types';
import { objectsApi, eventsApi } from '@/lib/api';
import { useAppStore } from '@/store/useAppStore';
import { usePlatform } from '@/hooks/useTelegram';
import { MatterportViewer } from '@/components/objects/MatterportViewer';
import { formatPrice, formatDate } from '@/lib/utils';

export default function ObjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const objectId = params.id as string;
  const [object, setObject] = useState<Object | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useAppStore();
  const { isTelegram } = usePlatform();

  useEffect(() => {
    if (objectId) {
      loadObject();
      trackEvent('view_object', objectId);
    }
  }, [objectId]);

  const loadObject = async () => {
    try {
      setLoading(true);
      const response = await objectsApi.getById(objectId);
      setObject(response.data);
    } catch (error) {
      console.error('Failed to load object:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackEvent = async (eventType: string, objId?: string) => {
    try {
      await eventsApi.track({
        event: eventType,
        object_id: objId || objectId,
        source: isTelegram ? 'telegram' : 'web',
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(objectId);
    trackEvent(isFavorite(objectId) ? 'favorite_remove' : 'favorite_add', objectId);
  };

  const handleStartTour = () => {
    trackEvent('start_tour', objectId);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-96 bg-gray-200 rounded-lg" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!object) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Объект не найден</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-primary-600 hover:underline"
          >
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  const images = object.images || [];
  const mainImage = images[activeImageIndex] || 'https://via.placeholder.com/800x600?text=Property+Image';
  const favorite = isFavorite(object.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Назад</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images and Matterport */}
        <div className="space-y-4">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <Image
              src={mainImage}
              alt={object.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <button
              onClick={handleFavoriteToggle}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-colors ${
                favorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              <Heart className={`h-6 w-6 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                    activeImageIndex === index
                      ? 'border-primary-500'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${object.title} - изображение ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {object.matterport_link && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">3D Виртуальный тур</h3>
              <MatterportViewer
                matterportLink={object.matterport_link}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{object.title}</h1>
            {object.city && (
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>
                  {object.city}
                  {object.district && `, ${object.district}`}
                </span>
              </div>
            )}
          </div>

          {(object.price_min || object.price_max) && (
            <div className="text-3xl font-bold text-primary-600">
              {formatPrice(object.price_min, object.price_max)}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {object.rooms && (
              <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                <Bed className="h-6 w-6 text-primary-600" />
                <div>
                  <div className="text-sm text-gray-600">Комнат</div>
                  <div className="text-lg font-semibold">{object.rooms}</div>
                </div>
              </div>
            )}
            {object.area && (
              <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                <Square className="h-6 w-6 text-primary-600" />
                <div>
                  <div className="text-sm text-gray-600">Площадь</div>
                  <div className="text-lg font-semibold">{object.area} м²</div>
                </div>
              </div>
            )}
          </div>

          {object.description && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Описание</h2>
              <p className="text-gray-700 whitespace-pre-line">{object.description}</p>
            </div>
          )}

          {object.tags && object.tags.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Теги</h2>
              <div className="flex flex-wrap gap-2">
                {object.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {object.partner && (
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Партнер</h3>
              <div className="space-y-2">
                <p className="font-medium">{object.partner.name}</p>
                {object.partner.contacts && (
                  <div className="space-y-1 text-sm text-gray-600">
                    {object.partner.contacts.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <a
                          href={`tel:${object.partner.contacts.phone}`}
                          className="hover:text-primary-600"
                          onClick={() => trackEvent('click_contact', objectId)}
                        >
                          {object.partner.contacts.phone}
                        </a>
                      </div>
                    )}
                    {object.partner.contacts.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <a
                          href={`mailto:${object.partner.contacts.email}`}
                          className="hover:text-primary-600"
                          onClick={() => trackEvent('click_contact', objectId)}
                        >
                          {object.partner.contacts.email}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {object.matterport_link && (
            <button
              onClick={handleStartTour}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Начать виртуальный тур
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

