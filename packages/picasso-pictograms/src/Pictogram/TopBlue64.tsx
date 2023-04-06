import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTopBlue64 = forwardRef(function SvgTopBlue64(
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
      viewBox='0 0 65 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.15}
          d='M54.651 39.877A26.024 26.024 0 0 1 39.63 51.413L48.916 63.5l4.164-9.843 10.828-1.733-9.257-12.047ZM10.164 39.877a26.024 26.024 0 0 0 15.022 11.536L15.9 63.5l-4.163-9.843L.908 51.924l9.256-12.047ZM32.407 9.09a17.379 17.379 0 1 0 .002 34.757 17.379 17.379 0 0 0-.002-34.757Z'
          fill='#183A9E'
        />
        <path
          d='m49.042 64.485-9.81-12.768.793-.61 8.765 11.408 3.937-9.308L63 51.563 54.255 40.18l.793-.61 9.767 12.714-11.383 1.82-4.39 10.38ZM15.773 64.485l-4.39-10.38L0 52.286l9.768-12.713.793.609-8.746 11.382 10.273 1.644 3.938 9.308 8.764-11.407.793.609-9.81 12.768ZM32.407 44.348a17.88 17.88 0 1 1 17.88-17.879 17.9 17.9 0 0 1-17.88 17.88Zm0-34.758a16.879 16.879 0 1 0 16.88 16.88 16.899 16.899 0 0 0-16.88-16.88Z'
          fill='#204ECF'
        />
        <path
          d='M32.407 52.938a26.468 26.468 0 1 1 26.47-26.469 26.5 26.5 0 0 1-26.47 26.469Zm0-51.938a25.469 25.469 0 1 0 25.47 25.47A25.499 25.499 0 0 0 32.407 1Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.815v64.485H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgTopBlue64.displayName = 'SvgTopBlue64'
export default SvgTopBlue64
