const types = require('@babel/types')

/**
 * Add `className={getIconClassNames(className, color)}` to the svg tag
 */
const decorateWithClassNameProp = svgElement => {
  svgElement.attributes = [
    ...svgElement.attributes,
    types.jsxAttribute(
      types.jsxIdentifier('className'),
      types.jsxExpressionContainer(
        types.callExpression(types.identifier('getIconClassNames'), [
          types.identifier('className'),
          types.identifier('color'),
        ])
      )
    ),
  ]
}

/**
 * Add `{propName}={propValue}` to the svg tag
 */
const decorateWithProp = (svgElement, propName, propValue) => {
  svgElement.attributes = [
    ...svgElement.attributes,
    types.jsxAttribute(
      types.jsxIdentifier(propName),
      types.jsxExpressionContainer(types.identifier(propValue))
    ),
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

  // add `className={getIconClassNames(className, color)}` to svg root tag
  decorateWithClassNameProp(svgElement)
  // add `style={style}` to svg root tag
  decorateWithProp(svgElement, 'style', 'svgStyle')
  // add `ref={ref}` to svg root tag
  decorateWithProp(svgElement, 'ref', 'ref')
  // add `data-testid={testId} to svg root tag
  decorateWithProp(svgElement, 'data-testid', 'testId')

  return tpl`
    import type { Ref } from 'react'
    import React, { forwardRef } from 'react'
    import type { StandardProps } from '@toptal/picasso-shared'
    ${'\n'}
    import { getIconClassNames } from './styles'
    const BASE_SIZE = ${baseSize}
    ${'\n'}
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
    
    const ${componentName} = forwardRef(function ${componentName}(
      props: Props,
      ref: Ref<SVGSVGElement>
    ) {
      const { className, style = {}, color, scale, base, 'data-testid': testId } = props

      const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
      const svgStyle = {
        minWidth: \`\${scaledSize}px\`,
        minHeight: \`\${scaledSize}px\`,
        ...style
      }
      ${'\n'}
      return (
        ${jsx}
      )
    })
    ${'\n'}
    ${componentName}.displayName = ${displayName}
    export default ${componentName}
  `
}

module.exports = iconTemplate
