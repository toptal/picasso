import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLeaderBlue64 = forwardRef(function SvgLeaderBlue64(
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
          d='M32 15.118a4.19 4.19 0 1 0 0-8.382 4.19 4.19 0 0 0 0 8.382Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M32 15.118a8.462 8.462 0 0 0-8.463 8.463h16.926A8.464 8.464 0 0 0 32 15.118Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32 31.414a15.707 15.707 0 1 1 15.707-15.707A15.725 15.725 0 0 1 32 31.414ZM32 1a14.707 14.707 0 1 0 14.707 14.707A14.724 14.724 0 0 0 32 1ZM9.406 55.094a4.912 4.912 0 1 1 4.911-4.911 4.917 4.917 0 0 1-4.91 4.91Zm0-8.822a3.912 3.912 0 1 0 0 7.823 3.912 3.912 0 0 0 0-7.823Z'
        />
        <path
          fill='#204ECF'
          d='M18.813 63.5h-1A8.407 8.407 0 0 0 1 63.5H0a9.406 9.406 0 1 1 18.813 0ZM32 55.094a4.912 4.912 0 1 1 4.911-4.911A4.916 4.916 0 0 1 32 55.093Zm0-8.822a3.912 3.912 0 1 0 0 7.823 3.912 3.912 0 0 0 0-7.823Z'
        />
        <path
          fill='#204ECF'
          d='M41.406 63.5h-1a8.406 8.406 0 1 0-16.812 0h-1a9.406 9.406 0 1 1 18.812 0ZM54.594 55.094a4.911 4.911 0 1 1 0-9.823 4.911 4.911 0 0 1 0 9.823Zm0-8.822a3.911 3.911 0 1 0 0 7.822 3.911 3.911 0 0 0 0-7.822Z'
        />
        <path
          fill='#204ECF'
          d='M64 63.5h-1a8.407 8.407 0 0 0-16.813 0h-1A9.406 9.406 0 1 1 64 63.5ZM32 15.618a4.691 4.691 0 1 1 0-9.383 4.691 4.691 0 0 1 0 9.383Zm0-8.383a3.691 3.691 0 1 0 0 7.383 3.691 3.691 0 0 0 0-7.383Z'
        />
        <path
          fill='#204ECF'
          d='M40.962 23.581h-1a7.963 7.963 0 1 0-15.925 0h-1A8.965 8.965 0 0 1 32 14.609a8.963 8.963 0 0 1 8.962 8.972ZM55.094 45.77h-1v-6.995H9.906v6.996h-1v-7.996h46.188v7.996Z'
        />
        <path fill='#204ECF' d='M32.5 30.914h-1v14.858h1V30.914Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLeaderBlue64.displayName = 'SvgLeaderBlue64'
export default SvgLeaderBlue64
