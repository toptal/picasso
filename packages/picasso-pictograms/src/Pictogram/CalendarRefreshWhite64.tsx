import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCalendarRefreshWhite64 = forwardRef(function SvgCalendarRefreshWhite64(
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
          d='M60.5 9H54v5h-5V9H15v5h-5V9H3.5A2.5 2.5 0 0 0 1 11.5V19h62v-7.5A2.5 2.5 0 0 0 60.5 9ZM32 50c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M54 8.5h6.53a2.97 2.97 0 0 1 2.97 2.97v45.06a2.97 2.97 0 0 1-2.97 2.97H3.47A2.97 2.97 0 0 1 .5 56.53V11.47A2.97 2.97 0 0 1 3.47 8.5H10M15 8.5h34'
        />
        <path
          fill='#fff'
          d='M14 4v9h-3V4h3Zm1-1h-5v11h5V3ZM53 4v9h-3V4h3Zm1-1h-5v11h5V3Z'
        />
        <path stroke='#fff' strokeMiterlimit={10} d='M43.5 25v4.5H39' />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M44.87 32.31c1.04 2 1.63 4.28 1.63 6.69 0 8.01-6.49 14.5-14.5 14.5S17.5 47.01 17.5 39 23.99 24.5 32 24.5c4.32 0 8.2 1.89 10.86 4.89'
        />
        <path stroke='#fff' strokeMiterlimit={10} d='m26 40 4 4 8.5-8.5' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgCalendarRefreshWhite64.displayName = 'SvgCalendarRefreshWhite64'
export default SvgCalendarRefreshWhite64
