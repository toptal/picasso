import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgQuizWhite64 = forwardRef(function SvgQuizWhite64(
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
          d='M51.479 5.931H36.272v15.207h15.207V5.931ZM51.479 24.397H36.272v15.207h15.207V24.397ZM51.479 42.862H36.272V58.07h15.207V42.862Z'
          fill='#231F20'
        />
        <path
          d='M57.41 64H6.59V0h50.82v64ZM7.59 63h48.82V1H7.59v62Z'
          fill='#fff'
        />
        <path
          d='M30.393 13.444H14.538v1h15.855v-1ZM30.393 30.823H14.538v1h15.855v-1ZM30.393 49.965H14.538v1h15.855v-1ZM43.215 16.283l-3.29-3.29.707-.707 2.583 2.583 3.904-3.904.707.707-4.611 4.611ZM46.699 28.47l-6.355 6.354.708.707 6.354-6.354-.707-.707Z'
          fill='#fff'
        />
        <path
          d='m41.052 28.47-.707.706 6.354 6.355.707-.707-6.354-6.355ZM46.699 46.935l-6.354 6.354.707.707 6.354-6.354-.707-.707Z'
          fill='#fff'
        />
        <path
          d='m41.052 46.935-.707.707 6.354 6.354.707-.707-6.354-6.354Z'
          fill='#fff'
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

SvgQuizWhite64.displayName = 'SvgQuizWhite64'
export default SvgQuizWhite64
