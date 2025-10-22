import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/unit/**/*.test.{ts,tsx}', 'tests/unit/**/*.spec.{ts,tsx}'],
    passWithNoTests: true,
    exclude: ['**/tests/e2e/**', '**/playwright/**'],
    coverage: {
      reporter: ['text', 'html'],
      thresholds: {
        functions: 0.8,
        branches: 0.7,
      },
    },
  },
})
