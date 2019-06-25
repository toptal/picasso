/* eslint-disable */

module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'README.md', 'package.json', './build']
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: "echo 'export VERSION=${nextRelease.version}' > .version"
      }
    ]
  ]
}
