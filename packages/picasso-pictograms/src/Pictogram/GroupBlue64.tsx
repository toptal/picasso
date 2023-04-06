import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgGroupBlue64 = forwardRef(function SvgGroupBlue64(
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
          d='M9.773 9.685a4.593 4.593 0 1 0 0-9.185 4.593 4.593 0 0 0 0 9.185Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M9.773 9.686A9.273 9.273 0 0 0 .5 18.959h18.546a9.273 9.273 0 0 0-9.273-9.273ZM54.227 54.227a4.593 4.593 0 1 0 0-9.186 4.593 4.593 0 0 0 0 9.186Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M54.226 54.227A9.273 9.273 0 0 1 63.5 63.5H44.953a9.273 9.273 0 0 1 9.273-9.273ZM18.808 23.91v16.152l4.865-4.865h4.595v-5.1h7.464V23.91H18.808Z'
          fill='#183A9E'
        />
        <path
          d='M54.227 10.186a5.093 5.093 0 1 1 5.093-5.093 5.099 5.099 0 0 1-5.093 5.093Zm0-9.186a4.093 4.093 0 1 0 0 8.186 4.093 4.093 0 0 0 0-8.186Z'
          fill='#204ECF'
        />
        <path
          d='M64 18.959h-1a8.772 8.772 0 1 0-17.546 0h-1a9.773 9.773 0 1 1 19.546 0ZM9.773 10.186A5.093 5.093 0 1 1 9.773 0a5.093 5.093 0 0 1 0 10.186Zm0-9.186a4.093 4.093 0 1 0 0 8.186 4.093 4.093 0 0 0 0-8.186Z'
          fill='#204ECF'
        />
        <path
          d='M19.546 18.959h-1a8.774 8.774 0 1 0-17.546 0H0a9.773 9.773 0 1 1 19.546 0ZM9.773 54.727a5.093 5.093 0 1 1 5.093-5.093 5.098 5.098 0 0 1-5.093 5.093Zm0-9.185a4.093 4.093 0 1 0 0 8.185 4.093 4.093 0 0 0 0-8.185Z'
          fill='#204ECF'
        />
        <path
          d='M19.546 63.5h-1A8.774 8.774 0 1 0 1 63.5H0a9.773 9.773 0 1 1 19.546 0ZM54.227 54.727a5.093 5.093 0 1 1 0-10.186 5.093 5.093 0 0 1 0 10.186Zm0-9.185a4.093 4.093 0 1 0 0 8.186 4.093 4.093 0 0 0 0-8.187Z'
          fill='#204ECF'
        />
        <path
          d='M64 63.5h-1a8.772 8.772 0 1 0-17.546 0h-1A9.773 9.773 0 1 1 64 63.5ZM45.693 46.37l-5.573-5.573H27.768v-11.2h17.925v16.772Zm-16.925-6.573h11.766l4.159 4.158V30.597H28.768v9.2Z'
          fill='#204ECF'
        />
        <path
          d='M18.308 41.269v-17.86h17.924v6.688h-1V24.41H19.308v14.445l4.158-4.158h4.802v1H23.88l-5.572 5.572Z'
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

SvgGroupBlue64.displayName = 'SvgGroupBlue64'
export default SvgGroupBlue64
