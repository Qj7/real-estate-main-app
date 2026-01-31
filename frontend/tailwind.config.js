/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Real Estate App Color Palette
        palette: {
          // Primary colors
          orange: '#E9AD74',
          beige: '#EAD8A7',
          teal: '#A7DAD3',
          // Orange/Peach tones
          'orange-100': '#EAD8A7',
          'orange-200': '#EACF9D',
          'orange-300': '#EAC793',
          'orange-400': '#E9BE88',
          'orange-500': '#E9B67E',
          'orange-600': '#E9AD74',
          // Teal/Blue-green tones
          'teal-100': '#EAD8A7',
          'teal-200': '#DDD8B0',
          'teal-300': '#CFD9B9',
          'teal-400': '#C2D9C1',
          'teal-500': '#B4DACA',
          'teal-600': '#A7DAD3',
          // Semantic warm colors
          'warm-light': '#EAD8A7',
          'warm-medium': '#E9AD74',
          'warm-dark': '#E9B67E',
          // Semantic cool colors
          'cool-light': '#A7DAD3',
          'cool-medium': '#B4DACA',
          'cool-dark': '#C2D9C1',
          // Neutral/Beige
          'neutral-lightest': '#EAD8A7',
          'neutral-light': '#EACF9D',
          'neutral-medium': '#EAC793',
        },
        // Theme colors using CSS variables (for light theme with palette)
        theme: {
          bg: {
            primary: 'var(--color-bg-primary)',
            secondary: 'var(--color-bg-secondary)',
            tertiary: 'var(--color-bg-tertiary)',
            accent: 'var(--color-bg-accent)',
            card: 'var(--color-bg-card)',
            'card-hover': 'var(--color-bg-card-hover)',
          },
          text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            tertiary: 'var(--color-text-tertiary)',
            accent: 'var(--color-text-accent)',
            inverse: 'var(--color-text-inverse)',
            'on-beige': 'var(--color-text-on-beige)',
          },
          border: {
            primary: 'var(--color-border-primary)',
            secondary: 'var(--color-border-secondary)',
            accent: 'var(--color-border-accent)',
            card: 'var(--color-border-card)',
          },
          interactive: {
            hover: 'var(--color-hover)',
            'hover-light': 'var(--color-hover-light)',
            active: 'var(--color-active)',
            focus: 'var(--color-focus)',
          },
          status: {
            success: 'var(--color-success)',
            warning: 'var(--color-warning)',
            error: 'var(--color-error)',
            info: 'var(--color-info)',
          },
        },
      },
    },
  },
  plugins: [],
}

