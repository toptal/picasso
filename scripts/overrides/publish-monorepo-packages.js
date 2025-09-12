/* eslint-disable */
// TODO: Davinci needs to have the change (it has to support nx publishing)
// This file is ready to be merged into Davinci
import cliShared from '@toptal/davinci-cli-shared'
import fs from 'fs'

import { getGITRef, normalizeBranchName } from './utils.js'

const writeNewPackagesVersionsToFile = (outputVersionFile, result) => {
  if (!outputVersionFile || !result) {
    return
  }

  // Parse the result string to extract package versions
  const lines = result.split('\n')
  const packageVersions = []

  for (const line of lines) {
    // Look for lines starting with the package icon 📦
    const packageMatch = line.match(/📦\s+(.+@.+)/)
    if (packageMatch) {
      const packageVersion = packageMatch[1].trim()
      packageVersions.push(packageVersion)
    }
  }

  if (packageVersions.length > 0) {
    const content = packageVersions.join(' ') + '\n'
    fs.writeFileSync(outputVersionFile, content, 'utf8')
  }
}

/**
 *
 * @param {string} branch
 * @param {boolean} isAlpha
 * @param {string} outputVersionFile filename to save published packages versions
 */
export const publishMonorepoPackages = ({
  branch,
  isAlpha,
  outputVersionFile,
}) => {
  if (!isAlpha) {
    throw new Error(
      'Publish command for Monorepo is not ready yet! You are only able to perform a canary release.'
    )
  }

  const normalizedBranchName = normalizeBranchName(branch)
  const shortRef = getGITRef()
  const preId = `alpha-${normalizedBranchName}-${shortRef}`

  cliShared.runSync(
    `npx nx release version --specifier prerelease --preid ${preId}`,
    [],
    {
      shell: true,
      stdio: 'pipe',
    }
  )

  const releasePublishResult = cliShared.runSync(
    `npx nx release publish --tag=canary`,
    [],
    {
      shell: true,
      stdio: 'pipe',
    }
  )

  if (outputVersionFile) {
    writeNewPackagesVersionsToFile(
      outputVersionFile,
      releasePublishResult.stdout
    )
  }
}
