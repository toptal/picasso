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

// npm can take a minute or more to serve a new version: stragglers showed up
// 50-60s after publish, past the previous 40s window. Re-check for up to 5 min.
const PASSES = 11
const PASS_DELAY_S = 30

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

for (let pass = 1; pass <= PASSES && pending.length > 0; pass++) {
  if (pass > 1) {
    console.log(
      `Waiting ${PASS_DELAY_S}s for npm propagation (pass ${pass}/${PASSES})...`
    )
    await sleep(PASS_DELAY_S * 1000)
  }

  pending = pending.filter(spec => {
    const ok = onNpm(spec)

    console.log(`${ok ? '✓' : '…'} ${spec}`)

    return !ok
  })
}

if (pending.length > 0) {
  console.error(
    `::error::${
      pending.length
    } published package(s) not found on npm: ${pending.join(', ')}`
  )
  process.exit(1)
}

console.log(`All ${pkgs.length} published package(s) verified on npm.`)
