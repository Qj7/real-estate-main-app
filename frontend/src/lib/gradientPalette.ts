/**
 * Gradient palette from reference image (gradients.app style).
 * White base + soft blues, peach/apricot, periwinkle, gold.
 * Use for 19Nineteen-style demo and real estate listings.
 */
export const gradientPalette = {
  white: '#FFFFFF',

  // Sky / teal (top of gradient)
  sky: {
    50: '#E8F6F8',
    100: '#C5E8EC',
    200: '#9DD4DC',
    300: '#8ECFD8',
    400: '#6BC4D0',
  },

  // Peach / apricot (middle)
  peach: {
    50: '#FDF5F0',
    100: '#F4D4C4',
    200: '#E8B896',
    300: '#E09E78',
    400: '#D48962',
  },

  // Periwinkle (bottom of gradient)
  periwinkle: {
    50: '#EDEEF8',
    100: '#C8CCEB',
    200: '#A8B0E0',
    300: '#9BA5D4',
    400: '#7A82C4',
  },

  // Accent orange (icons, CTAs)
  orange: {
    light: '#F0C4A8',
    main: '#E08962',
    dark: '#C97A54',
  },

  // Gold / yellow (accents)
  gold: {
    light: '#F2E09E',
    main: '#E8B048',
    dark: '#D4A03C',
  },

  // Blue (icons, links)
  blue: {
    light: '#A8C5E8',
    main: '#6B8FDE',
    dark: '#5A7FD4',
  },

  // Text on white
  text: {
    primary: '#1F2937',
    secondary: '#4B5563',
    tertiary: '#6B7280',
    link: '#5A7FD4',
  },
} as const;
