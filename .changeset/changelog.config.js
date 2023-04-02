const changelogFunctions = require('@changesets/changelog-github')
const getGithubInfo = require('@changesets/get-github-info')

const { getDependencyReleaseLine } = changelogFunctions.default

// Modified copy of getReleaseLine from @changesets/changelog-github
const getReleaseLine = async (changeset, type, options) => {
  if (!options || !options.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]'
    )
  }

  let prFromSummary
  let commitFromSummary
  const usersFromSummary = []
  const replacedChangelog = changeset.summary
    .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      const num = Number(pr)

      if (!isNaN(num)) {
        prFromSummary = num
      }

      return ''
    })
    .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
      commitFromSummary = commit

      return ''
    })
    .replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim, (_, user) => {
      usersFromSummary.push(user)

      return ''
    })
    .trim()
  const [firstLine, ...futureLines] = replacedChangelog
    .split('\n')
    .map(line => line.trimRight())
  const links = await (async () => {
    if (prFromSummary !== undefined) {
      let { links } = await getGithubInfo.getInfoFromPullRequest({
        repo: options.repo,
        pull: prFromSummary,
      })

      if (commitFromSummary) {
        links = {
          ...links,
          commit: `[\`${commitFromSummary}\`](https://github.com/${options.repo}/commit/${commitFromSummary})`,
        }
      }

      return links
    }

    const commitToFetchFrom = commitFromSummary || changeset.commit

    if (commitToFetchFrom) {
      const { links } = await getGithubInfo.getInfo({
        repo: options.repo,
        commit: commitToFetchFrom,
      })

      return links
    }

    return {
      commit: null,
      pull: null,
      user: null,
    }
  })()
  const users = usersFromSummary.length
    ? usersFromSummary
        .map(
          userFromSummary =>
            `[@${userFromSummary}](https://github.com/${userFromSummary})`
        )
        .join(', ')
    : links.user
  const prefix = [
    links.pull === null ? '' : ` ${links.pull}`,
    links.commit === null ? '' : ` ${links.commit}`,
    users === null ? '' : ` Thanks ${users}!`,
  ].join('')

  // This is the only change from the original getReleaseLine,
  // we make sure that the changelog description always starts with a new line
  return `\n\n-${prefix ? prefix : ''}\n${firstLine}\n${futureLines
    .map(line => `  ${line}`)
    .join('\n')}`
}

module.exports = {
  // Override the default getReleaseLine
  getReleaseLine,
  // Use original getDependencyReleaseLine from @changesets/changelog-github
  getDependencyReleaseLine,
}
