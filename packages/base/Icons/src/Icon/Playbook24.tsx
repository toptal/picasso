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
const SvgPlaybook24 = forwardRef(function SvgPlaybook24(
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
      <path d='M23.44 18.64 15 11.41V17h-.36c-1.04 0-1.97.42-2.64 1.1V5.5C12 4.12 13.18 3 14.64 3h7.34v12h1V2h-8.34c-1.33 0-2.5.7-3.14 1.73A3.673 3.673 0 0 0 8.36 2H.02v16h8.34C9.81 18 11 19.12 11 20.5h1c0-1.38 1.18-2.5 2.64-2.5H15v4.26l3.72-1.59 1.22 2.74.91-.41-1.21-2.73 3.8-1.63ZM11 18.1c-.66-.67-1.6-1.1-2.64-1.1H1.02V3h7.34C9.81 3 11 4.12 11 5.5v12.6Zm5 2.64v-7.15l5.56 4.77L16 20.74Z' />
    </svg>
  )
})

SvgPlaybook24.displayName = 'SvgPlaybook24'
export default SvgPlaybook24
