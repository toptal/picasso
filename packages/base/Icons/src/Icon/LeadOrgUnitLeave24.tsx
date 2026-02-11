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
const SvgLeadOrgUnitLeave24 = forwardRef(function SvgLeadOrgUnitLeave24(
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
        d='M6.02 3.873 1.06 6.741l-.009 5.76-.008 5.759 4.978 2.871L11 24.002l3.55-2.048c1.953-1.126 3.557-2.054 3.566-2.06.024-.019-.526-.814-.563-.814-.017 0-1.499.847-3.292 1.883L11 22.846l-4.47-2.58-4.47-2.581-.01-5.178-.01-5.178 4.48-2.586 4.481-2.586 3.257 1.882c1.792 1.034 3.273 1.881 3.29 1.88.018 0 .154-.175.302-.388.212-.305.259-.398.22-.434-.048-.044-7.063-4.1-7.081-4.094-.005.001-2.241 1.293-4.969 2.87M18.15 8.15l-.35.35 1.75 1.75L21.3 12H10v1h11.3l-1.751 1.751-1.75 1.75.351.349.351.349 2.349-2.349 2.35-2.35-2.35-2.35L18.5 7.8l-.35.35'
      />
    </svg>
  )
})

SvgLeadOrgUnitLeave24.displayName = 'SvgLeadOrgUnitLeave24'
export default SvgLeadOrgUnitLeave24
