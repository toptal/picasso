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
const SvgMention24 = forwardRef(function SvgMention24(
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
        d='M11.069 1.039c-2.247.219-4.201 1.002-5.968 2.393-.461.363-1.495 1.431-1.87 1.931C2.075 6.906 1.379 8.59 1.093 10.54c-.098.672-.098 2.248 0 2.92.286 1.949.981 3.631 2.137 5.177.455.607 1.526 1.678 2.133 2.133 1.546 1.156 3.228 1.851 5.177 2.137.356.052.733.07 1.46.07 1.075 0 1.533-.048 2.45-.257.527-.12 1.577-.452 1.689-.534.056-.042.043-.095-.121-.489l-.184-.443-.627.211a9.974 9.974 0 0 1-6.935-.187c-2.93-1.162-5.216-3.786-5.969-6.849-.216-.881-.277-1.41-.277-2.429s.061-1.548.277-2.429C3.189 5.964 6.142 3.069 9.76 2.26c.856-.192 1.284-.236 2.26-.235.996.002 1.54.065 2.409.278 3.607.886 6.502 3.839 7.311 7.457.228 1.019.239 1.173.24 3.48 0 1.989-.005 2.156-.075 2.36-.235.688-.815 1.214-1.497 1.356-.973.203-1.942-.346-2.299-1.302-.084-.226-.088-.304-.111-2.334-.022-1.957-.03-2.127-.111-2.494-.426-1.93-1.59-3.409-3.342-4.249-.822-.394-1.549-.551-2.545-.553-.989-.001-1.719.157-2.545.553-1.754.841-2.915 2.317-3.344 4.253-.125.565-.125 1.775 0 2.34.419 1.889 1.554 3.366 3.236 4.206a5.916 5.916 0 0 0 2.397.612 5.985 5.985 0 0 0 4.973-2.289c.139-.175.266-.324.282-.33.017-.007.041.069.054.167.035.255.207.726.358.981.181.306.671.812.97 1a2.993 2.993 0 0 0 4.562-1.958c.055-.273.061-.606.047-2.467-.016-1.947-.025-2.203-.102-2.684-.267-1.673-.81-3.091-1.705-4.448a9.613 9.613 0 0 0-1.302-1.615c-1.708-1.761-3.85-2.857-6.301-3.224-.634-.095-1.939-.137-2.511-.082m1.532 6.003a5.2 5.2 0 0 1 2.223.839c.174.116.489.384.7.595 2.163 2.164 1.901 5.699-.56 7.546-.559.419-1.333.758-2.064.903-.368.073-1.432.073-1.8 0-.675-.134-1.422-.447-1.945-.814a5.084 5.084 0 0 1-1.638-1.931 4.974 4.974 0 0 1-.337-3.5c.129-.484.503-1.247.814-1.664a5.027 5.027 0 0 1 4.607-1.974'
      />
    </svg>
  )
})

SvgMention24.displayName = 'SvgMention24'
export default SvgMention24
