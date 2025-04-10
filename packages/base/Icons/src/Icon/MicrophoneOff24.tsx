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
const SvgMicrophoneOff24 = forwardRef(function SvgMicrophoneOff24(
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
      <path d='m7.364 18.757.724-.724A6.5 6.5 0 0 0 18 12.5h1a7.5 7.5 0 0 1-7 7.484V23h5v1H6v-1h5v-3.016a7.458 7.458 0 0 1-3.636-1.227Zm-2.121-2.12A7.465 7.465 0 0 1 4 12.5h1c0 1.251.354 2.42.967 3.412l-.724.724ZM16 5.878l-1 1V4.5a3.5 3.5 0 0 0-7 0v8c0 .413.071.809.203 1.176l-.764.764A4.482 4.482 0 0 1 7 12.5v-8a4.5 4.5 0 0 1 9 0v1.379Zm0 4.242V12.5a4.5 4.5 0 0 1-6.44 4.061l.764-.764A3.5 3.5 0 0 0 15 12.5v-1.379l1-1ZM2.5 22.207l-.707-.707L21.5 1.793l.707.707L2.5 22.207Z' />
    </svg>
  )
})

SvgMicrophoneOff24.displayName = 'SvgMicrophoneOff24'
export default SvgMicrophoneOff24
