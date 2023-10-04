export const theme = {
  colors: {
    transparent: 'transparent',
    gray: {
      '50': 'var(--gray-50)',
      '100': 'var(--gray-100)',
      '200': 'var(--gray-200)',
      '300': 'var(--gray-300)',
      '400': 'var(--gray-400)',
      '500': 'var(--gray-500)',
      '600': 'var(--gray-600)',
      '700': 'var(--gray-700)',
      '800': 'var(--gray-800)',
      '900': 'var(--gray-900)',
      '1000': 'var(--gray-1000)',
      '1100': 'var(--gray-1100)'
    },
    green: {
      '50': 'var(--green-50)',
      '100': 'var(--green-100)',
      '200': 'var(--green-200)',
      '300': 'var(--green-300)',
      '400': 'var(--green-400)',
      '500': 'var(--green-500)',
      '600': 'var(--green-600)',
      '700': 'var(--green-700)',
      '800': 'var(--green-800)',
      '900': 'var(--green-900)',
      '1000': 'var(--green-1000)',
      '1100': 'var(--green-1100)'
    },
    orange: {
      '50': 'var(--orange-50)',
      '100': 'var(--orange-100)',
      '200': 'var(--orange-200)',
      '300': 'var(--orange-300)',
      '400': 'var(--orange-400)',
      '500': 'var(--orange-500)',
      '600': 'var(--orange-600)',
      '700': 'var(--orange-700)',
      '800': 'var(--orange-800)',
      '900': 'var(--orange-900)',
      '1000': 'var(--orange-1000)',
      '1100': 'var(--orange-1100)'
    },
    teal: {
      '50': 'var(--teal-50)',
      '100': 'var(--teal-100)',
      '200': 'var(--teal-200)',
      '300': 'var(--teal-300)',
      '400': 'var(--teal-400)',
      '500': 'var(--teal-500)',
      '600': 'var(--teal-600)',
      '700': 'var(--teal-700)',
      '800': 'var(--teal-800)',
      '900': 'var(--teal-900)',
      '1000': 'var(--teal-1000)',
      '1100': 'var(--teal-1100)'
    },
    pink: {
      '50': 'var(--pink-50)',
      '100': 'var(--pink-100)',
      '200': 'var(--pink-200)',
      '300': 'var(--pink-300)',
      '400': 'var(--pink-400)',
      '500': 'var(--pink-500)',
      '600': 'var(--pink-600)',
      '700': 'var(--pink-700)',
      '800': 'var(--pink-800)',
      '900': 'var(--pink-900)',
      '1000': 'var(--pink-1000)',
      '1100': 'var(--pink-1100)'
    },
    blue: {
      '50': 'var(--blue-50)',
      '100': 'var(--blue-100)',
      '200': 'var(--blue-200)',
      '300': 'var(--blue-300)',
      '400': 'var(--blue-400)',
      '500': 'var(--blue-500)',
      '600': 'var(--blue-600)',
      '700': 'var(--blue-700)',
      '800': 'var(--blue-800)',
      '900': 'var(--blue-900)',
      '1000': 'var(--blue-1000)',
      '1100': 'var(--blue-1100)'
    },
    slate: {
      '50': 'var(--slate-50)',
      '100': 'var(--slate-100)',
      '200': 'var(--slate-200)',
      '300': 'var(--slate-300)',
      '400': 'var(--slate-400)',
      '500': 'var(--slate-500)',
      '600': 'var(--slate-600)',
      '700': 'var(--slate-700)',
      '800': 'var(--slate-800)',
      '900': 'var(--slate-900)',
      '1000': 'var(--slate-1000)',
      '1100': 'var(--slate-1100)'
    }
  },
  screens: {
    sm: '600px',
    md: '768x',
    lg: '1024px',
    xl: '1280px',
    xxl: '1920px'
  },
  fontSize: {
    'text-1': ['0.65rem', '1rem'],
    'text-2': ['0.85rem', '1.25rem'],
    'text-3': ['1rem', '1.75rem'],
    'text-4': ['1.15rem', '2rem'],
    'text-6': ['2rem', '2.25rem'],
    'heading-1': ['1.5rem', '2rem'],
    'heading-2': ['2rem', '3rem'],
    'heading-3': ['4rem', '4.5rem']
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700
  }
} as const

export type ThemeColor = keyof typeof theme.colors

export const getColorValue = (color: ThemeColor) => {
  if (theme.colors[color]) {
    return theme.colors[color]
  }

  return 'white'
}
