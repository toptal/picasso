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
const SvgShield24 = forwardRef(function SvgShield24(
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
        d='m12.032.07-.101-.02-.102.02L2.4 2.01 2 2.092V11.7c0 4.953 3.082 9.427 7.825 11.43l1.92.81.064.027.069.01.062-.497-.062.496h.004l.005.001.017.002a1.134 1.134 0 0 0 .136.005.609.609 0 0 0 .168-.03l.018-.006.018-.007 1.92-.81c4.744-2.004 7.826-6.468 7.826-11.431V2.154l-.398-.083-9.56-2Zm1.743 22.14-1.78.75-1.78-.75C5.817 20.352 3 16.226 3 11.7V2.908l8.93-1.837 9.06 1.895V11.7c0 4.537-2.818 8.653-7.214 10.51Zm-2.921-7.357 6.5-6.5-.707-.707-6.147 6.147-3.116-3.117-.708.707 3.47 3.47.354.354.354-.354Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgShield24.displayName = 'SvgShield24'
export default SvgShield24
