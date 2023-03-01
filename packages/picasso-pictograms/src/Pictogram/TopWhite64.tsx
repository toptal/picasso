import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTopWhite64 = forwardRef(function SvgTopWhite64(
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
          opacity={0.3}
          d='M54.651 40.361A26.023 26.023 0 0 1 39.63 51.898l9.287 12.087 4.164-9.843 10.828-1.733L54.65 40.36ZM10.164 40.361a26.024 26.024 0 0 0 15.022 11.537L15.9 63.985l-4.163-9.843L.908 52.409l9.256-12.048ZM32.407 9.575a17.379 17.379 0 1 0 .002 34.757 17.379 17.379 0 0 0-.002-34.757Z'
          fill='#231F20'
        />
        <path
          d='m49.042 64.97-9.81-12.768.793-.61L48.79 63l3.937-9.308L63 52.048l-8.745-11.382.793-.61 9.767 12.714-11.383 1.82-4.39 10.38ZM15.773 64.97l-4.39-10.38L0 52.77l9.768-12.713.793.609-8.746 11.382 10.273 1.644L16.026 63l8.764-11.407.793.609-9.81 12.768ZM32.407 44.833a17.878 17.878 0 1 1 17.88-17.879 17.9 17.9 0 0 1-17.88 17.879Zm0-34.758a16.88 16.88 0 1 0 16.88 16.88 16.899 16.899 0 0 0-16.88-16.88Z'
          fill='#fff'
        />
        <path
          d='M32.407 53.423a26.47 26.47 0 1 1 26.47-26.469 26.5 26.5 0 0 1-26.47 26.469Zm0-51.938a25.469 25.469 0 1 0 25.47 25.47 25.499 25.499 0 0 0-25.47-25.47Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .485)'
            d='M0 0h64.815v64.485H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgTopWhite64.displayName = 'SvgTopWhite64'
export default SvgTopWhite64
