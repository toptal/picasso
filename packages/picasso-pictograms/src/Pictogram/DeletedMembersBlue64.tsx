import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDeletedMembersBlue64 = forwardRef(function SvgDeletedMembersBlue64(
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
          d='M63.205 52.5h-30.15l-.32.535A1.3 1.3 0 0 0 33.85 55h28.545a1.3 1.3 0 0 0 1.125-1.95l-.32-.55h.005ZM49.21 46.75h-2.42l-1.73-9h5.88l-1.73 9Z'
          opacity={0.15}
        />
        <path
          fill='#183A9C'
          d='M48 52.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM46 .5V12h11.5L46 .5ZM24.5 19.75a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5ZM24.5 19.75a9.75 9.75 0 0 0-9.75 9.75h19.5a9.75 9.75 0 0 0-9.75-9.75ZM33.5 55.5l14 3.5h-41v4.5h51v-8h-24Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='m49.38 28.53 14.16 24.525c.565.975-.14 2.2-1.27 2.2H33.765a1.484 1.484 0 0 1-1.285-2.225l14.145-24.5c.61-1.06 2.145-1.06 2.755 0Z'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M49.21 46.75h-2.42l-1.73-9h5.88l-1.73 9ZM48 52.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M57.75 38.5V12.25l-12-12H6.25v63.5h51.5V55.5'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M45.75.5v11.75H57.5M24.5 19.75a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5ZM14.75 29.5a9.75 9.75 0 0 1 9.75-9.75 9.75 9.75 0 0 1 9.75 9.75M40 19.25h9M40 24.25h9M40 29.25h6.205M15 37.25h26.5M15 42.25h12.25M15 47.25h10.25M15 52.25h4.5'
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

SvgDeletedMembersBlue64.displayName = 'SvgDeletedMembersBlue64'
export default SvgDeletedMembersBlue64
