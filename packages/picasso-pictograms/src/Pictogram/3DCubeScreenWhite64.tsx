import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const Svg3DCubeScreenWhite64 = forwardRef(function Svg3DCubeScreenWhite64(
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
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M38.081 47.974H25.92v7.069H38.08v-7.069ZM43.817 17.415 32 24.237v13.645l11.817-6.822V17.415Z'
          fill='#231F20'
        />
        <path
          d='M61.327 48.474H2.672A2.676 2.676 0 0 1 0 45.802V2.672A2.675 2.675 0 0 1 2.672 0h58.655A2.676 2.676 0 0 1 64 2.672v43.13a2.676 2.676 0 0 1-2.673 2.672ZM2.672 1A1.674 1.674 0 0 0 1 2.672v43.13a1.674 1.674 0 0 0 1.672 1.672h58.655A1.674 1.674 0 0 0 63 45.802V2.672A1.674 1.674 0 0 0 61.327 1H2.672Z'
          fill='#fff'
        />
        <path
          d='M38.581 47.974h-1v11.627h1V47.974ZM26.419 47.974h-1v11.627h1V47.974ZM47.62 63H16.38v1H47.62v-1ZM32 38.46l-12.317-7.112V17.126L32 10.015l12.317 7.111v14.222L32 38.46ZM20.683 30.77 32 37.305l11.317-6.534V17.703L32 11.17l-11.317 6.534v13.068Z'
          fill='#fff'
        />
        <path
          d='m32 24.814-12.067-6.966.5-.867L32 23.66l11.567-6.679.5.867L32 24.814Z'
          fill='#fff'
        />
        <path d='M32.5 24.237h-1v13.645h1V24.237Z' fill='#fff' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

Svg3DCubeScreenWhite64.displayName = 'Svg3DCubeScreenWhite64'
export default Svg3DCubeScreenWhite64
