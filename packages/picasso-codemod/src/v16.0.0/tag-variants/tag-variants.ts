import { Transform, JSXAttribute, JSXText } from 'jscodeshift'

const colorMap = {
  negative: 'red',
  warning: 'yellow',
  primary: 'blue',
  positive: 'green',
  light: 'light-grey'
} as const

type OldColorType = keyof typeof colorMap
type NewColorType = typeof colorMap[OldColorType]

const transform: Transform = (file, api) => {
  const j = api.jscodeshift

  return (
    j(file.source)
      .findJSXElements('Tag')
      // eslint-disable-next-line complexity
      .forEach(path => {
        const attributes = path.node.openingElement.attributes
        const attributeIndex = attributes.findIndex(
          node => node.type === 'JSXAttribute' && node.name.name === 'variant'
        )
        const attribute = attributes[attributeIndex] as JSXAttribute | undefined
        const variant = (attribute?.value as JSXText)?.value
        const newVariant: NewColorType | undefined =
          colorMap[variant as OldColorType] || undefined

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
