import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgLightningWhite64 = forwardRef(function SvgLightningWhite64(
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
          fill='#231F20'
          d='M48.869 27.995H32V1.487L15.131 37.98H32v26.508l16.869-36.492Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='m32.39 64.836-.454-.055a.551.551 0 0 1-.436-.542V38.48H14.35L31.652 1.048l.822.156.026.433v25.858h17.15L32.39 64.836Zm-.74-.784v.001-.001ZM15.913 37.479H32.5v24.735l15.587-33.719H31.5V3.76L15.913 37.48Z'
        />
        <path
          fill='#fff'
          d='M32 64.987a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31 31.035 31.035 0 0 0-31-31Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .987h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgLightningWhite64.displayName = 'SvgLightningWhite64'
export default SvgLightningWhite64
