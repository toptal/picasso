module.exports = {
  rootDir: '../',
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  testMatch: ['**/(storyshot.test).(jsx|tsx)'],
  preset: 'jest-puppeteer',
  testPathIgnorePatterns: ['/node_modules/', '/build'],
  setupFilesAfterEnv: ['<rootDir>/puppeteer/setup.ts'],
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reporters: ['default', '<rootDir>/puppeteer/reporter.js']
}
