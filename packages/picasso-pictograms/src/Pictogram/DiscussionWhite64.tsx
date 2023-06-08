import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDiscussionWhite64 = forwardRef(function SvgDiscussionWhite64(
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
          d='M32 51.477a12.529 12.529 0 0 0-9.47 4.314 12.509 12.509 0 0 1 3.092 8.248h18.939A12.56 12.56 0 0 0 32 51.477ZM32 49.038a6.221 6.221 0 1 0 0-12.442 6.221 6.221 0 0 0 0 12.442Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M50.938 49.538a6.721 6.721 0 1 1 6.722-6.721 6.73 6.73 0 0 1-6.721 6.721Zm0-12.442a5.721 5.721 0 1 0 5.722 5.72 5.728 5.728 0 0 0-5.721-5.72Z'
        />
        <path
          fill='#fff'
          d='M64 64.039h-1a12.061 12.061 0 0 0-21.154-7.925l-.754-.657A13.062 13.062 0 0 1 64 64.039ZM32 49.538a6.722 6.722 0 1 1 6.721-6.721A6.73 6.73 0 0 1 32 49.538Zm0-12.442a5.72 5.72 0 1 0 0 11.441 5.72 5.72 0 0 0 0-11.441Z'
        />
        <path
          fill='#fff'
          d='M45.06 64.038h-.999a12.061 12.061 0 0 0-21.156-7.92l-.754-.658a13.06 13.06 0 0 1 22.91 8.578ZM13.061 49.538a6.721 6.721 0 1 1 6.721-6.721 6.73 6.73 0 0 1-6.721 6.721Zm0-12.442a5.72 5.72 0 1 0 0 11.441 5.72 5.72 0 0 0 0-11.441Z'
        />
        <path
          fill='#fff'
          d='M26.122 64.039h-1a12.061 12.061 0 1 0-24.122 0H0a13.061 13.061 0 1 1 26.122 0ZM32.5 31.196l-7.69-7.691h-4.558l-7.691 7.69v-7.69H6.34V.539h51.32v22.966h-6.22v7.69l-7.692-7.69H32.5v7.69Zm-1-8.691h12.662l6.278 6.277v-6.277h6.22V1.539H7.34v20.966h6.221v6.277l6.277-6.277h5.385l6.277 6.277v-6.277Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .539h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDiscussionWhite64.displayName = 'SvgDiscussionWhite64'
export default SvgDiscussionWhite64
