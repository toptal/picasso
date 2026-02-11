import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCalendarDateAcceptedBlue64 = forwardRef(
  function SvgCalendarDateAcceptedBlue64(
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
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M62.5 6.5H.5v52h62v-52ZM13 63.5h37M13.5 2v9M31.5 2v9M49.5 2v9'
          />
          <path
            fill='#183A9C'
            d='M62 7H1v7h61V7ZM50 59H13v4h37v-4Z'
            opacity={0.15}
          />
          <path
            stroke='#204ECD'
            strokeMiterlimit={10}
            d='M11 22.5h41M11 31.5h16M11 40.5h16M11 49.5h16M51.5 31.5h-18v18h18v-18Z'
          />
          <path stroke='#204ECD' strokeMiterlimit={10} d='m38 40 3 3 6-6' />
        </g>
        <defs>
          <clipPath id='a'>
            <path fill='#fff' d='M0 0h64v64H0z' />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

SvgCalendarDateAcceptedBlue64.displayName = 'SvgCalendarDateAcceptedBlue64'
export default SvgCalendarDateAcceptedBlue64
