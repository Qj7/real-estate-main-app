'use client';

import { useEffect } from 'react';
import { useTelegram } from '@/hooks/useTelegram';

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const { isTelegram, webApp } = useTelegram();

  useEffect(() => {
    if (isTelegram && webApp) {
      // Apply Telegram theme colors
      const root = document.documentElement;
      if (webApp.themeParams.bg_color) {
        root.style.setProperty('--tg-theme-bg-color', webApp.themeParams.bg_color);
      }
      if (webApp.themeParams.text_color) {
        root.style.setProperty('--tg-theme-text-color', webApp.themeParams.text_color);
      }
      if (webApp.themeParams.button_color) {
        root.style.setProperty('--tg-theme-button-color', webApp.themeParams.button_color);
      }
      if (webApp.themeParams.button_text_color) {
        root.style.setProperty('--tg-theme-button-text-color', webApp.themeParams.button_text_color);
      }
    }
  }, [isTelegram, webApp]);

  return <>{children}</>;
}

