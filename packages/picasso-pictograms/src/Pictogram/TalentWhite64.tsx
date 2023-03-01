import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTalentWhite64 = forwardRef(function SvgTalentWhite64(
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
      <path
        opacity={0.3}
        d='M32 40.956h10.99A10.995 10.995 0 0 0 32 29.961v10.995ZM47.75 52.212h10.99a10.992 10.992 0 0 0-10.99-10.995v10.995ZM47.75 28.191v10.891a5.446 5.446 0 0 0 0-10.89ZM37.443 22.381l1.484 5.445H32v-10.89a5.444 5.444 0 0 1 5.443 5.445ZM21.693 11.125l1.484 5.446H9.323l1.484-5.446a5.443 5.443 0 0 1 10.886 0ZM16.25 18.708a10.99 10.99 0 0 0-10.99 10.99h21.98a10.99 10.99 0 0 0-10.99-10.99Z'
        fill='#231F20'
      />
      <path
        d='M47.75 39.582v-1a4.945 4.945 0 1 0 0-9.891v-1a5.945 5.945 0 1 1 0 11.891ZM59.24 52.212h-1a10.504 10.504 0 0 0-10.49-10.495v-1a11.505 11.505 0 0 1 11.49 11.495Z'
        fill='#fff'
      />
      <path
        d='M64 64H36.573L31.5 58.924v-6.712h1v6.298L36.987 63H63V23.544H47.75v-1H64V64Z'
        fill='#fff'
      />
      <path
        d='M63.5 51.712H47.75v1H63.5v-1ZM53.888 57.356H41.612v1h12.276v-1ZM43.49 40.956h-1A10.503 10.503 0 0 0 32 30.461v-1a11.505 11.505 0 0 1 11.49 11.495Z'
        fill='#fff'
      />
      <path
        d='M48.25 52.712H20.823l-5.073-5.076v-6.68h1v6.266l4.487 4.49H47.25V12.256H32v-1h16.25v41.456Z'
        fill='#fff'
      />
      <path
        d='M47.75 40.456H32v1h15.75v-1ZM39.564 28.326H32v-1h6.291L36.81 21.26A4.92 4.92 0 0 0 32 17.436v-1a5.913 5.913 0 0 1 5.782 4.59l1.782 7.3ZM38.138 46.068H25.862v1h12.276v-1ZM27.74 29.7h-1a10.49 10.49 0 0 0-20.98 0h-1a11.49 11.49 0 0 1 22.98 0Z'
        fill='#fff'
      />
      <path
        d='M32.5 41.456H5.074L0 36.382V0h32.5v41.456Zm-27.012-1H31.5V1H1v34.968l4.488 4.488Z'
        fill='#fff'
      />
      <path
        d='M32 29.2H.5v1H32v-1ZM23.814 17.07H8.686l1.784-7.304a5.937 5.937 0 0 1 11.561.002l1.783 7.303Zm-13.855-1h12.582l-1.483-6.073a4.936 4.936 0 0 0-9.616 0L9.96 16.071ZM22.388 34.78H10.112v1h12.276v-1Z'
        fill='#fff'
      />
    </svg>
  )
})

SvgTalentWhite64.displayName = 'SvgTalentWhite64'
export default SvgTalentWhite64
