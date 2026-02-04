'use client';

import { useEffect } from 'react';
import './globals.css'
import { TelegramProvider } from '@/components/TelegramProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { MainContent } from '@/components/layout/MainContent'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Set document title and meta tags
    document.title = 'Real Estate App';

    // Set viewport meta tag
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');

    // Set description meta tag
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', 'Real Estate Mini App - Browse properties and virtual tours');
  }, []);

  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        {/* Telegram WebApp SDK — expand на весь экран сразу после загрузки */}
        <script src="https://telegram.org/js/telegram-web-app.js" async />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  function init() {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      return;
    }
    setTimeout(init, 10);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
            `.trim(),
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900" suppressHydrationWarning>
        <ThemeProvider>
          <TelegramProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <MainContent>{children}</MainContent>
              <BottomNav />
            </div>
          </TelegramProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
