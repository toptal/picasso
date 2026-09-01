import baseConfig from './jest.spec.mjs'

// React 19 validation harness ([PF-2262] workstream E, PR #5096).
//
// Runs the unit-test suite against React 19 WITHOUT touching the workspace's
// React 18 install. The React 19 packages live in `react19/` as a STANDALONE
// pnpm project (own lockfile, installed with --ignore-workspace by the
// test:react19 script) — deliberately NOT a workspace member: inside the
// workspace, its React 19 copies join hoisting and peer resolution, and on a
// fresh CI install react-dom@19 can win the root `node_modules/react-dom`
// slot, breaking react-transition-group (`findDOMNode`) for the React 18
// suite. A standalone install cannot interact with the main graph at all,
// and `<rootDir>/react19/node_modules/...` is a deterministic location on
// every machine (no hoisting involved).
//
// The mappings rewrite every react / react-dom / @testing-library import to
// that install for this run only (@testing-library/react@16 is the first
// line whose peers admit React 19; it needs @testing-library/dom@10).
//
// Usage: pnpm test:react19 [jest args], e.g.
//   pnpm test:react19 --testPathPattern react19/sanity
const config = {
  ...baseConfig,
  roots: [...baseConfig.roots, '<rootDir>/react19'],
  moduleNameMapper: {
    // react re-exported with useId normalized to the React 18 id format,
    // so version-agnostic snapshots stay comparable (see the .cjs header)
    '^react$': '<rootDir>/react19/react-useid-compat.cjs',
    '^react/(.*)$': '<rootDir>/react19/node_modules/react/$1',
    '^react-dom$': '<rootDir>/react19/node_modules/react-dom',
    '^react-dom/(.*)$': '<rootDir>/react19/node_modules/react-dom/$1',
    '^@testing-library/react$':
      '<rootDir>/react19/node_modules/@testing-library/react',
    '^@testing-library/react/(.*)$':
      '<rootDir>/react19/node_modules/@testing-library/react/$1',
    '^@testing-library/dom$':
      '<rootDir>/react19/node_modules/@testing-library/dom',
    ...baseConfig.moduleNameMapper,
  },
}

export default config
