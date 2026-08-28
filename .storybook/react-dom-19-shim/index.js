// [PF-2262] React 19 storybook mode: re-export react-dom 19 (from the
// standalone react19/ install) with an '18.'-prefixed version string.
// @storybook/react@6.5 picks its renderer via `version.startsWith('18')`
// (dist/esm/client/preview/render.js:111); the legacy branch calls
// ReactDOM.render/unmountComponentAtNode, both removed in React 19, so the
// sniff must land on the modern createRoot path.
const reactDom = require('../../react19/node_modules/react-dom/index.js')

module.exports = {
  ...reactDom,
  version: `18.999.0-react19-shim-${reactDom.version}`,
  // storybook 6.5's unmountElement calls the legacy API unconditionally for
  // elements it never attached a root to (render.js:118-123). No tracked
  // root means nothing to unmount — legacy semantics return false for that.
  unmountComponentAtNode: reactDom.unmountComponentAtNode || (() => false),
  // the modern render path never calls this; fail loudly if something does
  render:
    reactDom.render ||
    (() => {
      throw new Error(
        '[react19 shim] legacy ReactDOM.render was called — find the caller, it cannot work on React 19'
      )
    }),
}
