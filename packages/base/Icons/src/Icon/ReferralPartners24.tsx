import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgReferralPartners24 = forwardRef(function SvgReferralPartners24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={twMerge(
        'fill-current inline-block text-inherit h-[1em] align-[-.125em]',
        classes?.root,
        className,
        getColorClass(color)
      )}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M20.1 18.39c1.13-.71 1.9-1.96 1.9-3.39 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 1.43.76 2.68 1.9 3.39-2.27.85-3.9 3.04-3.9 5.61h1c0-2.76 2.24-5 5-5s5 2.24 5 5h1c0-2.57-1.62-4.76-3.9-5.61ZM15 15c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3ZM8.1 7.39C9.23 6.68 10 5.43 10 4c0-2.21-1.79-4-4-4S2 1.79 2 4c0 1.43.76 2.68 1.9 3.39C1.63 8.24 0 10.43 0 13h1c0-2.76 2.24-5 5-5s5 2.24 5 5h1c0-2.57-1.62-4.76-3.9-5.61ZM3 4c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3Zm1 13H3v4h7v-1H4v-3zM20 7h1V3h-8v1h7v3z' />
    </svg>
  )
})

SvgReferralPartners24.displayName = 'SvgReferralPartners24'
export default SvgReferralPartners24
