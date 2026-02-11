import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgProductManagementBlue64 = forwardRef(
  function SvgProductManagementBlue64(props: Props, ref: Ref<SVGSVGElement>) {
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
            fill='#183A9E'
            d='M17.188 55.156H.5V63.5h16.688v-8.344ZM40.343 55.156H23.656V63.5h16.687v-8.344ZM63.5 55.156H46.812V63.5H63.5v-8.344ZM32 15.173A7.336 7.336 0 1 0 32 .5a7.336 7.336 0 0 0 0 14.673Z'
            opacity={0.15}
          />
          <path
            fill='#183A9E'
            d='M32 15.173a14.812 14.812 0 0 0-14.813 14.813h29.625A14.814 14.814 0 0 0 32 15.173Z'
            opacity={0.15}
          />
          <path
            fill='#204ECF'
            d='M17.688 64H0V46.312h17.688V64ZM1 63h15.688V47.312H1V63ZM40.843 64H23.156V46.312h17.687V64Zm-16.687-1h15.687V47.312H24.156V63ZM64 64H46.312V46.312H64V64Zm-16.688-1H63V47.312H47.312V63ZM32 15.673a7.837 7.837 0 1 1 7.836-7.837A7.846 7.846 0 0 1 32 15.673ZM32 1a6.837 6.837 0 1 0 6.836 6.836A6.844 6.844 0 0 0 32 1Z'
          />
          <path
            fill='#204ECF'
            d='M47.312 29.985h-1a14.312 14.312 0 1 0-28.624 0h-1a15.312 15.312 0 1 1 30.624 0ZM32.5 29.985h-1v16.827h1V29.985Z'
          />
          <path
            fill='#204ECF'
            d='M55.656 46.813h-1V39.25H9.343v7.562h-1V38.25h47.313v8.562Z'
          />
        </g>
        <defs>
          <clipPath id='a'>
            <path fill='#fff' d='M0 0h64v64H0z' />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

SvgProductManagementBlue64.displayName = 'SvgProductManagementBlue64'
export default SvgProductManagementBlue64
