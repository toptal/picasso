// Stands in for `react` under jest.react19.mjs (the '^react$' mapping).
// React 19.2 changed the `useId` format from `:r1:` to `_r_1_`; the snapshots
// are written by the React 18 suite, so ids are rewritten back to that format
// — otherwise every base-ui/floating-ui id is benign snapshot noise that
// buries real regressions. Anything else is React 19 untouched.
//
// The require must stay relative: a bare `require('react')` from this file
// would be mapped straight back to this file.
const React = require('../../react19/node_modules/react')

// `_r_1_` for client ids, `_R_…_` for hydration ids (React 18: `:r1:`, `:R…:`)
const REACT_19_ID = /^_([rR])_(.*)_$/

module.exports = {
  ...React,
  useId: function useId() {
    const id = React.useId()
    const match = REACT_19_ID.exec(id)

    if (!match) {
      throw new Error(
        `react-useid-compat: unexpected useId format "${id}" — this shim ` +
          'rewrites React 19.2\'s "_r_…_" ids to React 18\'s ":r…:"; ' +
          'update it for the React version in react19/package.json'
      )
    }

    return `:${match[1]}${match[2]}:`
  },
}
