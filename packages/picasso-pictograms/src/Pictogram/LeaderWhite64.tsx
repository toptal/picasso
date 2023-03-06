import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLeaderWhite64 = forwardRef(function SvgLeaderWhite64(
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
          d='M32 16.105a4.192 4.192 0 1 0 0-8.383 4.192 4.192 0 0 0 0 8.383Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M32 16.105a8.462 8.462 0 0 0-8.463 8.463h16.926A8.465 8.465 0 0 0 32 16.105Z'
          fill='#231F20'
        />
        <path
          d='M32 32.4a15.706 15.706 0 1 1 15.707-15.706A15.724 15.724 0 0 1 32 32.401Zm0-30.413a14.707 14.707 0 1 0 14.707 14.707A14.724 14.724 0 0 0 32 1.987ZM9.406 56.08a4.911 4.911 0 1 1 0-9.822 4.911 4.911 0 0 1 0 9.823Zm0-8.821a3.91 3.91 0 1 0 0 7.821 3.91 3.91 0 0 0 0-7.821Z'
          fill='#fff'
        />
        <path
          d='M18.813 64.487h-1a8.407 8.407 0 0 0-16.813 0H0a9.407 9.407 0 0 1 18.813 0ZM32 56.08a4.912 4.912 0 1 1 0-9.823 4.912 4.912 0 0 1 0 9.824Zm0-8.821a3.91 3.91 0 1 0 0 7.821 3.91 3.91 0 0 0 0-7.821Z'
          fill='#fff'
        />
        <path
          d='M41.406 64.487h-1a8.406 8.406 0 1 0-16.812 0h-1a9.407 9.407 0 0 1 18.812 0ZM54.594 56.08a4.911 4.911 0 1 1 0-9.822 4.911 4.911 0 0 1 0 9.823Zm0-8.821a3.91 3.91 0 1 0 0 7.82 3.91 3.91 0 0 0 0-7.82Z'
          fill='#fff'
        />
        <path
          d='M64 64.487h-1a8.407 8.407 0 0 0-16.813 0h-1a9.407 9.407 0 0 1 18.813 0ZM32 16.605a4.691 4.691 0 1 1 0-9.382 4.691 4.691 0 0 1 0 9.382Zm0-8.383a3.691 3.691 0 1 0 0 7.383 3.691 3.691 0 0 0 0-7.383Z'
          fill='#fff'
        />
        <path
          d='M40.962 24.568h-1a7.962 7.962 0 1 0-15.925 0h-1A8.965 8.965 0 0 1 32 15.596a8.963 8.963 0 0 1 8.962 8.972ZM55.094 46.758h-1v-6.996H9.906v6.996h-1v-7.996h46.188v7.996Z'
          fill='#fff'
        />
        <path d='M32.5 31.9h-1v14.858h1V31.901Z' fill='#fff' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .987)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLeaderWhite64.displayName = 'SvgLeaderWhite64'
export default SvgLeaderWhite64
