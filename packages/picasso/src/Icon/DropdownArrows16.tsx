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
const SvgDropdownArrows16 = forwardRef(function SvgDropdownArrows16(
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
      <path d='M8.429 2.715l2.117 3.528a.5.5 0 01-.43.757H5.884a.5.5 0 01-.429-.757l2.117-3.528a.5.5 0 01.858 0zM8.429 13.285l2.117-3.528a.5.5 0 00-.43-.757H5.884a.5.5 0 00-.429.757l2.117 3.528a.5.5 0 00.858 0z' />
    </svg>
  )
})

SvgDropdownArrows16.displayName = 'SvgDropdownArrows16'
export default withStyles(styles)(SvgDropdownArrows16)
