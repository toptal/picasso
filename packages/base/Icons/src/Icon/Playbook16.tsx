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
const SvgPlaybook16 = forwardRef(function SvgPlaybook16(
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
      <path d='M15.8 12.61 10 7.38V11h-.84c-.42 0-.82.12-1.16.32V4c0-1.33.67-2 1.5-2H14v8h1V1H9.5c-.82 0-1.54.39-2 1-.46-.61-1.18-1-2-1H0v11h5.5c.83 0 1.5.67 1.5 2h1c0-1.33.67-2 1.5-2h.5v3.28l2.46-1.14.68 1.52.91-.41-.68-1.54 2.43-1.12ZM7 11.73c-.43-.45-1.02-.73-1.68-.73H1V2h4.5C6.33 2 7 2.67 7 4v7.73Zm4 1.99V9.63l3 2.71-3 1.39Z' />
    </svg>
  )
})

SvgPlaybook16.displayName = 'SvgPlaybook16'
export default SvgPlaybook16
