import davinciJestConfig from '@toptal/davinci-qa/src/configs/jest.swc.config.js'

const config = {
  ...davinciJestConfig,
  roots: ['<rootDir>/packages'],

  moduleNameMapper: {
    ...davinciJestConfig.moduleNameMapper,
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
