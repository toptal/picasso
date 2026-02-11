import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgWebErrorBlue64 = forwardRef(function SvgWebErrorBlue64(
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
          d='M4.5 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9.5 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM14.5 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M60.5 7.5h-57a3 3 0 0 0-3 3v43a3 3 0 0 0 3 3h57a3 3 0 0 0 3-3v-43a3 3 0 0 0-3-3Z'
        />
        <path
          fill='#183A9C'
          d='M16.33 43.66c-.59 1.04.16 2.34 1.36 2.34h28.22c1.2 0 1.95-1.29 1.36-2.34l-.26-.46H16.59l-.26.46Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='m33.15 18.13 14.3 26.44c.47.87-.16 1.93-1.15 1.93H17.69c-.99 0-1.62-1.06-1.15-1.93l14.3-26.44c.49-.91 1.81-.91 2.3 0h.01Z'
        />
        <path
          fill='#183A9C'
          d='m30.31 34.01-.5-4.03a2.206 2.206 0 1 1 4.38 0l-.5 4.03c-.11.85-.83 1.49-1.69 1.49s-1.58-.64-1.69-1.49ZM32 43.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='m30.31 34.01-.5-4.03a2.206 2.206 0 1 1 4.38 0l-.5 4.03c-.11.85-.83 1.49-1.69 1.49s-1.58-.64-1.69-1.49ZM32 43.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'
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

SvgWebErrorBlue64.displayName = 'SvgWebErrorBlue64'
export default SvgWebErrorBlue64
