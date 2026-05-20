// Fetch Happo diff images for visual inspection
import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'

const apiKey = process.env.HAPPO_API_KEY
const apiSecret = process.env.HAPPO_API_SECRET

if (!apiKey || !apiSecret) {
  console.error('Missing HAPPO_API_KEY or HAPPO_API_SECRET')
  process.exit(1)
}

const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
const headers = { Authorization: `Basic ${auth}`, Accept: 'application/json' }

const accountId = '675'
const projectId = '1189'
const baseSha = '4e199439ed30feda435d00dcec81fedbb938c3da'
const headSha = 'f008a4fd5cb59d810156ab53d570abd499f01277-Switch'

const url = `https://happo.io/api/a/${accountId}/p/${projectId}/comparisons/${baseSha}/${headSha}/compare-results`
console.log('Fetching:', url)

const resp = await fetch(url, { headers })
if (!resp.ok) {
  const body = await resp.text()
  console.error('Failed:', resp.status, resp.statusText, body.slice(0, 500))
  process.exit(1)
}

const data = await resp.json()
console.log('Summary:', data.summary)
console.log('Total diffs:', data.diffs?.length)
console.log('Unchanged:', data.unchangedCount)

const destDir = 'migration-runs/2026-05-20/Switch/happo-diffs'
await mkdir(destDir, { recursive: true })

for (let i = 0; i < (data.diffs?.length ?? 0); i++) {
  const pair = data.diffs[i]
  const [oldSnap, newSnap] = pair
  console.log(`\nDiff ${i+1}: ${oldSnap.component} / ${oldSnap.variant} / ${oldSnap.target}`)

  for (const [snap, suffix] of [[oldSnap, 'old'], [newSnap, 'new']]) {
    const imgUrl = `https://happo.io${snap.url}`
    const filename = path.join(destDir, `${String(i+1).padStart(2,'0')}-${snap.component}-${snap.variant}-${snap.target}-${suffix}.png`.replace(/[\/\s]+/g, '-').slice(0, 100))
    const imgResp = await fetch(imgUrl, { headers: { Authorization: `Basic ${auth}` } })
    if (imgResp.ok) {
      const buffer = Buffer.from(await imgResp.arrayBuffer())
      await import('node:fs').then(fs => fs.promises.writeFile(filename, buffer))
      console.log(`  ${suffix}: ${filename} (${buffer.length} bytes)`)
    } else {
      console.error(`  Failed ${suffix}: ${imgResp.status}`)
    }
  }
}
