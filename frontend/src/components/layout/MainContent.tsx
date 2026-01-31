'use client';

import { usePlatform } from '@/hooks/useTelegram';

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isTelegram } = usePlatform();
  return (
    <main className={`flex-1 ${isTelegram ? 'pb-20' : 'pb-20 md:pb-0'}`}>
      {children}
    </main>
  );
}
