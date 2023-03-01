import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgGlobeWhite64 = forwardRef(function SvgGlobeWhite64(
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
      viewBox='0 0 64 65'
      fill='none'
      className={className}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g clipPath='url(#a)'>
        <path
          opacity={0.3}
          d='M63.5 32.902a31.5 31.5 0 0 1-31.5 31.5v-63a31.5 31.5 0 0 1 31.5 31.5Z'
          fill='#231F20'
        />
        <path
          d='M32 64.902a32 32 0 1 1 32-32 32.036 32.036 0 0 1-32 32Zm0-63a31 31 0 1 0 31 31 31.035 31.035 0 0 0-31-31Z'
          fill='#fff'
        />
        <path
          d='M32 64.902c-9.68 0-17.554-14.355-17.554-32S22.32.902 32 .902c9.68 0 17.554 14.355 17.554 32s-7.875 32-17.554 32Zm0-63c-9.128 0-16.554 13.907-16.554 31s7.426 31 16.554 31c9.128 0 16.554-13.907 16.554-31s-7.426-31-16.554-31Z'
          fill='#fff'
        />
        <path d='M32.5 1.402h-1v63h1v-63Z' fill='#fff' />
        <path
          d='M63.5 32.402H.5v1h63v-1ZM58.422 15.246H5.578v1h52.844v-1ZM58.422 49.558H5.577v1h52.845v-1Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' transform='translate(0 .902)' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgGlobeWhite64.displayName = 'SvgGlobeWhite64'
export default SvgGlobeWhite64
