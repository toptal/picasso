import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgGlobe24 = forwardRef(function SvgGlobe24(
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
      viewBox='0 0 24 24'
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
      <path d='M2.013 12c.223 4.294 3.297 7.834 7.365 8.762C8.022 19.067 7.081 15.797 7.005 12H2.013Zm0-1h4.992c.076-3.797 1.017-7.067 2.373-8.762C5.31 3.166 2.236 6.706 2.013 11Zm18.974 0c-.223-4.294-3.297-7.834-7.365-8.762 1.356 1.695 2.297 4.965 2.373 8.762h4.992Zm0 1h-4.992c-.076 3.797-1.017 7.067-2.373 8.762 4.068-.928 7.142-4.468 7.365-8.762ZM8.005 12c.112 5.1 1.905 9 3.495 9s3.383-3.9 3.495-9h-6.99Zm0-1h6.99c-.112-5.1-1.905-9-3.495-9s-3.383 3.9-3.495 9ZM11.5 22C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1 22 5.701 22 11.5 17.299 22 11.5 22Z' />
    </svg>
  )
})

SvgGlobe24.displayName = 'SvgGlobe24'
export default SvgGlobe24
