import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgChatConversationBlue64 = forwardRef(function SvgChatConversationBlue64(
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
          fill='#183A9C'
          d='M53.5 34.5h-49c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h3v8l8-8h38c2.21 0 4-1.79 4-4v-12c0-2.21-1.79-4-4-4Z'
          opacity={0.15}
        />
        <path
          stroke='#204ECD'
          strokeMiterlimit={10}
          d='M53.5 34.5h-49c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h3v8l8-8h38c2.21 0 4-1.79 4-4v-12c0-2.21-1.79-4-4-4ZM59.5 9.5h-3v-8l-8 8h-38c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h49c2.21 0 4-1.79 4-4v-12c0-2.21-1.79-4-4-4Z'
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

SvgChatConversationBlue64.displayName = 'SvgChatConversationBlue64'
export default SvgChatConversationBlue64
