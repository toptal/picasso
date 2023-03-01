import React, { forwardRef, Ref } from 'react'
import { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgPassportBlue64 = forwardRef(function SvgPassportBlue64(
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
          opacity={0.15}
          d='M54.912 56.467H9.088v7.172h45.824v-7.172ZM22.427.639v8.025h32.485L22.427.639Z'
          fill='#183A9E'
        />
        <path
          d='M55.412 64.139H8.588V8.164h13.339V0l33.485 8.272V64.14Zm-45.824-1h44.824V9.056L22.927 1.277v7.887H9.588V63.14Z'
          fill='#204ECF'
        />
        <path
          d='M32 45.017a14.659 14.659 0 1 1 14.66-14.66A14.676 14.676 0 0 1 32 45.017Zm0-28.319a13.659 13.659 0 1 0 13.66 13.66A13.675 13.675 0 0 0 32 16.697Z'
          fill='#204ECF'
        />
        <path
          d='M32 45.017c-4.496 0-8.154-6.577-8.154-14.66S27.504 15.698 32 15.698s8.154 6.576 8.154 14.66c0 8.082-3.658 14.659-8.154 14.659Zm0-28.319c-3.945 0-7.154 6.128-7.154 13.66 0 7.531 3.21 13.659 7.154 13.659 3.945 0 7.154-6.128 7.154-13.66 0-7.531-3.21-13.659-7.154-13.659Z'
          fill='#204ECF'
        />
        <path d='M32.5 16.198h-1v28.319h1V16.198Z' fill='#204ECF' />
        <path
          d='M46.16 29.857H17.84v1h28.32v-1ZM39.654 52.732H24.346v1h15.308v-1ZM54.912 8.164H22.427v1h32.485v-1Z'
          fill='#204ECF'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64.139H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgPassportBlue64.displayName = 'SvgPassportBlue64'
export default SvgPassportBlue64
