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
const SvgSend24 = forwardRef(function SvgSend24(
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
        d='M1.848 3.156c-.478-.86.442-1.82 1.321-1.38l19.55 9.775A.496.496 0 0 1 23 12a.497.497 0 0 1-.28.449L3.17 22.225c-.88.44-1.8-.521-1.322-1.38L6.76 12 1.848 3.156Zm.874-.486L21.382 12l-18.66 9.33 4.905-8.83h4.338a.5.5 0 1 0 0-1H7.627L2.722 2.67Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgSend24.displayName = 'SvgSend24'
export default SvgSend24
