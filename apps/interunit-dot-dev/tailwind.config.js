import {theme} from './theme.config'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    ...theme,
    fontSize: {
      xs: ['0.65rem', '1rem'],
      sm: ['0.85rem', '1.25rem'],
      md: ['1rem', '1.75rem'],
      lg: ['1.15rem', '2rem'],
      'sm-hd': ['1.5rem', '2rem'],
      'md-hd': ['2rem', '3rem'],
      'lg-hd': ['4rem', '4.5rem']
    },
    boxShadow: {
      button: 'box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1)'
    },
    extend: {
      borderRadius: {
        DEFAULT: '0.5rem'
      },
      borderColor: {
        DEFAULT: theme.colors['border']
      }
    }
  },
  plugins: []
}
