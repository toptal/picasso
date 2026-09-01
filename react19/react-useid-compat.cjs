// Loaded in place of `react` by jest.react19.mjs (the '^react$' mapping).
// React 19 changed the `useId` format from `:r1:` to `_r_1_`; the repo's
// snapshots are written by the React 18 suite, so the harness normalizes the
// ids back to the stored format — otherwise every base-ui/floating-ui id
// turns into benign snapshot noise that buries real React 19 regressions.
//
// The require below must stay RELATIVE: a bare `require('react')` from this
// file would be re-mapped to this file itself by moduleNameMapper, spreading
// a half-initialized circular module.
const React = require('./node_modules/react')

module.exports = {
  ...React,
  useId: function useId() {
    return React.useId().replace(/_r_([a-zA-Z0-9]*)_/g, ':r$1:')
  },
}
