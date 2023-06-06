import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDeveloperExpertBlue64 = forwardRef(function SvgDeveloperExpertBlue64(
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
          d='M63.5 57.768H.5V63.5h63v-5.732ZM32 10.95A5.225 5.225 0 1 0 32 .5a5.225 5.225 0 0 0 0 10.45Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M32 10.95A10.55 10.55 0 0 0 21.45 21.5h21.1A10.549 10.549 0 0 0 32 10.95Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32 11.45a5.725 5.725 0 1 1 5.725-5.725A5.731 5.731 0 0 1 32 11.45ZM32 1a4.725 4.725 0 1 0 0 9.45A4.725 4.725 0 0 0 32 1Z'
        />
        <path
          fill='#204ECF'
          d='M43.05 21.5h-1a10.05 10.05 0 1 0-20.1 0h-1a11.05 11.05 0 0 1 22.1 0Z'
        />
        <path fill='#204ECF' d='M64 64H0V21h64v43ZM1 63h62V22H1v41Z' />
        <path
          fill='#204ECF'
          d='M21.715 49.096 16.488 42.5l5.227-6.597.785.621-4.736 5.976 4.736 5.975-.785.621ZM41.995 49.106l-.767-.641 4.994-5.965-4.994-5.965.767-.642 5.531 6.607-5.531 6.606ZM36.577 29.01l-10.09 26.626.936.354 10.09-26.626-.936-.355Z'
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

SvgDeveloperExpertBlue64.displayName = 'SvgDeveloperExpertBlue64'
export default SvgDeveloperExpertBlue64
