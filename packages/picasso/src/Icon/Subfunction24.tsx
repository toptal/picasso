import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgSubfunction24 = forwardRef(function SvgSubfunction24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: availableClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes = [availableClasses.root, className]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (availableClasses[colorClassName]) {
    classes.push(availableClasses[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M15 1v7h-3v4h8v5h-1v-4H4v4h3v7H0v-7h3v-5h8V8H8V1h7zm4.5 16a3.5 3.5 0 110 7 3.5 3.5 0 010-7zM6 18H1v5h5v-5zm13.5 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM14 2H9v5h5V2z' />
    </svg>
  )
})

SvgSubfunction24.displayName = 'SvgSubfunction24'
export default withStyles(styles)(SvgSubfunction24)
