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
const SvgSpecialGroupJoin24 = forwardRef(function SvgSpecialGroupJoin24(
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
        d='m10.995 4.031-.981 1.992.224.672.225.673.757-1.524c.416-.838.768-1.524.781-1.524.014 0 .598 1.161 1.299 2.58s1.285 2.579 1.298 2.579c.107-.007 5.681.824 5.673.846-.006.015-.875.868-1.931 1.895a1997.05 1997.05 0 0 0-2.053 1.998l-.134.13.486 2.831c.267 1.557.477 2.839.466 2.849-.01.011-1.151-.577-2.536-1.304-1.384-.728-2.54-1.324-2.567-1.324-.028 0-.525.248-1.105.55l-1.054.55-.221.657c-.121.362-.213.665-.203.675.009.009.586-.282 1.282-.647A35.568 35.568 0 0 1 12 18.52c.018 0 1.476.758 3.239 1.685 1.762.926 3.21 1.678 3.216 1.67.005-.008-.255-1.554-.579-3.435-.324-1.881-.6-3.494-.614-3.584l-.025-.164 2.604-2.536 2.604-2.536-.133-.03c-.072-.017-1.686-.255-3.586-.53s-3.466-.508-3.48-.517c-.014-.008-.745-1.475-1.624-3.259C12.743 3.5 12.013 2.04 12 2.04c-.013 0-.466.896-1.005 1.991M9.15 8.15l-.35.35 1.75 1.75L12.3 12H1v1h11.3l-1.751 1.751-1.75 1.75.351.349.351.349 2.349-2.349 2.35-2.35-2.35-2.35L9.5 7.8l-.35.35'
      />
    </svg>
  )
})

SvgSpecialGroupJoin24.displayName = 'SvgSpecialGroupJoin24'
export default SvgSpecialGroupJoin24
