import davinciJestConfig from '@toptal/davinci-qa/src/configs/jest.swc.config.js'

// These are mostly ES6 modules that need to be on CJS for Jest.
// Each entry is a regex segment that must match a full path segment
// (anchored by the `(?:/|$)` in transformIgnorePatterns below), so use
// `[^/]*` for prefix-style matches like `d3*` / `@toptal/*`.
const NODE_MODULES_TO_IGNORE_TRANSFORM = [
  '@toptal/[^/]+',
  '@topkit/[^/]+',
  'd3[^/]*',
  'internmap',
  'robust-predicates',
  'delaunator',
  'hast[^/]*',
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
    // Match both flat (yarn 1 / pnpm node-linker=hoisted) and pnpm
    // nested (.pnpm/<pkg>@ver/node_modules/...) layouts so transforms
    // still reach the listed packages if node-linker flips to isolated.
    `^(?:.*?/)?node_modules/(?!((?:\\.pnpm/[^/]+/node_modules/)?(?:${NODE_MODULES_TO_IGNORE_TRANSFORM})(?:/|$)))`,
  ],
  coverageReporters: ['json', 'text-summary'],
  // TODO: This option does not work due to bug in davinci-qa https://toptal-core.atlassian.net/browse/FX-4311
  // collectCoverageFrom: ['packages/**/*.{ts,tsx}'],
}

export default config
