#!/usr/bin/env node
// One-shot script: scan each workspace package's src/ for cross-workspace
// imports and add any missing ones to that package's `dependencies`.
//
// Run from repo root:  node bin/add-missing-workspace-deps.mjs
//
// Delete after the migration lands.

import { promises as fs } from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(import.meta.dirname, '..')

const PACKAGE_ROOTS = [
  path.join(repoRoot, 'packages'),
  path.join(repoRoot, 'packages', 'base'),
]

async function listPackageDirs() {
  const dirs = []
  for (const root of PACKAGE_ROOTS) {
    const entries = await fs.readdir(root, { withFileTypes: true })
    for (const e of entries) {
      if (!e.isDirectory()) continue
      // packages/base is itself a child of packages — don't recurse
      if (root === PACKAGE_ROOTS[0] && e.name === 'base') continue
      const dir = path.join(root, e.name)
      const pkgJson = path.join(dir, 'package.json')
      try {
        await fs.access(pkgJson)
        dirs.push(dir)
      } catch {}
    }
  }
  return dirs
}

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, 'utf8'))
}

async function writeJson(p, data) {
  await fs.writeFile(p, JSON.stringify(data, null, 2) + '\n')
}

async function findSourceFiles(dir) {
  const out = []
  async function walk(d) {
    let entries
    try {
      entries = await fs.readdir(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name === 'node_modules' || e.name === 'dist-package' || e.name.startsWith('.')) continue
      const p = path.join(d, e.name)
      if (e.isDirectory()) await walk(p)
      else if (/\.(ts|tsx|js|jsx|mjs)$/.test(e.name)) out.push(p)
    }
  }
  await walk(path.join(dir, 'src'))
  // Split production vs test/story files. Production deps go in
  // `dependencies`, test/story deps go in `devDependencies`.
  const isTestOrStory = f =>
    /(?:^|\/)test\.(?:t|j)sx?$/.test(f) ||
    /\.test\.(?:t|j)sx?$/.test(f) ||
    /\.example\.(?:t|j)sx?$/.test(f) ||
    /\/(?:story|stories|__testfixtures__|__mocks__)\//.test(f)
  return {
    prod: out.filter(f => !isTestOrStory(f)),
    test: out.filter(f => isTestOrStory(f)),
  }
}

const IMPORT_RE = /(?:from|import|require\()\s*['"]((?:@[^'"\/]+\/)?[^'"\/]+)(?:\/[^'"]*)?['"]/g

async function extractImports(file) {
  const content = await fs.readFile(file, 'utf8')
  const imports = new Set()
  for (const m of content.matchAll(IMPORT_RE)) {
    imports.add(m[1])
  }
  return imports
}

async function main() {
  const dirs = await listPackageDirs()

  // Build name -> { dir, version } map for workspace packages
  const workspaceByName = new Map()
  for (const dir of dirs) {
    const pkg = await readJson(path.join(dir, 'package.json'))
    workspaceByName.set(pkg.name, { dir, version: pkg.version, pkg })
  }

  const targets = ['@toptal/picasso', '@toptal/base-', '@topkit/']

  let totalAdded = 0
  for (const dir of dirs) {
    const pkgPath = path.join(dir, 'package.json')
    const pkg = await readJson(pkgPath)
    const declared = new Set([
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ])

    const { prod, test } = await findSourceFiles(dir)

    async function collect(files) {
      const found = new Set()
      for (const f of files) {
        const imports = await extractImports(f)
        for (const imp of imports) {
          if (!targets.some(t => imp.startsWith(t))) continue
          if (imp === pkg.name) continue
          if (workspaceByName.has(imp)) found.add(imp)
        }
      }
      return found
    }

    const prodImports = await collect(prod)
    const testImports = await collect(test)

    const missingProd = [...prodImports].filter(n => !declared.has(n)).sort()
    // Test deps: missing if not declared anywhere AND not in prodImports
    // (prod imports that we just added to dependencies should not be re-added
    // to devDependencies)
    const missingTest = [...testImports]
      .filter(n => !declared.has(n) && !prodImports.has(n) && !missingProd.includes(n))
      .sort()

    let changed = false

    if (missingProd.length > 0) {
      pkg.dependencies = pkg.dependencies || {}
      for (const dep of missingProd) {
        const { version } = workspaceByName.get(dep)
        pkg.dependencies[dep] = version
        console.log(`${pkg.name}: + dep ${dep}@${version}`)
        totalAdded++
      }
      pkg.dependencies = Object.fromEntries(
        Object.entries(pkg.dependencies).sort(([a], [b]) => a.localeCompare(b))
      )
      changed = true
    }

    if (missingTest.length > 0) {
      pkg.devDependencies = pkg.devDependencies || {}
      for (const dep of missingTest) {
        const { version } = workspaceByName.get(dep)
        pkg.devDependencies[dep] = version
        console.log(`${pkg.name}: + devDep ${dep}@${version}`)
        totalAdded++
      }
      pkg.devDependencies = Object.fromEntries(
        Object.entries(pkg.devDependencies).sort(([a], [b]) => a.localeCompare(b))
      )
      changed = true
    }

    if (changed) await writeJson(pkgPath, pkg)
  }

  console.log(`\nTotal deps added: ${totalAdded}`)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
