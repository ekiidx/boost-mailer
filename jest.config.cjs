// jest.config.js
const nextJest = require('next/jest');

// Tell next/jest where your Next.js app is located
const createJestConfig = nextJest({
  dir: './',
});

// Custom Jest configuration
const customJestConfig = {
  // Setup file to include jest-dom matchers, etc.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Handle module aliases (adjust to your paths)
  moduleNameMapper: {
    // Example: map '@/components/Button' -> '<rootDir>/components/Button'
    '^@/components/(.*)$': '<rootDir>/components/$1',

    // Handle CSS imports (mock them)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Use jsdom environment for DOM APIs in tests
  testEnvironment: 'jsdom',

  // Optional: collect coverage info (adjust if needed)
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',

  // Optional: ignore some files or folders from tests
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

// Export the config
module.exports = createJestConfig(customJestConfig);