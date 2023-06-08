import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLightbulbBlue64 = forwardRef(function SvgLightbulbBlue64(
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
          d='M22.561 54.736a8.79 8.79 0 0 0 8.777 8.76h1.32a8.793 8.793 0 0 0 8.777-8.76c-.004-2.233.17-4.463.518-6.67h-19.91c.349 2.207.522 4.437.518 6.67Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32.664 64h-1.328a9.281 9.281 0 0 1-9.27-9.27 39.923 39.923 0 0 0-7.886-24.147 18.118 18.118 0 0 1-3.802-11.058C10.378 8.759 20.078 0 32 0s21.622 8.759 21.622 19.525a18.118 18.118 0 0 1-3.802 11.058 39.925 39.925 0 0 0-7.886 24.147 9.281 9.281 0 0 1-9.27 9.27ZM32 1C20.63 1 11.378 9.31 11.378 19.525a17.128 17.128 0 0 0 3.597 10.451 40.927 40.927 0 0 1 8.09 24.754 8.28 8.28 0 0 0 8.27 8.27h1.33a8.28 8.28 0 0 0 8.27-8.27 40.929 40.929 0 0 1 8.09-24.754 17.128 17.128 0 0 0 3.597-10.451C52.622 9.31 43.37 1 32 1Z'
        />
        <path
          fill='#204ECF'
          d='M41.992 47.568H22.05v1h19.943v-1ZM36.092 40.041h-1V29.283h-6.184V40.04h-1V29.283h-2.86a3.76 3.76 0 0 1-3.123-1.797 3.413 3.413 0 0 1-.12-3.35 3.632 3.632 0 0 1 3.77-1.986 3.582 3.582 0 0 1 3.113 2.823c.186 1.053.26 2.122.22 3.19v.12h6.184v-.12a15.17 15.17 0 0 1 .22-3.19 3.582 3.582 0 0 1 3.112-2.823 3.624 3.624 0 0 1 3.77 1.986 3.415 3.415 0 0 1-.112 3.34 3.761 3.761 0 0 1-3.098 1.807h-2.892V40.04ZM25.086 23.12a2.582 2.582 0 0 0-2.385 1.46 2.4 2.4 0 0 0 .078 2.386 2.749 2.749 0 0 0 2.278 1.317h2.851v-.122a14.179 14.179 0 0 0-.199-2.982 2.571 2.571 0 0 0-2.26-2.037 2.913 2.913 0 0 0-.363-.022Zm13.828 0c-.122 0-.243.007-.363.022a2.572 2.572 0 0 0-2.26 2.037 14.179 14.179 0 0 0-.2 2.982v.122h2.881a2.746 2.746 0 0 0 2.253-1.324 2.402 2.402 0 0 0 .074-2.378 2.583 2.583 0 0 0-2.385-1.461Z'
        />
        <path
          fill='#204ECF'
          d='M64 48.567H41.992v-1H63V16.433H52.744v-1H64v33.134ZM22.049 48.567H0V15.433h11.274v1H1v31.134h21.049v1Z'
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

SvgLightbulbBlue64.displayName = 'SvgLightbulbBlue64'
export default SvgLightbulbBlue64
