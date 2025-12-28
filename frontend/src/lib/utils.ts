import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(min?: number, max?: number): string {
  if (!min && !max) return 'Цена не указана';

  const format = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (min && max) {
    if (min === max) {
      return format(min);
    }
    return `${format(min)} - ${format(max)}`;
  }

  if (min) return `от ${format(min)}`;
  if (max) return `до ${format(max)}`;

  return 'Цена не указана';
}

export function formatDate(dateString?: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

