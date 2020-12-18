import { Transform, JSXAttribute, JSXText } from 'jscodeshift'

const getNewVariant = (oldVariant?: string) => {
  if (oldVariant === 'blue' || oldVariant === 'green') return 'positive'
  if (oldVariant === 'red') return 'negative'

  return undefined
}

const transform: Transform = (file, api) => {
  // eslint-disable-next-line id-length
  const j = api.jscodeshift

  return (
    j(file.source)
      .findJSXElements('PromptModal')
      // eslint-disable-next-line complexity
      .forEach(path => {
        const attributes = path.node.openingElement.attributes
        const attributeIndex = attributes.findIndex(
          node => node.type === 'JSXAttribute' && node.name.name === 'variant'
        )
        const attribute = attributes[attributeIndex] as JSXAttribute | undefined
        const variant = (attribute?.value as JSXText)?.value
        const newVariant = getNewVariant(variant)

        if (newVariant) {
          attributes[attributeIndex] = j.jsxAttribute(
            j.jsxIdentifier('variant'),
            j.literal(newVariant)
          )
        }
      })
      .toSource({ quote: 'single' })
  )
}

export default transform
