import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

const SIZE = 64

type ScaleType = 1 | 2
export interface Props extends StandardProps {
  scale?: ScaleType
  base?: number
}
const SvgDataBlue64 = forwardRef(function SvgDataBlue64(
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
          d='M11 56.375H.5V63.5H11v-7.125ZM28.5 56.375H18V63.5h10.5v-7.125ZM46 56.375H35.5V63.5H46v-7.125ZM63.5 56.375H53V63.5h10.5v-7.125Z'
          fill='#183A9E'
        />
        <path
          d='M29 63.5h-1V16.844l-9.5.012V63.5h-1V15.857l11.5-.014V63.5ZM46.5 63.5h-1V50.781H36V63.5h-1V49.781h11.5V63.5Z'
          fill='#204ECF'
        />
        <path
          d='M64 64H0V42.851h11.5V63h41V30.722H64V64Zm-10.5-1H63V31.722h-9.5V63ZM1 63h9.5V43.851H1V63Z'
          fill='#204ECF'
        />
        <path
          d='M23.25 39.506a19.753 19.753 0 1 1 19.753-19.753A19.776 19.776 0 0 1 23.25 39.506ZM23.25 1a18.753 18.753 0 1 0 18.753 18.753A18.774 18.774 0 0 0 23.25 1Z'
          fill='#204ECF'
        />
        <path
          d='M59.765 22.732H42.343v-1h16.422v-3.958H42.343v-1h17.422v5.958Z'
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

SvgDataBlue64.displayName = 'SvgDataBlue64'
export default SvgDataBlue64
