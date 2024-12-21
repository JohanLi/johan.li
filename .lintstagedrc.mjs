// https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files

import path from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

const config = {
  '*.{ts,tsx}': [buildEslintCommand],
}

export default config
