import { Transform } from 'jscodeshift'

const borderableVariants = ['white', 'transparent', undefined]

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  return j(file.source)
    .findJSXElements('Container')
    .filter(path =>
      path.node.openingElement.attributes.some(
        attribute =>
          attribute.type === 'JSXAttribute' &&
          attribute.name.name === 'variant' &&
          attribute.value &&
          !borderableVariants.includes((attribute.value as any).value)
      )
    )
    .filter(path =>
      path.node.openingElement.attributes.some(
        attribute =>
          attribute.type === 'JSXAttribute' &&
          attribute.name.name === 'bordered'
      )
    )
    .map(path => {
      path.node.openingElement.attributes = path.node.openingElement.attributes.filter(
        attribute =>
          attribute.type === 'JSXAttribute' &&
          attribute.name.name !== 'bordered'
      )

      return path
    })
    .toSource({ quote: 'single' })
}

export default transform
