const core = require('@actions/core')
const github = require('@actions/github')

try {
  const { context } = github
  const githubToken = core.getInput('GITHUB_TOKEN')

  if (context.payload.pull_request == null) {
    core.setFailed('No pull request found')
    return
  }

  const { number: prNumber, body } = context.payload.pull_request
  // GitHub sends `null` for an empty description
  const oldBody = body ?? ''

  const searchString = '- Temploy'
  const replacementString = `- [Temploy](https://toptal.github.io/picasso/prs/${prNumber}/)`

  if (oldBody.includes(searchString) && !oldBody.includes(replacementString)) {
    const newBody = oldBody.replace(searchString, replacementString)

    const githubToken = process.env.token
    const octokit = github.getOctokit(githubToken)

    octokit.rest.pulls.update({
      ...context.repo,
      pull_number: prNumber,
      body: newBody,
    })
  }
} catch (error) {
  core.setFailed(error.message)
}
