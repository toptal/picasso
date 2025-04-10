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
const SvgAssociatedOrgUnitJoin24 = forwardRef(
  function SvgAssociatedOrgUnitJoin24(props: Props, ref: Ref<SVGSVGElement>) {
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
        <path d='M12.5 2C18.299 2 23 6.701 23 12.5S18.299 23 12.5 23c-2.43 0-4.667-.825-6.446-2.21l.614-.79a9.46 9.46 0 0 0 5.832 2 9.5 9.5 0 0 0 0-19 9.459 9.459 0 0 0-5.832 2l-.615-.789A10.455 10.455 0 0 1 12.5 2Zm-3 5.793 4.707 4.707L9.5 17.207l-.707-.707 3.5-3.5H1v-1h11.293l-3.5-3.5.707-.707Z' />
      </svg>
    )
  }
)

SvgAssociatedOrgUnitJoin24.displayName = 'SvgAssociatedOrgUnitJoin24'
export default SvgAssociatedOrgUnitJoin24
