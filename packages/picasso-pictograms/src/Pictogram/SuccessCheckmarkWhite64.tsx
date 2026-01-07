import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgSuccessCheckmarkWhite64 = forwardRef(
  function SvgSuccessCheckmarkWhite64(props: Props, ref: Ref<SVGSVGElement>) {
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
          d='M32 1 4.5 16.12v31.75L32 62.99l27.5-15.12V16.12L32 1Zm0 53c-12.15 0-22-9.85-22-22s9.85-22 22-22 22 9.85 22 22-9.85 22-22 22Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M59.5 47.88V16.12L32 1 4.5 16.12v31.76L32 63l27.5-15.12Z'
        />
        <path stroke='#fff' strokeMiterlimit={10} d='m21 31 8 8 14-14' />
      </svg>
    )
  }
)

SvgSuccessCheckmarkWhite64.displayName = 'SvgSuccessCheckmarkWhite64'
export default SvgSuccessCheckmarkWhite64
