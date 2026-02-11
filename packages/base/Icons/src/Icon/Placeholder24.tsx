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
const SvgPlaceholder24 = forwardRef(function SvgPlaceholder24(
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
        d='M1 .5V1H0v4h1V1h4V0H1v.5m6 0V1h4V0H7v.5m6 0V1h4V0h-4v.5m6 0V1h4v4h1V1h-1V0h-4v.5M0 9v2h1V7H0v2m23 0v2h1V7h-1v2M7.786 7.924c-.665.097-1.387.402-1.881.794-.335.267-.449.408-.398.493.018.031.195.238.393.461l.36.404.2-.194a2.79 2.79 0 0 1 1.037-.629c.279-.091.393-.106.843-.108.458-.003.548.008.759.092.341.136.634.438.723.745.167.572-.102 1.293-.743 1.993-.412.449-1.939 1.73-3.151 2.642l-.368.278V16h5.8v-1.24H7.797l.511-.407c1.845-1.465 2.696-2.477 2.916-3.463.088-.398.059-1.003-.067-1.366-.395-1.142-1.833-1.825-3.371-1.6m7.719.406-1.639 2.526-1.426 2.195V14.2h3.8V16h1.4v-1.798l.53-.011.53-.011.011-.61.011-.61H17.64V8h-1.922l-.213.33m.721 4.617c-.007.008-.556.009-1.218.004l-1.204-.011 1.208-1.832 1.208-1.832.01 1.828a58.49 58.49 0 0 1-.004 1.843M0 15v2h1v-4H0v2m23 0v2h1v-4h-1v2M0 21v2h1v1h4v-1H1v-4H0v2m23 0v2h-4v1h4v-1h1v-4h-1v2M7 23.5v.5h4v-1H7v.5m6 0v.5h4v-1h-4v.5'
      />
    </svg>
  )
})

SvgPlaceholder24.displayName = 'SvgPlaceholder24'
export default SvgPlaceholder24
