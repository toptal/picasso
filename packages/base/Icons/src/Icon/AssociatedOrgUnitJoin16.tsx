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
const SvgAssociatedOrgUnitJoin16 = forwardRef(
  function SvgAssociatedOrgUnitJoin16(props: Props, ref: Ref<SVGSVGElement>) {
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
        <path d='M8.5 1a7.5 7.5 0 1 1-4.36 13.604l.583-.814a6.5 6.5 0 1 0-.001-10.58l-.581-.814A7.466 7.466 0 0 1 8.5 1Zm-2 3.793L10.207 8.5 6.5 12.207l-.707-.707L8.292 9H0V8h8.292l-2.5-2.5.708-.707Z' />
      </svg>
    )
  }
)

SvgAssociatedOrgUnitJoin16.displayName = 'SvgAssociatedOrgUnitJoin16'
export default SvgAssociatedOrgUnitJoin16
