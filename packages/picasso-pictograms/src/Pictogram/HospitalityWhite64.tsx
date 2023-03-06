import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHospitalityWhite64 = forwardRef(function SvgHospitalityWhite64(
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
      viewBox='0 0 66 66'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M19.841 57.428a3.258 3.258 0 0 0-3.259 3.259v4.345H23.1v-4.345a3.259 3.259 0 0 0-3.259-3.259ZM32.575 57.428a3.259 3.259 0 0 0-3.259 3.259v4.345h6.517v-4.345a3.26 3.26 0 0 0-3.258-3.259ZM45.309 57.428a3.258 3.258 0 0 0-3.26 3.259v4.345h6.518v-4.345a3.259 3.259 0 0 0-3.258-3.259ZM54.963 42.465H10.186v8.223h44.777v-8.223Z'
          fill='#231F20'
        />
        <path
          d='M23.6 65.032h-1v-4.345a2.757 2.757 0 0 0-3.816-2.553 2.758 2.758 0 0 0-1.701 2.553v4.345h-1v-4.345a3.757 3.757 0 0 1 6.418-2.662 3.758 3.758 0 0 1 1.099 2.662v4.345ZM36.334 65.032h-1v-4.345a2.759 2.759 0 0 0-5.518 0v4.345h-1v-4.345a3.759 3.759 0 0 1 7.518 0v4.345ZM49.067 65.032h-1v-4.345a2.759 2.759 0 1 0-5.517 0v4.345h-1v-4.345a3.759 3.759 0 1 1 7.517 0v4.345Z'
          fill='#fff'
        />
        <path d='M64.075 64.532h-63v1h63v-1Z' fill='#fff' />
        <path
          d='M55.463 65.032h-1V27.306H10.686v37.726h-1V26.306h45.777v38.726ZM15.021 18.56l-5.737-3.016-5.738 3.016 1.096-6.39L0 7.647l6.415-.932L9.284.902l2.868 5.812 6.415.932-4.642 4.525 1.096 6.39Zm-5.737-4.146 4.409 2.318-.842-4.91 3.567-3.477-4.93-.717-2.204-4.466-2.205 4.466-4.93.717 3.567 3.477-.841 4.91 4.409-2.318ZM26.837 18.56l1.096-6.39-4.642-4.524 6.415-.932L32.574.902l2.87 5.812 6.414.932-4.642 4.525 1.096 6.39-5.738-3.018-5.737 3.017Zm5.737-4.146 4.41 2.318-.842-4.91 3.567-3.477-4.93-.717-2.205-4.466-2.204 4.466-4.93.717 3.567 3.477-.842 4.91 4.41-2.318ZM61.603 18.56l-5.737-3.016-5.738 3.016 1.096-6.39-4.642-4.524 6.415-.932L55.866.902l2.868 5.812 6.415.932-4.642 4.525 1.096 6.39Zm-5.737-4.146 4.409 2.318-.842-4.91L63 8.345l-4.93-.717-2.204-4.466-2.205 4.466-4.93.717 3.567 3.477-.842 4.91 4.41-2.318Z'
          fill='#fff'
        />
        <path
          d='M54.963 50.188H10.186v1h44.777v-1ZM23.031 41.965h-6.38v1h6.38v-1ZM23.031 34.529h-6.38v1h6.38v-1ZM35.765 41.965h-6.38v1h6.38v-1ZM35.765 34.529h-6.38v1h6.38v-1ZM48.498 41.965h-6.38v1h6.38v-1ZM48.498 34.529h-6.38v1h6.38v-1Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .902)'
            d='M0 0h65.149v64.63H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHospitalityWhite64.displayName = 'SvgHospitalityWhite64'
export default SvgHospitalityWhite64
