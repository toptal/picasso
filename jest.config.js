module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  testMatch: ['**/(test).(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/build'],

  /*
    jss-snapshot-serializer is needed to remove dynamically
    generated parts of classNames from material-ui components
    https://github.com/mui-org/material-ui/issues/9492
  */
  snapshotSerializers: ['./__tests__/jss-snapshot-serializer.js'],
  /*
    Let Jest to replace import of any files with those extensions with
    the mock file ./__tests__/file-mock.js
  */
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/__tests__/fileMock.js',
    '^@components/(.*)': '<rootDir>/components/$1',
    '^@local-types/(.*)': '<rootDir>/@types/$1'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx']
}
