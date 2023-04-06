import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDevelopmentBlue64 = forwardRef(function SvgDevelopmentBlue64(
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
          d='M63.5 50.517H.5v7.552h63v-7.552Z'
          fill='#183A9E'
        />
        <path
          d='M64 58.57H0V5.43h64v53.138Zm-63-1h62V6.43H1v51.138Z'
          fill='#204ECF'
        />
        <path
          d='m21.715 38.596-5.227-6.597 5.227-6.596.785.621-4.736 5.975 4.736 5.976-.785.621ZM41.995 38.606l-.767-.641 4.994-5.966-4.994-5.964.767-.642 5.531 6.606-5.531 6.607ZM36.577 18.51l-10.09 26.626.936.354 10.09-26.626-.936-.355ZM12.157 13.651a1.687 1.687 0 1 0 0-3.375 1.687 1.687 0 0 0 0 3.375ZM6.532 13.651a1.687 1.687 0 1 0 0-3.375 1.687 1.687 0 0 0 0 3.375ZM17.782 13.651a1.687 1.687 0 1 0 0-3.375 1.687 1.687 0 0 0 0 3.375Z'
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

SvgDevelopmentBlue64.displayName = 'SvgDevelopmentBlue64'
export default SvgDevelopmentBlue64
