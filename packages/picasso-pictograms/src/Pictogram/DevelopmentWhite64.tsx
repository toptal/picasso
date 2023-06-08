import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDevelopmentWhite64 = forwardRef(function SvgDevelopmentWhite64(
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
          d='M63.5 51.055H.5v7.553h63v-7.553Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M64 59.108H0V5.97h64v53.138Zm-63-1h62V6.97H1v51.138Z'
        />
        <path
          fill='#fff'
          d='m21.715 39.135-5.227-6.597 5.227-6.596.785.62-4.736 5.976 4.736 5.976-.785.62ZM41.995 39.145l-.767-.642 4.994-5.965-4.994-5.964.767-.643 5.531 6.607-5.53 6.607ZM36.577 19.048l-10.09 26.627.936.354 10.09-26.627-.936-.354ZM12.158 14.19a1.688 1.688 0 1 0 0-3.375 1.688 1.688 0 0 0 0 3.375ZM6.533 14.19a1.687 1.687 0 1 0 0-3.375 1.687 1.687 0 0 0 0 3.375ZM17.783 14.19a1.688 1.688 0 1 0 0-3.375 1.688 1.688 0 0 0 0 3.375Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .539h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDevelopmentWhite64.displayName = 'SvgDevelopmentWhite64'
export default SvgDevelopmentWhite64
