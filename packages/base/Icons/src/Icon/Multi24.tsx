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
const SvgMulti24 = forwardRef(function SvgMulti24(
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
      <path d='m6 11 5.196 3v6L6 23 .804 20v-6L6 11Zm12 0 5.196 3v6L18 23l-5.196-3v-6L18 11ZM6 12.155l-4.197 2.422v4.845L6 21.844l4.196-2.422v-4.845L6 12.155Zm12 0-4.197 2.422v4.845L18 21.844l4.196-2.422v-4.845L18 12.155ZM12 0l5.196 3v6L12 12 6.804 9V3L12 0Zm0 1.155L7.803 3.577v4.845L12 10.844l4.196-2.422V3.577L12 1.155Z' />
    </svg>
  )
})

SvgMulti24.displayName = 'SvgMulti24'
export default SvgMulti24
