import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTransportationWhite64 = forwardRef(function SvgTransportationWhite64(
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
      <path
        opacity={0.3}
        d='M.5 42.019v10.738h7.44s.648 6.517 6.665 6.517 6.517-6.517 6.517-6.517h24.64s.28 6.517 6.515 6.517c6.017 0 6.517-6.517 6.517-6.517H63.5V42.019h-6.108l-11.63-15.792V42.02H.5Z'
        fill='#231F20'
      />
      <path
        d='M52.277 59.774a7.017 7.017 0 1 1 7.017-7.017 7.025 7.025 0 0 1-7.017 7.017Zm0-13.035a6.017 6.017 0 1 0 6.017 6.018 6.024 6.024 0 0 0-6.017-6.018ZM14.605 59.774a7.016 7.016 0 1 1 7.018-7.017 7.025 7.025 0 0 1-7.018 7.017Zm0-13.035a6.017 6.017 0 1 0 6.018 6.018 6.025 6.025 0 0 0-6.018-6.018Z'
        fill='#fff'
      />
      <path d='M45.762 52.257h-24.64v1h24.64v-1Z' fill='#fff' />
      <path
        d='M7.94 53.257H0V5.196h46.262v47.413h-1V6.196H1v46.06h6.94v1Z'
        fill='#fff'
      />
      <path
        d='M64 53.257h-5.206v-1H63V37.36l-7.831-10.633h-9.407v-1h9.913L64 37.032v16.225ZM63.5 58.774H.5v1h63v-1Z'
        fill='#fff'
      />
    </svg>
  )
})

SvgTransportationWhite64.displayName = 'SvgTransportationWhite64'
export default SvgTransportationWhite64
