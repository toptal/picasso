module.exports = {
  rootDir: '../',
  testMatch: ['**/(visual.test).js?(x)'],
  preset: 'jest-puppeteer',
  testPathIgnorePatterns: ['/node_modules/', '/build'],
  setupTestFrameworkScriptFile: '<rootDir>/puppeteer/setup.js',
  reporters: ['default', '<rootDir>/puppeteer/reporter.js']
}
