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
const SvgBookmarkStarEmpty16 = forwardRef(function SvgBookmarkStarEmpty16(
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
        d='M2 8v8l3-2 3-2 3 2 3 2V0H2v8m10.987-.44c0 3.601-.007 6.547-.016 6.547-.008 0-1.13-.746-2.493-1.658L8 10.791l-2.478 1.658a275.607 275.607 0 0 1-2.493 1.658c-.009 0-.016-2.946-.016-6.547V1.013h9.974V7.56M7.551 3.903l-.436.887-.697.1c-1.066.152-1.247.182-1.239.203.004.01.314.317.688.683.374.365.683.683.688.706.004.024-.066.466-.155.983-.09.518-.159.944-.155.948.005.004.392-.195.862-.442.469-.247.871-.45.893-.45.022 0 .424.203.893.45.47.247.857.447.861.443.005-.004-.065-.431-.154-.948a19.084 19.084 0 0 1-.155-.984c.005-.023.314-.341.688-.706.374-.366.684-.673.688-.683.008-.021-.173-.051-1.238-.203l-.698-.1-.436-.887A20.498 20.498 0 0 0 8 3.016c-.007-.001-.209.399-.449.887'
      />
    </svg>
  )
})

SvgBookmarkStarEmpty16.displayName = 'SvgBookmarkStarEmpty16'
export default SvgBookmarkStarEmpty16
