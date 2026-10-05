#!/usr/bin/env node
// Writes Icon.figma.batch.json from the Figma "Iconography" component listing.
// Usage: node bin/generate-icon-code-connect.mjs <listing.json>
// The listing is the output of the Figma MCP tool
// list_file_components_for_code_connect for file TqaGgbpjGSUDf7qq153Isq.
import fs from 'fs'

const ICON_DIR = 'packages/base/Icons/src/Icon'
const FILE_URL =
  'https://www.figma.com/design/TqaGgbpjGSUDf7qq153Isq/Iconography'
const SOURCE_URL = `https://github.com/toptal/picasso/blob/master/${ICON_DIR}`

const listingFile = process.argv[2]

if (!listingFile) {
  console.error('Usage: node bin/generate-icon-code-connect.mjs <listing.json>')
  process.exit(1)
}

const sizesByName = {}

for (const file of fs.readdirSync(ICON_DIR)) {
  const match = file.match(/^([A-Z]\w*?)(16|24|32)\.tsx$/)

  if (match) {
    ;(sizesByName[match[1]] ??= []).push(match[2])
  }
}

// "Arrow Down", "ACH" → "arrowdown", "ach"; only exact matches are mapped
const normalize = name => name.replace(/[^A-Za-z0-9]/g, '').toLowerCase()
const nameByKey = Object.fromEntries(
  Object.keys(sizesByName).map(name => [normalize(name), name])
)

const components = []
const withoutPicasso = []
const matched = new Set()

for (const set of JSON.parse(fs.readFileSync(listingFile, 'utf8'))) {
  const name = nameByKey[normalize(set.name)]

  if (!name) {
    withoutPicasso.push(set.name)
    continue
  }

  matched.add(name)
  const sizes = sizesByName[name].sort((a, b) => a - b)
  const sizeProperty = Object.keys(set.properties).find(
    key => key.toLowerCase() === 'size'
  )

  components.push({
    url: `${FILE_URL}?node-id=${set.nodeId.replace(':', '-')}`,
    source: `${SOURCE_URL}/${name}${sizes[0]}.tsx`,
    component: name,
    name,
    sizes,
    ...(sizeProperty !== 'Size' && { sizeProperty }),
  })
}

components.sort(
  (a, b) => a.name.localeCompare(b.name) || a.url.localeCompare(b.url)
)

// Figma has a few icons twice; each Code Connect doc still needs its own id
const idCount = {}

for (const entry of components) {
  idCount[entry.name] = (idCount[entry.name] ?? 0) + 1
  entry.id =
    idCount[entry.name] === 1
      ? entry.name
      : `${entry.name}-${idCount[entry.name]}`
}

fs.writeFileSync(
  `${ICON_DIR}/Icon.figma.batch.json`,
  `${JSON.stringify(
    { templateFile: './Icon.figma.batch.ts', components },
    null,
    2
  )}\n`
)

const withoutFigma = Object.keys(sizesByName).filter(name => !matched.has(name))

console.log(
  `Mapped ${components.length} Figma icons to ${matched.size} Picasso icons`
)
console.log(`\nFigma icons without a Picasso icon (${withoutPicasso.length}):`)
console.log(withoutPicasso.sort().join('\n'))
console.log(`\nPicasso icons without a Figma icon (${withoutFigma.length}):`)
console.log(withoutFigma.sort().join('\n'))
