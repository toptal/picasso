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
          types.identifier('...classes')
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

const iconTemplate = ({ template }, opts, { componentName, jsx }) => {
  const displayName = `'${componentName.name}'`
  const baseSize = `${getBaseSize(displayName)}`

  const svgElement = jsx.openingElement

  // add `className={cx(classes.root, classes[colorClassName], className)}` to svg root tag
  decorateWithClassNameProp(svgElement)
  // add `style={style}` to svg root tag
  decorateWithIdentifierProp(svgElement, 'style', 'svgStyle')
  // add `ref={ref}` to svg root tag
  decorateWithIdentifierProp(svgElement, 'ref', 'ref')

  const typeScriptTpl = template.smart({ plugins: ['typescript'] })

  return typeScriptTpl.ast`
    import React, { forwardRef, Ref } from 'react'
    import cx from 'classnames'
    import { withStyles } from '@material-ui/core/styles'
    import { StandardProps } from '@toptal/picasso-shared'

    import kebabToCamelCase from '../utils/kebab-to-camel-case'
    import styles from './styles'

    const BASE_SIZE = ${baseSize}

    type ScaleType = 
      | 1
      | 2
      | 3
      | 4

    export interface Props extends StandardProps {
      scale?: ScaleType
      color?: string
      base?: number
    }

    const ${componentName} = forwardRef(function ${componentName}(
      props: Props,
      ref: Ref<SVGSVGElement>
    ) {
      const { classes: availableClasses, className, style = {}, color, scale, base } = props
      const classes = [availableClasses.root, className]

      const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
      const colorClassName = kebabToCamelCase(\`\${color}\`)

      if (availableClasses[colorClassName]) {
        classes.push(availableClasses[colorClassName])
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

    export default withStyles(styles)(${componentName})
  `
}

module.exports = iconTemplate
