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
const SvgPresenterMode16 = forwardRef(function SvgPresenterMode16(
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
        d='M0 8.507v6.506h16V2H0v6.507m14.987 0V14H10v-.14c-.002-.452-.193-1.215-.399-1.593l-.051-.094 1.905-1.907L13.36 8.36 13 8l-.36-.36-1.838 1.838-1.838 1.838-.195-.191a3.592 3.592 0 0 0-.75-.569l-.234-.139.141-.121c1.007-.865 1.339-2.205.849-3.43a3.043 3.043 0 0 0-1.828-1.711c-.56-.191-1.335-.19-1.898.002A2.997 2.997 0 0 0 3.005 8a2.991 2.991 0 0 0 1.086 2.312l.131.109-.118.06c-.44.225-.984.698-1.331 1.159-.179.238-.501.866-.582 1.134a4.739 4.739 0 0 0-.181.958L1.992 14h-.979V3.013h13.974v5.494M6.504 6.065c.224.061.559.233.745.382C7.703 6.812 8 7.427 8 8c0 .78-.516 1.553-1.233 1.844A1.976 1.976 0 0 1 4.199 8.84c-.151-.321-.185-.476-.185-.84s.034-.519.185-.84a2.023 2.023 0 0 1 1.47-1.134c.178-.032.658-.01.835.039m.033 4.987c.392.069.801.237 1.156.476.223.15.602.526.757.75.332.482.537 1.079.537 1.565V14H3.013v-.157c0-.086.018-.257.039-.38.21-1.195 1.202-2.193 2.397-2.41a4.17 4.17 0 0 1 1.088-.001'
      />
    </svg>
  )
})

SvgPresenterMode16.displayName = 'SvgPresenterMode16'
export default SvgPresenterMode16
