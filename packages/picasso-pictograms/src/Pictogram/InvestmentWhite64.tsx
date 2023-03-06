import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgInvestmentWhite64 = forwardRef(function SvgInvestmentWhite64(
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
          d='M21.23 27.686h-6.861v10.56h6.86v-10.56ZM38.081 48.961H25.92v7.069H38.08V48.96Z'
          fill='#231F20'
        />
        <path
          d='M50.13 31.86h-7.859V10.926h7.86V31.86Zm-6.859-1h5.86V11.926h-5.86V30.86Z'
          fill='#fff'
        />
        <path
          d='M46.701 8.681h-1v2.745h1V8.681ZM46.701 31.36h-1v5.768h1V31.36ZM35.93 34.882h-7.86V18.52h7.86v16.36Zm-6.86-1h5.86V19.52h-5.86v14.36Z'
          fill='#fff'
        />
        <path
          d='M32.5 11.426h-1v7.595h1v-7.595ZM32.5 34.382h-1v7.385h1v-7.385ZM21.73 38.746h-7.861v-11.56h7.86v11.56Zm-6.861-1h5.86v-9.56h-5.86v9.56Z'
          fill='#fff'
        />
        <path
          d='M18.299 19.574h-1v8.112h1v-8.112ZM18.299 38.246h-1v3.52h1v-3.52Z'
          fill='#fff'
        />
        <path
          d='M61.327 49.461H2.672A2.675 2.675 0 0 1 0 46.79V3.659A2.675 2.675 0 0 1 2.672.987h58.655A2.676 2.676 0 0 1 64 3.66v43.13a2.676 2.676 0 0 1-2.673 2.672ZM2.672 1.987A1.674 1.674 0 0 0 1 3.66v43.13a1.674 1.674 0 0 0 1.672 1.672h58.655A1.674 1.674 0 0 0 63 46.79V3.659a1.674 1.674 0 0 0-1.673-1.672H2.672Z'
          fill='#fff'
        />
        <path
          d='M38.581 48.961h-1v11.627h1V48.961ZM26.419 48.961h-1v11.627h1V48.961ZM47.62 63.987H16.38v1H47.62v-1Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .987)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgInvestmentWhite64.displayName = 'SvgInvestmentWhite64'
export default SvgInvestmentWhite64
