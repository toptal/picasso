import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHospitalBuildingBlue64 = forwardRef(function SvgHospitalBuildingBlue64(
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
          d='M43 51H21v6h22v-6ZM43 42H21v6h22v-6ZM43 33H21v6h22v-6ZM3 57h14v-6H3v6ZM3 48h14v-6H3v6ZM48 51h13v-3H48v3ZM48 42h13v-3H48v3Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M2.5 63.5V23L17 15.75M21.5 39V1.5l22 11v10l18 9v32'
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M38.5 18.5h-4v-4h-4v4h-4v4h4v4h4v-4h4v-4ZM48 51.5h13M48 42.5h13M48 63.5h16M0 63.5h43.5V27'
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

SvgHospitalBuildingBlue64.displayName = 'SvgHospitalBuildingBlue64'
export default SvgHospitalBuildingBlue64
