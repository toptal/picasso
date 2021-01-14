import { Transform, JSXAttribute, JSXIdentifier } from 'jscodeshift'

const transparentToButtonAction = [
  'transparent-white',
  'transparent-blue',
  'transparent-green'
]

const variantTransforms: Record<string, string> = {
  'primary-blue': 'primary',
  'primary-red': 'negative',
  'primary-green': 'positive',
  'secondary-blue': 'secondary',
  'secondary-red': 'secondary',
  'secondary-green': 'secondary',
  flat: 'secondary',
  'flat-white': 'transparent',
  'secondary-white': 'transparent'
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  const root = j(file.source)

  const buttons = root.findJSXElements('Button')

  buttons
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'circular'
      }
    })
    .forEach(nodePath => {
      const { openingElement, closingElement } = nodePath.parent.parent.node

      const transparentVariant = nodePath.parent.node.attributes.find(
        (attribute: JSXAttribute) => {
          return (
            attribute.name.name === 'variant' &&
            attribute.value?.type === 'StringLiteral' &&
            transparentToButtonAction.includes(attribute.value.value)
          )
        }
      )

      openingElement.name.name = 'Button.Circular'

      if (closingElement) {
        closingElement.name.name = 'Button.Circular'
      }

      if (transparentVariant) {
        transparentVariant.value.value = 'flat'
        transparentVariant.value.raw = 'flat'
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
    // do not modify Button.Circular - they were already handled
    .filter(
      nodePath =>
        (nodePath.node.openingElement.name as JSXIdentifier).name === 'Button'
    )
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
      const newValue = variantTransforms[node.value]

      return j.stringLiteral(newValue)
    })

  return buttons.toSource({ quote: 'single' })
}

export default transform
