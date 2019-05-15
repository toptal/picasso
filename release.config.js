/* eslint-disable */

module.exports = {
  analyzeCommits: ['@semantic-release/commit-analyzer'], // Determine the type of release by analyzing commits with conventional-changelog
  verifyConditions: [
    '@semantic-release/changelog', // Verify the presence and the validity of the configuration
    '@semantic-release/npm', // Verify the presence and the validity of the npm authentication and release configuration
    '@semantic-release/github', // Verify the presence and the validity of the GitHub authentication and release configuration
    '@semantic-release/git' // Verify the presence and the validity of the Git authentication and release configuration
  ],
  generateNotes: ['@semantic-release/release-notes-generator'], // Generate release notes for the commits added since the last release with conventional-changelog
  prepare: [
    '@semantic-release/changelog', // Create or update the changelog file in the local project repository
    [
      '@semantic-release/exec', // Execute a shell command to bump next version inside README.md
      {
        prepareCmd: './bin/bump-version ${nextRelease.version}'
      }
    ],
    [
      '@semantic-release/npm', // Update the package.json version and create the npm package tarball
      {
        pkgRoot: 'build'
      }
    ],
    [
      '@semantic-release/exec', // Execute a shell command to copy package.json from build/ directory back to the root
      {
        prepareCmd: './ci/release/copy-assets'
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'README.md', 'package.json'] // Push a release commit and tag, including globed files
      }
    ]
  ],
  publish: [
    '@semantic-release/github', // Publish a GitHub release
    [
      '@semantic-release/npm', // Publish the package on the npm registry
      {
        pkgRoot: 'build'
      }
    ]
  ],
  success: ['@semantic-release/github'], // Add a comment to GitHub issues and pull requests resolved in the release
  fail: ['@semantic-release/github'], // Open a GitHub issue when a release fails
  plugins: [] // Reset default plugins and use custom steps defined in this file
}
