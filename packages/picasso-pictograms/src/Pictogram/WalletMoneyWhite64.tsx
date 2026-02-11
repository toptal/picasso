import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgWalletMoneyWhite64 = forwardRef(function SvgWalletMoneyWhite64(
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
      <g clipPath='url(#a)'>
        <path
          fill='#000'
          d='M1.03 52.89v7c0 1.16.94 2.11 2.11 2.11h58.89v-6H3.76c-1.51 0-2.73-1.39-2.73-3.11ZM53.03 46.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM46.03.82l-43.95 16c-2.53.93-1.86 4.68.83 4.68h43.12V.82Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M53.03 46.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M45.53 18V.82l-43.45 16c-2.53.93-1.86 4.68.83 4.68h59.62v41H3.25c-1.5 0-2.72-1.22-2.72-2.72V19.32M45.53 10.66 16.1 21.5'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgWalletMoneyWhite64.displayName = 'SvgWalletMoneyWhite64'
export default SvgWalletMoneyWhite64
