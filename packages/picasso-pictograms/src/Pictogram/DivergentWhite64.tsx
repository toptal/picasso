import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDivergentWhite64 = forwardRef(function SvgDivergentWhite64(
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
      viewBox='0 0 65 65'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#231F20'
          d='M32.515 38.224H20.749l-11.764.002c4.77 0 9.345 1.895 12.718 5.268l4.652 4.653h16.082l-9.922-9.923ZM29.675 29.692A29.131 29.131 0 0 1 9.09 38.224l23.423-.002 11.37-11.37H32.515l-2.84 2.84Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M51.962 44.782v-6.06H11.249v-1h41.713v4.646l9.831-9.83-9.831-9.83v4.645H32.515v-1h19.447v-6.06l12.245 12.245-12.245 12.244Z'
        />
        <path
          fill='#fff'
          d='M9.076 38.724H0V26.351h8.984A17.372 17.372 0 0 0 21.35 21.23L37.757 4.822 33.474.539H50.79v17.316l-4.285-4.285-16.477 16.476a29.436 29.436 0 0 1-20.952 8.678Zm-8.076-1h8.076a28.443 28.443 0 0 0 20.245-8.385l17.184-17.183 3.285 3.284V1.54H35.888l3.284 3.283-17.116 17.115A18.365 18.365 0 0 1 8.984 27.35H1v10.373Z'
        />
        <path
          fill='#fff'
          d='M50.79 64.538H33.474l4.283-4.283L21.35 43.848a17.37 17.37 0 0 0-12.364-5.122v-1a18.366 18.366 0 0 1 13.071 5.415l17.116 17.114-3.284 3.283H49.79V49.638l-3.285 3.284-14.346-14.345.707-.707 13.639 13.638 4.285-4.284v17.316ZM1 13.063H0v38.95h1v-38.95Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .539h64.207v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDivergentWhite64.displayName = 'SvgDivergentWhite64'
export default SvgDivergentWhite64
