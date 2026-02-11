import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgTimezoneClockBlue64 = forwardRef(function SvgTimezoneClockBlue64(
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
          d='M14.563 23.252a8.69 8.69 0 1 0 0-17.379 8.69 8.69 0 0 0 0 17.38ZM49.438 23.252a8.69 8.69 0 1 0 0-17.379 8.69 8.69 0 0 0 0 17.38ZM14.563 58.127a8.69 8.69 0 1 0 0-17.379 8.69 8.69 0 0 0 0 17.38ZM49.438 58.127a8.69 8.69 0 1 0 0-17.379 8.69 8.69 0 0 0 0 17.38Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M14.563 29.125a14.563 14.563 0 1 1 14.562-14.563 14.579 14.579 0 0 1-14.563 14.563Zm0-28.125a13.562 13.562 0 1 0 13.562 13.563A13.577 13.577 0 0 0 14.562 1ZM49.438 29.125A14.563 14.563 0 1 1 64 14.562a14.579 14.579 0 0 1-14.563 14.563Zm0-28.125A13.562 13.562 0 1 0 63 14.563 13.577 13.577 0 0 0 49.437 1Z'
        />
        <path
          fill='#204ECF'
          d='M14.506 14.983a.556.556 0 0 1-.393-.163l-5.09-5.09.707-.707 4.332 4.332V4.6h1v10.16l-.343.18a.555.555 0 0 1-.213.043ZM49.65 15.056l-.37-.116a.553.553 0 0 1-.343-.513V4.6h1v8.755l4.333-4.332.707.707-5.326 5.326ZM14.563 64a14.563 14.563 0 1 1 14.562-14.563A14.579 14.579 0 0 1 14.562 64Zm0-28.125a13.562 13.562 0 1 0 13.562 13.563 13.578 13.578 0 0 0-13.563-13.563Z'
        />
        <path
          fill='#204ECF'
          d='m9.73 54.977-.707-.707 5.04-5.04v-9.755h1v10.17L9.73 54.977ZM49.438 64A14.563 14.563 0 1 1 64 49.437 14.579 14.579 0 0 1 49.437 64Zm0-28.125A13.562 13.562 0 1 0 63 49.438a13.578 13.578 0 0 0-13.563-13.563Z'
        />
        <path
          fill='#204ECF'
          d='m54.27 54.977-5.332-5.332v-10.17h1v9.755l5.039 5.04-.707.707Z'
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

SvgTimezoneClockBlue64.displayName = 'SvgTimezoneClockBlue64'
export default SvgTimezoneClockBlue64
