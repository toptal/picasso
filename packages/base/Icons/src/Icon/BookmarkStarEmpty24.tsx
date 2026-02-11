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
const SvgBookmarkStarEmpty24 = forwardRef(function SvgBookmarkStarEmpty24(
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
        d='M3 12v12l4.5-3 4.5-3 4.5 3 4.5 3V0H3v12m17-.438c0 8.439-.01 10.557-.05 10.533-.028-.016-1.828-1.215-4-2.665L12 16.793 8.05 19.43c-2.173 1.45-3.973 2.649-4 2.666-.04.023-.05-2.095-.05-10.534V1h16v10.562m-8.749-6.051-.721 1.471-1.615.233a57.44 57.44 0 0 0-1.63.247c-.014.014 1.669 1.673 2.105 2.075.121.112.21.228.21.275 0 .045-.118.765-.262 1.601-.144.836-.256 1.541-.25 1.568.007.029.588-.255 1.444-.706A44.135 44.135 0 0 1 12 11.52c.019 0 .68.34 1.468.755.856.451 1.437.735 1.444.706.006-.027-.106-.732-.25-1.568a52.645 52.645 0 0 1-.262-1.601c0-.047.089-.163.21-.275.436-.402 2.119-2.061 2.105-2.075a57.44 57.44 0 0 0-1.63-.247l-1.616-.233-.721-1.471c-.397-.809-.733-1.471-.748-1.471-.015 0-.352.662-.749 1.471'
      />
    </svg>
  )
})

SvgBookmarkStarEmpty24.displayName = 'SvgBookmarkStarEmpty24'
export default SvgBookmarkStarEmpty24
