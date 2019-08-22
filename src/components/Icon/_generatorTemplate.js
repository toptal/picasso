const t = require('@babel/types')

/**
 * Add `className={cx(classes.root, className)}` to the svg tag
 */
function decorateWithClassNameProp(svgElement) {
  svgElement.attributes = [
    ...svgElement.attributes,
    t.jsxAttribute(
      t.jsxIdentifier('className'),
      t.jsxExpressionContainer(
        t.callExpression(t.identifier('cx'), [
          t.memberExpression(
            t.identifier('classes'),
            t.identifier('root'),
            false
          ),
          t.identifier('className')
        ])
      )
    )
  ]
}

/**
 * Add `name={value}` to the svg tag
 */
function decorateWithIdentifierProp(svgElement, propName, identifierName) {
  svgElement.attributes = [
    ...svgElement.attributes,
    t.jsxAttribute(
      t.jsxIdentifier(propName),
      t.jsxExpressionContainer(t.identifier(identifierName))
    )
  ]
}

const BASE_SIZES = [16, 24, 32]

function getBaseSize(componentName = '') {
  for (const size of BASE_SIZES) {
    if (componentName.includes(size)) {
      return Number(size)
    }
  }
  return 16
}

const template = ({ template }, opts, { componentName, jsx }) => {
  const displayName = `'${componentName.name}'`
  const baseSize = `${getBaseSize(displayName)}`

  const svgElement = jsx.openingElement

  // add `className={cx(classes.root, className)}` to svg root tag
  decorateWithClassNameProp(svgElement)
  // add `style={style}` to svg root tag
  decorateWithIdentifierProp(svgElement, 'style', 'svgStyle')
  // add `color={color}` to svg root tag
  decorateWithIdentifierProp(svgElement, 'color', 'color')
  // add `ref={ref}` to svg root tag
  decorateWithIdentifierProp(svgElement, 'ref', 'ref')

  const typeScriptTpl = template.smart({ plugins: ['typescript'] })

  return typeScriptTpl.ast`
    import React, { forwardRef, Ref } from 'react'
    import cx from 'classnames'
    import { withStyles } from '@material-ui/core/styles'

    import { StandardProps } from '../Picasso'
    import styles from './styles'

    const BASE_SIZE = ${baseSize}

    type ScaleType = 
      | 1
      | 2
      | 3
      | 4

    export interface Props extends StandardProps {
      scale?: ScaleType
      color?: string,
      base?: number
    }

    const ${componentName} = forwardRef(function ${componentName}(
      props: Props,
      ref: Ref<SVGSVGElement>
    ) {
      const { classes, className, style = {}, color, scale, base } = props

      const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)

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

module.exports = template
