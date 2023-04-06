import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHomeWhite64 = forwardRef(function SvgHomeWhite64(
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
          d='M9.5 1.445V10.9l6.75-2.8V1.446H9.5ZM5.881 30.214 32 19.176l26.119 11.038V20.132L32 9.094 5.881 20.132v10.082Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M35.338 29.327H18.576v10.875h16.762V29.327Z'
          fill='#231F20'
        />
        <path
          d='M64 23.16 32 9.637 0 23.16v-8.734L32 .902l32 13.524v8.734ZM32 8.55l31 13.102V15.09L32 1.988l-31 13.1v6.564L32 8.551Z'
          fill='#fff'
        />
        <path
          d='M10 10.9H9V.945h7.75V8.1h-1V1.945H10V10.9ZM58.619 64.945H5.381V20.132h1v43.813h51.238V20.132h1v44.813Z'
          fill='#fff'
        />
        <path
          d='M52.078 64.445h-1V47.76a1.752 1.752 0 0 0-1.75-1.75H14.672a1.752 1.752 0 0 0-1.75 1.75v16.685h-1V47.76a2.753 2.753 0 0 1 2.75-2.75h34.656a2.753 2.753 0 0 1 2.75 2.75v16.685ZM35.837 40.702H18.076V28.827h17.761v11.875Zm-16.761-1h15.761v-9.875H19.076v9.875Z'
          fill='#fff'
        />
        <path
          d='M27.456 40.202h-1v5.308h1v-5.308ZM40.197 51.469h-1v7.782h1V51.47Z'
          fill='#fff'
        />
        <path
          d='M33.962 54.094h-1V52.78a1.814 1.814 0 0 1 1.813-1.812h8.344a1.752 1.752 0 0 0 1.75-1.75V35.85h1V49.22a2.754 2.754 0 0 1-2.75 2.75h-8.344a.813.813 0 0 0-.813.812v1.313ZM44.623 64.466a4.93 4.93 0 0 0-9.852 0l-1-.043a5.931 5.931 0 0 1 11.852 0l-1 .043Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .902)'
            d='M0 0h64v64.043H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHomeWhite64.displayName = 'SvgHomeWhite64'
export default SvgHomeWhite64
