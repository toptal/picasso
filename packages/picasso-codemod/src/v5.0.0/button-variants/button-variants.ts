/* eslint-disable complexity */
import { Transform } from 'jscodeshift'

import { findComponents } from '../../utils'

const transparentToButtonAction = [
  'transparent-white',
  'transparent-blue',
  'transparent-green'
]

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
    .forEach(nodePath => {
      const { openingElement, closingElement } = nodePath.parent.parent.node

      openingElement.name.name = 'Button.Circular'

      if (closingElement) {
        closingElement.name.name = 'Button.Circular'
      }
    })
    .remove()

  buttons
    .find(j.JSXAttribute, {
      name: {
        name: 'variant'
      }
    })
    .filter(
      nodePath =>
        nodePath.node.value?.type === 'StringLiteral' &&
        transparentToButtonAction.includes(nodePath.node.value.value)
    )
    .forEach(nodePath => {
      const { openingElement, closingElement } = nodePath.parent.parent.node

      openingElement.name.name = 'Button.Action'

      if (closingElement) {
        closingElement.name.name = 'Button.Action'
      }
    })
    .remove()

  buttons
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'variant'
      }
    })
    .filter(
      nodePath =>
        nodePath.node.value?.type === 'StringLiteral' &&
        !transparentToButtonAction.includes(nodePath.node.value.value)
    )
    .find(j.StringLiteral)
    .replaceWith(({ node }) => {
      let newValue = 'primary-blue'

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
