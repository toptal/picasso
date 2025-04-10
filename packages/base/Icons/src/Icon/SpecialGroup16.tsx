import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { getColorClass } from './styles'

const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
  classes?: {
    root?: string
  }
}
const SvgSpecialGroup16 = forwardRef(function SvgSpecialGroup16(
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
      viewBox='0 0 16 16'
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
      <path d='M12 0a3 3 0 0 1 1.777 5.418A3.994 3.994 0 0 1 15.995 8.8L16 9h-1a3 3 0 0 0-5.995-.176L9 9h-.013l.482.977 2.284.332a.5.5 0 0 1 .277.853l-1.652 1.61.39 2.275a.5.5 0 0 1-.726.527L8 14.5l-2.042 1.074a.5.5 0 0 1-.726-.527l.39-2.274-1.652-1.61a.5.5 0 0 1 .277-.854l2.284-.332L7.012 9H7a3 3 0 0 0-5.995-.176L1 9H0a4 4 0 0 1 2.223-3.585 3 3 0 1 1 3.554.002 4.001 4.001 0 0 1 2.001 2.266.495.495 0 0 1 .443-.002 4.018 4.018 0 0 1 2.002-2.266A3 3 0 0 1 12 0ZM8 9.26l-.805 1.631-1.801.262 1.303 1.27-.309 1.794L8 13.37l1.611.847-.308-1.794 1.302-1.27-1.8-.262L8 9.26ZM4 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' />
    </svg>
  )
})

SvgSpecialGroup16.displayName = 'SvgSpecialGroup16'
export default SvgSpecialGroup16
