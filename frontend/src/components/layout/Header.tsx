'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Building2 } from 'lucide-react';
import { usePlatform } from '@/hooks/useTelegram';
import { useAppStore } from '@/store/useAppStore';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const pathname = usePathname();
  const { isTelegram } = usePlatform();
  const favorites = useAppStore((state) => state.favorites);

  const navItems = [
    { href: '/', label: 'Главная', icon: Home },
    { href: '/objects', label: 'Объекты', icon: Building2 },
    { href: '/favorites', label: 'Избранное', icon: Heart, badge: favorites.length > 0 ? favorites.length : undefined },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${isTelegram ? 'shadow-sm' : 'shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Real Estate</span>
          </Link>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {!isTelegram && (
              <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              </nav>
            )}
          </div>
        </div>

        {/* Mobile navigation for Telegram */}
        {isTelegram && (
          <nav className="flex items-center justify-around border-t border-gray-200 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-primary-500 text-white rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}

