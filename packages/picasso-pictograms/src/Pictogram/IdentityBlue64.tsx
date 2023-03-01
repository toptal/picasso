import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgIdentityBlue64 = forwardRef(function SvgIdentityBlue64(
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
          d='M20.095 43.477a5.738 5.738 0 1 0 0-11.477 5.738 5.738 0 0 0 0 11.477ZM20.095 43.477A11.587 11.587 0 0 0 8.51 55.063h23.172a11.586 11.586 0 0 0-11.586-11.586Z'
          fill='#183A9E'
        />
        <path
          d='M64 64H0V20.813h20.825v1H1V63h62V21.813H43.176v-1H64V64Z'
          fill='#204ECF'
        />
        <path
          d='M20.095 43.977a6.238 6.238 0 1 1 6.239-6.239 6.245 6.245 0 0 1-6.239 6.239Zm0-11.477a5.238 5.238 0 1 0 5.239 5.238 5.244 5.244 0 0 0-5.239-5.238Z'
          fill='#204ECF'
        />
        <path
          d='M32.181 55.063h-1a11.087 11.087 0 0 0-18.928-7.846 11.085 11.085 0 0 0-3.244 7.846h-1a12.086 12.086 0 1 1 24.172 0ZM56.375 33.563H39.5v1h16.875v-1ZM56.375 41.906H39.5v1h16.875v-1ZM47.938 50.25H39.5v1h8.438v-1ZM32 27.813a13.907 13.907 0 1 1 13.906-13.907A13.923 13.923 0 0 1 32 27.812ZM32 1a12.906 12.906 0 1 0 12.906 12.906A12.921 12.921 0 0 0 32 1Z'
          fill='#204ECF'
        />
        <path
          d='m31.295 17.407-3.861-3.861.707-.707 3.154 3.154 4.732-4.731.707.707-5.439 5.438Z'
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

SvgIdentityBlue64.displayName = 'SvgIdentityBlue64'
export default SvgIdentityBlue64
