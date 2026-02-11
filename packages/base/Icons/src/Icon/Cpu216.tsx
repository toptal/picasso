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
const SvgCpu216 = forwardRef(function SvgCpu216(
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
        d='M6.733 1.042A7.441 7.441 0 0 0 3.32 2.28 7.477 7.477 0 0 0 .009 8.143l-.017.365.504-.007L1 8.493l.017-.35c.147-2.967 2.349-5.482 5.276-6.025a6.467 6.467 0 0 1 5.719 1.72l.16.162H10.985l.008.5L11 5l1.5.007 1.5.007V2h-1.013v1.399l-.274-.268a7.033 7.033 0 0 0-1.883-1.343 7.335 7.335 0 0 0-2.59-.747 12.223 12.223 0 0 0-1.507.001M6 5.507V6H4.987v1.013H4V8h.987v1.013H4V10h.985l.008.5L5 11l.5.007.5.008V12h1.013v-.987H8V12h1.013v-.987H10V10h1.013v-.987H10V8h1.013v-.987H10V6h-.987v-.987H8V6h-.987v-.987H6v.494m2.987 3V10H6V7.013h2.987v1.494m4.992.42c-.069.933-.253 1.618-.659 2.449a6.488 6.488 0 0 1-4.131 3.4 6.486 6.486 0 0 1-6.188-1.6l-.159-.163H4V12H.986l.007 1.5L1 15l.5.007.5.008V13.59l.3.294a7.46 7.46 0 0 0 7.087 1.873 7.304 7.304 0 0 0 3.413-1.968c.655-.657 1.03-1.18 1.427-1.989.476-.969.722-1.94.768-3.033l.011-.26h-.996l-.031.42'
      />
    </svg>
  )
})

SvgCpu216.displayName = 'SvgCpu216'
export default SvgCpu216
