import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgEarBlue64 = forwardRef(function SvgEarBlue64(
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
          fill='#183A9E'
          d='M53.018 22.01a11.022 11.022 0 0 0-21.95-1.447l-.106 1.447v4.657a8.7 8.7 0 1 1 0 17.399v7.246a1.743 1.743 0 0 0 3.19.973L51.02 28.34h-.009a10.966 10.966 0 0 0 2.007-6.33Z'
          opacity={0.15}
        />
        <path
          fill='#204ECF'
          d='M32.667 64A12.702 12.702 0 0 1 19.98 51.312h1a11.685 11.685 0 0 0 21.434 6.447l.211-.319.016.005 16.015-22.611-.006-.002.382-.538A21.008 21.008 0 1 0 20.98 22.01h-1A22.01 22.01 0 1 1 60.22 34.34h.003l-.373.538-16.718 23.604A12.666 12.666 0 0 1 32.667 64Z'
        />
        <path
          fill='#204ECF'
          d='M11.283 57.458 5.577 40.507H.5v-1h5.796l4.987 14.816 7.962-23.65 4.34 12.893h7.377a8.2 8.2 0 0 0 0-16.399h-.5V22.01a11.528 11.528 0 0 1 23.056 0h-1a10.528 10.528 0 0 0-21.056 0v4.17a9.2 9.2 0 0 1-.5 18.386h-8.096l-3.621-10.757-7.962 23.649Z'
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

SvgEarBlue64.displayName = 'SvgEarBlue64'
export default SvgEarBlue64
