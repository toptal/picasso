import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgChartPerformanceWhite64 = forwardRef(
  function SvgChartPerformanceWhite64(props: Props, ref: Ref<SVGSVGElement>) {
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
            d='M18 .53V17h16.47C34.21 8.01 26.99.79 18 .53ZM18 53H4v10h14V53ZM39 42H25v21h14V42ZM60 1H46v62h14V1Z'
            opacity={0.3}
          />
          <path
            stroke='#fff'
            strokeMiterlimit={10}
            d='M0 63.5h64M17.5 61v-8.5h-13V61M38.5 61V41.5h-13V61M59.5 61V.5h-13V61M17.5 34.5c9.389 0 17-7.611 17-17s-7.611-17-17-17-17 7.611-17 17 7.611 17 17 17Z'
          />
          <path stroke='#fff' strokeMiterlimit={10} d='M17.5.5v17h17' />
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

SvgChartPerformanceWhite64.displayName = 'SvgChartPerformanceWhite64'
export default SvgChartPerformanceWhite64
