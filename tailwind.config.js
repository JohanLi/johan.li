const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{tsx,ts}'],
  darkMode: false,
  theme: {
    cursor: {
      pointer: 'pointer',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
