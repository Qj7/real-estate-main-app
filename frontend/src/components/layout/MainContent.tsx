'use client';

export function MainContent({ children }: { children: React.ReactNode }) {
  return <main className="flex-1 pb-20 md:pb-0">{children}</main>;
}
