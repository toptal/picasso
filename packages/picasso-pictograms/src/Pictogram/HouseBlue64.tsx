import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHouseBlue64 = forwardRef(function SvgHouseBlue64(
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
          d='M41.563 38.23H22.436v25.313h19.125V38.23ZM9.5.543v9.455l6.75-2.799V.543H9.5ZM5.881 28.226 29.368 18.3a6.761 6.761 0 0 1 5.264 0l23.487 9.926V19.23L32 8.192 5.881 19.23v8.996Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M64 22.258 32 8.735 0 22.258v-8.734L32 0l.194.083L64 13.523v8.735ZM32 7.648l.194.083L63 20.751v-6.564L32 1.086 1 14.187v6.563L32 7.65Z'
        />
        <path
          fill='#204ECF'
          d='M10 9.998H9V.043h7.75v7.156h-1V1.043H10v8.955ZM58.619 64.043H5.381V19.23h1v43.813h51.238V19.23h1v44.813Z'
        />
        <path
          fill='#204ECF'
          d='M32 31.392a7.063 7.063 0 1 1 7.063-7.063A7.07 7.07 0 0 1 32 31.392Zm0-13.125a6.063 6.063 0 1 0 6.063 6.062A6.07 6.07 0 0 0 32 18.267ZM42.062 63.543h-1V38.73H22.937v24.813h-1V37.73h20.125v25.813Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.043H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHouseBlue64.displayName = 'SvgHouseBlue64'
export default SvgHouseBlue64
