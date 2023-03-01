import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgResumeBlue64 = forwardRef(function SvgResumeBlue64(
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
          d='M56.91 56.327H7.09V63.5h49.82v-7.173ZM25.17 20.055a4.728 4.728 0 1 0 0-9.455 4.728 4.728 0 0 0 0 9.455Z'
          fill='#183A9E'
        />
        <path
          opacity={0.15}
          d='M25.17 20.055a9.545 9.545 0 0 0-9.546 9.546h19.091a9.547 9.547 0 0 0-9.545-9.546Z'
          fill='#183A9E'
        />
        <path
          d='M57.41 64H6.59V0h50.82v64ZM7.59 63h48.82V1H7.59v62Z'
          fill='#204ECF'
        />
        <path
          d='M25.17 20.555a5.228 5.228 0 1 1 5.227-5.227 5.234 5.234 0 0 1-5.227 5.227Zm0-9.455a4.228 4.228 0 1 0 0 8.456 4.228 4.228 0 0 0 0-8.456Z'
          fill='#204ECF'
        />
        <path
          d='M35.215 29.601h-1a9.047 9.047 0 0 0-12.51-8.366 9.046 9.046 0 0 0-5.581 8.366h-1a10.045 10.045 0 1 1 20.091 0ZM49.462 12.38h-7.22v1h7.22v-1ZM49.462 19.6h-7.22v1h7.22v-1ZM49.462 26.821h-7.22v1h7.22v-1ZM49.462 38.392H14.538v1h34.924v-1ZM49.462 45.646H14.538v1h34.924v-1ZM25.17 52.9H14.538v1H25.17v-1Z'
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

SvgResumeBlue64.displayName = 'SvgResumeBlue64'
export default SvgResumeBlue64
