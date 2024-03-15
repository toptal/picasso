#! /usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import { globbyStream } from 'globby'
import { $, argv, echo, chalk } from 'zx'
import JSON5 from 'json5'

const ALL_PROJECTS_TSCONFIG = 'tsconfig.pkgsrc.json'

const formatFile = async file => {
  await $`yarn -s prettier --write ${file}`
}

const fileExists = async file => {
  try {
    await fs.stat(file)

    return true
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e
    }

    return false
  }
}

const readTsconfig = async dir => {
  try {
    return JSON5.parse(await fs.readFile(path.join(dir, 'tsconfig.json')))
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e
    }

    return undefined
  }
}

const resolvePkgMeta = async dir => {
  try {
    const pkgJsonLocation = path.join(dir, 'package.json')
    const pkgJson = JSON5.parse(await fs.readFile(pkgJsonLocation))

    return {
      dir: path.resolve(dir),
      pkg: pkgJson,
      tsconfig: await readTsconfig(dir),
    }
  } catch (e) {
    // Rethrow errors other than ENOENT (package.json file not found)
    if (e.code !== 'ENOENT') {
      throw e
    }

    return undefined
  }
}

const buildWorkspace = async rootPath => {
  const rootPkgJsonLocation = path.join(rootPath, 'package.json')
  const rootPkgJson = JSON5.parse(
    await fs.readFile(rootPkgJsonLocation, 'utf8')
  )

  const metaPromises = []
  const packagesDirectoriesStream = globbyStream(rootPkgJson.workspaces, {
    onlyDirectories: true,
  })

  for await (const dir of packagesDirectoriesStream) {
    metaPromises.push(resolvePkgMeta(dir))
  }

  return (await Promise.all(metaPromises)).reduce((workspace, metaPkg) => {
    if (metaPkg) {
      workspace[metaPkg.pkg.name] = metaPkg
    }

    return workspace
  }, {})
}

const referencesFor = ({ dir, pkg }, workspace) => {
  const dependencies = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ])

  return [...dependencies]
    .flatMap(dep => {
      const depMeta = workspace[dep]

      if (depMeta && depMeta.tsconfig) {
        return [{ path: path.relative(dir, depMeta.dir) }]
      }

      return []
    })
    .sort((aux, bux) => aux.path.localeCompare(bux.path))
}

const replaceReferenceOfTsconfigFile = async (tsconfigLocation, references) => {
  const tsconfig = JSON5.parse(await fs.readFile(tsconfigLocation, 'utf8'))

  const newTsconfig = {
    ...tsconfig,
    references,
  }

  await fs.writeFile(tsconfigLocation, JSON5.stringify(newTsconfig) + '\n')

  await formatFile(tsconfigLocation)

  return newTsconfig
}

const refreshReferencesOfPackage = async (pkgMeta, workspace) => {
  try {
    const tsconfigLocation = path.join(pkgMeta.dir, 'tsconfig.json')

    return await replaceReferenceOfTsconfigFile(
      tsconfigLocation,
      referencesFor(pkgMeta, workspace)
    )
  } catch (e) {
    // No tsconfig.json on package
    if (e.code === 'ENOENT') {
      return undefined
    }

    throw e
  }
}

const main = async () => {
  const rootPath = url.fileURLToPath(new URL('..', import.meta.url))
  const workspace = await buildWorkspace(rootPath)
  const allProjects = []

  const refreshingPromises = []

  const workspaceByPath = Object.values(workspace).reduce((acc, pkgMeta) => {
    acc[pkgMeta.dir] = pkgMeta

    return acc
  }, {})

  // Find packages by their package.json location
  const args = argv._.map(
    arg => workspaceByPath[path.resolve(arg)]?.pkg.name ?? arg
  )

  const targets = args.length ? args : Object.keys(workspace)

  echo(
    `Refreshing tsconfig references for packages: ${chalk.green(
      `${targets.join(', ')}`
    )}`
  )

  for (const pkgMeta of targets.map(name => workspace[name]).filter(Boolean)) {
    if (pkgMeta.tsconfig) {
      allProjects.push(pkgMeta.dir)
    }

    refreshingPromises.push(refreshReferencesOfPackage(pkgMeta, workspace))
  }

  await Promise.all(refreshingPromises)

  const allTsconfigLoc = path.join(rootPath, ALL_PROJECTS_TSCONFIG)
  const allReferences = Object.values(workspace)
    .filter(pkg => pkg.tsconfig)
    .map(pkg => ({
      path: path.relative(rootPath, pkg.dir),
    }))

  await replaceReferenceOfTsconfigFile(allTsconfigLoc, allReferences)
}

await main()
