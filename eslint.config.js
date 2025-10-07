const js = require('@eslint/js')
const nextPlugin = require('@next/eslint-plugin-next')
const importPlugin = require('eslint-plugin-import')
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y')
const reactPlugin = require('eslint-plugin-react')
const reactHooksPlugin = require('eslint-plugin-react-hooks')
const securityPlugin = require('eslint-plugin-security')
const tailwindPlugin = require('eslint-plugin-tailwindcss')
const unusedImportsPlugin = require('eslint-plugin-unused-imports')
const tseslint = require('typescript-eslint')

module.exports = tseslint.config(
  {
    ignores: ['.next/**', 'out/**', 'coverage/**', 'node_modules/**', 'playwright/.cache/**', '**/*.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      security: securityPlugin,
      tailwindcss: tailwindPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
      tailwindcss: {
        callees: ['cn'],
        config: 'tailwind.config.js',
      },
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['../*'],
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelAttributes: ['label'],
          controlComponents: ['Input'],
          depth: 3,
        },
      ],
      'jsx-a11y/alt-text': [
        'error',
        {
          img: ['Image'],
        },
      ],
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/no-document-import-in-page': 'error',
      '@next/next/no-title-in-document-head': 'error',
      'import/no-default-export': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal'], ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/lib/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/content/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/tests/**',
            '**/*.test.{ts,tsx}',
            '**/*.spec.{ts,tsx}',
            '**/playwright/**',
            'playwright.config.*',
            '**/*.config.{js,ts,cjs,mjs}',
            '**/*.setup.{js,ts}',
            '**/vitest.setup.ts',
          ],
        },
      ],
      'security/detect-object-injection': 'off',
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
     '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      parser: require('espree'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      security: securityPlugin,
      tailwindcss: tailwindPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: true,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/no-document-import-in-page': 'error',
      '@next/next/no-title-in-document-head': 'error',
      'import/no-default-export': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal'], ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    files: ['app/**/{page,layout,loading,error,not-found,route}.ts', 'app/**/{page,layout,loading,error,not-found,route}.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['**/*.config.{js,ts,cjs,mjs}', 'public/sw.js', 'next-sitemap.config.js', 'postcss.config.js', 'next.config.js', 'tailwind.config.js'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
)
