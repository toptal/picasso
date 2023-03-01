import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgMeetingBlue64 = forwardRef(function SvgMeetingBlue64(
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
          d='M54.787 31.959a4.316 4.316 0 1 0 0-8.632 4.316 4.316 0 0 0 0 8.632Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M54.787 31.959a8.674 8.674 0 0 0-4.317 1.143v7.57H63.5a8.713 8.713 0 0 0-8.713-8.713ZM9.214 31.959a4.316 4.316 0 1 1 0-8.631 4.316 4.316 0 0 1 0 8.631Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M9.214 31.959a8.673 8.673 0 0 1 4.316 1.143v7.57H.5a8.714 8.714 0 0 1 8.714-8.713Z'
          fill='#183A9E'
        />
        <path
          d='M32 55.853a4.534 4.534 0 1 1 0-9.068 4.534 4.534 0 0 1 0 9.069Zm0-8.07a3.535 3.535 0 1 0 0 7.07 3.535 3.535 0 0 0 0-7.07Z'
          fill='#204ECF'
        />
        <path
          d='M40.647 63.5h-1a7.646 7.646 0 1 0-15.293 0h-1a8.646 8.646 0 1 1 17.293 0ZM32 9.07A4.535 4.535 0 1 1 32 0a4.535 4.535 0 0 1 0 9.07ZM32 1a3.535 3.535 0 1 0 0 7.07A3.535 3.535 0 0 0 32 1Z'
          fill='#204ECF'
        />
        <path
          d='m24.954 13.74-.92-.39a8.65 8.65 0 0 1 15.928-.011l-.92.39a7.65 7.65 0 0 0-14.088.011ZM54.787 32.459a4.816 4.816 0 1 1 4.815-4.816 4.822 4.822 0 0 1-4.815 4.816Zm0-8.631a3.816 3.816 0 1 0 0 7.631 3.816 3.816 0 0 0 0-7.631Z'
          fill='#204ECF'
        />
        <path
          d='M64 40.672h-1a8.215 8.215 0 0 0-12.281-7.137l-.496-.868A9.215 9.215 0 0 1 64 40.672ZM9.213 32.459a4.817 4.817 0 1 1 4.816-4.816 4.821 4.821 0 0 1-4.816 4.816Zm0-8.631a3.816 3.816 0 1 0 .001 7.632 3.816 3.816 0 0 0 0-7.632Z'
          fill='#204ECF'
        />
        <path
          d='M1 40.672H0a9.216 9.216 0 0 1 13.777-8.005l-.496.868a8.216 8.216 0 0 0-12.28 7.137Z'
          fill='#204ECF'
        />
        <path
          d='M50.965 50.965H35.942v-1h14.023v-35.93h-35.93v35.93h14.023v1H13.035v-37.93h37.93v37.93Z'
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

SvgMeetingBlue64.displayName = 'SvgMeetingBlue64'
export default SvgMeetingBlue64
