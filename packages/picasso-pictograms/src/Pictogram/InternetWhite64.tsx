import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgInternetWhite64 = forwardRef(function SvgInternetWhite64(
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
      viewBox='0 0 64 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M63.5 32.987a31.5 31.5 0 0 1-31.5 31.5v-63a31.5 31.5 0 0 1 31.5 31.5Z'
          fill='#231F20'
        />
        <path
          d='M32 64.987a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31 31.035 31.035 0 0 0-31-31Z'
          fill='#fff'
        />
        <path
          d='M45.828 15.997C42.736 7.224 37.568 1.987 32 1.987c-5.567 0-10.736 5.237-13.828 14.01l-.944-.332C20.468 6.474 25.99.987 32 .987c6.01 0 11.532 5.487 14.772 14.678l-.944.332ZM32 64.987c-6.01 0-11.532-5.487-14.771-14.678l.943-.332c3.092 8.773 8.26 14.01 13.828 14.01 5.567 0 10.736-5.237 13.828-14.01l.944.332C43.532 59.5 38.01 64.987 32 64.987Z'
          fill='#fff'
        />
        <path
          d='M32.5 1.487h-1v14.344h1V1.487ZM32.5 50.143h-1v14.344h1V50.143Z'
          fill='#fff'
        />
        <path
          d='M58.422 15.33H5.578v1h52.844v-1ZM58.422 49.643H5.577v1h52.845v-1ZM11.313 37.832a3.22 3.22 0 0 1-3.215-3.215v-5.975h1v5.975a2.216 2.216 0 0 0 4.431 0h1a3.219 3.219 0 0 1-3.216 3.215Z'
          fill='#fff'
        />
        <path
          d='M16.744 37.832a3.22 3.22 0 0 1-3.215-3.215v-5.975h1v5.975a2.215 2.215 0 1 0 4.431 0v-5.975h1v5.975a3.22 3.22 0 0 1-3.216 3.215ZM29.284 37.832a3.22 3.22 0 0 1-3.215-3.215v-5.975h1v5.975a2.215 2.215 0 1 0 4.431 0h1a3.219 3.219 0 0 1-3.216 3.215Z'
          fill='#fff'
        />
        <path
          d='M34.716 37.832a3.22 3.22 0 0 1-3.216-3.215v-5.975h1v5.975a2.216 2.216 0 0 0 4.43 0v-5.975h1v5.975a3.22 3.22 0 0 1-3.214 3.215ZM47.256 37.832a3.22 3.22 0 0 1-3.216-3.215v-5.975h1v5.975a2.215 2.215 0 1 0 4.43 0h1a3.22 3.22 0 0 1-3.214 3.215Z'
          fill='#fff'
        />
        <path
          d='M52.687 37.832a3.22 3.22 0 0 1-3.216-3.215v-5.975h1v5.975a2.216 2.216 0 0 0 4.431 0v-5.975h1v5.975a3.219 3.219 0 0 1-3.215 3.215Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .987)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgInternetWhite64.displayName = 'SvgInternetWhite64'
export default SvgInternetWhite64
