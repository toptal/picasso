import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgHandDeliveryWhite64 = forwardRef(function SvgHandDeliveryWhite64(
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
          fill='#000'
          d='m51.5 34.533-20.5 10v-4.82c5.7-2.57 5.5-8.18 5.5-8.18H31v-10l20.5-10zm11.5 6.5-27.33 17H0v5h37.32l24.11-17.17a4.28 4.28 0 0 0 1.58-4.83z'
          opacity={0.3}
        />
        <path
          fill='#fff'
          d='m21.199 41.656 2.248-.252q.305-.09.633-.124l4.49-.45-4.59-.545a4.42 4.42 0 0 0-2.781 1.37'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M12.98 31.033c-7.176 0-13 5.823-13 13h1v-.112l-1 .112 1.001-.157q.007-.54.061-1.07c.615-6.048 5.728-10.773 11.938-10.773h22.985a8.335 8.335 0 0 1-7.495 7.802l-4.49.45a4 4 0 0 0-.49.077l.49-.077 4.59.545-4.49.45q-.328.033-.633.124l-2.248.252a4.438 4.438 0 0 0 1.822 7.25l11.924 3.972 22.706-13.123a3.31 3.31 0 0 1 4.413 1.024v.002a3.307 3.307 0 0 1-.79 4.5L37.135 63.032H0v1h37.464l24.403-17.948a4.307 4.307 0 0 0 1.029-5.86 4.31 4.31 0 0 0-5.747-1.335L34.835 51.787 23.339 47.96a3.43 3.43 0 0 1-2.349-3.256 3.44 3.44 0 0 1 2.457-3.299l5.123-.574a9.335 9.335 0 0 0 8.41-9.297v-.5z'
          clipRule='evenodd'
        />
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M52 11.224 31.5.974 11 11.224v16.809h1V12.342l19 9.5v6.19h1v-6.19l19-9.5v21.882l-19 9.5v-4.271h-1v4.269l-6.735-3.386-.45.893 7.684 3.863L52 34.842zm-1.618.309L31.5 2.092l-18.882 9.44L31.5 20.975z'
          clipRule='evenodd'
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

SvgHandDeliveryWhite64.displayName = 'SvgHandDeliveryWhite64'
export default SvgHandDeliveryWhite64
