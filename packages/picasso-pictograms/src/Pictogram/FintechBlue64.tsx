import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFintechBlue64 = forwardRef(function SvgFintechBlue64(
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
          fill='#183A9E'
          d='M48.497 15.503H15.503v32.994h32.994V15.503Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M37.11 44.361H26.89a6.438 6.438 0 0 1-6.43-6.43h1a5.436 5.436 0 0 0 5.43 5.43h10.22a5.43 5.43 0 0 0 0-10.861H26.89a6.432 6.432 0 1 1 0-12.861h10.22a6.438 6.438 0 0 1 6.43 6.43h-1a5.437 5.437 0 0 0-5.43-5.43H26.89a5.43 5.43 0 1 0 0 10.86h10.22a6.43 6.43 0 0 1 0 12.862Z'
        />
        <path
          fill='#204ECF'
          d='M32.5 15.503h-1v32.993h1V15.503ZM63.5 43.101h-9.227v1H63.5v-1ZM63.5 31.5h-9.227v1H63.5v-1Z'
        />
        <path
          fill='#204ECF'
          d='M54.773 54.773H9.227V9.227h45.546v45.546Zm-44.546-1h43.546V10.227H10.227v43.546Z'
        />
        <path
          fill='#204ECF'
          d='M9.727 19.898H.5v1h9.227v-1ZM44.102 54.273h-1V63.5h1v-9.227ZM20.898.5h-1v9.227h1V.5ZM9.727 43.101H.5v1h9.227v-1ZM44.102.5h-1v9.227h1V.5ZM20.898 54.273h-1V63.5h1v-9.227ZM63.5 19.898h-9.227v1H63.5v-1ZM9.727 31.5H.5v1h9.227v-1ZM32.5.5h-1v9.227h1V.5ZM32.5 54.273h-1V63.5h1v-9.227Z'
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

SvgFintechBlue64.displayName = 'SvgFintechBlue64'
export default SvgFintechBlue64
