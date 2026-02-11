import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDollarCoinWhite64 = forwardRef(function SvgDollarCoinWhite64(
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
          d='M18 44.5C18 30.42 29.42 19 43.5 19c3.94 0 7.67.9 11.01 2.49C50.4 12.92 41.64 7 31.5 7 17.42 7 6 18.42 6 32.5c0 10.14 5.92 18.9 14.49 23.01C18.89 52.18 18 48.45 18 44.5Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M31.5 63.5c17.12 0 31-13.88 31-31 0-17.12-13.88-31-31-31-17.12 0-31 13.88-31 31 0 17.12 13.88 31 31 31Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M42.5 24v-.66a5.84 5.84 0 0 0-5.84-5.84H26.35a5.84 5.84 0 0 0-5.84 5.84c0 2.49 1.57 4.7 3.92 5.52l14.37 5c2.82.98 4.71 3.64 4.71 6.62 0 3.87-3.14 7.01-7.01 7.01h-9.49c-4.14 0-7.5-3.36-7.5-7.5M31.5 11v43'
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

SvgDollarCoinWhite64.displayName = 'SvgDollarCoinWhite64'
export default SvgDollarCoinWhite64
