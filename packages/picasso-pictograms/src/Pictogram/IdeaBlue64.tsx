import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgIdeaBlue64 = forwardRef(function SvgIdeaBlue64(
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
      viewBox='0 0 64 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M32 38.734a7.712 7.712 0 1 0 0-15.424 7.712 7.712 0 0 0 0 15.424ZM32 38.734a15.57 15.57 0 0 0-15.57 15.571h31.14A15.572 15.572 0 0 0 32 38.735Z'
          fill='#183A9E'
        />
        <path
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.035 31.035 0 0 0 32 1Z'
          fill='#204ECF'
        />
        <path
          d='M32 39.234a8.212 8.212 0 1 1 8.212-8.212A8.221 8.221 0 0 1 32 39.234Zm0-15.423a7.211 7.211 0 1 0 7.212 7.212A7.22 7.22 0 0 0 32 23.81Z'
          fill='#204ECF'
        />
        <path
          d='M48.07 54.305h-1a15.07 15.07 0 1 0-30.14 0h-1a16.071 16.071 0 0 1 32.14 0ZM32.14 19.194h-.28a2.35 2.35 0 0 1-2.347-2.348A8.016 8.016 0 0 0 27.933 12a4.208 4.208 0 0 1-.883-2.57A4.75 4.75 0 0 1 32 4.923a4.75 4.75 0 0 1 4.95 4.508 4.208 4.208 0 0 1-.882 2.569 8.016 8.016 0 0 0-1.58 4.847 2.35 2.35 0 0 1-2.348 2.348ZM32 5.922a3.753 3.753 0 0 0-3.95 3.508c.003.71.24 1.4.677 1.962a9.02 9.02 0 0 1 1.786 5.454 1.35 1.35 0 0 0 1.347 1.348h.28a1.349 1.349 0 0 0 1.347-1.348 9.02 9.02 0 0 1 1.786-5.454 3.216 3.216 0 0 0 .677-1.962A3.753 3.753 0 0 0 32 5.922Z'
          fill='#204ECF'
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

SvgIdeaBlue64.displayName = 'SvgIdeaBlue64'
export default SvgIdeaBlue64
