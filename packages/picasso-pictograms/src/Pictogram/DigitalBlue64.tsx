import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDigitalBlue64 = forwardRef(function SvgDigitalBlue64(
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
          d='M26.6 45.066c10.199 0 18.466-8.267 18.466-18.465 0-10.199-8.267-18.466-18.465-18.466-10.199 0-18.466 8.267-18.466 18.466 0 10.198 8.267 18.465 18.466 18.465Z'
          fill='#183A9E'
        />
        <path
          d='M26.6 53.201a26.6 26.6 0 1 1 26.601-26.6 26.631 26.631 0 0 1-26.6 26.6ZM26.6 1a25.6 25.6 0 1 0 25.601 25.6A25.63 25.63 0 0 0 26.601 1Z'
          fill='#204ECF'
        />
        <path
          d='M58.748 64.207 42.174 47.633l.707-.707 15.867 15.867 4.045-4.045-15.867-15.867.707-.707 16.574 16.574-5.459 5.459ZM20.015 34.374h-3.37a2.632 2.632 0 0 1-2.629-2.629V21.456a2.632 2.632 0 0 1 2.629-2.628h3.37a2.632 2.632 0 0 1 2.629 2.628v10.29a2.631 2.631 0 0 1-2.629 2.628Zm-3.37-14.546a1.63 1.63 0 0 0-1.629 1.628v10.29a1.63 1.63 0 0 0 1.629 1.628h3.37a1.63 1.63 0 0 0 1.629-1.629V21.456a1.63 1.63 0 0 0-1.629-1.628h-3.37ZM38.685 33.374H28.93v1h9.756v-1Z'
          fill='#204ECF'
        />
        <path
          d='M34.307 33.874h-1V19.828h-4.378v-1h5.378v15.046Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.207v64.207H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDigitalBlue64.displayName = 'SvgDigitalBlue64'
export default SvgDigitalBlue64
