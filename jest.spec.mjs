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
    '^@toptal/picasso-provider/utils$':
      '<rootDir>/packages/picasso-provider/src/utils/index.ts',
    '^@toptal/picasso-provider/Picasso/config$':
      '<rootDir>/packages/picasso-provider/src/Picasso/config/index.ts',      
    '^@toptal/picasso-provider/index$':
      '<rootDir>/packages/picasso-provider/src/index.ts',      
    '^@toptal/picasso-pictograms$':
      '<rootDir>/packages/picasso-pictograms/src/index.ts',
    '^@toptal/picasso-rich-text-editor$':
      '<rootDir>/packages/picasso-rich-text-editor/src/index.ts',
    '^@toptal/picasso-root/(.*)$': '<rootDir>/$1',
  },
  setupFiles: ['jest-canvas-mock', './jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!@toptal|@topkit|d3|internmap|robust-predicates|delaunator)',
  ],
  coverageReporters: ['json', 'text-summary'],
  // TODO: This option does not work due to bug in davinci-qa https://toptal-core.atlassian.net/browse/FX-4311
  // collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
}

export default config
