import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBarGraphWhite64 = forwardRef(function SvgBarGraphWhite64(
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
          opacity={0.3}
          d='M63.5 44.224H.5v9.624h63v-9.624ZM40.158.973H23.842v4.5h16.316v-4.5Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='m22.498 38.232-8.633.017.012 6.02 8.633-.017-.012-6.02ZM36.295 30.496l-8.633.017.028 13.729 8.632-.018-.027-13.728ZM50.076 15.052l-8.633.018.06 29.144 8.632-.018-.059-29.144Z'
          fill='#231F20'
        />
        <path
          d='m13.378 44.77-.014-7.02 9.633-.02.014 7.021-9.633.02Zm.988-6.022.01 5.02 7.633-.015-.01-5.02-7.633.015ZM27.19 44.742l-.029-14.728 9.633-.02.03 14.73-9.634.018Zm.973-13.73.026 12.728 7.632-.015-.025-12.728-7.633.015ZM41.003 44.715l-.06-30.144 9.632-.02.06 30.144-9.632.02Zm.941-29.146.057 28.144 7.633-.016-.057-28.144-7.633.016Z'
          fill='#fff'
        />
        <path
          d='M64 54.348H0V4.973h64v49.375Zm-63-1h62V5.973H1v47.375Z'
          fill='#fff'
        />
        <path
          d='M32.5 53.848h-1v10.125h1V53.848ZM19.877 53.566l-6.852 10.105.828.562 6.852-10.105-.828-.562ZM44.121 53.568l-.828.561 6.855 10.103.828-.562-6.855-10.102ZM40.658 5.473h-1v-4H24.342v4h-1v-5h17.316v5Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .473)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgBarGraphWhite64.displayName = 'SvgBarGraphWhite64'
export default SvgBarGraphWhite64
