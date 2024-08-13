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
const SvgParticipants16 = forwardRef(function SvgParticipants16(
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
  const classNames = ['PicassoSvgParticipants16', classes.root]
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
      <path d='M10.875 10.4a2.5 2.5 0 1 1 3.25 0A3.5 3.5 0 0 1 16 13.5v.5h-1v-.5a2.5 2.5 0 0 0-4.268-1.768l-.707-.707c.252-.252.539-.462.85-.625Zm-7.922-.963a4 4 0 1 1 4.095 0A5.001 5.001 0 0 1 10 14H9a4 4 0 1 0-8 0H0a5.001 5.001 0 0 1 2.953-4.563ZM5 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.5 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z' />
    </svg>
  )
})

SvgParticipants16.displayName = 'SvgParticipants16'
export default SvgParticipants16
