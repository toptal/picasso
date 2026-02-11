import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgWebLinkWhite64 = forwardRef(function SvgWebLinkWhite64(
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
          d='M4.5 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9.5 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM14.5 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM58 31.5h-5.78c-1.14-5.15-5.73-9-11.22-9h-2.5v5H41c2.7 0 5.02 1.65 6 4h-3a2.5 2.5 0 0 0 0 5h3c-.98 2.35-3.3 4-6 4H23c-2.7 0-5.02-1.65-6-4h3a2.5 2.5 0 0 0 0-5h-3c.98-2.35 3.3-4 6-4h2.5v-5H23c-5.49 0-10.08 3.85-11.22 9H6v5h5.78c1.14 5.15 5.73 9 11.22 9h18c5.49 0 10.08-3.85 11.22-9H58v-5Z'
          opacity={0.3}
        />
        <path
          fill='#000'
          d='M32 35.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM32 27.5c-.85 0-1.55-.65-1.62-1.49L29.71 18c-.11-1.34.95-2.49 2.29-2.49 1.35 0 2.4 1.15 2.29 2.49l-.67 8.01A1.63 1.63 0 0 1 32 27.5Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M60.5 7.5h-57a3 3 0 0 0-3 3v43a3 3 0 0 0 3 3h57a3 3 0 0 0 3-3v-43a3 3 0 0 0-3-3Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M47 36.5c-.98 2.35-3.3 4-6 4H23c-2.69 0-5-1.64-5.99-3.97M52.22 31.46C51.06 26.33 46.48 22.5 41 22.5h-2.5v5H41c2.66 0 4.96 1.6 5.96 3.9'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M11.77 36.5c1.14 5.15 5.73 9 11.23 9h18c5.49 0 10.09-3.85 11.23-9M17.01 31.48c.98-2.34 3.3-3.98 5.99-3.98h2.5v-5H23c-5.49 0-10.09 3.85-11.23 9M58 36.5H44a2.5 2.5 0 0 1 0-5h14M6 36.5h14a2.5 2.5 0 0 0 0-5H6M32 35.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM32 27.5c-.85 0-1.55-.65-1.62-1.49L29.71 18c-.11-1.34.95-2.49 2.29-2.49 1.35 0 2.4 1.15 2.29 2.49l-.67 8.01A1.63 1.63 0 0 1 32 27.5Z'
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

SvgWebLinkWhite64.displayName = 'SvgWebLinkWhite64'
export default SvgWebLinkWhite64
