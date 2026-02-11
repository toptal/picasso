import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgMemoInvitationWhite64 = forwardRef(function SvgMemoInvitationWhite64(
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
          d='M54 32H11v28h43V32ZM43 10H4v19h39V10Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M1 63.5h63M57.5 28.5h-50v35h50v-35Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M45 3.5H.5v29H7M46.5 28v-2M7.5 0v7M23.5 0v7M39.5 0v7M19 39.5h14M19 47.5h27M19 52.5h7M53 24.5c5.799 0 10.5-4.701 10.5-10.5S58.799 3.5 53 3.5 42.5 8.201 42.5 14 47.201 24.5 53 24.5Z'
        />
        <path stroke='#fff' strokeMiterlimit={10} d='m48 14 3 3 6-6' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgMemoInvitationWhite64.displayName = 'SvgMemoInvitationWhite64'
export default SvgMemoInvitationWhite64
