import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDownloadBlue64 = forwardRef(function SvgDownloadBlue64(
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
          d='M32 .5v63a31.5 31.5 0 1 0 0-63Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32 64a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31A31.036 31.036 0 0 0 32 1Z'
        />
        <path fill='#204ECF' d='M46.479 44.978H17.524v1h28.955v-1Z' />
        <path
          fill='#204ECF'
          d='M32 45.908a.664.664 0 0 1-.473-.196L17.168 31.354l.707-.707L32 44.772l14.125-14.125.707.707-14.359 14.358a.664.664 0 0 1-.473.196Z'
        />
        <path fill='#204ECF' d='M32.5 16.523h-1v28.955h1V16.522Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDownloadBlue64.displayName = 'SvgDownloadBlue64'
export default SvgDownloadBlue64
