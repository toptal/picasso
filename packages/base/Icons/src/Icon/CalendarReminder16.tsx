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
const SvgCalendarReminder16 = forwardRef(function SvgCalendarReminder16(
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
      <path d='M8 1.041V0h1v1.073A5 5 0 0 1 13.271 6.9l-.955 5.416c-.038.218.187.54.402.579l-.174.984L1.718 11.97l.17-.985c.226.038.541-.183.58-.405l.955-5.417A5.002 5.002 0 0 1 8 1.042Zm3.331 11.1.956-5.416a4 4 0 0 0-7.879-1.39l-.955 5.417c-.03.17-.094.33-.184.476l8.074 1.423a1.345 1.345 0 0 1-.012-.51Zm-5.358 1.472.985.174a1 1 0 1 0 1.97.347l.985.174a2 2 0 1 1-3.94-.695ZM1.251 3.7l.843.538a6.977 6.977 0 0 0-.988 2.546 6.977 6.977 0 0 0 .058 2.731l-.976.217a7.977 7.977 0 0 1-.066-3.121 7.977 7.977 0 0 1 1.13-2.91Zm13.498 8.6-.843-.538c.49-.768.826-1.629.988-2.546a6.977 6.977 0 0 0-.058-2.731l.976-.217a7.977 7.977 0 0 1 .066 3.121 7.977 7.977 0 0 1-1.13 2.91Z' />
    </svg>
  )
})

SvgCalendarReminder16.displayName = 'SvgCalendarReminder16'
export default SvgCalendarReminder16
