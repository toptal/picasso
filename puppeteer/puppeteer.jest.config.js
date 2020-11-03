module.exports = {
  rootDir: '../',
  testMatch: ['**/(storyshot.test).(jsx|tsx)'],
  preset: 'jest-puppeteer',
  testPathIgnorePatterns: ['/node_modules/', '/dist-package', '/build'],
  setupFilesAfterEnv: ['<rootDir>/puppeteer/setup.ts'],
  transform: {
    '.(ts|tsx)': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reporters: ['default', '<rootDir>/puppeteer/reporter.js']
}
