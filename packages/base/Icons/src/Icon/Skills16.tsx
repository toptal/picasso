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
const SvgSkills16 = forwardRef(function SvgSkills16(
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
  const classNames = ['PicassoSvgSkills16', classes.root]
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
      <path d='m3.5 5.793.646-.647.708.708L3.5 7.207.793 4.5 4.5.793l2.354 2.353-.708.708L4.5 2.207 2.207 4.5 3.5 5.793Zm8 8 2.293-2.293-1.647-1.646.708-.708 2.353 2.354-3.707 3.707L8.793 12.5l1.353-1.354.708.708-.647.646 1.293 1.293Zm-2-9.586-7.5 7.5V14h2.293l7.5-7.5L9.5 4.207Zm.707-.707L12.5 5.793 13.793 4.5 11.5 2.207 10.207 3.5ZM1 11.293 11.5.793 15.207 4.5 4.707 15H1v-3.707Z' />
    </svg>
  )
})

SvgSkills16.displayName = 'SvgSkills16'
export default SvgSkills16
