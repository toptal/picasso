#!/usr/bin/env node
// Post-publish safety net: verify every package that `changeset publish` reported
// as published is actually resolvable on npm. Guards against a silent PARTIAL
// publish (e.g. npm's rate limit cutting a ~90-package big-bang short) by turning
// it into a hard job failure instead of a green-but-incomplete release.
//
// Reads the changesets/action `publishedPackages` output via the PUBLISHED_PACKAGES
// env var (JSON: [{ name, version }, ...]). Picasso packages publish `access: public`,
// so `npm view` resolves them without auth.
import { execFileSync } from 'node:child_process'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

let pkgs
try {
  pkgs = JSON.parse(process.env.PUBLISHED_PACKAGES || '[]')
} catch (err) {
  console.error('Could not parse PUBLISHED_PACKAGES:', err.message)
  process.exit(1)
}

if (!Array.isArray(pkgs) || pkgs.length === 0) {
  console.log('No published packages reported; nothing to verify.')
  process.exit(0)
}

const onNpm = spec => {
  try {
    execFileSync('npm', ['view', spec, 'version'], { stdio: 'ignore' })

    return true
  } catch {
    return false
  }
}

let pending = pkgs.map(p => `${p.name}@${p.version}`)

// Registry/CDN propagation can lag a few seconds after publish, so re-check stragglers.
for (let pass = 1; pass <= 3 && pending.length > 0; pass++) {
  if (pass > 1) {
    console.log(`Waiting 20s for npm propagation (pass ${pass}/3)...`)
    await sleep(20_000)
  }

  pending = pending.filter(spec => {
    const ok = onNpm(spec)

    console.log(`${ok ? '✓' : '…'} ${spec}`)

    return !ok
  })
}

if (pending.length > 0) {
  console.error(
    `::error::${pending.length} published package(s) not found on npm: ${pending.join(', ')}`
  )
  process.exit(1)
}

console.log(`All ${pkgs.length} published package(s) verified on npm.`)
