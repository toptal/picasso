import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgMedalBadgeBlue64 = forwardRef(function SvgMedalBadgeBlue64(
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
          d='m32 29.32 4.38 8.88 9.8 1.43-7.09 6.91 1.68 9.76L32 51.69l-8.77 4.61 1.68-9.76-7.09-6.91 9.8-1.43L32 29.32ZM29.42 20.5 9.33.42h-6L23.42 20.5h6ZM40.42 20.5 20.33.42h-6L34.42 20.5h6Z'
          opacity={0.15}
        />
        <path
          fill='#183A9C'
          d='M37.38 17.46 54.42.42h6L40.33 20.5l-2.95-3.04ZM31.88 11.96 43.42.42h6L34.88 14.96l-3-3Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M32 63.5c10.77 0 19.5-8.73 19.5-19.5S42.77 24.5 32 24.5 12.5 33.23 12.5 44 21.23 63.5 32 63.5Z'
        />
        <path
          stroke='#204ECD'
          strokeLinejoin='round'
          d='M3.33.42 23.42 20.5h17L20.33.42'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M31.88 11.96 43.42.42M60.42.42 40.33 20.5'
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

SvgMedalBadgeBlue64.displayName = 'SvgMedalBadgeBlue64'
export default SvgMedalBadgeBlue64
