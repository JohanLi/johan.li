/** @type {import("prettier").Config} */

const config = {
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
}

export default config
