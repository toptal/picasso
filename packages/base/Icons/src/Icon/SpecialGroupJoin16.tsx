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
const SvgSpecialGroupJoin16 = forwardRef(function SvgSpecialGroupJoin16(
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
        d='m7.192 2.135-.791 1.601.217.579.24.643c.021.056.095-.078.575-1.047C7.736 3.3 7.991 2.8 8 2.8c.01 0 .394.762.854 1.693.46.932.846 1.694.858 1.694.047 0 3.714.537 3.722.545.005.005-.603.605-1.35 1.334-.928.905-1.355 1.339-1.348 1.369.046.201.624 3.667.614 3.678-.008.007-.758-.378-1.667-.856A67.01 67.01 0 0 0 8 11.387c-.025 0-1.541.786-1.569.813-.022.022-.53 1.402-.513 1.395.011-.005.484-.252 1.051-.551l1.032-.542 2.337 1.229c1.286.676 2.343 1.224 2.349 1.218.006-.006-.19-1.184-.436-2.617l-.446-2.605.311-.297c.171-.163 1.025-.993 1.897-1.843 1.495-1.459 1.581-1.548 1.513-1.565-.04-.009-1.213-.182-2.606-.383-1.393-.201-2.547-.379-2.564-.396-.017-.016-.55-1.083-1.184-2.37C8.537 1.586 8.01.533 8 .533c-.009 0-.373.721-.808 1.602M5.133 5.147l-.346.347L6.04 6.747 7.293 8H0v1.013h7.266l-1.239 1.24-1.24 1.24.36.36.36.36L7.36 10.36l1.853-1.853L7.36 6.653A173.629 173.629 0 0 0 5.493 4.8a6.68 6.68 0 0 0-.36.347'
      />
    </svg>
  )
})

SvgSpecialGroupJoin16.displayName = 'SvgSpecialGroupJoin16'
export default SvgSpecialGroupJoin16
