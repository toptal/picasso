import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHandSelectedWhite64 = forwardRef(function SvgHandSelectedWhite64(
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
      <path
        fill='#000'
        d='m63 41-2-2-25.33 19H0v5h37.32L63 41Z'
        opacity={0.3}
      />
      <path
        fill='#000'
        d='M36.44 32.45a8.835 8.835 0 0 1-7.9 7.84l-4.49.45a3.93 3.93 0 0 0-3.54 3.92c0 1.69 1.08 3.2 2.69 3.73l11.71 3.9 14.6-10.19v-4.11l-.61-2.37a6.22 6.22 0 0 1-6.22 6.22c-3.43 0-6.22-2.79-6.22-6.22v-3.18l-.02.01Z'
        opacity={0.3}
      />
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M32 1c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S37.523 1 32 1ZM21 11c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11Z'
        clipRule='evenodd'
      />
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M32 22a16.96 16.96 0 0 0-13.144 6.217l-.773-.634A17.96 17.96 0 0 1 32 21c9.936 0 18 8.064 18 18v3.11h-1V39c0-9.384-7.616-17-17-17Z'
        clipRule='evenodd'
      />
      <path
        stroke='#fff'
        strokeMiterlimit={10}
        d='M0 63.5h37.3l25.87-22.22c-1.91-3.34-6.28-4.32-9.43-2.12L34.91 52.3 23.2 48.4a3.934 3.934 0 0 1-2.69-3.73c0-2.02 1.53-3.72 3.54-3.92l4.49-.45a8.835 8.835 0 0 0 7.96-8.8H13C6.1 31.5.5 37.1.5 44'
      />
    </svg>
  )
})

SvgHandSelectedWhite64.displayName = 'SvgHandSelectedWhite64'
export default SvgHandSelectedWhite64
