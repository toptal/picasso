import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDigitalWhite64 = forwardRef(function SvgDigitalWhite64(
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
          d='M26.6 45.605c10.199 0 18.466-8.267 18.466-18.466 0-10.198-8.267-18.465-18.465-18.465-10.199 0-18.466 8.267-18.466 18.465s8.267 18.466 18.466 18.466Z'
          fill='#231F20'
        />
        <path
          d='M26.6 53.74a26.6 26.6 0 1 1 26.601-26.6 26.632 26.632 0 0 1-26.6 26.6Zm0-52.201a25.6 25.6 0 1 0 25.601 25.6 25.63 25.63 0 0 0-25.6-25.6Z'
          fill='#fff'
        />
        <path
          d='M58.748 64.746 42.174 48.172l.707-.707L58.748 63.33l4.045-4.045L46.926 43.42l.707-.706 16.574 16.573-5.459 5.46ZM20.015 34.912h-3.37a2.632 2.632 0 0 1-2.629-2.628v-10.29a2.631 2.631 0 0 1 2.629-2.628h3.37a2.632 2.632 0 0 1 2.629 2.629v10.289a2.632 2.632 0 0 1-2.629 2.628Zm-3.37-14.546a1.63 1.63 0 0 0-1.629 1.629v10.289a1.63 1.63 0 0 0 1.629 1.628h3.37a1.63 1.63 0 0 0 1.629-1.628v-10.29a1.63 1.63 0 0 0-1.629-1.628h-3.37ZM38.685 33.912H28.93v1h9.756v-1Z'
          fill='#fff'
        />
        <path
          d='M34.307 34.413h-1V20.367h-4.378v-1h5.378v15.046Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .539)'
            d='M0 0h64.207v64.207H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDigitalWhite64.displayName = 'SvgDigitalWhite64'
export default SvgDigitalWhite64
