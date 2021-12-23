import { JSXAttribute, JSXIdentifier, JSXText, Transform } from 'jscodeshift'

let affectedComponents = ['Typography', 'TypographyOverflow', 'Amount']

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
const hasVariantHeadingAttribute = (attributes: JSXAttribute[]) =>
  attributes.some(
    attribute =>
      attribute.type === 'JSXAttribute' &&
      attribute.name.name === 'variant' &&
      (attribute.value as JSXText)?.value === 'heading'
  )

const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift

  if (Array.isArray(options.parserConfig?.includeComponents)) {
    affectedComponents = affectedComponents.concat(
      options.parserConfig.includeComponents
    )
  }

  return j(file.source)
    .find(j.JSXAttribute, {
      name: {
        type: 'JSXIdentifier',
        name: 'size'
      }
    })
    .filter(path => {
      const { value, parentPath } = path.parentPath

      const isAffectedComponent = affectedComponents.includes(
        (parentPath?.value?.name as JSXIdentifier)?.name
      )

      return isAffectedComponent && !hasVariantHeadingAttribute(value)
    })
    .find(j.StringLiteral)
    .replaceWith(path => {
      const newSize = getNewSize(path.node.value)

      return j.stringLiteral(newSize)
    })
    .toSource({ quote: 'single' })
}

export default transform
