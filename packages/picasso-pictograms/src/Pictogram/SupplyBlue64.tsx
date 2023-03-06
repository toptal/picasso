import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgSupplyBlue64 = forwardRef(function SvgSupplyBlue64(
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
      viewBox='0 0 65 64'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M52.294 35.469H47.26l-8.654-11.75v11.75H13.668v6.493h4.303a4.344 4.344 0 0 0 8.69 0h14.5a4.345 4.345 0 1 0 8.689 0h2.444V35.47Z'
          fill='#183A9E'
        />
        <path
          d='M22.316 46.807a4.845 4.845 0 1 1-.001-9.69 4.845 4.845 0 0 1 0 9.69Zm0-8.69a3.845 3.845 0 1 0 0 7.69 3.845 3.845 0 0 0 0-7.69ZM45.505 46.807a4.845 4.845 0 1 1 0-9.69 4.845 4.845 0 0 1 0 9.69Zm0-8.69a3.845 3.845 0 1 0 0 7.69 3.845 3.845 0 0 0 0-7.69Z'
          fill='#204ECF'
        />
        <path d='M41.16 41.462h-14.5v1h14.5v-1Z' fill='#204ECF' />
        <path
          d='M17.971 42.462h-4.803V18.21h25.939v23.75h-1v-22.75H14.168v22.25h3.803v1Z'
          fill='#204ECF'
        />
        <path
          d='M52.794 42.462H49.85v-1h1.944V30.608l-4.706-6.389h-8.481v-1h8.987l5.2 7.061v12.182Z'
          fill='#204ECF'
        />
        <path
          d='M32 63.996a32.004 32.004 0 0 1-25.367-12.52l.793-.608a30.703 30.703 0 0 0 16.552 11.066A31.028 31.028 0 0 0 61.943 40.03a30.689 30.689 0 0 0-1.296-19.866l.924-.383a31.687 31.687 0 0 1 1.34 20.508A32.055 32.055 0 0 1 32 63.996ZM2.445 44.22a31.687 31.687 0 0 1-1.34-20.51A32.03 32.03 0 0 1 40.299 1.1a31.692 31.692 0 0 1 17.085 11.424l-.793.608A30.703 30.703 0 0 0 40.038 2.066 31.03 31.03 0 0 0 2.072 23.97 30.69 30.69 0 0 0 3.37 43.836l-.924.383Z'
          fill='#204ECF'
        />
        <path
          d='M57.498 13.343h-8.763v-1h7.763V4.58h1v8.763ZM7.529 59.435h-1v-8.763h8.764v1H7.529v7.763Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.016v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgSupplyBlue64.displayName = 'SvgSupplyBlue64'
export default SvgSupplyBlue64
