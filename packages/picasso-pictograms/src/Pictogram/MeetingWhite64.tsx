import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgMeetingWhite64 = forwardRef(function SvgMeetingWhite64(
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
          d='M54.787 32.1a4.316 4.316 0 1 0 0-8.632 4.316 4.316 0 0 0 0 8.632Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M54.787 32.1a8.674 8.674 0 0 0-4.317 1.143v7.57H63.5a8.713 8.713 0 0 0-8.713-8.712ZM9.214 32.1a4.316 4.316 0 1 1 0-8.63 4.316 4.316 0 0 1 0 8.63Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M9.214 32.1a8.673 8.673 0 0 1 4.316 1.143v7.57H.5a8.714 8.714 0 0 1 8.714-8.712Z'
          fill='#231F20'
        />
        <path
          d='M32 55.995a4.534 4.534 0 1 1 0-9.068 4.534 4.534 0 0 1 0 9.068Zm0-8.07a3.535 3.535 0 1 0 0 7.07 3.535 3.535 0 0 0 0-7.07Z'
          fill='#fff'
        />
        <path
          d='M40.647 63.642h-1a7.646 7.646 0 1 0-15.293 0h-1a8.646 8.646 0 1 1 17.293 0ZM32 9.211a4.535 4.535 0 1 1 0-9.07 4.535 4.535 0 0 1 0 9.07Zm0-8.07a3.535 3.535 0 1 0 0 7.071 3.535 3.535 0 0 0 0-7.07Z'
          fill='#fff'
        />
        <path
          d='m24.954 13.882-.92-.39a8.65 8.65 0 0 1 15.928-.012l-.92.391a7.65 7.65 0 0 0-14.088.01ZM54.787 32.6a4.816 4.816 0 1 1 4.815-4.815 4.822 4.822 0 0 1-4.815 4.816Zm0-8.63a3.816 3.816 0 1 0 0 7.63 3.816 3.816 0 0 0 0-7.63Z'
          fill='#fff'
        />
        <path
          d='M64 40.814h-1a8.215 8.215 0 0 0-12.281-7.137l-.496-.868A9.215 9.215 0 0 1 64 40.814ZM9.213 32.6a4.817 4.817 0 1 1 4.816-4.815 4.821 4.821 0 0 1-4.816 4.816Zm0-8.63a3.816 3.816 0 1 0 .001 7.631 3.816 3.816 0 0 0 0-7.632Z'
          fill='#fff'
        />
        <path
          d='M1 40.814H0a9.216 9.216 0 0 1 13.777-8.005l-.496.868a8.216 8.216 0 0 0-12.28 7.137Z'
          fill='#fff'
        />
        <path
          d='M50.965 51.106H35.942v-1h14.023v-35.93h-35.93v35.93h14.023v1H13.035v-37.93h37.93v37.93Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .142)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgMeetingWhite64.displayName = 'SvgMeetingWhite64'
export default SvgMeetingWhite64
