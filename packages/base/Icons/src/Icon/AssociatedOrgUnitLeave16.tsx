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
const SvgAssociatedOrgUnitLeave16 = forwardRef(
  function SvgAssociatedOrgUnitLeave16(props: Props, ref: Ref<SVGSVGElement>) {
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
          d='M6.733 1.042a7.467 7.467 0 0 0-4.426 2.056A7.435 7.435 0 0 0 .009 8.747a7.472 7.472 0 0 0 2.76 5.568c1.048.855 2.276 1.395 3.658 1.609.555.086 1.601.086 2.146.001a7.608 7.608 0 0 0 3.048-1.158l.247-.16-.062-.084a31.743 31.743 0 0 1-.294-.407l-.231-.324-.234.154a6.554 6.554 0 0 1-2.716 1.002c-.43.058-1.23.058-1.651 0a6.58 6.58 0 0 1-3.265-1.396 6.544 6.544 0 0 1-2.376-4.388c-.041-.402-.019-1.294.041-1.671a6.53 6.53 0 0 1 1.94-3.695c.771-.736 1.796-1.315 2.782-1.571a6.606 6.606 0 0 1 3.813.13c.536.187.873.35 1.393.676.152.095.279.168.283.163.159-.213.549-.777.549-.794 0-.03-.419-.301-.738-.477a7.416 7.416 0 0 0-2.743-.871c-.37-.044-1.254-.05-1.626-.012m4.4 4.105-.346.347 1.253 1.253L13.293 8H4.985l.008.5L5 9l4.133.007 4.133.007-1.239 1.239-1.24 1.24.36.36.36.36 1.853-1.853 1.853-1.853-1.853-1.854A173.629 173.629 0 0 0 11.493 4.8a6.68 6.68 0 0 0-.36.347'
        />
      </svg>
    )
  }
)

SvgAssociatedOrgUnitLeave16.displayName = 'SvgAssociatedOrgUnitLeave16'
export default SvgAssociatedOrgUnitLeave16
