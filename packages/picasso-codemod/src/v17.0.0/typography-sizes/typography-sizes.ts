import { JSXAttribute, JSXText, Transform } from 'jscodeshift'

const getNewSize = (oldSize: string): string => {
  switch (oldSize) {
    case 'small':
      return 'xsmall'
    case 'xsmall':
      return 'xxsmall'
    default:
      return oldSize
  }
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  return (
    j(file.source)
      .findJSXElements('Typography')
      // exclude Typography with `variant` prop other than body
      .filter(path => {
        const { attributes } = path.node.openingElement

        const shouldBeExcluded = (attributes as JSXAttribute[]).find(
          attribute =>
            attribute.type === 'JSXAttribute' &&
            attribute.name.name === 'variant' &&
            (attribute.value as JSXText)?.value !== 'body'
        )

        return !shouldBeExcluded
      })
      .find(j.JSXAttribute, {
        name: {
          type: 'JSXIdentifier',
          name: 'size'
        }
      })
      .find(j.StringLiteral)
      .replaceWith(path => {
        const newSize = getNewSize(path.node.value)

        return j.stringLiteral(newSize)
      })
      .toSource({ quote: 'single' })
  )
}

export default transform
