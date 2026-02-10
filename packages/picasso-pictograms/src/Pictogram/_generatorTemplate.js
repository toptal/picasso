const types = require('@babel/types')

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

const illustrationTemplate = ({ componentName, jsx }, { tpl }) => {
  const displayName = `'${componentName}'`
  const svgElement = jsx.openingElement

  // add `className={className}` to svg root tag
  decorateWithProp(svgElement, 'className', 'className')
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
    const SIZE = 64
    ${'\n'}
    type ScaleType = 1 | 2
    export interface Props extends StandardProps {
      scale?: ScaleType,
      base?: number
    }
    const ${componentName} = forwardRef(function ${componentName}(
      props: Props,
      ref: Ref<SVGSVGElement>
    ) {
      const { className, style = {}, scale, base, 'data-testid': testId } = props
      const scaledSize = base || SIZE * Math.ceil(scale || 1)
      ${'\n'}
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

module.exports = illustrationTemplate
