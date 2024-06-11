import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgClock2White64 = forwardRef(function SvgClock2White64(
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
        fill='#000'
        d='M32 56.546c13.746 0 24.889-10.972 24.889-24.506S45.746 7.534 32 7.534 7.111 18.506 7.111 32.04 18.254 56.546 32 56.546'
        opacity={0.3}
      />
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M0 32.04C0 14.639 14.327.532 32 .532S64 14.64 64 32.04 49.673 63.548 32 63.548 0 49.44 0 32.04M32 1.532c-17.112 0-30.984 13.66-30.984 30.508 0 16.849 13.872 30.507 30.984 30.507S62.984 48.89 62.984 32.04 49.112 1.532 32 1.532'
        clipRule='evenodd'
      />
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M31.492 16.536h1.016v15.297L49.629 48.69l-.718.708-17.419-17.151zm0-9.002v-3h1.016v3zm0 52.013v-3.001h1.016v3zM56.889 31.54h3.047v1H56.89zm-52.826 0h3.048v1H4.063z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgClock2White64.displayName = 'SvgClock2White64'
export default SvgClock2White64
