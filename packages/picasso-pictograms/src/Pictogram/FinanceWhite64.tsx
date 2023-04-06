import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFinanceWhite64 = forwardRef(function SvgFinanceWhite64(
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
          d='M63.5 58.626H.5v5.733h63v-5.733ZM32 11.809a5.225 5.225 0 1 0 0-10.45 5.225 5.225 0 0 0 0 10.45ZM32 11.81a10.55 10.55 0 0 0-10.55 10.549h21.1A10.552 10.552 0 0 0 32 11.809Z'
          fill='#231F20'
        />
        <path
          d='M32 12.309a5.725 5.725 0 1 1 5.725-5.725A5.732 5.732 0 0 1 32 12.309Zm0-10.45a4.725 4.725 0 1 0 0 9.45 4.725 4.725 0 0 0 0-9.45Z'
          fill='#fff'
        />
        <path
          d='M43.05 22.359h-1a10.05 10.05 0 0 0-20.1 0h-1a11.05 11.05 0 0 1 22.1 0Z'
          fill='#fff'
        />
        <path d='M64 64.859H0v-43h64v43Zm-63-1h62v-41H1v41Z' fill='#fff' />
        <path
          d='M22.256 52.268h-7.245a4.71 4.71 0 0 1-4.704-4.705h1a3.71 3.71 0 0 0 3.704 3.705h7.245a3.705 3.705 0 1 0 0-7.41h-7.245a4.704 4.704 0 1 1 0-9.408h7.245a4.71 4.71 0 0 1 4.705 4.704h-1a3.71 3.71 0 0 0-3.705-3.705h-7.245a3.705 3.705 0 1 0 0 7.41h7.245a4.704 4.704 0 0 1 0 9.409Z'
          fill='#fff'
        />
        <path
          d='M19.133 30.577h-1V56.14h1V30.577ZM42.694 54.359a11 11 0 1 1 11-11 11.013 11.013 0 0 1-11 11Zm0-21a10 10 0 1 0 10 10 10.012 10.012 0 0 0-10-10Z'
          fill='#fff'
        />
        <path
          d='m49.762 51.135-7.569-7.57V32.86h1v10.293l7.276 7.276-.707.707Z'
          fill='#fff'
        />
        <path
          d='m49.715 35.63-7.375 7.375.707.707 7.375-7.375-.707-.707Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .859)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFinanceWhite64.displayName = 'SvgFinanceWhite64'
export default SvgFinanceWhite64
