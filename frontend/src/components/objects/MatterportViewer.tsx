'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface MatterportViewerProps {
  matterportLink: string;
  className?: string;
}

export function MatterportViewer({ matterportLink, className = '' }: MatterportViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matterportLink) {
      setError('Matterport ссылка не предоставлена');
      setLoading(false);
      return;
    }

    // Extract Matterport space ID from URL
    // Supports formats like:
    // - https://my.matterport.com/show/?m=SPACE_ID
    // - https://my.matterport.com/models/SPACE_ID
    // - SPACE_ID directly
    let spaceId = matterportLink;

    if (matterportLink.includes('matterport.com')) {
      const match = matterportLink.match(/[?&]m=([^&]+)/) || matterportLink.match(/models\/([^/?]+)/);
      if (match) {
        spaceId = match[1];
      }
    }

    if (!spaceId) {
      setError('Неверный формат Matterport ссылки');
      setLoading(false);
      return;
    }

    // Matterport iframe URL format
    const iframeUrl = `https://my.matterport.com/show/?m=${spaceId}&play=1&qs=1&hr=0&brand=0`;

    if (iframeRef.current) {
      iframeRef.current.src = iframeUrl;
    }

    const handleLoad = () => {
      setLoading(false);
    };

    const handleError = () => {
      setError('Не удалось загрузить Matterport тур');
      setLoading(false);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      }
    };
  }, [matterportLink]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`} style={{ minHeight: '400px' }}>
        <div className="text-center p-8">
          <p className="text-red-600 mb-2">{error}</p>
          <p className="text-sm text-gray-500">Проверьте ссылку на Matterport тур</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`} style={{ minHeight: '400px' }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Загрузка 3D тура...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        style={{ minHeight: '400px' }}
        allow="fullscreen; xr-spatial-tracking"
        allowFullScreen
        title="Matterport 3D Tour"
      />
    </div>
  );
}

