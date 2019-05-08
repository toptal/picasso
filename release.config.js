/* eslint-disable */

module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'build'
      }
    ],
    '@semantic-release/github',
    [
      '@semantic-release/exec',
      {
        prepareCmd: './bin/bump-version ${nextRelease.version}'
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'README.md', 'package.json']
      }
    ]
  ]
}
