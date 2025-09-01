const github = require('@actions/github')

const reportMissingChangeset = require('./src/report-missing-changeset')

const { GITHUB_TOKEN, CHANGED_PACKAGES, RELEASE_PACKAGES, MISSING_PACKAGES } =
  process.env

const octokit = new github.getOctokit(GITHUB_TOKEN)
const githubContextPayload = github.context.payload
const releasePackages = JSON.parse(RELEASE_PACKAGES)
const changedPackages = JSON.parse(CHANGED_PACKAGES)
const missingPackages = JSON.parse(MISSING_PACKAGES)

console.log('Release packages:', releasePackages)
console.log('Changed packages:', changedPackages)
console.log('Missing packages:', missingPackages)

reportMissingChangeset(octokit, githubContextPayload, {
  releasePackages,
  changedPackages,
  missingPackages,
}).catch(err => console.error(err.message))
