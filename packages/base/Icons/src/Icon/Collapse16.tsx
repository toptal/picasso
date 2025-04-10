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
const SvgCollapse16 = forwardRef(function SvgCollapse16(
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
        d='m1.5 1.5-.353.353L3.22 3.927 5.293 6H2v.987h4.987V2H6v3.293L3.927 3.22 1.853 1.147 1.5 1.5m10.573 1.72L10 5.293V2h-.987v4.987H14V6h-3.293l2.073-2.074 2.074-2.073L14.5 1.5l-.354-.353-2.073 2.073M2 9.507V10h3.293L3.22 12.073l-2.073 2.074.353.353.353.353 2.074-2.073L6 10.707V14h.987V9.013H2v.494m7.013 2V14H10v-3.293l2.073 2.073 2.074 2.073.353-.353.353-.353-2.073-2.074L10.707 10H14v-.987H9.013v2.494'
      />
    </svg>
  )
})

SvgCollapse16.displayName = 'SvgCollapse16'
export default SvgCollapse16
