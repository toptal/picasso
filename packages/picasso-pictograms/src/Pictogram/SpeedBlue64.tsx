import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgSpeedBlue64 = forwardRef(function SvgSpeedBlue64(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, scale, base, 'data-testid': testId } = props
  const scaledSize = base || SIZE * Math.ceil(scale || 1)

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 64 64'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#183A9E'
          d='M32 .5v27.929a3.572 3.572 0 0 1 0 7.142v9.394h15.214v7.5H32V63.5a31.5 31.5 0 1 0 0-63Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.035 31.035 0 0 0 32 1Z'
        />
        <path
          fill='#204ECF'
          d='M7.756 32h-1a25.054 25.054 0 0 1 7.431-17.813l.354-.353L29.828 29.12l-.707.707-14.577-14.577A24.04 24.04 0 0 0 7.756 32Z'
        />
        <path
          fill='#204ECF'
          d='M32 36.07a4.06 4.06 0 0 1-2.879-1.191A4.077 4.077 0 1 1 32 36.069Zm-2.172-1.898a3.072 3.072 0 1 0 4.344-4.345 3.072 3.072 0 0 0-4.344 4.345ZM56.744 31.5h-6.02v1h6.02v-1ZM54.664 22.057l-5.562 2.305.383.924 5.562-2.305-.383-.924ZM49.122 14.13l-4.251 4.263.708.706 4.251-4.263-.708-.706ZM40.966 8.933 38.674 14.5l.925.38 2.292-5.567-.925-.38ZM32.443 7.255l-1 .002.014 6.021 1-.002-.014-6.021ZM22.927 8.974l-.923.386 2.32 5.555.923-.385-2.32-5.556ZM47.714 52.964H16.286v-8.5h31.428v8.5Zm-30.428-1h29.428v-6.5H17.286v6.5Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgSpeedBlue64.displayName = 'SvgSpeedBlue64'
export default SvgSpeedBlue64
