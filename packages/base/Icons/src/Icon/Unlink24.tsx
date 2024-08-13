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
const SvgUnlink24 = forwardRef(function SvgUnlink24(
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
  const classNames = ['PicassoSvgUnlink24', classes.root]
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
      <path d='m21.5 1.793.707.707L2.5 22.207l-.707-.707L21.5 1.793ZM20 9a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-9a3.987 3.987 0 0 1-2.767-1.111l.708-.707A2.99 2.99 0 0 0 11 18h9a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-3v1a4 4 0 0 1-4 4h-1.879l1-1H13a3 3 0 0 0 3-3v-.879L17.121 9H20Zm-7-4c1.074 0 2.05.423 2.768 1.112l-.708.707A2.99 2.99 0 0 0 13 6H4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h3v-1a4 4 0 0 1 4-4h1.878l-1 1H11a3 3 0 0 0-3 3v.878L6.878 15H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h9Z' />
    </svg>
  )
})

SvgUnlink24.displayName = 'SvgUnlink24'
export default SvgUnlink24
