import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHandDeliveryBlue64 = forwardRef(function SvgHandDeliveryBlue64(
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
          fill='#183A9C'
          d='m51.5 34.559-20.5 10v-4.82c5.7-2.57 5.5-8.18 5.5-8.18H31v-10l20.5-10zm11.5 6.5-27.33 17H0v5h37.32l24.11-17.17a4.28 4.28 0 0 0 1.58-4.83z'
          opacity={0.15}
        />
        <path
          fill='#204ECC'
          fillRule='evenodd'
          d='M31.5 1 52 11.25v23.618l-20.5 10.25-7.468-3.753-.585.065a3.44 3.44 0 0 0-2.457 3.299c0 1.474.942 2.784 2.349 3.256l11.496 3.829 22.314-12.897a4.31 4.31 0 0 1 5.747 1.335 4.307 4.307 0 0 1-1.03 5.86L37.465 64.058H0v-1h37.136l24.137-17.752a3.307 3.307 0 0 0 .791-4.5v-.001a3.31 3.31 0 0 0-4.413-1.025L34.945 52.905l-11.924-3.972a4.434 4.434 0 0 1-1.822-7.25 4.4 4.4 0 0 1 2.781-1.371l4.49-.45a8.335 8.335 0 0 0 7.495-7.803H12.98c-6.572 0-11.915 5.292-11.999 11.844l-1.001.156c0-7.176 5.824-13 13-13h24v.5A9.34 9.34 0 0 1 32 39.826v3.924l19-9.5V12.368l-19 9.5v6.191h-1v-6.191l-19-9.5V28.06h-1V11.25zM12.618 11.559 31.5 21l18.882-9.441L31.5 2.118zM28.57 40.857A9.3 9.3 0 0 0 31 40.28v3.467l-5.147-2.587z'
          clipRule='evenodd'
        />
        <path fill='#204ECC' d='m-.02 44.059 1-.112v.112z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h64v64H0z' />
        </clipPath>
      </defs>
    </svg>
  )
})

SvgHandDeliveryBlue64.displayName = 'SvgHandDeliveryBlue64'
export default SvgHandDeliveryBlue64