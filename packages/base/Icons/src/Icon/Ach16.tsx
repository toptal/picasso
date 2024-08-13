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
const SvgAch16 = forwardRef(function SvgAch16(
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
  const classNames = ['PicassoSvgAch16', classes.root]
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
      viewBox='0 0 16 16'
      className={twMerge(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M12 7V6h2.5A1.5 1.5 0 0 1 16 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-6A1.5 1.5 0 0 1 1.5 6H3v1H1.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5H12Zm-3 3h5v1H9v-1Zm-2 2h7v1H7v-1Zm1.5-7.793L3 9.707V11h1.293l5.5-5.5L8.5 4.207Zm.707-.707L10.5 4.793 11.793 3.5 10.5 2.207 9.207 3.5ZM2 9.293l8.5-8.5L13.207 3.5l-8.5 8.5H2V9.293Z' />
    </svg>
  )
})

SvgAch16.displayName = 'SvgAch16'
export default SvgAch16
