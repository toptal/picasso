import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgAlarmClockWhite64 = forwardRef(function SvgAlarmClockWhite64(
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
          d='M31.999 53.825a3.515 3.515 0 0 0 3.517-3.517h-7.033a3.517 3.517 0 0 0 3.516 3.517ZM45.982 41.319a3.084 3.084 0 0 1-3.086-3.086V26.511a6.986 6.986 0 0 0-6.985-6.986 3.912 3.912 0 0 0-7.824 0 6.985 6.985 0 0 0-6.985 6.986v11.722a3.086 3.086 0 0 1-3.086 3.086 3.086 3.086 0 0 0 0 6.172h27.966a3.087 3.087 0 0 0 0-6.172ZM32 38.239a3.258 3.258 0 1 1 0-6.516 3.258 3.258 0 0 1 0 6.517Z'
          fill='#231F20'
        />
        <path
          d='M31.999 63.692a28.711 28.711 0 1 1 28.71-28.71A28.743 28.743 0 0 1 32 63.691Zm0-56.421a27.71 27.71 0 1 0 27.71 27.71A27.742 27.742 0 0 0 32 7.271ZM2.479 17.43A8.463 8.463 0 0 1 14.448 5.46l-.707.708A7.463 7.463 0 1 0 3.186 16.723l-.707.707ZM61.522 17.429l-.707-.707a7.465 7.465 0 0 0-2.423-12.173 7.464 7.464 0 0 0-8.133 1.619l-.707-.707a8.463 8.463 0 0 1 11.97 11.968Z'
          fill='#fff'
        />
        <path
          d='M31.999 38.74a3.759 3.759 0 1 1 0-7.518 3.759 3.759 0 0 1 0 7.518Zm0-6.517a2.758 2.758 0 1 0 0 5.517 2.758 2.758 0 0 0 0-5.517Z'
          fill='#fff'
        />
        <path
          d='M32.499 12.659h-1V31.71h1V12.66ZM44.768 34.481h-9.682v1h9.682v-1ZM10.653 53.431.167 62.818l.667.745 10.486-9.387-.667-.745ZM53.346 53.43l-.667.744 10.484 9.39.667-.745-10.484-9.39Z'
          fill='#fff'
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

SvgAlarmClockWhite64.displayName = 'SvgAlarmClockWhite64'
export default SvgAlarmClockWhite64
