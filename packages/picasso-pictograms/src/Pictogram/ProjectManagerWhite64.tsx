import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgProjectManagerWhite64 = forwardRef(function SvgProjectManagerWhite64(
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
          d='M15.05 29c-.67 1.88-1.05 3.89-1.05 6h36c0-2.11-.38-4.12-1.05-6h-33.9ZM53 47h-9.5v3.5h-4V47h-15v3.5h-4V47H11v13.75c0 1.24 1.01 2.25 2.25 2.25h37.51c1.24 0 2.25-1.01 2.25-2.25V47H53Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M49.22 32C47.8 23.77 40.64 17.5 32 17.5c-8.64 0-15.8 6.27-17.22 14.5M32 17.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM50.5 34.5h-37a3 3 0 0 0-3 3v23a3 3 0 0 0 3 3h37a3 3 0 0 0 3-3v-23a3 3 0 0 0-3-3Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M20.5 47.5h-7c-1.66 0-3-1.34-3-3v-7c0-1.66 1.34-3 3-3h37c1.66 0 3 1.34 3 3v7c0 1.66-1.34 3-3 3h-7M39.5 47.5h-15M37.5 34v-2.5c0-1.66-1.34-3-3-3h-5c-1.66 0-3 1.34-3 3V34'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M24.5 44.5h-4v6h4v-6ZM43.5 44.5h-4v6h4v-6Z'
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

SvgProjectManagerWhite64.displayName = 'SvgProjectManagerWhite64'
export default SvgProjectManagerWhite64
