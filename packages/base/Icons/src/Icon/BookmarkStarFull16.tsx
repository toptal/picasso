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
const SvgBookmarkStarFull16 = forwardRef(function SvgBookmarkStarFull16(
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
        d='M2 8v8l3-2 3-2 3 2 3 2V0H2v8m6.451-4.085.437.875.961.139c.529.077.966.144.973.15.011.012-1.198 1.207-1.314 1.298-.038.03-.068.081-.068.115 0 .033.072.479.159.989.088.511.157.931.154.934-.004.003-.39-.197-.86-.444-.469-.247-.871-.45-.893-.45-.022 0-.424.203-.893.45-.47.247-.856.447-.86.444-.003-.003.066-.423.154-.934.087-.51.159-.956.159-.989 0-.034-.03-.085-.068-.115-.116-.091-1.325-1.286-1.314-1.298.007-.006.444-.073.973-.15l.961-.139.437-.875c.24-.481.443-.875.451-.875.008 0 .211.394.451.875'
      />
    </svg>
  )
})

SvgBookmarkStarFull16.displayName = 'SvgBookmarkStarFull16'
export default SvgBookmarkStarFull16
