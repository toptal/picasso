import reportMissingChangeset from './report-missing-changeset'

const REPO_OWNER = 'FX'
const REPO_NAME = 'test-repo'
const ISSUE_NUMBER = 1
const COMMENT_ID = 999
const COMMENT_PREFIX =
  ":warning: Following packages are missing changesets. Please check if they don't require one."

const mockGithubContextPayload = {
  pull_request: {
    number: ISSUE_NUMBER,
  },
  repository: {
    owner: {
      login: REPO_OWNER,
    },
    name: REPO_NAME,
  },
}
const mockGithubCommentsPayload = [
  {
    id: COMMENT_ID,
    body: COMMENT_PREFIX,
  },
]

describe('report missing changeset action', () => {
  let mockOctokit

  beforeEach(() => {
    mockOctokit = {
      rest: {
        issues: {
          listComments: jest.fn(),
          deleteComment: jest.fn(),
          updateComment: jest.fn(),
          createComment: jest.fn(),
        },
      },
    }
  })

  it('does nothing when there are no changed packages', async () => {
    const releasePackages = ['package-1']
    const changedPackages = []
    const missingPackages = []

    await reportMissingChangeset(mockOctokit, mockGithubContextPayload, {
      releasePackages,
      changedPackages,
      missingPackages,
    })

    expect(mockOctokit.rest.issues.listComments).toHaveBeenCalledTimes(0)
    expect(mockOctokit.rest.issues.deleteComment).toHaveBeenCalledTimes(0)
    expect(mockOctokit.rest.issues.updateComment).toHaveBeenCalledTimes(0)
    expect(mockOctokit.rest.issues.createComment).toHaveBeenCalledTimes(0)
  })

  it('does nothing when there are no changesets', async () => {
    const releasePackages = []
    const changedPackages = ['package-1']
    const missingPackages = ['package-1']

    await reportMissingChangeset(mockOctokit, mockGithubContextPayload, {
      releasePackages,
      changedPackages,
      missingPackages,
    })

    expect(mockOctokit.rest.issues.listComments).toHaveBeenCalledTimes(0)
    expect(mockOctokit.rest.issues.deleteComment).toHaveBeenCalledTimes(0)
    expect(mockOctokit.rest.issues.updateComment).toHaveBeenCalledTimes(0)
    expect(mockOctokit.rest.issues.createComment).toHaveBeenCalledTimes(0)
  })

  it('deletes comment when there are no missing packages', async () => {
    mockOctokit.rest.issues.listComments.mockReturnValueOnce({
      data: mockGithubCommentsPayload,
    })

    const releasePackages = ['package-1']
    const changedPackages = ['package-1']
    const missingPackages = []

    await reportMissingChangeset(mockOctokit, mockGithubContextPayload, {
      releasePackages,
      changedPackages,
      missingPackages,
    })

    expect(mockOctokit.rest.issues.listComments).toHaveBeenCalledWith({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      issue_number: ISSUE_NUMBER,
    })
    expect(mockOctokit.rest.issues.deleteComment).toHaveBeenCalledWith({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      comment_id: COMMENT_ID,
    })
    expect(mockOctokit.rest.issues.updateComment).toHaveBeenCalledTimes(0)
    expect(mockOctokit.rest.issues.createComment).toHaveBeenCalledTimes(0)
  })

  it('update comment with missing packages', async () => {
    mockOctokit.rest.issues.listComments.mockReturnValueOnce({
      data: mockGithubCommentsPayload,
    })

    const releasePackages = ['package-1']
    const changedPackages = ['package-1', 'package-2']
    const missingPackages = ['package-2']

    await reportMissingChangeset(mockOctokit, mockGithubContextPayload, {
      releasePackages,
      changedPackages,
      missingPackages,
    })

    expect(mockOctokit.rest.issues.updateComment).toHaveBeenCalledWith({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      comment_id: COMMENT_ID,
      body: `${COMMENT_PREFIX}\n\n\`\`\`\n${missingPackages.join(
        '\n'
      )}\n\`\`\``,
    })
    expect(mockOctokit.rest.issues.listComments).toHaveBeenCalledTimes(1)
    expect(mockOctokit.rest.issues.deleteComment).toHaveBeenCalledTimes(0)
    expect(mockOctokit.rest.issues.createComment).toHaveBeenCalledTimes(0)
  })

  it('creates comment with missing packages', async () => {
    mockOctokit.rest.issues.listComments.mockReturnValueOnce({
      data: [],
    })

    const releasePackages = ['package-1']
    const changedPackages = ['package-1', 'package-2']
    const missingPackages = ['package-2']

    await reportMissingChangeset(mockOctokit, mockGithubContextPayload, {
      releasePackages,
      changedPackages,
      missingPackages,
    })

    expect(mockOctokit.rest.issues.createComment).toHaveBeenCalledWith({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      issue_number: ISSUE_NUMBER,
      body: `${COMMENT_PREFIX}\n\n\`\`\`\n${missingPackages.join(
        '\n'
      )}\n\`\`\``,
    })
    expect(mockOctokit.rest.issues.listComments).toHaveBeenCalledTimes(1)
    expect(mockOctokit.rest.issues.deleteComment).toHaveBeenCalledTimes(0)
    expect(mockOctokit.rest.issues.updateComment).toHaveBeenCalledTimes(0)
  })
})
