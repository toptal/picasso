import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgSprintWhite64 = forwardRef(function SvgSprintWhite64(
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
      viewBox='0 0 65 64'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          fill='#231F20'
          d='M12.448 32H.5a31.365 31.365 0 0 0 6.8 19.552h24.697A19.552 19.552 0 0 1 12.448 32ZM56.687 51.553A31.437 31.437 0 0 1 32 63.5h24.699l6.801-5.974-6.801-5.974-.012.001Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M32 52.052A20.051 20.051 0 1 1 52.052 32 20.074 20.074 0 0 1 32 52.052Zm0-39.104A19.051 19.051 0 1 0 51.052 32 19.074 19.074 0 0 0 32 12.948Z'
        />
        <path
          fill='#fff'
          d='M32 64H0V51.052h6.286A31.647 31.647 0 0 1 0 32a32 32 0 1 1 32 32ZM1 63h31A31 31 0 1 0 1 32a30.668 30.668 0 0 0 6.544 19.052H32v1H1V63Z'
        />
        <path
          fill='#fff'
          d='M56.887 64H32v-1h24.51l6.232-5.474-6.374-5.599.66-.751 7.23 6.35L56.887 64Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64.258v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgSprintWhite64.displayName = 'SvgSprintWhite64'
export default SvgSprintWhite64
