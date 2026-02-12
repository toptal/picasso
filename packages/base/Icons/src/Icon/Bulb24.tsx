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
const SvgBulb24 = forwardRef(function SvgBulb24(
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
        d='M11.34.024C10.026.16 9.091.415 8.06.918a8.993 8.993 0 0 0-5.001 7.074c-.39 3.34 1.165 6.654 4.001 8.525.22.146.521.327.67.404l.27.139v5.34l.67.001.67.001.66.798.66.798h2.68L14 23.2l.66-.798.67-.001.67-.001v-5.34l.27-.139c.675-.349 1.472-.945 2.089-1.562A8.976 8.976 0 0 0 20.083 5.06 8.921 8.921 0 0 0 15.944.923 8.623 8.623 0 0 0 13.32.101c-.409-.062-1.658-.11-1.98-.077m1.4 1.017A7.98 7.98 0 0 1 19.182 5.5a7.974 7.974 0 0 1-1.646 9.261c-.644.62-1.21 1.017-2.046 1.435l-.49.245V17.52h-.42c-.231 0-.42-.013-.419-.03 0-.017.447-1.704.993-3.75l.993-3.72-2.074-.01c-1.14-.006-3.006-.006-4.146 0l-2.074.01.993 3.72c.546 2.046.993 3.733.993 3.75.001.017-.188.03-.419.03H9V16.441l-.49-.245c-.836-.418-1.402-.815-2.046-1.435-3.177-3.057-3.287-8.09-.247-11.272a7.966 7.966 0 0 1 6.523-2.448m2.1 9.975c0 .008-.387 1.466-.86 3.239a550.26 550.26 0 0 0-.86 3.244c0 .012-.504.021-1.12.021-.616 0-1.12-.009-1.12-.021 0-.011-.387-1.471-.86-3.244-.473-1.773-.86-3.231-.86-3.239 0-.009 1.278-.016 2.84-.016 1.562 0 2.84.007 2.84.016M15 19.96v1.44h-.799l-.667.8-.667.8h-1.734l-.667-.8-.667-.8H9v-2.88h6v1.44'
      />
    </svg>
  )
})

SvgBulb24.displayName = 'SvgBulb24'
export default SvgBulb24
