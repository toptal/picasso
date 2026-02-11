import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLocationFriendsBlue64 = forwardRef(function SvgLocationFriendsBlue64(
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
          d='M5.5 45v-.5c0-3.31 2.69-6 6-6s6 2.69 6 6v.5M11.5 38.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M22.5 38.5c0 .39-.02.78-.06 1.16-.58 5.53-5.26 9.84-10.94 9.84-6.08 0-11-4.92-11-11s4.92-11 11-11c1.52 0 2.97.31 4.28.86 3.95 1.67 6.72 5.58 6.72 10.14ZM31.5 25.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M11.5 38.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5.5 45v-.5c0-3.31 2.69-6 6-6s6 2.69 6 6v.5M50.38 27.56A10.994 10.994 0 0 1 62.5 38.5c0 6.08-4.92 11-11 11-5.7 0-10.38-4.33-10.94-9.88'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M51.5 38.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM45.5 45v-.5c0-3.31 2.69-6 6-6s6 2.69 6 6v.5'
        />
        <path
          fill='#183A9C'
          d='M51.5 27c-1.45 0-2.83.28-4.1.77-1.81 4.42-4.55 8.77-7.25 12.47.84 5.53 5.6 9.76 11.36 9.76 6.35 0 11.5-5.15 11.5-11.5S57.86 27 51.51 27h-.01Zm6 18h-12v-.5c0-3.31 2.69-6 6-6-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3c3.31 0 6 2.69 6 6v.5Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M14.96 26.09c-.91-2.57-1.46-5.14-1.46-7.59 0-9.94 8.06-18 18-18s18 8.06 18 18c0 14-18 32-18 32s-4.54-4.54-9.06-10.84'
        />
        <path
          fill='#183A9C'
          d='M35.45 46.16c-2.3 2.69-3.95 4.34-3.95 4.34s-1.61-1.61-3.86-4.24C20.37 47.11 15 50.03 15 53.5c0 4.14 7.61 7.5 17 7.5s17-3.36 17-7.5c0-3.62-5.81-6.64-13.55-7.34Z'
          opacity={0.15}
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

SvgLocationFriendsBlue64.displayName = 'SvgLocationFriendsBlue64'
export default SvgLocationFriendsBlue64
