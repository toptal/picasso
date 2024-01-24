import davinciJestConfig from '@toptal/davinci-qa/src/configs/jest.swc.config.js'

// These are mostly ES6 modules that need to be on CJS for Jest
const NODE_MODULES_TO_IGNORE_TRANSFORM = [
  '@toptal',
  '@topkit',
  'd3',
  'internmap',
  'robust-predicates',
  'delaunator',
  'hast',
  'property-information',
  'comma-separated-tokens',
  'space-separated-tokens',
  'web-namespaces',
].join('|')

const config = {
  ...davinciJestConfig,
  roots: ['<rootDir>/packages'],

  moduleNameMapper: {
    ...davinciJestConfig.moduleNameMapper,
  },
  setupFiles: ['jest-canvas-mock', './jest.setup.js'],
  transformIgnorePatterns: [
    `node_modules/(?!${NODE_MODULES_TO_IGNORE_TRANSFORM})`,
  ],
  coverageReporters: ['json', 'text-summary'],
  // TODO: This option does not work due to bug in davinci-qa https://toptal-core.atlassian.net/browse/FX-4311
  // collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
}

export default config
