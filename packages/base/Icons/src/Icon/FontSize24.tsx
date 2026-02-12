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
const SvgFontSize24 = forwardRef(function SvgFontSize24(
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
        d='M6.531 3.09c-.022.028-1.196 3.902-2.61 8.61l-2.682 8.931-.112.371.526-.011.525-.011.744-2.48.744-2.48 3.502-.01L10.67 16l.494 1.51.818 2.49.323.98.532.011c.473.01.53.004.508-.052-.018-.048-3.803-11.588-5.65-17.229l-.22-.67h-.452c-.315 0-.465.015-.492.05m2.127 6.77c.894 2.728 1.636 5.001 1.648 5.05l.023.09H3.991l.018-.09c.026-.13 3.005-10.03 3.015-10.019.004.005.739 2.241 1.634 4.969m9.862-1.835c-.761.098-1.623.495-2.217 1.02-.212.188-.628.691-.723.876l-.059.113.423.243c.233.134.429.243.434.243.006 0 .074-.095.151-.211.373-.563 1.048-1.037 1.722-1.212 1.387-.359 2.83.327 3.453 1.643.264.559.296.806.296 2.309v1.28l-.243-.225a4.36 4.36 0 0 0-1.819-.99c-.479-.119-1.328-.128-1.798-.02a4.046 4.046 0 0 0-3.008 2.889c-.098.354-.11.464-.11 1.017 0 .553.012.663.11 1.017.569 2.054 2.588 3.319 4.633 2.902a3.974 3.974 0 0 0 2.045-1.074l.19-.182V21h1.002l-.011-4.81-.011-4.81-.107-.388c-.273-.987-.859-1.795-1.693-2.332-.664-.427-1.258-.613-2.04-.638a6.435 6.435 0 0 0-.62.003m.952 6.017c.975.158 1.8.786 2.232 1.698a2.89 2.89 0 0 1 .012 2.498c-.863 1.844-3.18 2.342-4.696 1.008-.407-.359-.814-1.033-.945-1.566-.071-.287-.07-1.078.001-1.36a3.085 3.085 0 0 1 1.786-2.088c.209-.089.341-.125.758-.207.162-.032.607-.023.852.017'
      />
    </svg>
  )
})

SvgFontSize24.displayName = 'SvgFontSize24'
export default SvgFontSize24
