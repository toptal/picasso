import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPassportWhite64 = forwardRef(function SvgPassportWhite64(
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
          d='M54.912 56.608H9.088v7.172h45.824v-7.172ZM22.427.78v8.026h32.485L22.427.78Z'
          fill='#231F20'
        />
        <path
          d='M55.412 64.28H8.588V8.306h13.339V.142l33.485 8.272V64.28Zm-45.824-1h44.824V9.197L22.927 1.42v7.887H9.588V63.28Z'
          fill='#fff'
        />
        <path
          d='M32 45.158A14.659 14.659 0 1 1 46.66 30.5 14.676 14.676 0 0 1 32 45.159Zm0-28.318a13.659 13.659 0 1 0 13.66 13.659A13.675 13.675 0 0 0 32 16.839Z'
          fill='#fff'
        />
        <path
          d='M32 45.158c-4.496 0-8.154-6.576-8.154-14.659 0-8.083 3.658-14.66 8.154-14.66s8.154 6.577 8.154 14.66-3.658 14.66-8.154 14.66Zm0-28.318c-3.945 0-7.154 6.127-7.154 13.659 0 7.532 3.21 13.66 7.154 13.66 3.945 0 7.154-6.128 7.154-13.66s-3.21-13.66-7.154-13.66Z'
          fill='#fff'
        />
        <path d='M32.5 16.34h-1v28.318h1V16.34Z' fill='#fff' />
        <path
          d='M46.16 29.999H17.84v1h28.32v-1ZM39.654 52.874H24.346v1h15.308v-1ZM54.912 8.306H22.427v1h32.485v-1Z'
          fill='#fff'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path
            fill='#fff'
            transform='translate(0 .142)'
            d='M0 0h64v64.139H0z'
          />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgPassportWhite64.displayName = 'SvgPassportWhite64'
export default SvgPassportWhite64
