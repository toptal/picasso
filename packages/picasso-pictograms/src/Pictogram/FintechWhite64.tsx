import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFintechWhite64 = forwardRef(function SvgFintechWhite64(
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
          fill='#231F20'
          d='M48.497 16.362H15.503v32.993h32.994V16.362Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M37.11 45.22H26.89a6.438 6.438 0 0 1-6.43-6.43h1a5.436 5.436 0 0 0 5.43 5.43h10.22a5.431 5.431 0 0 0 0-10.861H26.89a6.43 6.43 0 1 1 0-12.862h10.22a6.438 6.438 0 0 1 6.43 6.431h-1a5.437 5.437 0 0 0-5.43-5.43H26.89a5.432 5.432 0 1 0 0 10.86h10.22a6.431 6.431 0 0 1 0 12.862Z'
        />
        <path
          fill='#fff'
          d='M32.5 16.362h-1v32.993h1V16.362ZM63.5 43.96h-9.227v1H63.5v-1ZM63.5 32.359h-9.227v1H63.5v-1Z'
        />
        <path
          fill='#fff'
          d='M54.773 55.632H9.227V10.086h45.546v45.546Zm-44.546-1h43.546V11.086H10.227v43.546Z'
        />
        <path
          fill='#fff'
          d='M9.727 20.757H.5v1h9.227v-1ZM44.102 55.132h-1v9.227h1v-9.227ZM20.898 1.359h-1v9.227h1V1.359ZM9.727 43.96H.5v1h9.227v-1ZM44.102 1.359h-1v9.227h1V1.359ZM20.898 55.132h-1v9.227h1v-9.227ZM63.5 20.757h-9.227v1H63.5v-1ZM9.727 32.359H.5v1h9.227v-1ZM32.5 1.359h-1v9.227h1V1.359ZM32.5 55.132h-1v9.227h1v-9.227Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .859h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgFintechWhite64.displayName = 'SvgFintechWhite64'
export default SvgFintechWhite64
