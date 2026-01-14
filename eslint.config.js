import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintImport from 'eslint-plugin-import'
import eslintPrettier from 'eslint-plugin-prettier'
import eslintTurbo from 'eslint-plugin-turbo'
import reactRefresh from 'eslint-plugin-react-refresh'
import onlyWarn from "eslint-plugin-only-warn";
import tseslint, { parser } from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      reactHooks,
      reactRefresh,
      eslintImport,
      eslintPrettier,
      eslintTurbo,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      sourceType: 'module',
      parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

  },
])
