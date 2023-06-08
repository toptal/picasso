import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBlockchainBlue64 = forwardRef(function SvgBlockchainBlue64(
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
          fill='#183A9E'
          d='M63.5 11.117H42.266v10.617H63.5V11.117ZM21.734 11.117H.5v10.617h21.234V11.117ZM63.5 52.883H42.266V63.5H63.5V52.883ZM21.734 52.883H.5V63.5h21.234V52.883Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M22.234 22.234H0V0h22.234v22.234ZM1 21.234h20.234V1H1v20.234ZM64 22.234H41.766V0H64v22.234Zm-21.234-1H63V1H42.766v20.234Z'
        />
        <path
          fill='#204ECF'
          d='M11.617 21.734h-1v20.532h1V21.734ZM42.266 52.383H21.734v1h20.532v-1ZM53.383 21.734h-1v20.532h1V21.734ZM42.266 10.617H21.734v1h20.532v-1Z'
        />
        <path
          fill='#204ECF'
          d='M22.234 64H0V41.766h22.234V64ZM1 63h20.234V42.766H1V63ZM64 64H41.766V41.766H64V64Zm-21.234-1H63V42.766H42.766V63Z'
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

SvgBlockchainBlue64.displayName = 'SvgBlockchainBlue64'
export default SvgBlockchainBlue64
