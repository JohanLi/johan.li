module.exports = {
  transform: {
    '\\.tsx?$': '@swc/jest',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.{ts,tsx}'],
};
