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
const SvgVideoOff24 = forwardRef(function SvgVideoOff24(
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
      <path d='m7.121 19 1-1H17V9.121l1-1v.45L24 6v12l-6-2.571V19H7.121ZM2.88 19H0V5h16.879l-1 1H1v12h2.879l-1 1ZM18 9.66v4.68l5 2.143V7.517l-5 2.142ZM2.5 22.206l-.707-.707L21.5 1.793l.707.707L2.5 22.207Z' />
    </svg>
  )
})

SvgVideoOff24.displayName = 'SvgVideoOff24'
export default SvgVideoOff24
