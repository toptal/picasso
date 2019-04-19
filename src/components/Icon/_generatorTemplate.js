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

const template = ({ template }, opts, { componentName, jsx }) => {
  const displayName = `'${componentName.name}'`

  const svgElement = jsx.openingElement

  // add `className={cx(classes.root, className)}` to svg root tag
  decorateWithClassNameProp(svgElement)
  // add `style={style}` to svg root tag
  decorateWithIdentifierProp(svgElement, 'style', 'svgStyle')
  // add `color={color}` to svg root tag
  decorateWithIdentifierProp(svgElement, 'color', 'color')

  const typeScriptTpl = template.smart({ plugins: ['typescript'] })

  return typeScriptTpl.ast`
    import React from 'react'
    import cx from 'classnames'
    import { withStyles } from '@material-ui/core/styles'

    import { StandardProps } from '../Picasso'
    import styles from './styles'

    interface Props extends StandardProps {
      size?: number
      color?: string
    }

    const ${componentName} = (props: Props) => {
      const { classes, className, style, size, color } = props

      const svgStyle = {
      fontSize: size && \`\${size}rem\`,

      ...style
      }

      return (
        ${jsx}
      )
    }

    ${componentName}.displayName = ${displayName}
    export default withStyles(styles)(${componentName})
  `
}

module.exports = template
