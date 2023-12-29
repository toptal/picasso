const fs = require('fs')
const path = require('path')

const deps = require('./packages-schema')

const NAMESPACE = '@toptal'
const PACKAGE_PREFIX = 'picasso'

const extractNameFromPath = p => p.split('/').filter(Boolean).pop()

const kebabToCamelCase = str =>
  str.replace(/-([a-z])/g, substring => substring[1].toUpperCase())

const toKebabCase = str =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (match, ofs) => (ofs ? '-' : '') + match.toLowerCase()
  )

// Each extracted package will have a name in the format of @toptal/picasso-<folder-name>
const getPackageName = name =>
  `${NAMESPACE}/${PACKAGE_PREFIX}-${toKebabCase(name)}`

const findGroupNameByComponentPath = (path, items) => {
  const foundItem = items.find(item => item.components.includes(path))

  return foundItem.package_name
}

const itemsWithExternalDeps = deps.map(item => {
  return {
    ...item,
    group_dependencies: item.group_dependencies.filter(
      i => !item.components.includes(i)
    ),
    package_name: getPackageName(item.group_name),
  }
})

const itemsWithExternalDepsAndGroupNames = itemsWithExternalDeps.map(item => {
  return {
    ...item,
    group_dependencies: item.group_dependencies.map(i => {
      return {
        component_path: extractNameFromPath(i),
        package_name: findGroupNameByComponentPath(i, itemsWithExternalDeps),
      }
    }),
  }
})

const createStructure = pkg => {
  const newFolder = `${__dirname}/packages/base/${pkg.group_name}`

  const newIndex = `${newFolder}/src/index.ts`

  const packageJson = {
    name: pkg.package_name,
    version: '1.0.0',
    description: `Toptal UI components library - ${pkg.group_name}`,
    publishConfig: {
      access: 'public',
      directory: 'dist-package',
    },
    main: 'index.js',
    module: 'index.js',
    scripts: {
      'build:package':
        'cross-env NODE_ENV=production node ../../../bin/build.js --tsConfig=./tsconfig.build.json',
      prepublishOnly:
        'if [ -d dist-package ]; then cp ./package.json ./dist-package/package.json; fi',
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/toptal/picasso.git',
    },
    author: 'Toptal',
    license: 'MIT',
    bugs: {
      url: 'https://github.com/toptal/picasso/issues',
    },
    homepage:
      'https://github.com/toptal/picasso/tree/master/packages/picasso#readme',
    dependencies: Object.fromEntries(
      Array.from(pkg.group_dependencies, item => [item.package_name, '1.0.0'])
    ),
    sideEffects: ['**/styles.ts', '**/styles.js'],
  }

  // create new folder
  fs.mkdirSync(newFolder)
  fs.mkdirSync(`${newFolder}/src`)

  // create new package.json
  fs.writeFileSync(
    `${newFolder}/package.json`,
    JSON.stringify(packageJson, null, 2)
  )
  pkg.components.forEach(component => {
    // copy each component folder to new path
    fs.cpSync(component, `${newFolder}/src/${extractNameFromPath(component)}`, {
      recursive: true,
    })
  })

  // create tsconfig.build.json
  fs.writeFileSync(
    `${newFolder}/tsconfig.build.json`,
    JSON.stringify(
      {
        extends: '../../../tsconfig.build.json',
        compilerOptions: {
          outDir: 'dist-package',
        },
        include: ['src'],
      },
      null,
      2
    )
  )

  // create new index.ts
  fs.writeFileSync(
    newIndex,
    pkg.components
      .map(component => extractNameFromPath(component))
      .filter(name => fs.existsSync(`${newFolder}/src/${name}/index.ts`))
      .map(name => `export * from './${name}'`)
      .join('\n')
  )

  return `${newFolder}/src/`
}

const isIndexFileInSubSrcFolder = filePath => {
  if (!filePath.includes('index.ts')) {
    return false
  }
  const splitPath = filePath.split('/')
  const srcIndex = splitPath.indexOf('src')
  const fileIndex = splitPath.indexOf('index.ts')

  return srcIndex + 2 === fileIndex
}

const processIndexFileToNamedImports = fileContent => {
  return fileContent.replace(
    // Looking for export { default } from './<component-name>'
    /export { default } from\s+'\.\/([^']+)'/g,
    (_, importName) => {
      return `export { default as ${kebabToCamelCase(
        importName
      )} } from './${importName}'`
    }
  )
}

