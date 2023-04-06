import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDivergentBlue64 = forwardRef(function SvgDivergentBlue64(
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
      viewBox='0 0 65 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M32.515 37.686H20.749l-11.764.002c4.77 0 9.345 1.895 12.718 5.267l4.652 4.653h16.082l-9.922-9.922ZM29.675 29.154A29.131 29.131 0 0 1 9.09 37.685l23.423-.001 11.37-11.37H32.515l-2.84 2.84Z'
          fill='#183A9E'
        />
        <path
          d='M51.962 44.243v-6.059H11.249v-1h41.713v4.645l9.831-9.83-9.831-9.83v4.645H32.515v-1h19.447v-6.059l12.245 12.244-12.245 12.244Z'
          fill='#204ECF'
        />
        <path
          d='M9.076 38.186H0V25.813h8.984A17.372 17.372 0 0 0 21.35 20.69L37.757 4.283 33.474 0H50.79v17.316l-4.285-4.285-16.477 16.476a29.435 29.435 0 0 1-20.952 8.679Zm-8.076-1h8.076A28.445 28.445 0 0 0 29.321 28.8l17.184-17.183 3.285 3.285V1H35.888l3.284 3.283-17.116 17.115a18.365 18.365 0 0 1-13.072 5.415H1v10.373Z'
          fill='#204ECF'
        />
        <path
          d='M50.79 64H33.474l4.283-4.283L21.35 43.309a17.371 17.371 0 0 0-12.364-5.122v-1a18.366 18.366 0 0 1 13.071 5.415l17.116 17.115L35.888 63H49.79V49.098l-3.285 3.285-14.346-14.346.707-.706 13.639 13.638 4.285-4.285V64ZM1 12.525H0v38.949h1v-38.95Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.207v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDivergentBlue64.displayName = 'SvgDivergentBlue64'
export default SvgDivergentBlue64
