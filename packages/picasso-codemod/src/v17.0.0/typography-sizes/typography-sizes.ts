import { JSXAttribute, JSXIdentifier, JSXText, Transform } from 'jscodeshift'

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

let affectedComponents = ['Typography', 'TypographyOverflow', 'Amount']

const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift

  if (Array.isArray(options.parserConfig?.includeComponents)) {
    affectedComponents = affectedComponents.concat(
      options.parserConfig.includeComponents
    )
  }

  return j(file.source)
    .findJSXElements()
    .filter(path => {
      const { attributes, name } = path.node.openingElement

      const isAffectedComponent = affectedComponents.includes(
        (name as JSXIdentifier)?.name
      )

      // exclude components with `variant` prop other than body
      const shouldBeExcluded = (attributes as JSXAttribute[]).find(
        attribute =>
          attribute.type === 'JSXAttribute' &&
          attribute.name.name === 'variant' &&
          (attribute.value as JSXText)?.value !== 'body'
      )

      return isAffectedComponent && !shouldBeExcluded
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
}

export default transform
