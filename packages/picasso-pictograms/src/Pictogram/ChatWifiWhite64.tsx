import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgChatWifiWhite64 = forwardRef(function SvgChatWifiWhite64(
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
          d='M43.145 6.073.5 6.072v37.029l7.374-7.374h12.982V20.899h22.29V6.073Z'
          fill='#231F20'
        />
        <path
          d='M0 44.308V5.572h43.645v15.327h-1V6.572H1v35.322l6.667-6.667h13.19v1H8.08l-8.08 8.081Z'
          fill='#fff'
        />
        <path
          d='m64 59.135-8.08-8.081H20.355V20.399H64v38.736Zm-42.644-9.081h34.977L63 56.72V21.4H21.356v28.654Z'
          fill='#fff'
        />
        <path
          d='M42.178 43.74a3.444 3.444 0 1 1 .006-6.889 3.444 3.444 0 0 1-.006 6.89Zm0-5.89a2.445 2.445 0 1 0 .003 4.89 2.445 2.445 0 0 0-.003-4.89ZM52.378 34.777l-.257-.43a11.59 11.59 0 0 0-19.886 0l-.257.43-.858-.514.257-.429a12.589 12.589 0 0 1 21.602 0l.257.429-.858.514Z'
          fill='#fff'
        />
        <path
          d='m49.225 37.559-.257-.43a7.914 7.914 0 0 0-13.58 0l-.257.43-.858-.514.257-.43a8.916 8.916 0 0 1 15.296 0l.257.43-.858.514Z'
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

SvgChatWifiWhite64.displayName = 'SvgChatWifiWhite64'
export default SvgChatWifiWhite64
