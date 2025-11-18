import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgExpiredLinkWhite64 = forwardRef(function SvgExpiredLinkWhite64(
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
          d='M32.4 35.8a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M32.4 35.8a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z'
        />
        <path fill='#000' d='M35.8 13.4H29L31 27h2.8l2-13.6Z' opacity={0.3} />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M35.8 13.4H29L31 27h2.8l2-13.6ZM18 24.6h3.2m22.4 0h3.2m-24.6 10 2-2m16.4-16 2-2m-20.4 0 2 2m16.4 16 2 2'
        />
        <path
          fill='#000'
          d='M27.804 42.752H2.396v2.7c0 2.536 2.064 4.6 4.6 4.6H32.4v-2.7c0-2.536-2.064-4.6-4.6-4.6h.004ZM32.2 63.4l30-22.712v4.813a7.206 7.206 0 0 1-4.3 6.592L32.2 63.4Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M57.9 52.092 32.2 63.4V50.2H7a4.799 4.799 0 0 1-4.8-4.8V5C2.2 2.348 4.348.2 7 .2h50.4c2.652 0 4.8 2.148 4.8 4.8v40.5a7.206 7.206 0 0 1-4.3 6.592Z'
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

SvgExpiredLinkWhite64.displayName = 'SvgExpiredLinkWhite64'
export default SvgExpiredLinkWhite64
