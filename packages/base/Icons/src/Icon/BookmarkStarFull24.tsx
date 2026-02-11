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
const SvgBookmarkStarFull24 = forwardRef(function SvgBookmarkStarFull24(
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
        d='M3 12v12l4.5-3 4.5-3 4.5 3 4.5 3V0H3v12m9.743-6.489.721 1.47 1.618.234c.89.128 1.625.239 1.633.247.014.014-1.669 1.673-2.105 2.075-.144.133-.21.225-.21.292 0 .054.118.783.262 1.619.144.836.256 1.534.25 1.551-.007.017-.657-.309-1.444-.724A44.135 44.135 0 0 0 12 11.52c-.019 0-.68.34-1.468.755-.787.415-1.437.74-1.444.723-.007-.017.106-.717.25-1.555A47.89 47.89 0 0 0 9.6 9.825c0-.062-.072-.16-.21-.288-.436-.402-2.119-2.061-2.105-2.075.008-.008.743-.119 1.633-.247l1.618-.234.72-1.47c.397-.809.731-1.471.744-1.471.012 0 .346.662.743 1.471'
      />
    </svg>
  )
})

SvgBookmarkStarFull24.displayName = 'SvgBookmarkStarFull24'
export default SvgBookmarkStarFull24
