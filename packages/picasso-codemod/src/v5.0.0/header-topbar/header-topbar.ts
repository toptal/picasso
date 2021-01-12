import { Transform } from 'jscodeshift'

import { findComponents } from '../../utils'

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  const root = j(file.source)

  findComponents('Page.Header', root, j)
    .find(j.JSXIdentifier, { name: 'Header' })
    .replaceWith(({ node }) => {
      node.name = 'TopBar'

      return node
    })

  return root.toSource()
}

export default transform