const replaceInternalImports = (folderPath, pkg) => {
  const processedImports = []

  fs.readdirSync(folderPath, { recursive: true }).forEach(file => {
    const filePath = path.join(folderPath, file)

    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const isIndexFile = isIndexFileInSubSrcFolder(filePath)
      const updatedContent = isIndexFile
        ? processIndexFileToNamedImports(fileContent)
        : fileContent.replace(
            // Looking for relative imports within the same package
            /import\s+([^'"]+)\s+from\s+'([^']+)'/g,
            (original, importName, importPath) => {
              const foundExternalDep = pkg.group_dependencies.find(item => {
                return item.component_path === importName
              })

              if (foundExternalDep) {
                processedImports.push(foundExternalDep.package_name)

                return `import { ${importName} } from '${foundExternalDep.package_name}'`
              }

              if (importPath.startsWith('../utils')) {
                processedImports.push('@toptal/picasso-utils')
                if (importName.includes('{')) {
                  return `import ${importName} from '@toptal/picasso-utils'`
                }

                return `import { ${importName} } from '@toptal/picasso-utils'`
              }

              if (importPath.startsWith('../Icon')) {
                processedImports.push('@toptal/picasso-icons')
                if (importName.includes('{')) {
                  return `import ${importName} from '@toptal/picasso-icons'`
                }

                return `import { ${importName} } from '@toptal/picasso-icons'`
              }

              processedImports.push(`../${importPath}`)

              return original
            }
          )

      fs.writeFileSync(filePath, updatedContent)
    }
  })

  return processedImports
}

const findMatchingExternalDep = (packageJsonPath, importName) => {
  const { peerDependencies, dependencies, devDependencies } = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf-8')
  )
  const foundPeerDep = Object.keys(peerDependencies).find(item =>
    importName.includes(item)
  )
  const foundDep = Object.keys(dependencies).find(item =>
    importName.includes(item)
  )
  const foundDevDep = Object.keys(devDependencies).find(item =>
    importName.includes(item)
  )

  if (foundDep) {
    return ['dependencies', { [foundDep]: dependencies[foundDep] }]
  }
  if (foundPeerDep) {
    return [
      'peerDependencies',
      { [foundPeerDep]: peerDependencies[foundPeerDep] },
    ]
  }
  if (foundDevDep) {
    return ['devDependencies', { [foundDevDep]: devDependencies[foundDevDep] }]
  }

  return null
}

const processExternalDeps = (folderPath, processedImports, pkg) => {
  const packageFolder = `${__dirname}/packages/base/${pkg.group_name}`
  const packageJson = JSON.parse(
    fs.readFileSync(`${packageFolder}/package.json`, 'utf-8')
  )

  const allImports = []

  fs.readdirSync(folderPath, { recursive: true }).forEach(file => {
    const filePath = path.join(folderPath, file)

    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const regex = /from\s+['"]([^'"]+)['"]/g
      let match

      while ((match = regex.exec(fileContent)) !== null) {
        allImports.push(match[1])
      }
    }
  })
  const uniqImports = [...new Set(allImports)]
  const externalImports = uniqImports.filter(
    item =>
      !processedImports.includes(item) &&
      !item.startsWith('.') &&
      !item.startsWith('..') &&
      !item.startsWith('@toptal/picasso')
  )

  externalImports.forEach(importName => {
    const foundInPicasso = findMatchingExternalDep(
      './packages/picasso/package.json',
      importName
    )

    if (foundInPicasso) {
      packageJson[foundInPicasso[0]] = {
        ...packageJson[foundInPicasso[0]],
        ...foundInPicasso[1],
      }
    }
  })

  fs.writeFileSync(
    `${packageFolder}/package.json`,
    JSON.stringify(packageJson, null, 2)
  )
}

const cleanUp = () => {
  try {
    fs.rmSync(`${__dirname}/packages/base`, { recursive: true })
  } catch (e) {
    console.log('No base folder found')
  }
  fs.mkdirSync(`${__dirname}/packages/base`)
}

const addPackageToTsconfig = pkg => {
  const packageName = getPackageName(pkg.group_name)
  const sourcePath = `packages/base/${pkg.group_name}/src`
  const tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'))

  tsconfig.compilerOptions.paths[packageName] = [sourcePath]
  tsconfig.compilerOptions.paths[`${packageName}/*`] = [`${sourcePath}/*`]

  fs.writeFileSync('./tsconfig.json', JSON.stringify(tsconfig, null, 2))
}

const processPackage = pkg => {
  const folder = createStructure(pkg)

  const processedImports = replaceInternalImports(folder, pkg)

  processExternalDeps(folder, processedImports, pkg)

  addPackageToTsconfig(pkg)
}

cleanUp()

// For debugging
const processOne = index => {
  const pkg = itemsWithExternalDepsAndGroupNames[index]

  console.log(pkg)
  processPackage(pkg)
}

// processOne(1)

// Uncomment to process all
itemsWithExternalDepsAndGroupNames.forEach(processPackage)

console.log(`Done w/ ${itemsWithExternalDepsAndGroupNames.length} packages`)
