module.exports = {
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  setupFiles: ['jest-canvas-mock', './jest-setup-dom.js'],
  testMatch: ['**/(test).(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist-package', '/build'],

  setupFilesAfterEnv: ['./jest-setup.ts'],

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
    '\\.css$': '<rootDir>/__tests__/styleMock.js',
    '^@toptal/picasso/(.*)$': '<rootDir>/packages/picasso/src/$1',
    '^@toptal/picasso-shared$': '<rootDir>packages/shared/src/index.ts',
    '^@toptal/picasso$': '<rootDir>packages/picasso/src/index.ts',
    '^@toptal/picasso-provider$':
      '<rootDir>packages/picasso-provider/src/index.ts'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx']
}
