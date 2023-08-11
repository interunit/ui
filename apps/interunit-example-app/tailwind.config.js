// tailwind.config.js

module.exports = {
  content: ['**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'text-light': '#FFFFFF',
      'text-dark': '#16161F',
      'text-light-accent': '#B4B4C2',
      'bg-primary': '#1D1D27',
      'bg-secondary': '#5E47C4',
      'bg-tertiary': '#292B62',
      'bg-blended': '#16161F',
      'bg-blended-accent': '#0e0e14',
      'bg-muted': '#4A4A57',
      blue: '#2479BD',
      pink: '#BC2FA4',
      green: '#2B826C',
      orange: '#CC4B2E',
      transparent: 'transparent',
      border: '#363645',
      'border-accent': '#21212E',
      outline: '#FFAE71'
    },
    screens: {
      sm: '600px',
      md: '768x',
      lg: '1024px',
      xl: '1280px',
      xxl: '1920px'
    },
    fontSize: {
      xs: ['0.65rem', '1rem'],
      sm: ['0.85rem', '1.25rem'],
      md: ['1rem', '1.75rem'],
      lg: ['1.15rem', '2rem'],
      'sm-hd': ['1.5rem', '2rem'],
      'md-hd': ['2rem', '3rem'],
      'lg-hd': ['4rem', '4.5rem']
    },
    // boxShadow: {
    //   button: 'box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1)'
    // },
    extend: {
      borderRadius: {
        DEFAULT: '8px'
      },
      borderColor: {
        DEFAULT: '#363645'
      }
    }
  },
  plugins: []
}
