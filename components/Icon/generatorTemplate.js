const t = require('@babel/types')

function addRootClassName(rootSvgTag) {
  rootSvgTag.attributes = [
    ...rootSvgTag.attributes,
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

function addStyleProp(rootSvgTag) {
  rootSvgTag.attributes = [
    ...rootSvgTag.attributes,
    t.jsxAttribute(
      t.jsxIdentifier('style'),
      t.jsxExpressionContainer(t.identifier('style'))
    )
  ]
}

const template = ({ template }, opts, { componentName, jsx }) => {
  const displayName = `'${componentName.name}'`

  const rootSvgTag = jsx.openingElement
  // add `className={cx(classes.root, className)}` to svg root tag

  addRootClassName(rootSvgTag)
  addStyleProp(rootSvgTag)

  const typeScriptTpl = template.smart({ plugins: ['typescript'] })

  return typeScriptTpl.ast`
    import React, { CSSProperties } from 'react'
    import cx from 'classnames'
    import { withStyles } from '@material-ui/core/styles'

    import { Classes } from '../styles/types'
    import styles from './styles'
    
    interface Props {
      classes: Classes
      className?: string
      style?: CSSProperties
    }

    const ${componentName} = (props: Props) => {
      const { classes, className, style } = props

      return (
        ${jsx}
      )
    }

    ${componentName}.displayName = ${displayName}
    export default withStyles(styles)(${componentName})
  `
}

module.exports = template
