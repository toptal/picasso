import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDiscussionBlue64 = forwardRef(function SvgDiscussionBlue64(
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
          fill='#183A9E'
          d='M32 50.939a12.527 12.527 0 0 0-9.47 4.313 12.509 12.509 0 0 1 3.092 8.248h18.939A12.56 12.56 0 0 0 32 50.94ZM32 48.5a6.221 6.221 0 1 0 0-12.443A6.221 6.221 0 0 0 32 48.5Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M50.938 49a6.721 6.721 0 1 1 6.722-6.722A6.73 6.73 0 0 1 50.94 49Zm0-12.443a5.722 5.722 0 1 0 5.722 5.721 5.728 5.728 0 0 0-5.721-5.72Z'
        />
        <path
          fill='#204ECF'
          d='M64 63.5h-1a12.061 12.061 0 0 0-21.154-7.924l-.754-.657A13.062 13.062 0 0 1 64 63.5ZM32 49a6.722 6.722 0 1 1 6.721-6.722A6.729 6.729 0 0 1 32 49Zm0-12.443a5.722 5.722 0 1 0 5.721 5.721A5.728 5.728 0 0 0 32 36.558Z'
        />
        <path
          fill='#204ECF'
          d='M45.06 63.5h-.999a12.061 12.061 0 0 0-21.156-7.921l-.754-.658A13.06 13.06 0 0 1 45.06 63.5ZM13.061 49a6.721 6.721 0 1 1 6.721-6.722A6.729 6.729 0 0 1 13.061 49Zm0-12.443a5.722 5.722 0 1 0 5.721 5.721 5.728 5.728 0 0 0-5.721-5.72Z'
        />
        <path
          fill='#204ECF'
          d='M26.122 63.5h-1A12.06 12.06 0 1 0 1 63.5H0a13.06 13.06 0 1 1 26.122 0ZM32.5 30.657l-7.69-7.69h-4.558l-7.691 7.69v-7.69H6.34V0h51.32v22.966h-6.22v7.691l-7.692-7.69H32.5v7.69Zm-1-8.69h12.662l6.278 6.276v-6.277h6.22V1H7.34v20.966h6.221v6.277l6.277-6.277h5.385l6.277 6.277v-6.277Z'
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

SvgDiscussionBlue64.displayName = 'SvgDiscussionBlue64'
export default SvgDiscussionBlue64
