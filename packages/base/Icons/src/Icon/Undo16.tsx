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
const SvgUndo16 = forwardRef(function SvgUndo16(
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
        d='M7.56 1.521a6.506 6.506 0 0 0-3.504 1.314c-.334.25-.979.895-1.226 1.227a6.6 6.6 0 0 0-1.262 2.986 7.686 7.686 0 0 0-.012 1.819 6.62 6.62 0 0 0 1.274 3.071c.251.337.895.981 1.232 1.232a6.622 6.622 0 0 0 3.071 1.274c.222.032.488.046.867.046 1.037 0 1.93-.204 2.84-.649a5.956 5.956 0 0 0 1.747-1.254 5.956 5.956 0 0 0 1.254-1.747 6.453 6.453 0 0 0 0-5.68 6.175 6.175 0 0 0-.966-1.457l-.185-.21H14.507v-.986h-4v4h.986l.007-1.378.007-1.377.286.273c.87.831 1.427 1.887 1.638 3.108.065.375.065 1.359 0 1.734a5.552 5.552 0 0 1-1.656 3.127A5.419 5.419 0 0 1 8 13.492a5.41 5.41 0 0 1-3.801-1.524c-.862-.823-1.421-1.888-1.63-3.101-.066-.382-.067-1.334-.001-1.723a5.488 5.488 0 0 1 5.119-4.628L8 2.498V1.493l-.06.004-.38.024'
      />
    </svg>
  )
})

SvgUndo16.displayName = 'SvgUndo16'
export default SvgUndo16
