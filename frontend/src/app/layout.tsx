import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { TelegramProvider } from '@/components/TelegramProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Real Estate App',
  description: 'Real Estate Mini App - Browse properties and virtual tours',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* Telegram WebApp SDK */}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <TelegramProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </TelegramProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
