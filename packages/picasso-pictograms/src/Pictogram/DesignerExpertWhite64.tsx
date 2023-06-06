import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDesignerExpertWhite64 = forwardRef(function SvgDesignerExpertWhite64(
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
          d='M34.388 27.289H32v14.88a4.347 4.347 0 1 1 0 8.695v7.532h6.858l4.348-11.88-8.818-19.227Z'
          opacity={0.3}
        />
        <path
          fill='#231F20'
          d='M63.5 58.306H.5v5.733h63v-5.733ZM32 11.489a5.225 5.225 0 1 0 0-10.45 5.225 5.225 0 0 0 0 10.45Z'
          opacity={0.3}
        />
        <path
          fill='#231F20'
          d='M32 11.489a10.55 10.55 0 0 0-10.55 10.55h21.1A10.549 10.549 0 0 0 32 11.489Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M44.686 64.039h-1v-5.142h-5.543l4.523-12.358-8.599-18.75h-4.134l-8.599 18.75 4.523 12.358h-5.543v5.142h-1v-6.142h5.112l-4.172-11.401 9.037-19.707h5.418l9.037 19.707-4.172 11.4h5.112v6.143Z'
        />
        <path
          fill='#fff'
          d='M32 51.364a4.847 4.847 0 1 1 0-9.694 4.847 4.847 0 0 1 0 9.694Zm0-8.695a3.847 3.847 0 1 0 0 7.694 3.847 3.847 0 0 0 0-7.694ZM38.858 57.897H25.142v1h13.716v-1ZM32 11.989a5.725 5.725 0 1 1 5.725-5.725A5.731 5.731 0 0 1 32 11.989Zm0-10.45a4.725 4.725 0 1 0 0 9.45 4.725 4.725 0 0 0 0-9.45Z'
        />
        <path
          fill='#fff'
          d='M43.05 22.039h-1a10.05 10.05 0 1 0-20.1 0h-1a11.05 11.05 0 0 1 22.1 0Z'
        />
        <path fill='#fff' d='M64 64.539H0v-43h64v43Zm-63-1h62v-41H1v41Z' />
        <path fill='#fff' d='M32.5 27.289h-1v14.88h1v-14.88Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 .539h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDesignerExpertWhite64.displayName = 'SvgDesignerExpertWhite64'
export default SvgDesignerExpertWhite64
