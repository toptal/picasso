import { Transform } from 'jscodeshift'

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

        if (attribute && 'value' in attribute && attribute.value) {
          const isNegative =
            'value' in attribute.value && attribute.value.value === 'red'

          attributes[attributeIndex] = j.jsxAttribute(
            j.jsxIdentifier('variant'),
            j.literal(isNegative ? 'negative' : 'positive')
          )
        }
      })
      .toSource({ quote: 'single' })
  )
}

export default transform
