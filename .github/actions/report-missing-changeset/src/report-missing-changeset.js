const reportMissingChangeset = async (
  octokit,
  githubContextPayload,
  { releasePackages, changedPackages, missingPackages }
) => {
  const {
    pull_request: { number: issue_number },
    repository: {
      owner: { login: owner },
      name: repo,
    },
  } = githubContextPayload

  // If there are no changesets or changed packages, we don't need to do anything
  if (releasePackages.length === 0 || changedPackages.length === 0) {
    return
  }

  const commentPrefix =
    ":warning: Following packages are missing changesets. Please check if they don't require one."

  const comments = await octokit.rest.issues.listComments({
    owner,
    repo,
    issue_number,
  })

  // Find existing comment
  const comment = comments.data.find(({ body }) =>
    body.startsWith(commentPrefix)
  )

  // If there are no missing packages, we can delete the comment
  if (missingPackages.length === 0) {
    if (comment) {
      await octokit.rest.issues.deleteComment({
        owner,
        repo,
        comment_id: comment.id,
      })
    }

    return
  }

  const body = `${commentPrefix}\n\n\`\`\`\n${missingPackages.join(
    '\n'
  )}\n\`\`\``

  if (comment) {
    await octokit.rest.issues.updateComment({
      owner,
      repo,
      comment_id: comment.id,
      body,
    })
  } else {
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    })
  }
}

module.exports = reportMissingChangeset
