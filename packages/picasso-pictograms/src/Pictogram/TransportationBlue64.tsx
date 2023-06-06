import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTransportationBlue64 = forwardRef(function SvgTransportationBlue64(
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
      <path
        fill='#183A9E'
        d='M.5 41.534v10.738h7.44s.648 6.517 6.665 6.517 6.517-6.517 6.517-6.517h24.64s.28 6.517 6.515 6.517c6.017 0 6.517-6.517 6.517-6.517H63.5V41.534h-6.108l-11.63-15.792v15.792H.5Z'
        opacity={0.15}
      />
      <path
        fill='#204ECF'
        d='M52.277 59.29a7.018 7.018 0 1 1 7.017-7.018 7.025 7.025 0 0 1-7.017 7.017Zm0-13.036a6.017 6.017 0 1 0 6.017 6.018 6.024 6.024 0 0 0-6.017-6.018ZM14.605 59.29a7.017 7.017 0 1 1 7.018-7.018 7.025 7.025 0 0 1-7.018 7.017Zm0-13.036a6.018 6.018 0 1 0 6.018 6.018 6.025 6.025 0 0 0-6.018-6.018Z'
      />
      <path fill='#204ECF' d='M45.762 51.772h-24.64v1h24.64v-1Z' />
      <path
        fill='#204ECF'
        d='M7.94 52.772H0V4.71h46.262v47.413h-1V5.71H1v46.06h6.94v1Z'
      />
      <path
        fill='#204ECF'
        d='M64 52.772h-5.206v-1H63V36.875l-7.831-10.633h-9.407v-1h9.913L64 36.547v16.225ZM63.5 58.29H.5v1h63v-1Z'
      />
    </svg>
  )
})

SvgTransportationBlue64.displayName = 'SvgTransportationBlue64'
export default SvgTransportationBlue64
