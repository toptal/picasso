const core = require('@actions/core')
const { getChangedPackagesSinceRef } = require('@changesets/git')
const { default: getReleasePlan } = require('@changesets/get-release-plan')

const getChangesetInfo = async () => {
  const ref = core.getInput('base-ref')
  const cwd = process.cwd()

  try {
    const changedPackages = await getChangedPackagesSinceRef({ cwd, ref })
    const releasePlan = await getReleasePlan(cwd, ref)
    const changedPackagesNames = changedPackages.map(
      ({ packageJson: { name } }) => name
    )
    const releasePackagesNames = releasePlan.releases.map(({ name }) => name)
    const missingPackages = changedPackagesNames.filter(
      pkg => !releasePackagesNames.includes(pkg)
    )

    core.setOutput('changed-packages', changedPackagesNames)
    core.setOutput('release-packages', releasePackagesNames)
    core.setOutput('missing-packages', missingPackages)
  } catch (err) {
    core.error(err.message)
  }
}

getChangesetInfo()
