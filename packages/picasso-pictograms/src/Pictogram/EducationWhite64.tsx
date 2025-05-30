import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEducationWhite64 = forwardRef(function SvgEducationWhite64(
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
      viewBox='0 0 67 65'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#231F20'
          d='M13.553 22.042v6.388l19.557 6.407 19.557-6.407v-6.388l-19.562 6.416-19.552-6.416Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M33.105 28.984 0 18.13 33.105 7.277 66.21 18.13 33.105 28.984ZM3.21 18.13l29.895 9.801L63 18.131 33.105 8.328 3.21 18.13Z'
        />
        <path
          fill='#fff'
          d='m33.11 47.548-20.057-6.571V22.042h1v18.21l19.057 6.243 19.057-6.243v-18.21h1v18.935l-20.057 6.57ZM59.674 20.063h-1v22.93h1v-22.93Z'
        />
        <path
          fill='#fff'
          d='M59.174 50.01a3.759 3.759 0 1 1 0-7.518 3.759 3.759 0 0 1 0 7.518Zm0-6.517a2.758 2.758 0 1 0 0 5.515 2.758 2.758 0 0 0 0-5.515ZM61.532 57.188H4.934v1h56.598v-1Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .746h66.21v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgEducationWhite64.displayName = 'SvgEducationWhite64'
export default SvgEducationWhite64
