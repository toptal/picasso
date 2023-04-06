import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgStartupWhite64 = forwardRef(function SvgStartupWhite64(
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
          d='M22.538 11.676a17.836 17.836 0 0 0-.255 2.953 7.983 7.983 0 0 1-4.176 6.927 8.533 8.533 0 0 0-4.36 7.446h9.023V11.634c-.281 0 .046.029-.232.042ZM41.46 11.675s.255 1.958.255 2.954a7.983 7.983 0 0 0 4.177 6.927A8.533 8.533 0 0 1 50.252 29h-8.537l-.255-17.326ZM63.5 32.002A31.5 31.5 0 0 1 32 63.5a31.5 31.5 0 0 1 31.5-31.498Z'
          fill='#231F20'
        />
        <path
          d='M32.5 64H32A32.036 32.036 0 0 1 0 32.002v-.5h.5a32.035 32.035 0 0 1 32 31.998v.5ZM1.004 32.505a31.035 31.035 0 0 0 30.492 30.491 31.035 31.035 0 0 0-30.492-30.49Z'
          fill='#fff'
        />
        <path
          d='M32 64h-.5v-.5a32.036 32.036 0 0 1 32-31.998h.5v.5A32.036 32.036 0 0 1 32 64Zm30.996-31.495a31.035 31.035 0 0 0-30.492 30.491 31.035 31.035 0 0 0 30.492-30.49ZM50.752 29.502H13.248v-.5a9.053 9.053 0 0 1 4.614-7.882 7.52 7.52 0 0 0 3.921-6.491c0-4.413 1.592-8.677 4.482-12.011a7.59 7.59 0 0 1 11.468 0 18.34 18.34 0 0 1 4.482 12.01 7.521 7.521 0 0 0 3.922 6.492A9.053 9.053 0 0 1 50.752 29v.5Zm-36.489-1h35.473a8.054 8.054 0 0 0-4.09-6.51 8.523 8.523 0 0 1-4.43-7.363c0-4.172-1.505-8.204-4.239-11.356a6.588 6.588 0 0 0-9.956 0 17.336 17.336 0 0 0-4.238 11.356 8.523 8.523 0 0 1-4.431 7.363 8.052 8.052 0 0 0-4.089 6.51Z'
          fill='#fff'
        />
        <path
          d='M32.5 29.002h-1V63.5h1V29.002ZM37.328 12.448h-1a4.328 4.328 0 1 0-8.656 0h-1a5.328 5.328 0 1 1 10.656 0ZM42.215 14.629h-1v14.373h1V14.629Z'
          fill='#fff'
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

SvgStartupWhite64.displayName = 'SvgStartupWhite64'
export default SvgStartupWhite64
