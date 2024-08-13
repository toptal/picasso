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
const SvgBell24 = forwardRef(function SvgBell24(
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
  const classNames = ['PicassoSvgBell24', classes.root]
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
      <path d='M12 2.014a8.5 8.5 0 0 1 8 8.486V18a1 1 0 0 0 1 1v1H2v-1a1 1 0 0 0 1-1v-7.5a8.5 8.5 0 0 1 8-8.486V0h1v2.014ZM19 18v-7.5a7.5 7.5 0 0 0-15 0V18c0 .364-.097.706-.268 1h15.536A1.99 1.99 0 0 1 19 18ZM9 21.5V21h1v.5a1.5 1.5 0 0 0 3 0V21h1v.5a2.5 2.5 0 1 1-5 0Z' />
    </svg>
  )
})

SvgBell24.displayName = 'SvgBell24'
export default SvgBell24
