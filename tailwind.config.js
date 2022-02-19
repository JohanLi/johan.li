const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{tsx,ts}',
  ],
  theme: {
    cursor: {
      pointer: 'pointer',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out',
    },
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
  },
}
