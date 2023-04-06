import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEducationBlue64 = forwardRef(function SvgEducationBlue64(
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
      viewBox='0 0 67 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M13.553 21.296v6.388l19.557 6.407 19.557-6.407v-6.388l-19.562 6.416-19.552-6.416Z'
          fill='#183A9E'
        />
        <path
          d='M33.105 28.238 0 17.385 33.105 6.53 66.21 17.385 33.105 28.238ZM3.21 17.385l29.895 9.8L63 17.385 33.105 7.584l-29.895 9.8Z'
          fill='#204ECF'
        />
        <path
          d='m33.11 46.802-20.057-6.571V21.296h1v18.21l19.057 6.243 19.057-6.243v-18.21h1v18.935L33.11 46.802ZM59.674 19.318h-1v22.929h1v-22.93Z'
          fill='#204ECF'
        />
        <path
          d='M59.174 49.264a3.759 3.759 0 1 1 0-7.518 3.759 3.759 0 0 1 0 7.518Zm0-6.517a2.758 2.758 0 1 0 0 5.515 2.758 2.758 0 0 0 0-5.515ZM61.532 56.442H4.934v1h56.598v-1Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h66.21v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgEducationBlue64.displayName = 'SvgEducationBlue64'
export default SvgEducationBlue64
