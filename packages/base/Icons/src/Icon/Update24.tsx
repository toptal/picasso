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
const SvgUpdate24 = forwardRef(function SvgUpdate24(
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
  const classNames = ['PicassoSvgUpdate24', classes.root]
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
      <path d='M4.5 17.832V20.5h-1v-4h4v1H5.519a8.47 8.47 0 0 0 6.481 3 8.5 8.5 0 0 0 8.5-8.5h1a9.5 9.5 0 0 1-17 5.832Zm15-11.664V3.5h1v4h-4v-1h1.981A8.47 8.47 0 0 0 12 3.5 8.5 8.5 0 0 0 3.5 12h-1a9.5 9.5 0 0 1 17-5.832Z' />
    </svg>
  )
})

SvgUpdate24.displayName = 'SvgUpdate24'
export default SvgUpdate24
