const core = require('@actions/core')
const github = require('@actions/github')

try {
  const { context } = github
  const githubToken = core.getInput('GITHUB_TOKEN')

  if (context.payload.pull_request == null) {
    core.setFailed('No pull request found')
    return
  }

  const {
    number: prNumber,
    body: oldBody,
    head: { ref: branch },
  } = context.payload.pull_request
  const pullRequestBranch = context.payload.pull_request.head.ref

  const searchString = '- Temploy'
  const replacementString = `- [Temploy](https://picasso.toptal.net/${branch})`

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
