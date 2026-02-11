import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgFlagFlagsWhite64 = forwardRef(function SvgFlagFlagsWhite64(
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
          fill='#000'
          d='M35 50h-9.17v-8.52H35V14h17.47L35 50ZM24 41H3V5h4l17 36Z'
          opacity={0.3}
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M35 13.5h27.2L53.1 32l9.1 18.5H25.5V42M34.5 41.5l-9 9'
        />
        <path
          stroke='#fff'
          strokeMiterlimit={10}
          d='M3 41.5h31.5v-37H3M2.5 0v64'
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

SvgFlagFlagsWhite64.displayName = 'SvgFlagFlagsWhite64'
export default SvgFlagFlagsWhite64
