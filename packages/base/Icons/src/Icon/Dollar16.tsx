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
const SvgDollar16 = forwardRef(function SvgDollar16(
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
  const classNames = ['PicassoSvgDollar16', classes.root]
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
        d='M6.238.95h.88v1.323H8.882V.95h.881v1.415c1.298.266 2.423 1.086 3.034 2.258l.204.391-.781.407-.204-.39A3.517 3.517 0 0 0 9.762 3.27v4.291c1.71.056 3.084 1.41 3.084 3.082s-1.374 3.027-3.084 3.083v1.323h-.88v-1.322H7.118v1.322h-.881v-1.415c-1.298-.266-2.423-1.086-3.034-2.258L3 10.986l.781-.408.204.39a3.517 3.517 0 0 0 2.253 1.762V8.439a3.25 3.25 0 0 1-2.142-.895 3.031 3.031 0 0 1-.942-2.187c0-1.672 1.374-3.027 3.084-3.083V.951Zm3.524 11.894c1.23-.055 2.203-1.023 2.203-2.2 0-1.178-.973-2.146-2.203-2.201v4.4Zm-.88-4.403v4.405H7.118V8.441H8.88Zm0-.882V3.154H7.118v4.405H8.88ZM4.034 5.357c0-1.178.973-2.146 2.203-2.2v4.4a2.368 2.368 0 0 1-1.532-.649 2.15 2.15 0 0 1-.671-1.551Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgDollar16.displayName = 'SvgDollar16'
export default SvgDollar16
