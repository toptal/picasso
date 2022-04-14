const davinciJestConfig = require('@toptal/davinci-qa/src/configs/jest.config.js')

module.exports = {
  ...davinciJestConfig,
  roots: ['<rootDir>/packages'],

  moduleNameMapper: {
    ...davinciJestConfig.moduleNameMapper,
    '^@toptal/picasso/(.*)$': '<rootDir>/packages/picasso/src/$1',
    '^@toptal/picasso-shared$': '<rootDir>packages/shared/src/index.ts',
    '^@toptal/picasso$': '<rootDir>packages/picasso/src/index.ts',
    '^@toptal/picasso-provider$':
      '<rootDir>packages/picasso-provider/src/index.ts',
    '^@toptal/picasso-root/(.*)$': '<rootDir>/$1'
  },
  modulePathIgnorePatterns: [
    ...davinciJestConfig.modulePathIgnorePatterns,
    '/dist-package'
  ],
  // jest.mock returns always undefined when true
  resetMocks: false,
  restoreMocks: false
}
