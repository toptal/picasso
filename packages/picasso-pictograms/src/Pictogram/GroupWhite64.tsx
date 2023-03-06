import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgGroupWhite64 = forwardRef(function SvgGroupWhite64(
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
          d='M9.773 10.587a4.593 4.593 0 1 0 0-9.185 4.593 4.593 0 0 0 0 9.185Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M9.773 10.587A9.273 9.273 0 0 0 .5 19.86h18.546a9.273 9.273 0 0 0-9.273-9.273ZM54.227 55.129a4.593 4.593 0 1 0 0-9.186 4.593 4.593 0 0 0 0 9.186ZM54.226 55.13a9.273 9.273 0 0 1 9.273 9.272H44.953a9.273 9.273 0 0 1 9.273-9.273ZM18.808 24.812v16.152l4.865-4.865h4.595v-5.1h7.464v-6.187H18.808Z'
          fill='#231F20'
        />
        <path
          d='M54.227 11.087a5.093 5.093 0 1 1 0-10.185 5.093 5.093 0 0 1 0 10.185Zm0-9.185a4.093 4.093 0 1 0 0 8.186 4.093 4.093 0 0 0 0-8.186Z'
          fill='#fff'
        />
        <path
          d='M64 19.86h-1a8.772 8.772 0 1 0-17.546 0h-1a9.773 9.773 0 1 1 19.546 0ZM9.773 11.087a5.093 5.093 0 1 1 0-10.185 5.093 5.093 0 0 1 0 10.185Zm0-9.185a4.093 4.093 0 1 0 0 8.185 4.093 4.093 0 0 0 0-8.185Z'
          fill='#fff'
        />
        <path
          d='M19.546 19.86h-1a8.774 8.774 0 0 0-14.98-6.209A8.773 8.773 0 0 0 1 19.861H0a9.773 9.773 0 1 1 19.546 0ZM9.773 55.629a5.093 5.093 0 1 1 0-10.186 5.093 5.093 0 0 1 0 10.186Zm0-9.186a4.093 4.093 0 1 0 0 8.186 4.093 4.093 0 0 0 0-8.186Z'
          fill='#fff'
        />
        <path
          d='M19.546 64.402h-1a8.774 8.774 0 0 0-14.98-6.21A8.773 8.773 0 0 0 1 64.403H0a9.773 9.773 0 1 1 19.546 0ZM54.227 55.629a5.093 5.093 0 1 1 0-10.186 5.093 5.093 0 0 1 0 10.186Zm0-9.186a4.093 4.093 0 1 0 0 8.187 4.093 4.093 0 0 0 0-8.187Z'
          fill='#fff'
        />
        <path
          d='M64 64.402h-1a8.772 8.772 0 1 0-17.546 0h-1a9.773 9.773 0 1 1 19.546 0ZM45.693 47.271l-5.573-5.572H27.768V30.5h17.925V47.27Zm-16.925-6.572h11.766l4.159 4.158V31.499H28.768v9.2Z'
          fill='#fff'
        />
        <path
          d='M18.308 42.17V24.313h17.924v6.687h-1v-5.687H19.308v14.445l4.158-4.158h4.802v1H23.88l-5.572 5.572Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .902)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgGroupWhite64.displayName = 'SvgGroupWhite64'
export default SvgGroupWhite64
