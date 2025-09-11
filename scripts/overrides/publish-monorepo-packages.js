import cliShared from '@toptal/davinci-cli-shared'

import { paths } from '../../configs/paths.js'
import {
  getGITRef,
  normalizeBranchName,
  writeNewPackagesVersionsToFile,
} from './utils.js'

/**
 *
 * @param {string} branch
 * @param {boolean} isAlpha
 * @param {string} outputVersionFile filename to save published packages versions
 * @param {string} publishRootFolder folder to use as a base for package. If "." is passed, the publishing will happen in the package's root
 */
export const publishMonorepoPackages = ({
  branch,
  isAlpha,
  outputVersionFile,
  publishRootFolder,
}) => {
  if (!isAlpha) {
    throw new Error(
      'Publish command for Monorepo is not ready yet! You are only able to perform a canary release.'
    )
  }

  //const publishCommand = getMonorepoPublishAlphaCommand({
  //  branch,
  //  publishRootFolder,
  //})

  // update node + npm for free

  const publishCommand = `npx nx release version --projects=@toptal/base-tailwind --specifier prerelease --preid alpha-${new Date().getTime()} && npx nx release publish --projects=@toptal/base-tailwind --tag=canary --verbose`

  console.log('@@@ overrides publishCommand', publishCommand)

  let result

  console.log('@@@ in patched publishMonorepoPackages', publishCommand)
  try {
    result = cliShared.runSync(publishCommand, [], {
      shell: true,
      stdio: 'pipe',
      all: true,
    })
  } catch (error) {
    console.log(
      '@@@ error',
      error,
      JSON.stringify(error),
      error.stdout,
      error.stderr,
      error.all
    )
  }

  console.log('@@@ in patched publishMonorepoPackages', result)

  // prints the result
  console.log(result.stdout)

  if (outputVersionFile) {
    writeNewPackagesVersionsToFile(outputVersionFile, result.stdout)
  }
}

/**
 * Generates a command to publish canary version of monorepo packages
 * @param {string} branch
 * @param {string} publishRootFolder
 * @returns {string}
 */
const getMonorepoPublishAlphaCommand = ({ branch, publishRootFolder }) => {
  const normalizedBranchName = normalizeBranchName(branch)
  const shortRef = getGITRef()

  const contentsFolder =
    publishRootFolder ??
    paths.appPackageBuild.slice(paths.appPackageBuild.lastIndexOf('/') + 1)

  const options = [
    'lerna',
    'publish',
    '--canary',
    `--preid alpha-${normalizedBranchName}-${shortRef}`,
    '--no-git-tag-version',
    '--exact',
    '--yes',
    '--concurrency 1',
    `--contents ${contentsFolder}`,
    '--force-publish',
  ]

  return options.join(' ')
}
