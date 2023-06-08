import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgComputerDesktopBlue64 = forwardRef(function SvgComputerDesktopBlue64(
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
        d='M38.081 47.974H25.92v7.069h12.162v-7.069ZM57.99 35.404H6.01V6.01H57.99v29.393Z'
        opacity={0.15}
      />
      <path
        fill='#204ECF'
        d='M64 40.915h-1V2.6A1.602 1.602 0 0 0 61.4 1H2.6A1.602 1.602 0 0 0 1 2.6v38.315H0V2.6A2.603 2.603 0 0 1 2.6 0h58.8A2.603 2.603 0 0 1 64 2.6v38.315ZM38.581 47.974h-1v11.627h1V47.974ZM26.42 47.974h-1v11.627h1V47.974ZM47.62 63H16.38v1H47.62v-1Z'
      />
      <path
        fill='#204ECF'
        d='M61.4 48.474H2.6a2.603 2.603 0 0 1-2.6-2.6v-5.459h64v5.459a2.602 2.602 0 0 1-2.6 2.6ZM1 41.415v4.459a1.602 1.602 0 0 0 1.6 1.6h58.8a1.601 1.601 0 0 0 1.6-1.6v-4.459H1Z'
      />
    </svg>
  )
})

SvgComputerDesktopBlue64.displayName = 'SvgComputerDesktopBlue64'
export default SvgComputerDesktopBlue64
