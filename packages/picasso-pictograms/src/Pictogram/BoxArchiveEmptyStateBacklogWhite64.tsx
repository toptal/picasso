import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgBoxArchiveEmptyStateBacklogWhite64 = forwardRef(
  function SvgBoxArchiveEmptyStateBacklogWhite64(
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
            fill='#231F20'
            d='M62.4 61.6H1.6c-.664 0-1.2-.536-1.2-1.2v2c0 .664.536 1.2 1.2 1.2h60.8c.664 0 1.2-.536 1.2-1.2v-2c0 .664-.536 1.2-1.2 1.2ZM63.8 22.6l-8-8H8.2l-8 8'
            opacity={0.3}
          />
          <path d='M32.2 0v3.6M22.352 2.676l1.928 3.136M15.356 9.672l3.136 1.928M48.644 9.672 45.508 11.6M41.648 2.676 39.72 5.812M8.2 14.8v6.4M55.8 14.8v6.4M62 22.6H2m61.8 0v40c0 .664-.536 1.2-1.2 1.2H1.4c-.664 0-1.2-.536-1.2-1.2v-40l8-8h47.6l8 8Z' />
          <path
            fill='#231F20'
            d='M39 33.4H25a1.6 1.6 0 1 1 0-3.2h14a1.6 1.6 0 1 1 0 3.2Z'
            opacity={0.3}
          />
          <path d='M39 33.4H25a1.6 1.6 0 1 1 0-3.2h14a1.6 1.6 0 1 1 0 3.2Z' />
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

SvgBoxArchiveEmptyStateBacklogWhite64.displayName =
  'SvgBoxArchiveEmptyStateBacklogWhite64'
export default SvgBoxArchiveEmptyStateBacklogWhite64
