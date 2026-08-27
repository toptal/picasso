import baseConfig from './jest.spec.mjs'

// React 19 validation harness ([PF-2262] workstream E, PR #5070).
//
// Runs the unit-test suite against React 19 WITHOUT touching the workspace's
// React 18 install. The repo-wide `react: '^18.2.0'` override in
// pnpm-workspace.yaml rewrites every dependency named `react`, so nothing in
// the workspace can resolve React 19 — npm aliases escape the override
// because their dependency name differs (`react19`, `react-dom19`, ...), and
// they are declared in the `react19/` workspace member (NOT root devDeps) so
// React 19 never participates in the root importer's peer resolution —
// root-level aliases would rebind other packages' react peers to 19 via
// resolvePeersFromWorkspaceRoot. The hoisted node linker still places the
// alias packages in the root node_modules, which the mappings point at.
// The mappings below rewrite every react / react-dom /
// @testing-library/react import to that member for this run only
// (@testing-library/react@16 is the first line whose peers admit React 19;
// it needs @testing-library/dom@10 alongside).
//
// Usage: pnpm test:react19 [jest args], e.g.
//   pnpm test:react19 --testPathPattern react19/sanity
const config = {
  ...baseConfig,
  roots: [...baseConfig.roots, '<rootDir>/react19'],
  moduleNameMapper: {
    // Absolute paths so every requiring file — wherever it lives — gets the
    // SAME hoisted copy; a bare specifier resolved from inside react19/ would
    // find the nested duplicate and split React into two instances.
    '^react$': '<rootDir>/node_modules/react19',
    '^react/(.*)$': '<rootDir>/node_modules/react19/$1',
    '^react-dom$': '<rootDir>/node_modules/react-dom19',
    '^react-dom/(.*)$': '<rootDir>/node_modules/react-dom19/$1',
    '^@testing-library/react$':
      '<rootDir>/node_modules/testing-library-react19',
    '^@testing-library/react/(.*)$':
      '<rootDir>/node_modules/testing-library-react19/$1',
    '^@testing-library/dom$': '<rootDir>/node_modules/testing-library-dom-v10',
    ...baseConfig.moduleNameMapper,
  },
}

export default config
