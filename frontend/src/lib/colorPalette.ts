/**
 * Color Palette for Real Estate App
 * 
 * This palette consists of warm earth tones (peaches, oranges, light yellows, beiges)
 * and cool, muted tones (teals, mints, sage greens).
 * 
 * Usage:
 * - Import colors: import { palette } from '@/lib/colorPalette'
 * - Use in components: className="bg-[${palette.primary.orange}]"
 * - Or use Tailwind classes: bg-palette-orange, text-palette-teal, etc.
 */

export const colorPalette = {
  // Primary Colors
  primary: {
    orange: '#E9AD74',
    beige: '#EAD8A7',
    teal: '#A7DAD3',
  },

  // Orange/Peach/Yellow Tones
  orange: {
    100: '#EAD8A7', // Lightest beige (shared with beige)
    200: '#EACF9D', // Very light creamy beige
    300: '#EAC793', // Pale desaturated peach
    400: '#E9BE88', // Light peach with yellow undertone
    500: '#E9B67E', // Light yellow-toned peach
    600: '#E9AD74', // Medium warm orange/peach (primary)
  },

  // Blue-Green/Teal Tones
  teal: {
    100: '#EAD8A7', // Lightest beige (shared)
    200: '#DDD8B0', // Pale warm beige/khaki
    300: '#CFD9B9', // Very pale yellowish-green
    400: '#C2D9C1', // Pale desaturated sage green
    500: '#B4DACA', // Light mint green/seafoam
    600: '#A7DAD3', // Light soft teal/blue-green (primary)
  },

  // Semantic Color Names
  warm: {
    light: '#EAD8A7',
    medium: '#E9AD74',
    dark: '#E9B67E',
  },

  cool: {
    light: '#A7DAD3',
    medium: '#B4DACA',
    dark: '#C2D9C1',
  },

  // Neutral/Beige
  neutral: {
    lightest: '#EAD8A7',
    light: '#EACF9D',
    medium: '#EAC793',
  },
} as const;

/**
 * All unique hex color codes from the palette
 */
export const allColors = [
  '#E9AD74', // Primary orange
  '#EAD8A7', // Primary beige
  '#A7DAD3', // Primary teal
  '#E9B67E', // Orange 500
  '#E9BE88', // Orange 400
  '#EAC793', // Orange 300
  '#EACF9D', // Orange 200
  '#B4DACA', // Teal 500
  '#C2D9C1', // Teal 400
  '#CFD9B9', // Teal 300
  '#DDD8B0', // Teal 200
] as const;

/**
 * Color palette organized by category for easy reference
 */
export const paletteByCategory = {
  main: ['#E9AD74', '#EAD8A7', '#A7DAD3'],
  orangeFamily: ['#E9AD74', '#E9B67E', '#E9BE88', '#EAC793', '#EACF9D', '#EAD8A7'],
  tealFamily: ['#A7DAD3', '#B4DACA', '#C2D9C1', '#CFD9B9', '#DDD8B0', '#EAD8A7'],
} as const;

/**
 * Type exports for TypeScript support
 */
export type ColorPalette = typeof colorPalette;
export type AllColors = typeof allColors[number];
