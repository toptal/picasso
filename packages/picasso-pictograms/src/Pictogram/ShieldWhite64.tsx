import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgShieldWhite64 = forwardRef(function SvgShieldWhite64(
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
          d='M32.16 16.922c-7.218 0-12.992 5.855-12.992 12.993s5.855 12.992 12.992 12.992c7.138 0 12.993-5.854 12.993-12.992 0-7.138-5.855-12.993-12.993-12.993Zm-6.335 19.65a6.64 6.64 0 0 1 6.656-6.657c-2.486 0-4.491-2.326-3.93-4.892a3.959 3.959 0 0 1 3.048-3.048c2.566-.561 4.892 1.444 4.892 3.93a3.971 3.971 0 0 1-4.01 4.01 6.64 6.64 0 0 1 6.657 6.657l-.24.24H26.064l-.24-.24Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M32.401 17.663c-6.81 0-12.332 5.521-12.332 12.332 0 6.811 5.521 12.332 12.332 12.332 6.81 0 12.332-5.521 12.332-12.332 0-6.81-5.521-12.332-12.332-12.332ZM19.069 29.995c0-7.363 5.969-13.332 13.332-13.332s13.332 5.97 13.332 13.332c0 7.363-5.969 13.332-13.332 13.332s-13.332-5.969-13.332-13.332Z'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M32.401 22.475a3.51 3.51 0 1 0 0 7.02 3.51 3.51 0 0 0 0-7.02Zm-4.51 3.51a4.51 4.51 0 1 1 9.02 0 4.51 4.51 0 0 1-9.02 0Z'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M32.401 30.495c-3.249 0-5.916 2.66-5.916 5.996v.5h-1v-.5c0-3.88 3.107-6.996 6.916-6.996s6.916 3.115 6.916 6.996v.5h-1v-.5c0-3.337-2.667-5.996-5.916-5.996Z'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='m32.481.03 6.917 2.471.012.005c.885.369 1.938.523 2.936.523h15.498V36.09c0 6.985-3.534 13.562-9.454 17.344h-.001L32.48 63.55 16.574 53.435h-.001c-5.92-3.783-9.454-10.36-9.454-17.345V3.03h15.498c.99 0 1.97-.153 2.948-.529l.011-.004L32.481.03Zm-6.563 3.407a9.1 9.1 0 0 1-3.301.592H8.119V36.09c0 6.65 3.364 12.905 8.992 16.501l15.37 9.774 15.37-9.773c5.629-3.596 8.992-9.852 8.992-16.502V4.03H42.346c-1.083 0-2.27-.166-3.308-.596l-6.557-2.341-6.563 2.344Z'
          clipRule='evenodd'
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

SvgShieldWhite64.displayName = 'SvgShieldWhite64'
export default SvgShieldWhite64
