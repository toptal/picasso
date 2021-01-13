import { JSXAttribute, Transform } from 'jscodeshift'

const getNewValue = (attribute: JSXAttribute) => {
  if (!attribute?.value) {
    return 'all'
  }

  return 'expression' in attribute.value &&
    'value' in attribute.value.expression &&
    attribute.value.expression.value
    ? 'all'
    : 'none'
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  return (
    j(file.source)
      .findJSXElements('Accordion')
      // eslint-disable-next-line complexity
      .forEach(path => {
        path.node.openingElement.attributes = path.node.openingElement.attributes.map(
          attribute => {
            if (
              attribute.type === 'JSXAttribute' &&
              attribute.name.name === 'bordered'
            ) {
              return j.jsxAttribute(
                j.jsxIdentifier('borders'),
                j.literal(getNewValue(attribute))
              )
            }

            return attribute
          }
        )
      })
      .toSource({ quote: 'single' })
  )
}

export default transform
