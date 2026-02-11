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
const SvgCake24 = forwardRef(function SvgCake24(
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
        d='M7 4.5V7H1v15h22V7h-6V2h-1v5H8V2H7v2.5m15 5.457v1.957l-.23.139a7.185 7.185 0 0 1-2.13.854c-.523.111-1.491.101-2.04-.021-.668-.148-1.321-.412-2.007-.811l-.267-.155-.313.186a6.834 6.834 0 0 1-2.05.803c-.48.097-1.499.094-1.962-.005a7.09 7.09 0 0 1-2.016-.799l-.315-.187-.305.179a7.044 7.044 0 0 1-2.055.811c-.461.099-1.481.099-1.95-.001a7.185 7.185 0 0 1-2.13-.854L2 11.914V8h20v1.957M3.3 13.652c.73.251 1.219.328 2.06.325.609-.002.815-.018 1.16-.092a7.815 7.815 0 0 0 1.705-.583l.461-.219.207.115c.259.145.788.363 1.207.498 1.581.508 3.254.363 4.831-.416l.392-.194.448.215a7.824 7.824 0 0 0 1.709.584c.607.13 1.753.13 2.36 0a7.85 7.85 0 0 0 1.71-.584l.45-.216V21H2v-7.915l.45.215c.248.118.63.276.85.352'
      />
    </svg>
  )
})

SvgCake24.displayName = 'SvgCake24'
export default SvgCake24
