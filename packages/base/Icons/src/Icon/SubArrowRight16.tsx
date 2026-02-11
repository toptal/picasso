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
const SvgSubArrowRight16 = forwardRef(function SvgSubArrowRight16(
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
      <path
        fillRule='evenodd'
        d='m.993 5.1.008 3.1.06.213c.207.735.69 1.249 1.398 1.49l.248.084 4.786.007 4.786.007-1.566 1.566-1.567 1.567.361.359.36.36 2.173-2.173 2.173-2.173-2.179-2.18-2.18-2.18L9.5 5.5l-.354.353 1.561 1.56c.858.858 1.56 1.569 1.56 1.58 0 .033-9.132.024-9.334-.008a1.086 1.086 0 0 1-.903-.846C2.009 8.04 2 7.091 2 4.999V2H.985l.008 3.1'
      />
    </svg>
  )
})

SvgSubArrowRight16.displayName = 'SvgSubArrowRight16'
export default SvgSubArrowRight16
