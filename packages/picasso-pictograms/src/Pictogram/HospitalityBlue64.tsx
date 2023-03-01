import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHospitalityBlue64 = forwardRef(function SvgHospitalityBlue64(
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
      viewBox='0 0 66 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M19.841 56.526a3.259 3.259 0 0 0-3.259 3.259v4.345H23.1v-4.345a3.258 3.258 0 0 0-3.259-3.259ZM32.575 56.526a3.259 3.259 0 0 0-3.259 3.259v4.345h6.517v-4.345a3.26 3.26 0 0 0-3.258-3.259ZM45.309 56.526a3.259 3.259 0 0 0-3.26 3.259v4.345h6.518v-4.345a3.259 3.259 0 0 0-3.258-3.259ZM54.963 41.563H10.186v8.223h44.777v-8.223Z'
          fill='#183A9E'
        />
        <path
          d='M23.6 64.13h-1v-4.345a2.757 2.757 0 0 0-4.711-1.954 2.758 2.758 0 0 0-.806 1.954v4.345h-1v-4.345a3.757 3.757 0 0 1 6.418-2.661 3.759 3.759 0 0 1 1.099 2.661v4.345ZM36.334 64.13h-1v-4.345a2.76 2.76 0 0 0-5.518 0v4.345h-1v-4.345a3.759 3.759 0 1 1 7.518 0v4.345ZM49.067 64.13h-1v-4.345a2.759 2.759 0 1 0-5.517 0v4.345h-1v-4.345a3.759 3.759 0 1 1 7.517 0v4.345Z'
          fill='#204ECF'
        />
        <path d='M64.075 63.63h-63v1h63v-1Z' fill='#204ECF' />
        <path
          d='M55.463 64.13h-1V26.404H10.686V64.13h-1V25.404h45.777V64.13ZM15.021 17.658l-5.737-3.016-5.738 3.016 1.096-6.389L0 6.745l6.415-.933L9.284 0l2.868 5.813 6.415.932-4.642 4.524 1.096 6.39Zm-5.737-4.146 4.409 2.318-.842-4.91 3.567-3.477-4.93-.716L9.284 2.26 7.079 6.727l-4.93.716 3.567 3.477-.841 4.91 4.409-2.318ZM26.837 17.658l1.096-6.389-4.642-4.524 6.415-.933L32.574 0l2.87 5.813 6.414.932-4.642 4.524 1.096 6.39-5.738-3.017-5.737 3.016Zm5.737-4.146 4.41 2.318-.842-4.91 3.567-3.477-4.93-.716-2.205-4.467-2.204 4.467-4.93.716 3.567 3.477-.842 4.91 4.41-2.318ZM61.603 17.658l-5.737-3.016-5.738 3.016 1.096-6.389-4.642-4.524 6.415-.933L55.866 0l2.868 5.813 6.415.932-4.642 4.524 1.096 6.39Zm-5.737-4.146 4.409 2.318-.842-4.91L63 7.443l-4.93-.716-2.204-4.467-2.205 4.467-4.93.716 3.567 3.477-.842 4.91 4.41-2.318Z'
          fill='#204ECF'
        />
        <path
          d='M54.963 49.286H10.186v1h44.777v-1ZM23.031 41.063h-6.38v1h6.38v-1ZM23.031 33.627h-6.38v1h6.38v-1ZM35.765 41.063h-6.38v1h6.38v-1ZM35.765 33.627h-6.38v1h6.38v-1ZM48.498 41.063h-6.38v1h6.38v-1ZM48.498 33.627h-6.38v1h6.38v-1Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h65.149v64.63H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHospitalityBlue64.displayName = 'SvgHospitalityBlue64'
export default SvgHospitalityBlue64
