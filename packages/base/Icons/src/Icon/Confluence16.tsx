import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgConfluence16 = forwardRef(function SvgConfluence16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={twMerge(
        'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M.6 11.7C3.5 7 7.3 6.8 11.8 9c1.2.6 2.6 1.3 3.3 1.6.2.1.3.4.2.6l-1.6 3.6c-.1.2-.4.4-.7.2l-3.2-1.5c-2.4-1.1-3.7-1.4-5.1.8-.1.3-.3.6-.4.8-.2.2-.5.3-.7.2L.2 13.2c-.2-.1-.3-.4-.1-.7.1-.2.3-.5.5-.8ZM11.7.2c.2-.2.5-.3.7-.1l3.4 2c.2.2.3.5.1.7-.1.2-.3.6-.5.8-2.9 4.7-6.7 4.9-11.2 2.7C3 5.7 1.6 5.1.9 4.8c-.2-.2-.3-.5-.2-.7L2.3.5c.1-.2.4-.3.7-.2l3.2 1.5c2.4 1.2 3.7 1.4 5.1-.7.1-.3.3-.6.4-.9Z' />
    </svg>
  )
})

SvgConfluence16.displayName = 'SvgConfluence16'
export default SvgConfluence16
