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
const SvgDispute16 = forwardRef(function SvgDispute16(
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
      <path d='M6.5.793L11.207 5.5l-.707.707-.5-.5L8.207 7.5l1.147 1.147L10 8l6 6-2 2-6-6 .647-.646L7.5 8.207 5.707 10l.5.5-.707.707L.793 6.5l.707-.707.5.5L6.293 2l-.5-.5L6.5.793zM10 9.415L9.415 10 14 14.585l.585-.585L10 9.415zM7 2.707L2.707 7 5 9.293 9.293 5 7 2.707z' />
    </svg>
  )
})
SvgDispute16.displayName = 'SvgDispute16'
export default withStyles(styles)(SvgDispute16)
