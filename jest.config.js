module.exports = {
  testMatch: ['**/(test).js?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/build'],

  /*
    jss-snapshot-serializer is needed to remove dynamically
    generated parts of classNames from material-ui components
    https://github.com/mui-org/material-ui/issues/9492
  */
  snapshotSerializers: ['./__tests__/jss-snapshot-serializer.js']
}
