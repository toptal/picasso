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
const SvgGrammarCheck24 = forwardRef(function SvgGrammarCheck24(
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
        d='M7.149 3.05.078 21.226c-.031.08-.001.1.414.264.247.097.458.167.471.154.013-.013.688-1.738 1.5-3.833l1.477-3.81h8.12l1.477 3.81c.812 2.095 1.487 3.82 1.5 3.833.013.013.224-.057.471-.154.415-.164.445-.184.414-.264L8.851 3.05c-.028-.072-1.674-.072-1.702 0M20.08 6.22 17.5 8.8l-1.08-1.08-1.081-1.081-.349.351-.349.351L16.07 8.77l1.43 1.43 2.931-2.931 2.93-2.93-.351-.349-.351-.349L20.08 6.22M9.888 8.42c.942 2.42 1.723 4.441 1.737 4.49l.024.09H8.004c-2.041 0-3.644-.015-3.644-.035 0-.03 3.333-8.63 3.44-8.877.034-.079.065-.091.208-.08l.167.012 1.713 4.4'
      />
    </svg>
  )
})

SvgGrammarCheck24.displayName = 'SvgGrammarCheck24'
export default SvgGrammarCheck24
