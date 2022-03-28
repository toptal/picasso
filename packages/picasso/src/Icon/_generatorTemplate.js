const types = require('@babel/types')

/**
 * Add `className={cx(classes.root, className)}` to the svg tag
 */
const decorateWithClassNameProp = svgElement => {
  svgElement.attributes = [
    ...svgElement.attributes,
    types.jsxAttribute(
      types.jsxIdentifier('className'),
      types.jsxExpressionContainer(
        types.callExpression(types.identifier('cx'), [
          types.identifier('...classNames')
        ])
      )
    )
  ]
}

/**
 * Add `name={value}` to the svg tag
 */
const decorateWithIdentifierProp = (svgElement, propName, identifierName) => {
  svgElement.attributes = [
    ...svgElement.attributes,
    types.jsxAttribute(
      types.jsxIdentifier(propName),
      types.jsxExpressionContainer(types.identifier(identifierName))
    )
  ]
}

const BASE_SIZES = [16, 24, 32]

const getBaseSize = (componentName = '') => {
  for (const size of BASE_SIZES) {
    if (componentName.includes(size)) {
      return Number(size)
    }
  }

  return 16
}

const iconTemplate = ({ componentName, jsx }, { tpl }) => {
  const displayName = `'${componentName}'`
  const baseSize = `${getBaseSize(displayName)}`

  const svgElement = jsx.openingElement

  // add `className={cx(classes.root, classes[colorClassName], className)}` to svg root tag
  decorateWithClassNameProp(svgElement)
  // add `style={style}` to svg root tag
  decorateWithIdentifierProp(svgElement, 'style', 'svgStyle')
  // add `ref={ref}` to svg root tag
  decorateWithIdentifierProp(svgElement, 'ref', 'ref')
  // add `data-testid={testId} to svg root tag
  decorateWithIdentifierProp(svgElement, 'data-testid', 'testId')

  const makeStylesHook = `const useStyles = makeStyles(styles, { name: 'Picasso${componentName}' })`
  const classes = 'const classes: Record<string, string> = useStyles(props)'
  const props = `
  props: Props,
  ref: Ref<SVGSVGElement>
  `

  const ts = `
type ScaleType =
    | 1
    | 2
    | 3
    | 4
export interface Props extends StandardProps {
  scale?: ScaleType,
  color?: string,
  base?: number
}
`

  return tpl`
    import React, { forwardRef, Ref } from 'react'
    import cx from 'classnames'
    import { makeStyles } from '@material-ui/core/styles'
    import { StandardProps } from '@toptal/picasso-shared'
    ${'\n'}
    import kebabToCamelCase from '../utils/kebab-to-camel-case'
    import styles from './styles'

    const BASE_SIZE = ${baseSize}

    ${ts}
    ${makeStylesHook}
    const ${componentName} = forwardRef(function ${componentName}(
      ${props}
    ) {
      const { className, style = {}, color, scale, base, 'data-testid': testId } = props

      ${classes}
      const classNames = [classes.root, className]

      const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
      const colorClassName = kebabToCamelCase(\`\${color}\`)

      if (classes[colorClassName]) {
        classNames.push(classes[colorClassName])
      }

      const svgStyle = {
        minWidth: \`\${scaledSize}px\`,
        minHeight: \`\${scaledSize}px\`,
        ...style
      }

      return (
        ${jsx}
      )
    })

    ${componentName}.displayName = ${displayName}

    export default ${componentName}
  `
}

module.exports = iconTemplate
