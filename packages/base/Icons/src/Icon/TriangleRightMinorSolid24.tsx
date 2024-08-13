import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import { classes } from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgTriangleRightMinorSolid24 = forwardRef(
  function SvgTriangleRightMinorSolid24(props: Props, ref: Ref<SVGSVGElement>) {
    const {
      className,
      style = {},
      color,
      scale,
      base,
      'data-testid': testId,
    } = props
    const classNames = ['PicassoSvgTriangleRightMinorSolid24', classes.root]
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
        viewBox='0 0 24 24'
        className={twMerge(...classNames)}
        style={svgStyle}
        ref={ref}
        data-testid={testId}
      >
        <path d='m7 4 10 8-10 8z' />
      </svg>
    )
  }
)

SvgTriangleRightMinorSolid24.displayName = 'SvgTriangleRightMinorSolid24'
export default SvgTriangleRightMinorSolid24
