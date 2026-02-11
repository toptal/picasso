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
const SvgChevronDouble24 = forwardRef(function SvgChevronDouble24(
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
      fill='none'
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
      <path
        fillRule='evenodd'
        d='m2.15 2.15-.349.351L6.3 7l4.5 4.5L6.3 16l-4.501 4.501.351.349.351.349L7.35 16.35l4.85-4.85-4.85-4.85-4.851-4.851-.349.351m10 0-.349.351L16.3 7l4.5 4.5-4.5 4.5-4.501 4.501.351.349.351.349 4.849-4.849 4.85-4.85-4.85-4.85-4.851-4.851-.349.351'
      />
    </svg>
  )
})

SvgChevronDouble24.displayName = 'SvgChevronDouble24'
export default SvgChevronDouble24
