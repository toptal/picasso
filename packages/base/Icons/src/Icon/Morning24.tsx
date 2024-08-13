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
const SvgMorning24 = forwardRef(function SvgMorning24(
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
  const classNames = ['PicassoSvgMorning24', classes.root]
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
      <path d='M6.207 18a5.5 5.5 0 1 1 10.586 0h-1.05a4.5 4.5 0 1 0-8.488 0H6.208ZM11 5h1v4h-1V5Zm8.278 3.015.707.707-2.828 2.828-.707-.707 2.828-2.828ZM23 16v1h-4v-1h4ZM0 17v-1h4v1H0Zm3.015-8.278.707-.707 2.828 2.828-.707.707-2.828-2.828Z' />
    </svg>
  )
})

SvgMorning24.displayName = 'SvgMorning24'
export default SvgMorning24
