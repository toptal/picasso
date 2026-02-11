import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgMemoApprovedWhite64 = forwardRef(function SvgMemoApprovedWhite64(
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
          d='M23.47 31H7v7h13.53c.12-2.7 1.21-5.15 2.94-7ZM39.53 31c1.73 1.85 2.82 4.3 2.94 7H56v-7H39.53ZM62 56H1v7h61v-7Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M21 38.5H.5v25h62v-25H42M7.5 35V8.5h48V35M51.5 4.5h-40v4h40v-4ZM47.5.5h-32v4h32v-4Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M31.5 49.5c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='m26 38 4 4 7-7M14 15.5h19M14 22.5h35M14 27.5h18M14 32.5h8'
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

SvgMemoApprovedWhite64.displayName = 'SvgMemoApprovedWhite64'
export default SvgMemoApprovedWhite64
