/* eslint-disable complexity */
import { Transform } from 'jscodeshift'

import { findComponents } from '../../utils'

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  const root = j(file.source)

  const buttons = findComponents('Button', root, j)

  buttons
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'circular'
      }
    })
    .forEach(el => {
      el.parent.value.name = 'Button.Circular'
    })
    .remove()

  buttons
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'variant'
      }
    })
    .find(j.Literal)
    .replaceWith(({ node }) => {
      let newValue = ''

      switch (node.value) {
        case 'primary-blue':
          newValue = 'primary'
          break
        case 'primary-red':
          newValue = 'negative'
          break
        case 'primary-green':
          newValue = 'positive'
          break
        case 'secondary-blue':
        case 'secondary-red':
        case 'secondary-green':
        case 'flat':
          newValue = 'secondary'
          break

        case 'transparent-white':
        case 'transparent-blue':
        case 'transparent-green':
        case 'flat-white':
        case 'secondary-white':
          newValue = 'transparent'
          break
      }

      return j.stringLiteral(newValue)
    })

  return buttons.toSource({ quote: 'single' })
}

export default transform
