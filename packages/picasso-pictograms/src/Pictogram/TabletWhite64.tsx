import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTabletWhite64 = forwardRef(function SvgTabletWhite64(
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
          fill='#231F20'
          d='M13.95 4.249h36.1a1.502 1.502 0 0 1 1.502 1.501v52.5a1.501 1.501 0 0 1-1.501 1.501H13.949a1.5 1.5 0 0 1-1.5-1.5V5.75a1.501 1.501 0 0 1 1.5-1.501Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M50.05 64h-36.1a5.757 5.757 0 0 1-5.75-5.75V5.75A5.757 5.757 0 0 1 13.95 0h36.1a5.757 5.757 0 0 1 5.75 5.75v52.5A5.757 5.757 0 0 1 50.05 64ZM13.95 1A4.756 4.756 0 0 0 9.2 5.75v52.5A4.756 4.756 0 0 0 13.95 63h36.1a4.755 4.755 0 0 0 4.75-4.75V5.75A4.755 4.755 0 0 0 50.05 1h-36.1Z'
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

SvgTabletWhite64.displayName = 'SvgTabletWhite64'
export default SvgTabletWhite64
