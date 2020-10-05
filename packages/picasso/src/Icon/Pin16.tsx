import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgPin16 = forwardRef(function SvgPin16(
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
      viewBox='0 0 16 16'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M8 16C4 11.542 2 8.21 2 6a6 6 0 1112 0c0 2.21-2 5.542-6 10zM3 6c0 1.754 1.657 4.633 5 8.489 3.343-3.856 5-6.735 5-8.489A5 5 0 003 6zm5 2a2 2 0 110-4 2 2 0 010 4zM7 6a1 1 0 102 0 1 1 0 00-2 0z' />
    </svg>
  )
})

SvgPin16.displayName = 'SvgPin16'
export default withStyles(styles)(SvgPin16)
