const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * Script checks if all icons have 16 and 24 pixels variants.
 */

const ICON_COMPONENTS_DIRECTORY = 'packages/picasso/src/Icon'
// TODO: add missing icons and remove ability to ignore icons
const IGNORED_ICONS = ['Ach', 'CreditCard']

const getIconName = iconFileName => iconFileName.replace(/(16|24).tsx/, '')

const getChangedFiles = () => {
  const command = `git diff --name-only --cached`
  const diffOutput = execSync(command).toString()

  return diffOutput.toString().split('\n').filter(Boolean)
}

const checkIfIconIsComplete = (iconName, icons) =>
  icons.indexOf(`${iconName}16.tsx`) > -1 &&
  icons.indexOf(`${iconName}24.tsx`) > -1

const findIncompleteIcons = () => {
  const changedFiles = getChangedFiles()
  const iconsWereChanged =
    changedFiles.filter(fileName =>
      fileName.startsWith(ICON_COMPONENTS_DIRECTORY)
    ).length > 0

  if (!iconsWereChanged) {
    process.exit(0)
  }

  const iconFileNames = fs
    .readdirSync(ICON_COMPONENTS_DIRECTORY)
    .filter(
      file => path.extname(file) === '.tsx' && file.match(/(16|24)\.tsx$/)
    )

  const incompleteIcons = []

  iconFileNames.forEach(iconFileName => {
    const iconName = getIconName(iconFileName)

    if (
      IGNORED_ICONS.indexOf(iconName) === -1 &&
      !checkIfIconIsComplete(iconName, iconFileNames)
    ) {
      if (incompleteIcons.indexOf(iconFileName)) {
        incompleteIcons.push(iconName)
      }
    }
  })

  return incompleteIcons
}

const incompleteIcons = findIncompleteIcons()

if (incompleteIcons.length > 0) {
  console.error(
    `The following icons need to have both 16 and 24 pixels variants generated:\n${incompleteIcons.join(
      '\n'
    )}`
  )
  process.exit(1)
}

process.exit(0)
