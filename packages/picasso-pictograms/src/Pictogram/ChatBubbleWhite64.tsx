import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgChatBubbleWhite64 = forwardRef(function SvgChatBubbleWhite64(
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
          d='M43.145 6.073.5 6.072v37.029l7.374-7.374h12.981V20.899h22.29V6.073Z'
          fill='#231F20'
        />
        <path
          d='M0 44.308V5.572h43.645v15.327h-1V6.572H1v35.322l6.667-6.667h13.188v1H8.081L0 44.308Z'
          fill='#fff'
        />
        <path
          d='m64 59.135-8.081-8.081H20.356V20.399H64v38.736Zm-42.645-9.081h34.978L63 56.72V21.399H21.355v28.655Z'
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

SvgChatBubbleWhite64.displayName = 'SvgChatBubbleWhite64'
export default SvgChatBubbleWhite64
