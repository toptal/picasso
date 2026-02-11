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
const SvgAvailabilityUnavailable24 = forwardRef(
  function SvgAvailabilityUnavailable24(props: Props, ref: Ref<SVGSVGElement>) {
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
          d='M11.069 1.039c-2.247.219-4.201 1.002-5.968 2.393-.461.363-1.495 1.431-1.87 1.931C2.075 6.906 1.379 8.59 1.093 10.54c-.098.672-.098 2.248 0 2.92.286 1.949.981 3.631 2.137 5.177.455.607 1.526 1.678 2.133 2.133 1.546 1.156 3.228 1.851 5.177 2.137.672.098 2.248.098 2.92 0 1.949-.286 3.631-.981 5.177-2.137.607-.455 1.678-1.526 2.133-2.133 1.156-1.546 1.851-3.228 2.137-5.177.052-.356.07-.733.07-1.46s-.018-1.104-.07-1.46c-.286-1.95-.982-3.634-2.138-5.177-.375-.5-1.409-1.568-1.87-1.931-1.597-1.257-3.351-2.02-5.319-2.312-.634-.094-1.942-.136-2.511-.081m1.771 1.002a9.885 9.885 0 0 1 4.72 1.66c.488.328 1.081.799 1.107.879.007.022-3.159 3.212-7.037 7.088l-7.05 7.047-.28-.34C1.438 14.896 1.236 9.95 3.806 6.28c2.049-2.926 5.515-4.552 9.034-4.239m6.871 3.602c1.022 1.207 1.814 2.895 2.106 4.491.803 4.375-1.291 8.699-5.194 10.729-3.198 1.664-7.044 1.485-10.043-.466-.473-.308-1.019-.722-1.178-.894l-.099-.106 7.039-7.039c3.871-3.871 7.056-7.032 7.078-7.025.022.007.153.147.291.31'
        />
      </svg>
    )
  }
)

SvgAvailabilityUnavailable24.displayName = 'SvgAvailabilityUnavailable24'
export default SvgAvailabilityUnavailable24
