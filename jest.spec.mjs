import davinciJestConfig from '@toptal/davinci-qa/src/configs/jest.swc.config.js'

const config = {
  ...davinciJestConfig,
  roots: ['<rootDir>/packages'],

  moduleNameMapper: {
    ...davinciJestConfig.moduleNameMapper,
    '^@toptal/picasso/(.*)$': '<rootDir>/packages/picasso/src/$1',
    '^@toptal/picasso-shared$': '<rootDir>/packages/shared/src/index.ts',
    '^@toptal/picasso$': '<rootDir>/packages/picasso/src/index.ts',
    '^@toptal/picasso-provider$':
      '<rootDir>/packages/picasso-provider/src/index.ts',
    '^@toptal/picasso-pictograms$':
      '<rootDir>/packages/picasso-pictograms/src/index.ts',
    '^@toptal/picasso-root/(.*)$': '<rootDir>/$1',
  },
  setupFiles: ['jest-canvas-mock'],
  transformIgnorePatterns: [
    'node_modules/(?!@toptal|@topkit|d3|internmap|robust-predicates|delaunator)',
  ],
}

export default config
