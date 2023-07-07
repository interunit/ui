export const theme = {
  colors: {
    'text-light': '#FFFFFF',
    'text-dark': '#16161F',
    'text-light-accent': '#B4B4C2',
    'bg-primary': '#1D1D27',
    'bg-secondary': '#5E47C4',
    'bg-tertiary': '#292B62',
    'bg-blended': '#16161F',
    'bg-muted': '#4A4A57',
    blue: '#2479BD',
    pink: '#BC2FA4',
    green: '#2B826C',
    orange: '#CC4B2E',
    transparent: 'transparent',
    border: '#363645',
    outline: '#FFAE71'
  },
  screens: {
    sm: '600px',
    md: '768x',
    lg: '1024px',
    xl: '1280px',
    xxl: '1920px'
  }
} as const

export type ThemeColor = keyof typeof theme.colors

export const getColorValue = (color: ThemeColor) => {
  if (theme.colors[color]) {
    return theme.colors[color]
  }

  return 'white'
}
