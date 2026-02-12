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
const SvgHoursThisMonth16 = forwardRef(function SvgHoursThisMonth16(
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
        d='M2.987 1.507V2H0v12h7.752l.191.251a4.632 4.632 0 0 0 1.645 1.324 4.51 4.51 0 0 0 3.348.185 4.487 4.487 0 0 0 3.056-4.427c-.081-2.083-1.532-3.794-3.601-4.245-.236-.052-.35-.06-.884-.06-.538 0-.648.008-.894.061-1.604.348-2.867 1.461-3.373 2.973a4.465 4.465 0 0 0-.063 2.683c.031.11.061.215.069.234.011.028-.561.034-3.11.034H1.013V6h13.972l.008.5L15 7l.5.007.5.008V2h-2.987v-.987H12V2H4v-.987H2.987v.494m0 2V4H4v-.987h8V4h1.013v-.987h1.974v2H1.013v-2h1.974v.494m9.28 4.583c.673.155 1.207.45 1.695.936.532.53.866 1.175.986 1.903.066.4.043 1.036-.051 1.408-.25.993-.93 1.84-1.844 2.296a3.492 3.492 0 0 1-4.119-.759 3.47 3.47 0 0 1-.857-1.663 4.13 4.13 0 0 1-.015-1.363 3.523 3.523 0 0 1 2.991-2.82 4.378 4.378 0 0 1 1.214.062m-1.28 1.923v1H10V12h2V9.013h-1.013v1'
      />
    </svg>
  )
})

SvgHoursThisMonth16.displayName = 'SvgHoursThisMonth16'
export default SvgHoursThisMonth16
