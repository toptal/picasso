import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgVisaBlue64 = forwardRef(function SvgVisaBlue64(
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
          d='M21.067 47.713a3.948 3.948 0 1 0 0-7.897 3.948 3.948 0 0 0 0 7.897Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M21.067 47.712a7.971 7.971 0 0 0-7.971 7.972h15.942a7.972 7.972 0 0 0-7.97-7.972ZM47.316 6.461H16.684a3.375 3.375 0 0 0-3.375 3.375v12.828a3.375 3.375 0 0 0 3.375 3.375h30.632a3.374 3.374 0 0 0 3.375-3.375V9.836a3.375 3.375 0 0 0-3.375-3.375ZM44.46 19.678h-9.15v-6.856h9.15v6.857Z'
          fill='#183A9E'
        />
        <path
          d='M57.727 32.5H6.273V0h51.454v32.5Zm-50.454-1h49.454V1H7.273v30.5Z'
          fill='#204ECF'
        />
        <path d='M57.727 64H6.273V32h1v31h49.454V32h1v32Z' fill='#204ECF' />
        <path
          d='M21.067 48.212a4.448 4.448 0 1 1 0-8.895 4.448 4.448 0 0 1 0 8.895Zm0-7.896a3.448 3.448 0 1 0 0 6.897 3.448 3.448 0 0 0 0-6.897Z'
          fill='#204ECF'
        />
        <path
          d='M29.539 55.684h-1a7.472 7.472 0 0 0-14.943 0h-1a8.47 8.47 0 0 1 16.943 0ZM50.69 40.432H35.36v1h15.33v-1ZM50.69 47.29H35.36v1h15.33v-1ZM41.397 54.068H35.36v1h6.036v-1ZM28.69 12.322H18.454v1H28.69v-1ZM23.26 19.178h-4.806v1h4.806v-1ZM44.96 20.178H34.81v-7.856h10.15v7.856Zm-9.15-1h8.15v-5.856h-8.15v5.856Z'
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

SvgVisaBlue64.displayName = 'SvgVisaBlue64'
export default SvgVisaBlue64
