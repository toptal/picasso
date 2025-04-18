import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgVideoPitch1White64 = forwardRef(function SvgVideoPitch1White64(
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
          d='M61.241 35.31c-1.12 0-1.799.9-1.799 1.91 0 4.3-3.588 8.85-8.316 8.85-8.766 0-7.287-7.57-19.141-7.57s-10.375 7.57-19.141 7.57c-4.738 0-8.316-4.55-8.316-8.85 0-1-.68-1.91-1.8-1.91C1.39 35.31.84 36.36.84 37.22v.44c0 8.2 7.026 13.59 12.824 13.59 5.017 0 7.836-2.77 7.836-2.77v14.51h20.99V48.48s2.819 2.77 7.836 2.77c5.798 0 12.824-5.39 12.824-13.59v-.44c0-.85-.55-1.91-1.889-1.91h-.02ZM31.985 29a6.498 6.498 0 0 0 6.497-6.5c0-3.59-2.909-6.5-6.497-6.5a6.498 6.498 0 0 0-6.497 6.5c0 3.59 2.909 6.5 6.497 6.5Z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='M31.985 31c-5.507 0-9.995-4.49-9.995-10s4.488-10 9.995-10c5.507 0 9.995 4.49 9.995 10s-4.488 10-9.995 10Zm0-19c-4.958 0-8.996 4.04-8.996 9s4.038 9 8.996 9 8.996-4.04 8.996-9-4.038-9-8.996-9ZM43.01 63h-1V47.29l.85.83s2.729 2.63 7.486 2.63c6.218 0 12.655-5.2 12.655-13.9v-.42a2.97 2.97 0 0 0-2.97-2.97c-1.638 0-3.028 1.33-3.028 2.97v.77c0 2.63-2.029 5.39-4.438 6.02-2.608.69-5.247-.28-6.716-2.46-.48-.67-1.03-1.32-1.62-1.91l.71-.71c.63.63 1.21 1.32 1.73 2.05 1.239 1.84 3.458 2.65 5.647 2.07 1.969-.52 3.698-2.88 3.698-5.06v-.77c0-2.19 1.779-3.97 3.968-3.97s4.028 1.78 4.028 3.97v.42c0 9.33-6.947 14.9-13.654 14.9-3.618 0-6.117-1.36-7.336-2.23v13.47l-.01.01ZM41.96 36.98c-2.838-1.92-6.287-2.94-9.975-2.94-3.688 0-7.067 1.02-9.905 2.94l-.56-.83c3.009-2.04 6.627-3.11 10.465-3.11s7.526 1.08 10.535 3.11l-.56.83ZM22.02 63h-1V49.53c-1.22.86-3.718 2.23-7.336 2.23C6.977 51.76.03 46.18.03 36.85v-.42c0-2.19 1.78-3.97 3.968-3.97 2.19 0 4.028 1.78 4.028 3.97v.77c0 2.17 1.73 4.54 3.699 5.06 2.189.58 4.408-.23 5.637-2.05.53-.74 1.11-1.43 1.74-2.06l.709.71c-.59.59-1.14 1.24-1.63 1.92-1.469 2.17-4.108 3.13-6.716 2.45-2.41-.64-4.438-3.4-4.438-6.02v-.77a2.97 2.97 0 0 0-2.969-2.97c-1.64 0-3.028 1.33-3.028 2.97v.42c0 8.7 6.437 13.9 12.654 13.9 4.777 0 7.456-2.6 7.486-2.63l.85-.84V63Z'
        />
        <path
          fill='#fff'
          d='M60.002 33h-1V3H5.028v30h-1V2h55.974v31ZM56.324 38H7.696v1h48.628v-1Z'
        />
        <path fill='#fff' d='m35.503 21-5.517 3.19v-6.38L35.503 21Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgVideoPitch1White64.displayName = 'SvgVideoPitch1White64'
export default SvgVideoPitch1White64
