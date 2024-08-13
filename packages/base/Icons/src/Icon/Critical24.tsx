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
const SvgCritical24 = forwardRef(function SvgCritical24(
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
  const classNames = ['PicassoSvgCritical24', classes.root]
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
      fill='none'
      viewBox='0 0 24 24'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='m22.108 11.649-9.752-9.753a.5.5 0 0 0-.707 0L1.897 11.65a.5.5 0 0 0 0 .707l9.752 9.752a.5.5 0 0 0 .707 0l9.752-9.752a.5.5 0 0 0 0-.707Zm-9.045-10.46a1.5 1.5 0 0 0-2.122 0L1.19 10.941a1.5 1.5 0 0 0 0 2.122l9.752 9.752a1.5 1.5 0 0 0 2.122 0l9.752-9.752a1.5 1.5 0 0 0 0-2.122L13.063 1.19ZM11.5 6.775h1v8.662h-1V6.774Zm1 10.105h-1v1h1v-1Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgCritical24.displayName = 'SvgCritical24'
export default SvgCritical24
