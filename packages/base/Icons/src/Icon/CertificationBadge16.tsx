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
const SvgCertificationBadge16 = forwardRef(function SvgCertificationBadge16(
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
      <path d='m10.946.454 1.373 2.056 2.068 1.375.28.186-.067.33-.49 2.43.49 2.432.066.329-.279.185-1.863 1.238 1.66 2.909.427.747h-2.938l-1.125.884-.456.358-.287-.505-1.35-2.375L8 12.941l-.458.092-1.348 2.375-.286.505-.457-.358-1.124-.884H1.388l.427-.747 1.66-2.91-1.862-1.237-.28-.185.067-.33.49-2.431-.49-2.43-.067-.33.28-.186L3.68 2.51 5.054.454 5.24.176l.327.065L8 .723 10.433.24l.327-.065.186.278Zm0 12.765-.186.279-.329-.066-.677-.137.633 1.114.804-.63.136-.108h1.562l-1.037-1.816-.905 1.364Zm-7.835.452h1.561l.136.107.803.63.632-1.113-.674.137-.33.066-.185-.28-.908-1.364-1.035 1.817ZM8.097 1.72 8 1.742l-.097-.02L5.7 1.287 4.456 3.15l-.056.083-.083.056-1.871 1.243.444 2.201.02.1-.02.099-.444 2.2 1.87 1.244.085.056.056.084 1.243 1.87 2.2-.444.1-.02.1.02 2.2.443 1.243-1.87.056-.083.084-.056 1.87-1.244-.443-2.2-.02-.1.02-.099.443-2.2-1.87-1.244-.083-.056-.056-.083L10.3 1.286l-2.202.436Z' />
    </svg>
  )
})

SvgCertificationBadge16.displayName = 'SvgCertificationBadge16'
export default SvgCertificationBadge16
