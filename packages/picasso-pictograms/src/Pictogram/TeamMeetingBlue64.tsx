import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTeamMeetingBlue64 = forwardRef(function SvgTeamMeetingBlue64(
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
          fill='#183A9C'
          d='M54 32H11v28h43V32ZM32.5 14.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM32.5 14.5c-3.87 0-7 3.13-7 7l.5.5h13l.5-.5c0-3.87-3.13-7-7-7Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M1 63.5h63M19.67 28.5H7.5v35h50v-35H45.08M8.5 14.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'
        />
        <path
          stroke='#204ECD'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M1.5 21.5c0-3.87 3.13-7 7-7s7 3.13 7 7'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M56.5 14.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'
        />
        <path
          stroke='#204ECD'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M49.5 21.5c0-3.87 3.13-7 7-7s7 3.13 7 7'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M32.5 14.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'
        />
        <path
          stroke='#204ECD'
          strokeLinecap='square'
          strokeMiterlimit={10}
          d='M25.5 21.5c0-3.87 3.13-7 7-7s7 3.13 7 7'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M32.5 28.5c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14ZM32.5 29v17M37 42l-4.5 4.5L28 42'
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

SvgTeamMeetingBlue64.displayName = 'SvgTeamMeetingBlue64'
export default SvgTeamMeetingBlue64
