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
const SvgAvgWeeklyHours24 = forwardRef(function SvgAvgWeeklyHours24(
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
        d='M11 1.5V3H3.212L1.606 5.677C.025 8.311 0 8.357 0 8.567c.001.467.141 1.033.371 1.493.438.877 1.198 1.508 2.177 1.807.315.095.415.107.952.107.537 0 .637-.012.952-.107 1.451-.443 2.439-1.662 2.535-3.131l.024-.364L5.72 6.216A1097.17 1097.17 0 0 1 4.412 4.03C4.403 4.014 5.881 4 7.698 4H11v7.029l-.291.026c-.59.054-1.374.283-2.013.587-1.304.622-2.47 1.792-3.07 3.079a7.676 7.676 0 0 0-.532 1.659c-.111.597-.101 1.767.02 2.34.287 1.363.851 2.414 1.803 3.361.276.275.635.59.797.7l.295.199-2.005.01L4 23.001V24h15v-.999l-2.004-.011-2.005-.01.295-.199c.162-.11.521-.425.797-.7.95-.945 1.514-1.996 1.803-3.361.119-.561.13-1.786.022-2.34a8.203 8.203 0 0 0-.534-1.658c-.558-1.196-1.62-2.309-2.814-2.952-.646-.348-1.619-.656-2.256-.714L12 11.029V4h3.302c1.817 0 3.295.013 3.286.03l-1.302 2.176C16.026 8.31 16 8.357 16 8.566c.001.468.141 1.033.371 1.494.438.877 1.198 1.508 2.177 1.807.315.095.415.107.952.107.537 0 .637-.012.952-.107 1.451-.443 2.439-1.662 2.535-3.131l.024-.364L21.4 5.686 19.788 3H12V0h-1v1.5M4.556 6.24 5.6 7.98l-1.037.011a122.5 122.5 0 0 1-2.1 0L1.4 7.98l1.049-1.748a98.087 98.087 0 0 1 1.056-1.74c.004.004.477.791 1.051 1.748m16 0L21.6 7.98l-1.037.011a122.5 122.5 0 0 1-2.1 0L17.4 7.98l1.049-1.748a98.087 98.087 0 0 1 1.056-1.74c.004.004.477.791 1.051 1.748M5.894 9.21c-.244.83-.939 1.491-1.798 1.711-1.27.325-2.619-.448-2.99-1.711L1.044 9h4.912l-.062.21m16 0c-.244.83-.939 1.491-1.798 1.711-1.27.325-2.619-.448-2.99-1.711L17.044 9h4.912l-.062.21m-9.377 2.89a5.464 5.464 0 0 1 2.865 1.518c.795.796 1.3 1.753 1.523 2.887.097.492.098 1.507.001 1.99-.227 1.14-.73 2.092-1.524 2.886a5.538 5.538 0 0 1-2.842 1.523c-.505.105-1.575.105-2.08 0a5.538 5.538 0 0 1-2.842-1.523c-.794-.794-1.298-1.747-1.524-2.886-.097-.488-.097-1.502 0-1.99.226-1.139.73-2.092 1.524-2.887.901-.901 1.995-1.422 3.342-1.593.276-.035 1.226.011 1.557.075M11 15v2H9v1h3v-5h-1v2'
      />
    </svg>
  )
})

SvgAvgWeeklyHours24.displayName = 'SvgAvgWeeklyHours24'
export default SvgAvgWeeklyHours24
