import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgClockBlue64 = forwardRef(function SvgClockBlue64(
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
          opacity={0.15}
          d='M32 56.75c13.669 0 24.75-11.081 24.75-24.75C56.75 18.33 45.669 7.25 32 7.25S7.25 18.33 7.25 32c0 13.669 11.081 24.75 24.75 24.75Z'
          fill='#183A9E'
        />
        <path
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.036 31.036 0 0 0 32 1Z'
          fill='#204ECF'
        />
        <path
          d='M41.731 45.246 31.5 32.172V7.25h1v24.578l10.019 12.801-.788.617ZM32.5 53.938h-1v2.812h1v-2.813ZM10.063 31.5H7.25v1h2.813v-1ZM56.75 31.5h-2.813v1h2.813v-1ZM43.401 50.748l-.866.5 1.407 2.436.866-.5-1.407-2.436ZM20.058 10.316l-.866.5 1.406 2.434.866-.5-1.406-2.434ZM12.752 42.535l-2.436 1.407.5.866 2.436-1.407-.5-.866ZM53.184 19.192l-2.434 1.405.5.866 2.434-1.405-.5-.866ZM51.248 42.535l-.5.866 2.436 1.407.5-.866-2.436-1.407ZM10.816 19.192l-.5.866 2.436 1.407.5-.866-2.436-1.407ZM20.599 50.748l-1.407 2.436.866.5 1.407-2.436-.866-.5ZM43.942 10.316l-1.406 2.435.866.5 1.406-2.435-.866-.5Z'
          fill='#204ECF'
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

SvgClockBlue64.displayName = 'SvgClockBlue64'
export default SvgClockBlue64
