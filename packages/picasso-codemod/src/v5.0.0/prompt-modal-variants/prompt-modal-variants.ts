import { Transform, JSXAttribute, JSXText } from 'jscodeshift'

const newVariantOf: Record<string, string> = {
  blue: 'positive',
  green: 'positive',
  red: 'negative'
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
        const attribute = attributes[attributeIndex]
        const variant = attribute
          ? ((attribute as JSXAttribute).value as JSXText).value
          : undefined

        if (variant) {
          attributes[attributeIndex] = j.jsxAttribute(
            j.jsxIdentifier('variant'),
            j.literal(newVariantOf[variant])
          )
        }
      })
      .toSource({ quote: 'single' })
  )
}

export default transform
