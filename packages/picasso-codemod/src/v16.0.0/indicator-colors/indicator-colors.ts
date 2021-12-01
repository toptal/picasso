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
      .findJSXElements('Indicator')
      // eslint-disable-next-line complexity
      .forEach(path => {
        const attributes = path.node.openingElement.attributes
        const attributeIndex = attributes.findIndex(
          node => node.type === 'JSXAttribute' && node.name.name === 'color'
        )
        const attribute = attributes[attributeIndex] as JSXAttribute | undefined
        const color = (attribute?.value as JSXText)?.value
        const newColor: NewColorType | undefined =
          colorMap[color as OldColorType] || undefined

        if (newColor) {
          attributes[attributeIndex] = j.jsxAttribute(
            j.jsxIdentifier('color'),
            j.literal(newColor)
          )
        }
      })
      .toSource({ quote: 'single' })
  )
}

export default transform
