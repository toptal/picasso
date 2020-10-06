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
const SvgRankThree16 = forwardRef(function SvgRankThree16(
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
      <path d='M8 8.882l6.198 4.508-.588.808L8 10.118l-5.61 4.08-.588-.808L8 8.882zm0-4l6.198 4.508-.588.808L8 6.118l-5.61 4.08-.588-.808L8 4.882zm0-4l6.198 4.508-.588.808L8 2.118l-5.61 4.08-.588-.808L8 .882z' />
    </svg>
  )
})

SvgRankThree16.displayName = 'SvgRankThree16'
export default withStyles(styles)(SvgRankThree16)
