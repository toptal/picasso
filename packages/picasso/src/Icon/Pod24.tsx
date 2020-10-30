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
const SvgPod24 = forwardRef(function SvgPod24(
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
      <path d='M6 13a5 5 0 110 10 5 5 0 010-10zm12 0a5 5 0 110 10 5 5 0 010-10zM6 14a4 4 0 100 8 4 4 0 000-8zm12 0a4 4 0 100 8 4 4 0 000-8zM6 1a5 5 0 110 10A5 5 0 016 1zm12 0a5 5 0 110 10 5 5 0 010-10zM6 2a4 4 0 100 8 4 4 0 000-8zm12 0a4 4 0 100 8 4 4 0 000-8z' />
    </svg>
  )
})

SvgPod24.displayName = 'SvgPod24'
export default withStyles(styles)(SvgPod24)
