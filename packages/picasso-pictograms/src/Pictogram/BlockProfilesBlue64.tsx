import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBlockProfilesBlue64 = forwardRef(function SvgBlockProfilesBlue64(
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
          d='M14 16.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM14 19.5C7.1 19.5 1.5 25.1 1.5 32h25c0-6.9-5.6-12.5-12.5-12.5ZM12.8 55.7l42.9-42.9a29.98 29.98 0 0 0-2.13-2.37L10.43 53.57c.75.75 1.54 1.46 2.37 2.13Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M14 16.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM50 47.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM5.25 58.75l53.5-53.5M8.27 51.16A30.394 30.394 0 0 1 1.5 32c0-7.26 5.6-12.5 12.5-12.5S26.5 25.1 26.5 32M10.43 53.57C15.95 59.09 23.57 62.5 32 62.5h5.51c.26-6.67 5.75-12 12.49-12S62.5 56.1 62.5 63M53.57 10.43C59.09 15.95 62.5 23.57 62.5 32M32 1.5c7.22 0 13.86 2.51 19.09 6.71'
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

SvgBlockProfilesBlue64.displayName = 'SvgBlockProfilesBlue64'
export default SvgBlockProfilesBlue64
