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
const SvgInTransit16 = forwardRef(function SvgInTransit16(
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
        d='M0 7.267v5.293h1.107c1.048 0 1.106.003 1.106.048 0 .082.207.481.337.649.561.73 1.61.958 2.432.53.252-.131.497-.333.659-.545.122-.159.286-.472.32-.609l.018-.073h4.677l.087.213a1.98 1.98 0 0 0 1.217 1.14c.193.066.25.073.6.073s.407-.007.6-.073c.283-.095.518-.236.738-.443a1.86 1.86 0 0 0 .479-.697l.087-.213H16V8.194l-1.03-1.95-1.03-1.951h-3.86v-2.32H0v5.294m9.067 0v4.28H5.982l-.034-.114c-.091-.303-.34-.666-.611-.889a2.218 2.218 0 0 0-.779-.395 2.68 2.68 0 0 0-.924-.002c-.61.143-1.14.607-1.371 1.2l-.072.186-.589.008-.589.007V2.987h8.054v4.28M5.8 5.333l-.346.347.546.547.546.546H2.32v1.014h4.226l-.54.54-.539.54.353.353.354.353L7.32 8.427 8.466 7.28 7.32 6.133a76.765 76.765 0 0 0-1.16-1.146c-.008 0-.17.156-.36.346m8.367 1.532.82 1.557v3.125h-.53l-.032-.1c-.14-.438-.541-.912-.951-1.123a1.834 1.834 0 0 0-.914-.217c-.352 0-.611.061-.914.217-.41.211-.811.685-.951 1.123l-.032.1h-.583v-6.24l1.633.001 1.634.001.82 1.556M4.49 11.182a.945.945 0 0 1 .545.813.845.845 0 0 1-.16.592c-.41.615-1.332.538-1.648-.137a.95.95 0 0 1 .1-.97c.117-.154.305-.29.483-.347.182-.058.495-.036.68.049m8.474.004c.197.098.377.283.467.478.062.137.074.199.075.39.001.203-.008.246-.086.403a1.007 1.007 0 0 1-.482.471c-.126.059-.189.071-.378.071s-.252-.012-.378-.071a1.007 1.007 0 0 1-.482-.471c-.078-.157-.087-.2-.086-.403a.872.872 0 0 1 .296-.695c.218-.206.393-.269.707-.254a.756.756 0 0 1 .347.081'
      />
    </svg>
  )
})

SvgInTransit16.displayName = 'SvgInTransit16'
export default SvgInTransit16
