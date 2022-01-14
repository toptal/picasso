import {
  Transform,
  JSXAttribute,
  JSXText,
  JSXIdentifier,
  JSXMemberExpression
} from 'jscodeshift'

const colorMap = {
  negative: 'red',
  warning: 'yellow',
  primary: 'blue',
  positive: 'green',
  light: 'light-grey',
  dark: 'dark-grey'
} as const

const transform: Transform = (file, api) => {
  const j = api.jscodeshift // alias the jscodeshift API
  const root = j(file.source) // parse JS code into an AST

  const isJSXIdentifier = (
    node: JSXIdentifier | JSXMemberExpression,
    name: string
  ) => j.JSXIdentifier.check(node) && node.name === name

  return (
    root
      .findJSXElements()
      // eslint-disable-next-line complexity
      .forEach(path => {
        const { openingElement } = path.node
        const { name, attributes } = openingElement

        const transformAttribute = (
          attributeName: string,
          mapper: { [key: string]: string }
        ) => {
          if (!attributes) {
            return
          }

          const attributeIndex = attributes.findIndex(
            node =>
              node.type === 'JSXAttribute' && node.name.name === attributeName
          )
          const attribute = attributes[attributeIndex] as
            | JSXAttribute
            | undefined
          const oldValue = (attribute?.value as JSXText)?.value
          const newValue = mapper[oldValue] || undefined

          if (newValue) {
            attributes[attributeIndex] = j.jsxAttribute(
              j.jsxIdentifier(attributeName),
              j.literal(newValue)
            )
          }
        }

        const isTag = !j.JSXMemberExpression.check(name) && name.name === 'Tag'
        const isIndicator =
          !j.JSXMemberExpression.check(name) && name.name === 'Indicator'

        // find compound component
        const isTagRectangular =
          j.JSXMemberExpression.check(name) &&
          isJSXIdentifier(name.object, 'Tag') &&
          isJSXIdentifier(name.property, 'Rectangular')

        if (isTagRectangular) {
          transformAttribute('variant', colorMap)
          transformAttribute('indicator', colorMap)
        } else if (isTag) {
          transformAttribute('variant', colorMap)
        } else if (isIndicator) {
          transformAttribute('color', colorMap)
        }
      })
      .toSource({ quote: 'single' })
  )
}

export default transform
