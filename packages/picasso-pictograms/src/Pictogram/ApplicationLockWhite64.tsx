import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgApplicationLockWhite64 = forwardRef(function SvgApplicationLockWhite64(
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
          d='M63.5 50.517H.5v7.552h63v-7.553ZM43.485 29.853h-22.97v16.96h22.97v-16.96Z'
          fill='#231F20'
        />
        <path
          d='M64 58.569H0V5.43h64V58.57Zm-63-1h62V6.43H1V57.57Z'
          fill='#fff'
        />
        <path
          d='M43.985 47.312h-23.97V29.353h23.97v17.96Zm-22.97-1h21.97V30.353h-21.97v15.96Z'
          fill='#fff'
        />
        <path
          d='M40.888 29.853h-1v-4.277a7.889 7.889 0 0 0-15.776 0v4.277h-1v-4.277a8.888 8.888 0 0 1 17.776 0v4.277ZM12.157 13.65a1.687 1.687 0 1 0 0-3.374 1.687 1.687 0 0 0 0 3.375ZM6.532 13.65a1.687 1.687 0 1 0 0-3.374 1.687 1.687 0 0 0 0 3.375ZM17.782 13.65a1.687 1.687 0 1 0 0-3.374 1.687 1.687 0 0 0 0 3.375Z'
          fill='#fff'
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

SvgApplicationLockWhite64.displayName = 'SvgApplicationLockWhite64'
export default SvgApplicationLockWhite64
