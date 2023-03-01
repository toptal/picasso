import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFinanceBlue64 = forwardRef(function SvgFinanceBlue64(
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
          opacity={0.15}
          d='M63.5 57.768H.5V63.5h63v-5.732ZM32 10.95A5.225 5.225 0 1 0 32 .5a5.225 5.225 0 0 0 0 10.45ZM32 10.95A10.55 10.55 0 0 0 21.45 21.5h21.1A10.551 10.551 0 0 0 32 10.95Z'
          fill='#183A9E'
        />
        <path
          d='M32 11.45a5.726 5.726 0 1 1 5.725-5.725A5.732 5.732 0 0 1 32 11.45ZM32 1a4.725 4.725 0 1 0 0 9.45A4.725 4.725 0 0 0 32 1Z'
          fill='#204ECF'
        />
        <path
          d='M43.05 21.5h-1a10.05 10.05 0 0 0-20.1 0h-1a11.05 11.05 0 0 1 22.1 0Z'
          fill='#204ECF'
        />
        <path d='M64 64H0V21h64v43ZM1 63h62V22H1v41Z' fill='#204ECF' />
        <path
          d='M22.256 51.41h-7.245a4.71 4.71 0 0 1-4.704-4.705h1a3.71 3.71 0 0 0 3.704 3.704h7.245a3.704 3.704 0 1 0 0-7.409h-7.245a4.705 4.705 0 0 1 0-9.41h7.245a4.71 4.71 0 0 1 4.705 4.705h-1a3.71 3.71 0 0 0-3.705-3.704h-7.245a3.704 3.704 0 1 0 0 7.409h7.245a4.705 4.705 0 0 1 0 9.41Z'
          fill='#204ECF'
        />
        <path
          d='M19.133 29.718h-1v25.564h1V29.718ZM42.694 53.5a11 11 0 1 1 11-11 11.012 11.012 0 0 1-11 11Zm0-21a10 10 0 1 0 10 10 10.011 10.011 0 0 0-10-10Z'
          fill='#204ECF'
        />
        <path
          d='m49.762 50.276-7.569-7.569V32h1v10.293l7.276 7.276-.707.707Z'
          fill='#204ECF'
        />
        <path
          d='m49.715 34.772-7.375 7.375.707.706 7.375-7.375-.707-.706Z'
          fill='#204ECF'
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

SvgFinanceBlue64.displayName = 'SvgFinanceBlue64'
export default SvgFinanceBlue64
