import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgInternetBlue64 = forwardRef(function SvgInternetBlue64(
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
          d='M63.5 32A31.5 31.5 0 0 1 32 63.5V.5A31.5 31.5 0 0 1 63.5 32Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.035 31.035 0 0 0 32 1Z'
        />
        <path
          fill='#204ECF'
          d='M45.828 15.01C42.736 6.237 37.568 1 32 1c-5.567 0-10.736 5.237-13.828 14.01l-.944-.332C20.468 5.487 25.99 0 32 0c6.01 0 11.532 5.487 14.772 14.678l-.944.332ZM32 64c-6.01 0-11.532-5.487-14.771-14.678l.943-.332C21.264 57.763 26.432 63 32 63c5.567 0 10.736-5.237 13.828-14.01l.944.332C43.532 58.513 38.01 64 32 64Z'
        />
        <path
          fill='#204ECF'
          d='M32.5.5h-1v14.344h1V.5ZM32.5 49.156h-1V63.5h1V49.156Z'
        />
        <path
          fill='#204ECF'
          d='M58.422 14.344H5.578v1h52.844v-1ZM58.422 48.656H5.577v1h52.845v-1ZM11.313 36.845a3.22 3.22 0 0 1-3.215-3.216v-5.974h1v5.974a2.216 2.216 0 1 0 4.431 0h1a3.22 3.22 0 0 1-3.216 3.216Z'
        />
        <path
          fill='#204ECF'
          d='M16.744 36.845a3.219 3.219 0 0 1-3.215-3.216v-5.974h1v5.974a2.215 2.215 0 0 0 4.431 0v-5.974h1v5.974a3.22 3.22 0 0 1-3.216 3.216ZM29.284 36.845a3.219 3.219 0 0 1-3.215-3.216v-5.974h1v5.974a2.215 2.215 0 0 0 4.431 0h1a3.22 3.22 0 0 1-3.216 3.216Z'
        />
        <path
          fill='#204ECF'
          d='M34.716 36.845a3.22 3.22 0 0 1-3.216-3.216v-5.974h1v5.974a2.216 2.216 0 0 0 4.43 0v-5.974h1v5.974a3.22 3.22 0 0 1-3.214 3.216ZM47.256 36.845a3.219 3.219 0 0 1-3.216-3.216v-5.974h1v5.974a2.215 2.215 0 0 0 4.43 0h1a3.22 3.22 0 0 1-3.214 3.216Z'
        />
        <path
          fill='#204ECF'
          d='M52.687 36.845a3.22 3.22 0 0 1-3.216-3.216v-5.974h1v5.974a2.216 2.216 0 0 0 4.431 0v-5.974h1v5.974a3.219 3.219 0 0 1-3.215 3.216Z'
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

SvgInternetBlue64.displayName = 'SvgInternetBlue64'
export default SvgInternetBlue64
