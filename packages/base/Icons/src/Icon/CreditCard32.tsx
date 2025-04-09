import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 32

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgCreditCard32 = forwardRef(function SvgCreditCard32(
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
      viewBox='0 0 32 32'
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
      <path d='M31 10V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v3h30Zm0 1H1v14a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1V11ZM2 5h28a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 11h10v1H4v-1Zm0 4h5v1H4v-1Zm19-4h5v1h-5v-1Z' />
    </svg>
  )
})

SvgCreditCard32.displayName = 'SvgCreditCard32'
export default SvgCreditCard32
