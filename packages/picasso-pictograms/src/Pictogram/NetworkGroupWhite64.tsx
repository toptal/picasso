import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgNetworkGroupWhite64 = forwardRef(function SvgNetworkGroupWhite64(
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
          fill='#000'
          d='M11.5 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM11.5 11.5c-2.76 0-5 2.24-5 5l.5.5h9l.5-.5c0-2.76-2.24-5-5-5ZM31.5 20.5c-6.08 0-11 4.92-11 11s4.92 11 11 11 11-4.92 11-11-4.92-11-11-11Zm-5 16c0-2.76 2.24-5 5-5-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3c2.76 0 5 2.24 5 5l-.5.5h-9l-.5-.5ZM51.5 51.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM51.5 51.5c-2.76 0-5 2.24-5 5l.5.5h9l.5-.5c0-2.76-2.24-5-5-5Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M11.5 22.5c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M11.5 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
        />
        <path
          stroke='#fff'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M6.5 16.5c0-2.76 2.24-5 5-5s5 2.24 5 5'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M51.5 22.5c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M51.5 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
        />
        <path
          stroke='#fff'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M46.5 16.5c0-2.76 2.24-5 5-5s5 2.24 5 5'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M11.5 62.5c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M11.5 51.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
        />
        <path
          stroke='#fff'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M6.5 56.5c0-2.76 2.24-5 5-5s5 2.24 5 5'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M51.5 62.5c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M51.5 51.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
        />
        <path
          stroke='#fff'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M46.5 56.5c0-2.76 2.24-5 5-5s5 2.24 5 5'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M31.5 42.5c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M31.5 31.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
        />
        <path
          stroke='#fff'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M26.5 36.5c0-2.76 2.24-5 5-5s5 2.24 5 5'
        />
        <path stroke='#fff' strokeMiterlimit={10} d='m39 39 5 5M19 19l5 5' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgNetworkGroupWhite64.displayName = 'SvgNetworkGroupWhite64'
export default SvgNetworkGroupWhite64
