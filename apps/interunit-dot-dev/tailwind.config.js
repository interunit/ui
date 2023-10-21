import {theme} from './theme.config'

function flatten(ary) {
  return ary.reduce(function (a, b) {
    if (Array.isArray(b)) {
      return a.concat(flatten(b))
    }
    return a.concat(b)
  }, [])
}
const colors = Object.keys(theme.colors).map(color => {
  return Object.keys(theme.colors[color]).map(shade => {
    return [
      `text-${color}-${shade}`,
      `bg-${color}-${shade}`,
      `border-${color}-${shade}`
    ]
  })
})

const fontSize = Object.keys(theme.fontSize).map(size => {
  return `text-${size}`
})

const fontWeight = Object.keys(theme.fontWeight).map(weight => {
  return `font-${weight}`
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [...flatten(colors), ...fontSize, ...fontWeight],
  theme: {
    ...theme,
    extend: {
      boxShadow: {
        button: 'box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1)'
      },
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
