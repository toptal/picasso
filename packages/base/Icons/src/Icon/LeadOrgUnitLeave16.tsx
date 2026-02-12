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
const SvgLeadOrgUnitLeave16 = forwardRef(function SvgLeadOrgUnitLeave16(
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
      <path
        fillRule='evenodd'
        d='M3.233 2.885 0 4.754l.001 3.75v3.749l3.25 1.874L6.5 16.001l1.877-1.084 1.989-1.149.113-.066-.297-.391a86.945 86.945 0 0 1-.305-.401c-.005-.005-.759.424-1.676.953-.918.53-1.683.964-1.701.964-.019 0-1.257-.707-2.753-1.571l-2.72-1.57-.007-3.183-.006-3.183 2.312-1.333L6.07 2.405l.432-.248 1.649.953c.907.524 1.669.954 1.693.955.027.001.162-.152.34-.383l.295-.385-.193-.11-1.961-1.131a76.226 76.226 0 0 0-1.813-1.031c-.025-.006-1.5.831-3.279 1.86m7.9 2.262-.346.347 1.253 1.253L13.293 8H4.985l.008.5L5 9l4.133.007 4.133.007-1.239 1.239-1.24 1.24.36.36.36.36 1.853-1.853 1.853-1.853-1.853-1.854A173.629 173.629 0 0 0 11.493 4.8a6.68 6.68 0 0 0-.36.347'
      />
    </svg>
  )
})

SvgLeadOrgUnitLeave16.displayName = 'SvgLeadOrgUnitLeave16'
export default SvgLeadOrgUnitLeave16
