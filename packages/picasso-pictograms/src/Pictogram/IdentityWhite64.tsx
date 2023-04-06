import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgIdentityWhite64 = forwardRef(function SvgIdentityWhite64(
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
          d='M20.095 44.379a5.738 5.738 0 1 0 0-11.477 5.738 5.738 0 0 0 0 11.477Z'
          fill='#231F20'
        />
        <path
          opacity={0.3}
          d='M20.095 44.378A11.585 11.585 0 0 0 8.51 55.964h23.172a11.586 11.586 0 0 0-11.586-11.586Z'
          fill='#231F20'
        />
        <path
          d='M64 64.902H0V21.715h20.825v1H1v41.187h62V22.715H43.176v-1H64v43.187Z'
          fill='#fff'
        />
        <path
          d='M20.095 44.878a6.239 6.239 0 1 1 6.239-6.238 6.245 6.245 0 0 1-6.239 6.238Zm0-11.476a5.238 5.238 0 1 0 0 10.476 5.238 5.238 0 0 0 0-10.476Z'
          fill='#fff'
        />
        <path
          d='M32.181 55.964h-1a11.088 11.088 0 0 0-11.086-11.096A11.085 11.085 0 0 0 9.01 55.964h-1a12.086 12.086 0 1 1 24.172 0ZM56.375 34.464H39.5v1h16.875v-1ZM56.375 42.808H39.5v1h16.875v-1ZM47.938 51.152H39.5v1h8.438v-1ZM32 28.714a13.906 13.906 0 1 1 13.906-13.906A13.922 13.922 0 0 1 32 28.714Zm0-26.812a12.906 12.906 0 1 0 12.906 12.906A12.92 12.92 0 0 0 32 1.902Z'
          fill='#fff'
        />
        <path
          d='m31.295 18.309-3.861-3.861.707-.707 3.154 3.154 4.732-4.731.707.707-5.439 5.438Z'
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

SvgIdentityWhite64.displayName = 'SvgIdentityWhite64'
export default SvgIdentityWhite64
