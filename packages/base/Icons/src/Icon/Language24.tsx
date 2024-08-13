import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgLanguage24 = forwardRef(function SvgLanguage24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const classNames = ['PicassoSvgLanguage24', classes.root]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (classes[colorClassName]) {
    classNames.push(classes[colorClassName])
  }
  if (className) {
    classNames.push(className)
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='m8 18-5 5v-5H1V1h22v17H8Zm-4 2.586L7.586 17H22V2H2v15h2v3.586ZM16.437 14h-1.235l-.767-1.924h-4.316L9.352 14H8.117l3.484-8.671h1.339L16.437 14Zm-2.327-2.886-1.833-4.667-1.846 4.667h3.679Z' />
    </svg>
  )
})

SvgLanguage24.displayName = 'SvgLanguage24'
export default SvgLanguage24
