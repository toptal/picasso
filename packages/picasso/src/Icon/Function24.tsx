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
const SvgFunction24 = forwardRef(function SvgFunction24(
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
      <path d='M11.5 1a3.5 3.5 0 01.5 6.964V12h8v5h3v7h-7v-7h3v-4H4v4h3v7H0v-7h3v-5h8V7.965A3.5 3.5 0 0111.5 1zM22 18h-5v5h5v-5zM6 18H1v5h5v-5zm5.5-16a2.5 2.5 0 100 5 2.5 2.5 0 000-5z' />
    </svg>
  )
})

SvgFunction24.displayName = 'SvgFunction24'
export default withStyles(styles)(SvgFunction24)
