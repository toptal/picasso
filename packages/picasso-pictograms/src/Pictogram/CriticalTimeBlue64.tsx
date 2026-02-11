import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgCriticalTimeBlue64 = forwardRef(function SvgCriticalTimeBlue64(
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
          fill='#183A9C'
          d='M48.5 27.5c-6.63 0-12-5.37-12-12 0-2.4.71-4.64 1.93-6.52-2.35-.7-4.84-1.08-7.43-1.04v24.05H6.95C6.69 46.61 19.24 58.37 34.13 56.8c11.34-1.2 20.48-10.34 21.68-21.69.35-3.33.03-6.54-.84-9.52-1.87 1.2-4.08 1.9-6.47 1.9v.01Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M58.66 22.3c1.19 3.17 1.84 6.61 1.84 10.2 0 16.02-12.98 29-29 29s-29-12.98-29-29 12.98-29 29-29c2.41 0 4.76.29 7 .85'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M5 32.5h26.5V20M53 32.5h5M31.5 6v5M31.5 54v5M48.5 27.5c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12Z'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='m48.5 10-2 5.5h4l-2 5.5'
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

SvgCriticalTimeBlue64.displayName = 'SvgCriticalTimeBlue64'
export default SvgCriticalTimeBlue64
