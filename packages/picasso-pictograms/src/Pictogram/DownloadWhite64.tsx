import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDownloadWhite64 = forwardRef(function SvgDownloadWhite64(
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
          opacity={0.3}
          d='M32 1.246v63a31.5 31.5 0 1 0 0-63Z'
          fill='#231F20'
        />
        <path
          d='M32 64.746a31.999 31.999 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31 31.036 31.036 0 0 0-31-31Z'
          fill='#fff'
        />
        <path d='M46.479 45.724H17.524v1h28.955v-1Z' fill='#fff' />
        <path
          d='M32 46.654a.664.664 0 0 1-.473-.196L17.168 32.1l.707-.707L32 45.517l14.125-14.124.707.707-14.359 14.358a.664.664 0 0 1-.473.196Z'
          fill='#fff'
        />
        <path d='M32.5 17.268h-1v28.956h1V17.268Z' fill='#fff' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .746)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgDownloadWhite64.displayName = 'SvgDownloadWhite64'
export default SvgDownloadWhite64
