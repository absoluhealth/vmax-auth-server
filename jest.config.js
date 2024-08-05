module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.js',
      // '!src/**/*.test.js', // Exclude test files from coverage
      '!src/swagger.js' // Optionally exclude specific files if needed
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  };
  