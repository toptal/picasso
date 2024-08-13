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
const SvgThumbsDown24 = forwardRef(function SvgThumbsDown24(
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
  const classNames = ['PicassoSvgThumbsDown24', classes.root]
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
      <path d='M11.23 1c2.448-.001 3.9.495 6.356 1.487h3.943A1.48 1.48 0 0 1 23 3.975v8.923a1.48 1.48 0 0 1-1.471 1.487h-3.605L13.3 22.25a1.464 1.464 0 0 1-1.742.674l-1.063-.359a2.544 2.544 0 0 1-1.643-3.025l.944-3.808-2.592.475c-2.398.44-4.696-1.167-5.132-3.592a4.51 4.51 0 0 1 0-1.596l.924-5.134C3.503 3.056 5.94 1 8.785 1h2.445Zm0 1H8.785C6.427 2 4.402 3.708 3.979 6.062l-.924 5.134a3.51 3.51 0 0 0 0 1.242c.339 1.882 2.116 3.126 3.968 2.786l4.115-.755-.372 1.503-.944 3.809c-.194.783.24 1.584.991 1.837l1.063.358a.47.47 0 0 0 .561-.232L17 13.982V3.329l-.141-.056C14.339 2.27 13.187 2 11.229 2ZM18 13.385h3.529a.48.48 0 0 0 .471-.487V3.975a.48.48 0 0 0-.471-.488H18v9.898Z' />
    </svg>
  )
})

SvgThumbsDown24.displayName = 'SvgThumbsDown24'
export default SvgThumbsDown24
