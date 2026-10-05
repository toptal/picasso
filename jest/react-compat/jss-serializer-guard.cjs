const path = require('path')

// davinci-qa does not export the serializer itself, only its jest configs, so
// locate it next to the config we already consume. This survives any
// node_modules layout, hoisted or nested.
const jssSerializer = require(path.join(
  path.dirname(
    require.resolve('@toptal/davinci-qa/src/configs/jest.swc.config.js')
  ),
  'jest/jss-snapshot-serializer.cjs'
))

// Its `test()` reads a property before checking the value exists, so a `null`
// (React 19 elements expose nulls React 18 did not) throws instead of
// declining. Guard the predicate; everything else is delegated untouched.
module.exports = {
  ...jssSerializer,
  test: value => Boolean(value) && jssSerializer.test(value),
}
