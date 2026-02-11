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
const SvgWorking24 = forwardRef(function SvgWorking24(
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
      fill='none'
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
      <path
        fillRule='evenodd'
        d='M3 1.5V2h2V7.191L7.15 9.58C8.332 10.894 9.3 11.983 9.3 12c0 .017-.968 1.106-2.15 2.42L5 16.809V22H3v1h18v-1h-2v-5.192l-2.15-2.387C15.668 13.109 14.7 12.019 14.7 12c0-.019.968-1.109 2.15-2.421L19 7.192V2h2V1H3v.5m15 2.903v2.402l-2.32 2.577c-1.276 1.417-2.32 2.595-2.32 2.618 0 .023 1.044 1.201 2.32 2.618L18 17.195V22H6l.002-2.41.002-2.41 2.318-2.569C9.597 13.198 10.64 12.023 10.64 12c0-.023-1.043-1.198-2.318-2.611L6.004 6.82l-.002-2.41L6 2h12v2.403'
      />
    </svg>
  )
})

SvgWorking24.displayName = 'SvgWorking24'
export default SvgWorking24
