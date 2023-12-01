const fs = require('fs')
const path = require('path')

const SOURCE_PATH_TO_EXTRACT = './packages/picasso/src'
const NAMESPACE = '@toptal'
const PACKAGE_PREFIX = 'picasso'

const EXCLUDED_FILES = ['test.ts', 'test.tsx']

const toKebabCase = str =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (match, ofs) => (ofs ? '-' : '') + match.toLowerCase()
  )

// Each extracted package will have a name in the format of @toptal/picasso-<folder-name>
const getPackageName = name =>
  `${NAMESPACE}/${PACKAGE_PREFIX}-${toKebabCase(name)}`

const processFolder = folderPath => {
  const extractedPackageName = getPackageName(path.basename(folderPath))

  // Keep track of potential dependencies in all the imports we encounter
  const potentialDependencies = new Set()

  // Update import paths in TypeScript files
  fs.readdirSync(folderPath).forEach(file => {
    const filePath = path.join(folderPath, file)

    if (
      (file.endsWith('.ts') || file.endsWith('.tsx')) &&
      !EXCLUDED_FILES.includes(file)
    ) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const updatedContent = fileContent.replace(
        // Looking for relative imports within the same package
        /from\s+'..\/([^']+)'/g,
        (_, importName) => {
          const packageName = getPackageName(importName)

          potentialDependencies.add(packageName)

          return `from '${packageName}'`
        }
      )

      // Since we're extracting packages, all external dependencies will be extraneous
      // They will still work since they are installed in the root node_modules, but they need to be added later
      // @TODO: figure out a way to add them automatically with the same version as in the root package
      const contentWithSupressedImportWarning =
        '/* eslint-disable import/no-extraneous-dependencies */\n' +
        updatedContent

      fs.writeFileSync(filePath, contentWithSupressedImportWarning)
    }
  })

  // Create package.json from template
  // @TODO: update according to Picasso's structure, i.e. with proper scripts, license, etc.
  const packageJson = {
    name: extractedPackageName,
    version: '1.0.0',
    main: 'index.js',
    dependencies: Object.fromEntries(
      Array.from(potentialDependencies, item => [item, '^1.0.0'])
    ),
  }

  fs.writeFileSync(
    path.join(folderPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )

  console.log(`Extracted ${folderPath} to ${extractedPackageName}`)

  // return the mapping of the folder name to the package name
  return [extractedPackageName, folderPath]
}

// Add wildcard package paths for each package, same as we have in tsconfig.json
const addWildcardPackagePath = ([extractedPackageName, folderPath]) => [
  [extractedPackageName, [folderPath]],
  [`${extractedPackageName}/*`, [`${folderPath}/*`]],
]

// Write the new paths to tsconfig.json to enable TypeScript package resolution
const addTscPaths = newPackagePaths => {
  const tsconfigPath = './tsconfig.json'
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'))

  tsconfig.compilerOptions.paths = {
    ...tsconfig.compilerOptions.paths,
    ...Object.fromEntries(newPackagePaths),
  }

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2))
  // There are two paths for each package, so we divide by 2
  console.log(
    `Updated ${tsconfigPath} with ${
      newPackagePaths.length / 2
    } new package paths`
  )
}

const newPackagePaths = fs
  .readdirSync(SOURCE_PATH_TO_EXTRACT)
  .map(folder => path.join(SOURCE_PATH_TO_EXTRACT, folder))
  .filter(folderPath => fs.statSync(folderPath).isDirectory())
  .map(processFolder)
  .map(addWildcardPackagePath)
  .flat()

addTscPaths(newPackagePaths)

console.log('Packages created and imports updated successfully.')
