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
const SvgFolderMisc16 = forwardRef(function SvgFolderMisc16(
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
        d='M1.096 1.055a1.461 1.461 0 0 0-.656.398c-.219.22-.315.386-.387.669C.001 2.324 0 2.435 0 7.507c0 5.078.001 5.182.053 5.385.07.275.185.47.403.686.193.191.446.332.717.399.122.03 1.211.036 6.347.036 5.785 0 6.211-.003 6.366-.046a1.548 1.548 0 0 0 1.088-1.088c.033-.124.039-.763.039-4.368 0-4.655.011-4.36-.165-4.709a1.758 1.758 0 0 0-.628-.625c-.34-.172-.147-.164-3.754-.164-3.588 0-3.468.005-3.619-.152a.584.584 0 0 1-.154-.375c0-.196-.057-.42-.165-.646a1.49 1.49 0 0 0-.942-.786c-.228-.059-4.269-.058-4.49.001m4.284.986c.203.085.284.222.311.524.034.388.162.691.402.95.174.188.349.306.596.402l.178.07 3.4.013c3.145.012 3.406.017 3.483.059a.567.567 0 0 1 .243.283c.026.093.026 8.236 0 8.329a.538.538 0 0 1-.272.292c-.103.047-.347.049-6.214.049-5.908 0-6.111-.001-6.217-.05a.581.581 0 0 1-.186-.15l-.077-.101V2.303l.077-.101a.571.571 0 0 1 .186-.151c.104-.047.213-.05 2.051-.05 1.687-.001 1.954.004 2.039.04m1.607 4.592v.633L6.54 6.82l-.447-.447-.36.36-.359.36.453.454.452.453H4.985l.008.5L5 9l.639.007.639.007-.452.453-.452.453.353.353.353.353.453-.452.453-.452.007.639L7 11l.5.007.5.008V9.721l.453.452.454.453.36-.359.36-.36-.447-.447-.446-.447H10V8H8.707l.46-.46.46-.46-.354-.353-.353-.354-.46.46-.46.46V6H6.987v.633'
      />
    </svg>
  )
})

SvgFolderMisc16.displayName = 'SvgFolderMisc16'
export default SvgFolderMisc16
