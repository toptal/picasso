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
const SvgCake16 = forwardRef(function SvgCake16(
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
        d='M4 3.013v2H0v10h16v-10h-4v-4h-1.013v4H5.013v-4H4v2m10.987 3.915v.929l-.3.249c-.742.618-1.341.882-2.007.885-.691.003-1.283-.254-2.04-.887a3.705 3.705 0 0 0-.303-.239c-.012-.003-.144.097-.293.222-.762.637-1.361.902-2.044.904-.677.002-1.319-.284-2.067-.919-.224-.191-.273-.222-.306-.193l-.304.254c-1.401 1.168-2.633 1.151-4.05-.056l-.26-.222V6h13.974v.928M5.885 9.29c.448.309.97.537 1.476.646.281.061.936.068 1.212.014a4.27 4.27 0 0 0 1.492-.627l.265-.176.288.188c1.354.883 2.776.88 4.109-.008l.26-.173V14H1.013v-2.413c0-1.328.006-2.414.013-2.414.007 0 .132.079.279.175.992.65 2.042.812 3.082.475.308-.1.765-.327 1.026-.511.125-.088.235-.161.245-.163.01-.001.112.062.227.141'
      />
    </svg>
  )
})

SvgCake16.displayName = 'SvgCake16'
export default SvgCake16
