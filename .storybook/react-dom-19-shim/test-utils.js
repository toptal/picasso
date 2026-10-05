// Bundled for the browser preview only (RTL 14 in picasso-test-utils requires
// react-dom/test-utils). Do not require this from Node CLI — react-dom 19's
// test-utils entry hangs outside a browser/jest environment.
module.exports = require('../../react19/node_modules/react-dom/test-utils.js')
