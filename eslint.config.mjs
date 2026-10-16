import js from '@eslint/js'
import prettier from 'eslint-config-prettier/flat'
import astro from 'eslint-plugin-astro'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores([
    'dist/',
    '.astro/',
    '.cache/',
    '.wrangler/',
    'tests/report/',
    'tests/results/',
    'worker/worker-configuration.d.ts',
  ]),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  // also applies to Preact's hooks, which follow the same rules
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
  },
  prettier,
])
