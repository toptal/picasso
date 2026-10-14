#!/usr/bin/env node
// Warns about published versions npm doesn't show yet. npm can take many minutes,
// and the publish step itself fails the job when a package fails to publish.
//
// Reads the changesets/action `publishedPackages` output via the PUBLISHED_PACKAGES
// env var (JSON: [{ name, version }, ...]). Picasso packages publish `access: public`,
// so `npm view` resolves them without auth.
import { execFileSync } from 'node:child_process'
import { appendFileSync } from 'node:fs'

const POLL_INTERVAL_MS = 30_000
const MAX_WAIT_MS = 5 * 60_000

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

const checkPending = specs =>
  specs.filter(spec => {
    const ok = onNpm(spec)

    console.log(`${ok ? '✓' : '…'} ${spec}`)

    return !ok
  })

const deadline = Date.now() + MAX_WAIT_MS
let pending = checkPending(pkgs.map(p => `${p.name}@${p.version}`))

while (pending.length > 0 && Date.now() < deadline) {
  const secondsLeft = Math.round((deadline - Date.now()) / 1000)

  console.log(
    `Waiting ${
      POLL_INTERVAL_MS / 1000
    }s for npm propagation (${secondsLeft}s left)...`
  )
  await sleep(POLL_INTERVAL_MS)
  pending = checkPending(pending)
}

if (pending.length > 0) {
  const list = pending.join(', ')

  console.log(
    `::warning::${pending.length} published package(s) not yet visible on npm: ${list}`
  )

  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      [
        `### Not yet visible on npm after ${MAX_WAIT_MS / 60_000} min`,
        '',
        ...pending.map(spec => `- \`${spec}\``),
        '',
      ].join('\n')
    )
  }
} else {
  console.log(`All ${pkgs.length} published package(s) verified on npm.`)
}
