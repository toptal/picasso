import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDesignerExpertBlue64 = forwardRef(function SvgDesignerExpertBlue64(
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
          d='M34.388 26.75H32v14.88a4.347 4.347 0 1 1 0 8.696v7.532h6.858l4.348-11.88-8.818-19.228Z'
          opacity={0.15}
        />
        <path
          fill='#183A9E'
          d='M63.5 57.768H.5V63.5h63v-5.732ZM32 10.95A5.225 5.225 0 1 0 32 .5a5.225 5.225 0 0 0 0 10.45ZM32 10.95A10.55 10.55 0 0 0 21.45 21.5h21.1A10.551 10.551 0 0 0 32 10.95Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M44.686 63.5h-1v-5.142h-5.543L42.666 46l-8.6-18.75h-4.133L21.333 46l4.524 12.358h-5.543V63.5h-1v-6.142h5.112l-4.172-11.401L29.29 26.25h5.418l9.037 19.707-4.172 11.401h5.112V63.5Z'
        />
        <path
          fill='#204ECF'
          d='M32 50.826a4.847 4.847 0 1 1 0-9.695 4.847 4.847 0 0 1 0 9.695Zm0-8.696a3.848 3.848 0 1 0 0 7.696 3.848 3.848 0 0 0 0-7.696ZM38.858 57.358H25.142v1h13.716v-1ZM32 11.45a5.725 5.725 0 1 1 5.725-5.725A5.732 5.732 0 0 1 32 11.45ZM32 1a4.725 4.725 0 1 0 0 9.45A4.725 4.725 0 0 0 32 1Z'
        />
        <path
          fill='#204ECF'
          d='M43.05 21.5h-1a10.05 10.05 0 1 0-20.1 0h-1a11.05 11.05 0 1 1 22.1 0Z'
        />
        <path fill='#204ECF' d='M64 64H0V21h64v43ZM1 63h62V22H1v41Z' />
        <path fill='#204ECF' d='M32.5 26.75h-1v14.88h1V26.75Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDesignerExpertBlue64.displayName = 'SvgDesignerExpertBlue64'
export default SvgDesignerExpertBlue64
