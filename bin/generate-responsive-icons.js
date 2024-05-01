const ts = require('typescript')
const fs = require('fs').promises
const path = require('path')

const ICON_COMPONENTS_DIRECTORY = 'packages/base/Icons/src/Icon'
const ICONS_DIRECTORY_PATH = path.resolve(
  __dirname,
  `../${ICON_COMPONENTS_DIRECTORY}`
)
const INDEX_FILE_PATH = `${ICONS_DIRECTORY_PATH}/index.ts`

// Template to use for generating responsive icon files
const template = name => {
  return `import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ${name}16 from './${name}16'
import ${name}24 from './${name}24'
import type { Props } from './${name}16'

const ${name}Responsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <${name}16 {...props} />,
    },
    <${name}24 {...props} />
  ) as JSX.Element
}

export default ${name}Responsive
`
}

const onlyRequiredSize = name => name.includes('16') || name.includes('24')
const removeSize = name => name.replace(/(16|24)/, '')
const removePrefix = name => name.replace(/\.\//, '')

// Get all exports from index.ts using the TypeScript compiler API
const getExportsInFile = async file => {
  const sourceFile = ts.createSourceFile(
    'index.ts',
    await fs.readFile(file, 'utf8'),
    ts.ScriptTarget.Latest
  )

  const exportDeclarations = []

  ts.forEachChild(sourceFile, node => {
    if (ts.isExportDeclaration(node)) {
      exportDeclarations.push(node.moduleSpecifier.text)
    }
  })

  // Return unique list of exports without size
  return [
    ...new Set(
      exportDeclarations
        .filter(onlyRequiredSize)
        .map(removeSize)
        .map(removePrefix)
    ),
  ]
}

const generateResponsiveIconFiles = async iconNames => {
  iconNames.forEach(async name => {
    await fs.writeFile(
      `${ICONS_DIRECTORY_PATH}/${name}Responsive.tsx`,
      template(name)
    )
  })
}

const insertExports = async (iconNames, indexFilePath) => {
  const exportLines = iconNames.map(
    item => `export { default as ${item}Responsive } from './${item}Responsive'`
  )

  try {
    const data = await fs.readFile(indexFilePath, 'utf-8')

    const newExportLines = exportLines.filter(line => !data.includes(line))

    if (newExportLines.length === 0) {
      console.log('No new responsive exports to insert.')

      return
    }

    const updatedContent = data + '\n' + newExportLines.join('\n')

    await fs.writeFile(indexFilePath, updatedContent, 'utf-8')
    console.log('New responsive exports added successfully.')
  } catch (err) {
    console.error('Error writing file:', err)
  }
}

;(async () => {
  const iconNames = await getExportsInFile(INDEX_FILE_PATH)

  await generateResponsiveIconFiles(iconNames)

  await insertExports(iconNames, INDEX_FILE_PATH)
})().catch(err => {
  console.error(err)
})
