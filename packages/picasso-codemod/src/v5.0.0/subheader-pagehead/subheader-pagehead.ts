import { Transform } from 'jscodeshift'

import { findComponents, renameImport } from '../../utils'

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  const root = j(file.source)

  renameImport('Subheader', 'PageHead', root, j)

  findComponents('Subheader', root, j)
    .find(j.JSXIdentifier, { name: 'Subheader' })
    .replaceWith(({ node }) => {
      node.name = 'PageHead'

      return node
    })

  return root.toSource()
}

export default transform
