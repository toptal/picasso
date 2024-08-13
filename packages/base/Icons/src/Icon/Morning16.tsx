import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgMorning16 = forwardRef(function SvgMorning16(
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
  const classNames = ['PicassoSvgMorning16', classes.root]
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
      viewBox='0 0 16 16'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M4.337 12a3.5 3.5 0 1 1 6.326 0H9.5a2.5 2.5 0 1 0-4 0H4.337ZM7 3h1v3H7V3Zm5.45 1.843.707.707-2.121 2.122-.708-.708 2.122-2.12ZM15 10v1h-3v-1h3ZM0 11v-1h3v1H0Zm1.843-5.45.707-.707 2.122 2.121-.708.708-2.12-2.122Z' />
    </svg>
  )
})

SvgMorning16.displayName = 'SvgMorning16'
export default SvgMorning16
