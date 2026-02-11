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
const SvgRecognize24 = forwardRef(function SvgRecognize24(
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
        d='M7.2.044C4.467.307 2.006 2.031.8 4.529a7.947 7.947 0 0 0 .003 6.951c.439.909 1.013 1.678 1.8 2.412l.377.352.02 4.874.02 4.874 2.49-1.494L8 21.004l2.49 1.494 2.49 1.494.02-4.874.02-4.874.377-.352c1.682-1.569 2.602-3.654 2.602-5.892A8.01 8.01 0 0 0 7.2.044m1.486.998a7.003 7.003 0 0 1 4.107 1.86c.989.915 1.765 2.29 2.048 3.627a7.267 7.267 0 0 1-.202 3.682 7.037 7.037 0 0 1-3.514 4.047 6.992 6.992 0 0 1-9.086-2.598 7.013 7.013 0 0 1 .377-7.873 6.996 6.996 0 0 1 6.27-2.745M20 15.5V17h-3v1h3v3h1v-3h3v-1h-3v-3h-1v1.5m-15.475-.302A8.055 8.055 0 0 0 8 15.999a8.055 8.055 0 0 0 3.475-.801c.272-.131.501-.238.51-.238.008 0 .015 1.637.015 3.638v3.638l-2-1.2-2-1.2-2 1.2-2 1.2v-3.638c0-2.001.007-3.638.015-3.638.009 0 .238.107.51.238'
      />
    </svg>
  )
})

SvgRecognize24.displayName = 'SvgRecognize24'
export default SvgRecognize24
