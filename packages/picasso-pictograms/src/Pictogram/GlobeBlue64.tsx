import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgGlobeBlue64 = forwardRef(function SvgGlobeBlue64(
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
          d='M63.5 32A31.5 31.5 0 0 1 32 63.5V.5A31.5 31.5 0 0 1 63.5 32Z'
          fill='#183A9E'
        />
        <path
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.036 31.036 0 0 0 32 1Z'
          fill='#204ECF'
        />
        <path
          d='M32 64c-9.68 0-17.554-14.355-17.554-32S22.32 0 32 0c9.68 0 17.554 14.355 17.554 32S41.68 64 32 64Zm0-63c-9.128 0-16.554 13.907-16.554 31S22.872 63 32 63c9.128 0 16.554-13.907 16.554-31S41.128 1 32 1Z'
          fill='#204ECF'
        />
        <path d='M32.5.5h-1v63h1V.5Z' fill='#204ECF' />
        <path
          d='M63.5 31.5H.5v1h63v-1ZM58.422 14.344H5.578v1h52.844v-1ZM58.422 48.656H5.577v1h52.845v-1Z'
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

SvgGlobeBlue64.displayName = 'SvgGlobeBlue64'
export default SvgGlobeBlue64
