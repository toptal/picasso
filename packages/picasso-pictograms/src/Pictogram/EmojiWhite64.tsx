import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEmojiWhite64 = forwardRef(function SvgEmojiWhite64(
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
          d='M21.555 14.498h-1.383a2.567 2.567 0 0 0-2.567 2.567v1.383a2.567 2.567 0 0 0 2.567 2.567h1.383a2.567 2.567 0 0 0 2.567-2.567v-1.383a2.567 2.567 0 0 0-2.567-2.567ZM34.688 14.498h-1.383a2.567 2.567 0 0 0-2.567 2.567v1.383a2.567 2.567 0 0 0 2.567 2.567h1.383a2.567 2.567 0 0 0 2.567-2.567v-1.383a2.567 2.567 0 0 0-2.567-2.567ZM47.75 32.746a15.75 15.75 0 1 0 0 31.498 15.75 15.75 0 0 0 0-31.498Zm8.507 15.83-1.228 4.594a3.747 3.747 0 0 1-3.62 2.78h-4.293a5.517 5.517 0 0 1-4.41-2.199h-3.32v-8.097h3.05l3.107-3.122 1.704-3.5a.916.916 0 0 1 1.241-.412 2.358 2.358 0 0 1 1.246 2.496l-.608 3.538h4.12a3.118 3.118 0 0 1 3.01 3.922Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M27.43 55.605a27.43 27.43 0 1 1 27.43-27.43c0 1.857-.187 3.709-.557 5.528l-.98-.2A26.403 26.403 0 1 0 33.074 54l.213.977a27.617 27.617 0 0 1-5.858.627Z'
        />
        <path
          fill='#fff'
          d='M27.43 44.398a16.24 16.24 0 0 1-16.222-16.223v-.5h32.443v.5a16.154 16.154 0 0 1-1.062 5.786l-.934-.356a15.16 15.16 0 0 0 .989-4.93H12.216a15.233 15.233 0 0 0 20.642 13.726l.358.935a16.17 16.17 0 0 1-5.786 1.062ZM21.555 21.515h-1.383a3.071 3.071 0 0 1-3.067-3.068v-1.382a3.07 3.07 0 0 1 3.067-3.067h1.383a3.07 3.07 0 0 1 3.067 3.067v1.382a3.071 3.071 0 0 1-3.067 3.068Zm-1.383-6.517a2.07 2.07 0 0 0-2.067 2.067v1.382a2.07 2.07 0 0 0 2.067 2.068h1.383a2.07 2.07 0 0 0 2.067-2.068v-1.382a2.07 2.07 0 0 0-2.067-2.067h-1.383ZM34.688 21.515h-1.383a3.071 3.071 0 0 1-3.068-3.068v-1.382a3.07 3.07 0 0 1 3.068-3.067h1.383a3.07 3.07 0 0 1 3.067 3.067v1.382a3.071 3.071 0 0 1-3.068 3.068Zm-1.383-6.517a2.07 2.07 0 0 0-2.068 2.067v1.382a2.07 2.07 0 0 0 2.068 2.068h1.383a2.07 2.07 0 0 0 2.067-2.068v-1.382a2.07 2.07 0 0 0-2.068-2.067h-1.382Z'
        />
        <path
          fill='#fff'
          d='M47.75 64.746A16.25 16.25 0 1 1 64 48.496a16.268 16.268 0 0 1-16.25 16.25Zm0-31.5A15.25 15.25 0 1 0 63 48.496a15.267 15.267 0 0 0-15.25-15.25Z'
        />
        <path
          fill='#fff'
          d='M56.114 45.569a3.59 3.59 0 0 0-2.869-1.415H49.72l.508-2.954a2.85 2.85 0 0 0-1.511-3.026 1.415 1.415 0 0 0-1.92.64l-1.667 3.424-2.904 2.915h-3.34v9.099h3.576a6.045 6.045 0 0 0 4.654 2.198h4.293a4.255 4.255 0 0 0 4.104-3.151l1.227-4.593a3.594 3.594 0 0 0-.626-3.137Zm-.34 2.879-1.228 4.593a3.251 3.251 0 0 1-3.137 2.409h-4.293a5.037 5.037 0 0 1-4.011-1.999l-.15-.2h-3.07v-7.098h2.758l3.255-3.268 1.798-3.633a.415.415 0 0 1 .564-.188 1.852 1.852 0 0 1 .981 1.967l-.709 4.123h4.713a2.617 2.617 0 0 1 2.528 3.294Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .746h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgEmojiWhite64.displayName = 'SvgEmojiWhite64'
export default SvgEmojiWhite64
