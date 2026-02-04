'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Building2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/objects', label: 'Объекты', icon: Building2 },
  { href: '/favorites', label: 'Избранное', icon: Heart, badgeKey: 'favorites' as const },
];

export function BottomNav() {
  const pathname = usePathname();
  const favorites = useAppStore((state) => state.favorites);

  const getBadge = (key: 'favorites') => {
    if (key === 'favorites') return favorites.length > 0 ? favorites.length : undefined;
    return undefined;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden
        bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div className="flex items-stretch justify-around w-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const badge = item.badgeKey ? getBadge(item.badgeKey) : undefined;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`
                flex flex-col items-center justify-center gap-1 flex-1 py-3 px-2 min-w-0
                transition-colors
                ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}
              `}
            >
              <div className="relative flex items-center justify-center">
                <Icon className="h-6 w-6 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                {badge !== undefined && badge > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 text-[10px] font-medium
                      bg-primary-500 text-white rounded-full flex items-center justify-center"
                  >
                    {badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium truncate w-full text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
