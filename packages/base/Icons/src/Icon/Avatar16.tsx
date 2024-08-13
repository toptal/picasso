import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgAvatar16 = forwardRef(function SvgAvatar16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const classNames = ['PicassoSvgAvatar16', classes.root]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (classes[colorClassName]) {
    classNames.push(classes[colorClassName])
  }
  if (className) {
    classNames.push(className)
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 16 16'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M7.52.015a32.85 32.85 0 0 1-.387.04c-1.505.15-3.011.786-4.232 1.788-.316.259-.95.91-1.192 1.224C.802 4.24.274 5.508.063 7.016c-.064.46-.064 1.508 0 1.968.221 1.578.803 2.924 1.78 4.115.258.314.909.949 1.224 1.193a8.173 8.173 0 0 0 3.493 1.571 7 7 0 0 0 1.44.122c.315 0 .705-.015.867-.035a8.152 8.152 0 0 0 4.08-1.669c.309-.239 1.095-1.025 1.334-1.334.337-.437.623-.893.865-1.383a7.905 7.905 0 0 0 .791-2.595c.057-.43.064-1.418.014-1.836a8.173 8.173 0 0 0-1.658-4.066c-.253-.328-1.035-1.109-1.36-1.359A8.056 8.056 0 0 0 8.977.065C8.667.026 7.715-.007 7.52.015m1.371 1.041c1.246.153 2.494.685 3.509 1.494.291.232.818.759 1.05 1.05a7.154 7.154 0 0 1 1.497 3.508c.059.43.059 1.354 0 1.784A7.16 7.16 0 0 1 13.45 12.4a8.825 8.825 0 0 1-1.05 1.05 7.16 7.16 0 0 1-3.508 1.497 9.013 9.013 0 0 1-1.784 0A7.154 7.154 0 0 1 3.6 13.45a8.825 8.825 0 0 1-1.05-1.05 7.162 7.162 0 0 1-1.498-3.508 9.167 9.167 0 0 1 0-1.784 6.925 6.925 0 0 1 .665-2.188 6.61 6.61 0 0 1 1.335-1.868A6.61 6.61 0 0 1 4.92 1.717a6.916 6.916 0 0 1 3.971-.661M7.475 3.053A2.992 2.992 0 0 0 5.013 6c0 .852.328 1.599.963 2.197l.238.224-.216.127a4.016 4.016 0 0 0-1.971 3.092 9.824 9.824 0 0 0-.027.327c0 .025.116.033.492.033h.492l.013-.087a3.72 3.72 0 0 0 .027-.264c.046-.608.374-1.281.859-1.766a2.98 2.98 0 0 1 4.234 0c.486.485.803 1.137.856 1.757.009.103.022.226.03.273l.013.087h.492c.376 0 .492-.008.492-.033 0-.019-.012-.166-.027-.327a4.016 4.016 0 0 0-1.971-3.092l-.216-.127.238-.224c.635-.598.963-1.345.963-2.197A2.985 2.985 0 0 0 8.51 3.053a3.737 3.737 0 0 0-1.035 0m.946.988c.257.051.633.232.843.407.721.599.941 1.594.537 2.419-.493 1.003-1.679 1.418-2.668.934a2 2 0 0 1-.671-3.083c.267-.323.719-.601 1.099-.676.252-.05.611-.051.86-.001'
      />
    </svg>
  )
})

SvgAvatar16.displayName = 'SvgAvatar16'
export default SvgAvatar16
