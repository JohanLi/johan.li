// https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files

import path from 'path'

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

const config = {
  '*.{ts,tsx}': [buildEslintCommand],
}

export default config
