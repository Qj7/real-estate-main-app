'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Heart,
  ArrowLeft,
  Phone,
  Star,
  Check,
} from 'lucide-react';
import { colorPalette } from '@/lib/colorPalette';

/** Locale-independent thousands separator (avoids hydration mismatch). */
function formatPriceNum(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Mock data for 19Nineteen Promenade (from apartments.com)
const MOCK = {
  name: '19Nineteen Promenade',
  fullAddress: '1919 Promenade Cir, Union, KY 41091',
  neighborhood: 'Union',
  rating: 5.0,
  reviewsCount: 2,
  verified: true,
  priceMin: 1395,
  priceMax: 2650,
  beds: '1–3',
  baths: '1–2.5',
  description:
    'Welcome to 19Nineteen Promenade, where we reject ordinary and encourage you to Live Large! Nestled in the vibrant heart of Union, Kentucky, our brand new luxury community offers one, two, and three bedroom apartments and townhomes with quartz countertops, stainless appliances, wood-style flooring, and walk-in closets. Select units include in-unit washer & dryers and attached garages.',
  phone: '(859) 710-6886',
  website: 'https://www.19nineteenpromenade.com',
  hours: 'Mon–Fri 10am–6pm · Sat 10am–5pm',
  media: {
    photos: [
      'https://images1.apartments.com/i2/05WJYEYt7la5fpgq8Mna_gQiLNByo3PvOi3GT0ZZMF0/111/19nineteen-promenade-union-ky-primary-photo.jpg',
      'https://images1.apartments.com/i2/UHgS0yj7BzOhNCUDXZH7nnIwiyyT0N8iETrlzlQVgCg/117/19nineteen-promenade-union-ky-club-room.jpg',
      'https://images1.apartments.com/i2/UsdD-KPHNJlC4zIXO8dG62Mah18eZtNf_cLkJY5RJdY/117/19nineteen-promenade-union-ky-building-photo.jpg',
    ],
    photosCount: 15,
    toursCount: 6,
    videoCount: 1,
  },
  floorPlans: [
    { name: '1P2F', beds: 1, baths: 1, sqft: 1011, price: 1640, available: 2 },
    { name: '1P1F', beds: 1, baths: 1, sqft: 1011, price: 1655, available: 1 },
    { name: '2P0F', beds: 2, baths: 2, sqft: 1309, price: 2025, available: 2 },
    { name: '2P2', beds: 2, baths: 2, sqft: 1309, price: 2025, available: 6 },
    { name: '2S2', beds: 2, baths: 2, sqft: 1381, price: 2050, available: 4 },
  ].filter((p) => p.available > 0),
  amenities: ['Pool', 'Fitness', 'Clubhouse', 'Pickleball', 'EV Charging', 'Dog Park', 'Gated', 'WiFi'],
  fees: { admin: 250, application: 75, petFee: '250–500', garage: '175–275' },
};

const P = colorPalette;

export default function Demo19NineteenPage() {
  const [activeTab, setActiveTab] = useState<'photos' | 'tours' | 'video'>('photos');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const tabs = [
    { id: 'photos' as const, label: 'Photos', count: MOCK.media.photosCount },
    { id: 'tours' as const, label: 'Tours', count: MOCK.media.toursCount },
    { id: 'video' as const, label: 'Video', count: MOCK.media.videoCount },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)]">
      {/* Bar: back, share, favorite */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-primary)]">
        <Link
          href="/objects"
          className="flex items-center gap-2 text-[var(--color-text-secondary)] font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Назад
        </Link>
        <div className="flex items-center gap-2">
          <button type="button" className="p-2 rounded-full bg-[var(--color-bg-primary)] text-[var(--color-info)] text-sm font-medium" aria-label="Поделиться">
            Share
          </button>
          <button
            type="button"
            onClick={() => setFavorite(!favorite)}
            className="p-2 rounded-full transition-colors"
            style={{
              backgroundColor: favorite ? P.primary.orange : 'var(--color-bg-primary)',
              color: favorite ? '#fff' : P.primary.orange,
            }}
            aria-label="В избранное"
          >
            <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative w-full aspect-[4/3] max-h-[280px] bg-[var(--color-border-primary)]">
        <Image
          src={MOCK.media.photos[activeImageIndex]}
          alt={MOCK.name}
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        {MOCK.media.photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActiveImageIndex((i) => (i - 1 + MOCK.media.photos.length) % MOCK.media.photos.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow"
            >
              <ArrowLeft className="h-4 w-4 text-[var(--color-text-primary)]" />
            </button>
            <button
              type="button"
              onClick={() => setActiveImageIndex((i) => (i + 1) % MOCK.media.photos.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow rotate-180"
            >
              <ArrowLeft className="h-4 w-4 text-[var(--color-text-primary)]" />
            </button>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-primary)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2.5 text-sm font-medium border-b-2 transition-colors"
            style={{
              borderColor: activeTab === tab.id ? P.primary.orange : 'transparent',
              color: activeTab === tab.id ? P.primary.orange : 'var(--color-text-tertiary)',
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* Address + meta */}
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
            {MOCK.fullAddress}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-[var(--color-text-secondary)]">
            <span className="font-medium" style={{ color: P.primary.teal }}>{MOCK.neighborhood}</span>
            <span className="flex items-center gap-0.5">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {MOCK.rating} ({MOCK.reviewsCount})
            </span>
            {MOCK.verified && (
              <span className="flex items-center gap-0.5">
                <Check className="h-3.5 w-3.5" style={{ color: P.primary.teal }} />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Price + Beds/Baths */}
        <div className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-card)]">
          <div className="text-xl font-bold text-[var(--color-text-accent)]">
            {formatPriceNum(MOCK.priceMin)} – {formatPriceNum(MOCK.priceMax)}
            <span className="text-sm font-normal text-[var(--color-text-secondary)]"> /mo</span>
          </div>
          <div className="flex gap-4 mt-1 text-sm text-[var(--color-text-secondary)]">
            <span>Beds {MOCK.beds}</span>
            <span>Baths {MOCK.baths}</span>
          </div>
          <a href="#fees" className="text-xs mt-1 inline-block" style={{ color: P.primary.teal }}>
            Fees and policies
          </a>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-3 gap-2">
          <a
            href={`tel:${MOCK.phone.replace(/\D/g, '')}`}
            className="py-3 px-3 rounded-xl font-semibold text-center text-white bg-[var(--color-bg-accent)] hover:opacity-90 transition-opacity"
          >
            Tour
          </a>
          <button
            type="button"
            className="py-3 px-3 rounded-xl font-semibold text-center border-2 border-[var(--color-border-accent)] transition-colors"
            style={{ color: P.primary.orange }}
          >
            Message
          </button>
          <a
            href={`tel:${MOCK.phone.replace(/\D/g, '')}`}
            className="py-3 px-3 rounded-xl font-semibold text-center border-2 border-[var(--color-border-accent)] flex items-center justify-center gap-1.5 transition-colors"
            style={{ color: P.primary.orange }}
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        </div>

        {/* About */}
        <section>
          <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
            About
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {MOCK.description}
          </p>
        </section>

        {/* Floor plans */}
        <section>
          <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
            Floor plans
          </h2>
          <div className="space-y-1.5">
            {MOCK.floorPlans.slice(0, 4).map((plan) => (
              <div
                key={plan.name}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)]"
              >
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {plan.name} · {plan.beds} bed, {plan.baths} bath · {plan.sqft} sq ft
                </span>
                <span className="text-sm font-semibold shrink-0 ml-2" style={{ color: P.primary.orange }}>
                  ${plan.price}/mo
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Amenities — one compact block */}
        <section>
          <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
            Amenities
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {MOCK.amenities.map((a) => (
              <span
                key={a}
                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ backgroundColor: P.teal[400], color: 'var(--color-text-primary)' }}
              >
                {a}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-card)]">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
            Contact
          </h2>
          <a
            href={`tel:${MOCK.phone.replace(/\D/g, '')}`}
            className="text-base font-semibold block mb-0.5"
            style={{ color: P.primary.teal }}
          >
            {MOCK.phone}
          </a>
          <a
            href={MOCK.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
            style={{ color: P.primary.teal }}
          >
            Property website
          </a>
          <p className="text-xs text-[var(--color-text-secondary)] mt-2">{MOCK.hours}</p>
        </section>

        {/* Fees */}
        <section id="fees" className="pb-6">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-1.5">
            Fees
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Admin ${MOCK.fees.admin} · Application ${MOCK.fees.application} · Pet ${MOCK.fees.petFee} · Garage ${MOCK.fees.garage}/mo
          </p>
        </section>
      </div>
    </div>
  );
}
