import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgSecurityShieldWhite64 = forwardRef(function SvgSecurityShieldWhite64(
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
        <path fill='#000' d='M41 31H22v11h19V31Z' opacity={0.3} />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M18.78 54.97 32 63l13.22-8.03A25.548 25.548 0 0 0 57.5 33.13V4.5H45.21c-4.41 0-8.76-1.03-12.71-3h-1c-3.95 1.97-8.3 3-12.71 3H6.5v28.63c0 8.93 4.66 17.2 12.28 21.84Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M41.5 28.5h-20v14h20v-14ZM38.5 28v-5.5c0-3.87-3.13-7-7-7s-7 3.13-7 7V28'
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

SvgSecurityShieldWhite64.displayName = 'SvgSecurityShieldWhite64'
export default SvgSecurityShieldWhite64
