/* eslint-disable id-length */
// TODO: disable id-length rule for codemods
import { Transform } from 'jscodeshift'

import { findComponents, renameImport } from '../../utils'

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  const root = j(file.source)

  renameImport('Label', 'Tag', root, j)

  findComponents('Label', root, j)
    .find(j.JSXIdentifier, { name: 'Label' })
    .replaceWith(({ node }) => {
      // TODO: probably it's better to create a new item here and return it
      // instead of modifying existing ast
      node.name = 'Tag'

      return node
    })

  findComponents('Label.Group', root, j)
    .find(j.JSXIdentifier, { name: 'Label' })
    .replaceWith(({ node }) => {
      node.name = 'Tag'

      return node
    })

  return root.toSource()
}

export default transform
