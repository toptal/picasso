import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgWaterfallWhite64 = forwardRef(function SvgWaterfallWhite64(
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
          d='M48.293 32H15.707v8.69h32.586V32ZM33.086 9.19H.5v8.69h32.586V9.19ZM63.5 54.81H30.914v8.69H63.5v-8.69Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M48.793 41.19H15.207V22.81h33.586v18.38Zm-32.586-1h31.586V23.81H16.207v16.38ZM33.586 18.38H0V0h33.586v18.38ZM1 17.38h31.586V1H1v16.38ZM64 64H30.414V45.62H64V64Zm-32.586-1H63V46.62H31.414V63Z'
        />
        <path
          fill='#fff'
          d='M15.524 32.5h-7.92V18.979h1V31.5h6.92v1ZM30.549 55.311h-7.738v-14.07h1v13.07h6.738v1Z'
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

SvgWaterfallWhite64.displayName = 'SvgWaterfallWhite64'
export default SvgWaterfallWhite64
