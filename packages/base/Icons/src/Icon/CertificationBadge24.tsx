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
const SvgCertificationBadge24 = forwardRef(function SvgCertificationBadge24(
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
      <path d='m16.419.681 2.06 3.084 3.102 2.062.419.28-.1.494-.735 3.646.735 3.647.1.494-.42.278-2.794 1.856 2.49 4.364.64 1.12H17.51l-1.688 1.326-.683.538-.431-.758-2.025-3.562-.684-.138-.685.138-2.023 3.562-.43.758-.685-.538-1.686-1.326H2.082l.64-1.12 2.49-4.364-2.793-1.856L2 14.388l.1-.494.735-3.647L2.1 6.6 2 6.107l.42-.28 3.1-2.062L7.581.68 7.86.264l.49.098 3.65.722 3.65-.722.49-.098.279.417Zm.001 19.147-.28.419-.493-.1-1.015-.205.949 1.672 1.205-.947.214-.16h2.334l-1.556-2.725-1.358 2.046Zm-11.754.678H7.01l.203.162 1.204.944.948-1.67-1.01.205-.494.1-.279-.419-1.362-2.046-1.553 2.724Zm7.48-17.923L12 2.612l-.147-.03-3.303-.653-1.868 2.795-.083.125-.125.083L3.67 6.797l.666 3.302.031.148-.03.149-.667 3.3 2.806 1.867.126.083.084.126 1.865 2.805 3.301-.665.15-.03.148.03 3.3.664 1.866-2.804.084-.126.126-.084 2.805-1.866-.665-3.3-.03-.15.03-.147.665-3.302-2.805-1.865-.125-.083-.083-.125-1.868-2.795-3.303.654Z' />
    </svg>
  )
})

SvgCertificationBadge24.displayName = 'SvgCertificationBadge24'
export default SvgCertificationBadge24
