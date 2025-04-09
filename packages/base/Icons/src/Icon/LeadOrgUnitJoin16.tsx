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
const SvgLeadOrgUnitJoin16 = forwardRef(function SvgLeadOrgUnitJoin16(
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
      <path d='m8.5 1 6.495 3.75v7.5L8.5 16l-3.978-2.297.613-.802L8.5 14.844l5.495-3.172V5.327L8.5 2.155 5.134 4.098l-.612-.801L8.5 1Zm-2 3.793L10.207 8.5 6.5 12.207l-.707-.707L8.292 9H0V8h8.292l-2.5-2.5.708-.707Z' />
    </svg>
  )
})

SvgLeadOrgUnitJoin16.displayName = 'SvgLeadOrgUnitJoin16'
export default SvgLeadOrgUnitJoin16
